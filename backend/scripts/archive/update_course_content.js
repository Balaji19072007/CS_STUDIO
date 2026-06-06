require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const crypto = require('crypto');
const { OpenAI } = require('openai');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const uuid = () => crypto.randomUUID();

// Load the PDF text
const pdfText = fs.readFileSync('notes/C_notes_extracted.txt', 'utf-8');

async function processPhase(phase, topics) {
  console.log(`\nProcessing Phase: ${phase.title}... (${topics.length} topics)`);
  
  const prompt = `
You are an expert Computer Science professor updating a C Programming course.
We have a massive course with 18 phases. 
We have extracted the official IIT lecture notes for C programming (provided below).

Your task is to generate the rich content (Explanation, Syntax, Example, Tips) for the following topics in "${phase.title}".
Topics list:
${topics.map((t, idx) => `${idx + 1}. Title: "${t.title}", Description: "${t.description}"`).join('\n')}

For EACH topic, provide a list of content blocks.
Content types can be: 'explanation', 'syntax', 'example', 'tip', 'definition', 'warning'.
IMPORTANT: Heavily use the provided IIT PDF notes below as your source material. Use its explanations, its examples, and its tone. If a topic is completely absent from the PDF, use your expert knowledge to generate high-quality academic content that matches the style.

Respond ONLY with a valid JSON string (do not use markdown formatting blocks like \`\`\`json) matching this exact schema:
[
  {
    "topic_index": <1-based index from the list above>,
    "blocks": [
      {
        "content_type": "explanation", // or syntax, example, tip, definition, warning
        "content_text": "The rich text of the content..."
      },
      ...
    ]
  },
  ...
]

--- IIT C PROGRAMMING NOTES ---
${pdfText.substring(0, 60000)} // The notes are about 52KB, so this includes everything.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Using gpt-4o for speed and context window
      messages: [
        { role: "system", content: "You are a helpful assistant that strictly outputs raw JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 4000
    });

    let raw = completion.choices[0].message.content.trim();
    if (raw.startsWith('```json')) {
      raw = raw.replace(/^```json\n/, '').replace(/\n```$/, '');
    }
    const data = JSON.parse(raw);
    
    // Now insert to database
    for (const topicData of data) {
      const topic = topics[topicData.topic_index - 1];
      if (!topic) continue;

      // Delete existing content for this topic
      await supabase.from('topic_content').delete().eq('topic_id', topic.id);

      // Insert new content
      const insertData = topicData.blocks.map((b, idx) => ({
        id: uuid(),
        topic_id: topic.id,
        content_type: b.content_type,
        content_text: b.content_text,
        order_index: idx + 1
      }));

      if (insertData.length > 0) {
        await supabase.from('topic_content').insert(insertData);
      }
      console.log(`  ✅ Updated content for: ${topic.title}`);
    }
  } catch (error) {
    console.error(`  ❌ Error processing phase ${phase.title}:`, error.message);
  }
}

async function run() {
  console.log('🚀 Starting C Course Content Overhaul from PDF...');

  // Get course ID
  const { data: courses } = await supabase.from('courses').select('id').eq('title', 'C Programming');
  if (!courses || courses.length === 0) {
    console.error('C Programming course not found!');
    return;
  }
  const courseId = courses[0].id;

  // Get phases
  const { data: phases } = await supabase.from('phases').select('*').eq('course_id', courseId).order('order_index');
  
  for (const phase of phases) {
    // Get topics for this phase
    const { data: topics } = await supabase.from('topics').select('*').eq('phase_id', phase.id).order('order_index');
    if (!topics || topics.length === 0) {
      console.log(`Skipping phase ${phase.title}, no topics found.`);
      continue;
    }
    
    await processPhase(phase, topics);
  }

  console.log('\n✨ All topic contents successfully updated from IIT PDF!');
}

run().catch(console.error);
