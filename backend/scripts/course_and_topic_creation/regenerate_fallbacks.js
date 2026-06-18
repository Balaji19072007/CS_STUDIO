const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function regenerate() {
    const { data: challenges, error } = await supabase.from('course_challenges').select('*').eq('course_id', 'c-programming');
    if (error) {
        console.error('Error fetching challenges:', error);
        return;
    }
    
    const { data: topics, error: tError } = await supabase.from('topics').select('id, title, phases!inner(course_id)').eq('phases.course_id', 'c-programming');
    if (tError) {
        console.error('Error fetching topics:', tError);
        return;
    }
    
    const topicMap = {};
    for (const t of topics) {
        topicMap[t.id] = t.title;
    }

    const getTestInput = (c) => {
        if (c.topic_id === 'c-p10-t3') return 'Ajith';
        if (c.topic_id === 'c-p9-t4') return '10\\n20\\n30\\n40\\n50';
        if (c.topic_id === 'c-p8-t6') return '4';
        if (c.topic_id === 'c-p8-t1') return '5';
        if (c.topic_id === 'c-p8-t2') return '5';
        if (c.topic_id === 'c-p7-t4') return '15 25';
        if (c.topic_id === 'c-p7-t5') return '10 20';
        if (c.topic_id === 'c-p7-t8') return '6';
        if (c.topic_id === 'c-p6-t1' || c.topic_id === 'c-p6-t2' || c.topic_id === 'c-p5-t1' || c.topic_id === 'c-p5-t2') return '5';
        if (c.topic_id === 'c-p5-t3') return '2024';
        if (c.topic_id === 'c-p6-t5') return '1\\n2\\n3\\n0';
        if (c.topic_id === 'c-p4-t2') return '25';
        if (c.topic_id === 'c-p4-t4') return 'A';
        if (c.topic_id === 'c-p5-t4') return '10 20 30';
        if (c.topic_id === 'c-p5-t5') return '2';
        if (c.topic_id === 'c-p5-t7') return 'a';
        if (c.topic_id === 'c-p18-t5') return '10\\n5\\n1\\n';
        if (c.topic_id === 'c-p18-t6') return '1\\n591\\nBalu\\n93\\n6\\n';
        if (c.topic_id === 'c-p18-t7') return '1\\ntest.txt\\nHello World\\n5\\n';
        if (c.topic_id === 'c-p12-t4') return '10 20';
        if (c.topic_id === 'c-p12-t5') return '5';
        if (c.topic_id === 'c-p12-t6') return '25';
        if (c.topic_id === 'c-p12-t7') return '100';
        if (c.topic_id === 'c-p13-t1') return 'Balu 101 89.5';
        if (c.topic_id === 'c-p13-t2') return '1001 Ravi';
        if (c.topic_id === 'c-p13-t3') return 'Pen 10 5';
        if (c.topic_id === 'c-p13-t5') return 'Balu Kakinada';
        if (c.topic_id === 'c-p13-t6') return 'Ravi 80 Balu 95 Sita 88';
        if (c.topic_id === 'c-p13-t7') return 'Balu';
        if (c.topic_id === 'c-p13-t8') return 'Balu 92.5';
        if (c.topic_id === 'c-p13-t10') return '101 Balu';
        if (c.topic_id === 'c-p14-t2') return '10 20 30 40 50';
        if (c.topic_id === 'c-p14-t4') return '10 20 30 40 50';
        if (c.topic_id === 'c-p14-t7') return '5 12 45 8 67 23';
        if (c.topic_id === 'c-p14-t8') return 'Balu 101';
        if (c.topic_id === 'c-p15-t5') return 'Balu 95';
        if (c.topic_id === 'c-p16-t2') return '25';
        if (c.topic_id === 'c-p16-t3') return '5';
        if (c.topic_id === 'c-p16-t4') return '15 25';
        if (c.topic_id === 'c-p17-t2') return '5';
        if (c.topic_id === 'c-p17-t4') return '3';
        if (c.topic_id === 'c-p17-t7') return '5';
        if (c.topic_id === 'c-p6-t8') return '4';
        if (c.input_format && !c.input_format.includes(' ')) return c.input_format;
        return '';
    };

    const getTestArgs = (c) => {
        if (c.topic_id === 'c-p17-t1') return ['Balu', '95'];
        return [];
    };

    let fileContent = `const getFallbackChallengeById = (id) => {\n  switch (Number(id)) {\n`;
    for (const c of challenges) {
        fileContent += `    case ${c.id}:\n      return {\n        id: ${c.id},\n        title: ${JSON.stringify(c.title)},\n        description: ${JSON.stringify(c.description)},\n        reference_output: ${JSON.stringify(c.reference_output || '')},\n        test_input: ${JSON.stringify(getTestInput(c).replace(/\\\\n/g, '\\n'))},\n        test_args: ${JSON.stringify(getTestArgs(c))},\n        starter_code: ${JSON.stringify(c.starter_code || '')},\n        solution_code: ${JSON.stringify(c.solution_code || '')},\n        hints: ${JSON.stringify(c.hints || [])},\n        topic_id: '${c.topic_id}',\n        course_id: 'c-programming'\n      };\n`;
    }
    fileContent += `    default:\n      return null;\n  }\n};\n\n`;

    fileContent += `const getFallbackChallengeByTopicId = (topicId) => {\n  switch (topicId) {\n`;
    for (const c of challenges) {
        fileContent += `    case '${c.topic_id}':\n      return {\n        id: ${c.id},\n        title: ${JSON.stringify(c.title)},\n        description: ${JSON.stringify(c.description)},\n        reference_output: ${JSON.stringify(c.reference_output || '')},\n        test_input: ${JSON.stringify(getTestInput(c).replace(/\\\\n/g, '\\n'))},\n        test_args: ${JSON.stringify(getTestArgs(c))},\n        starter_code: ${JSON.stringify(c.starter_code || '')},\n        solution_code: ${JSON.stringify(c.solution_code || '')},\n        hints: ${JSON.stringify(c.hints || [])},\n        topic_id: '${c.topic_id}',\n        course_id: 'c-programming'\n      };\n`;
    }
    fileContent += `    default:\n      return null;\n  }\n};\n\n`;
    
    fileContent += `const getFallbackChallengeByTopicTitle = (topicTitle) => {\n  switch (topicTitle) {\n`;
    for (const c of challenges) {
        const title = topicMap[c.topic_id] || c.title;
        fileContent += `    case ${JSON.stringify(title)}:\n      return {\n        id: ${c.id},\n        title: ${JSON.stringify(c.title)},\n        description: ${JSON.stringify(c.description)},\n        reference_output: ${JSON.stringify(c.reference_output || '')},\n        test_input: ${JSON.stringify(getTestInput(c).replace(/\\\\n/g, '\\n'))},\n        test_args: ${JSON.stringify(getTestArgs(c))},\n        starter_code: ${JSON.stringify(c.starter_code || '')},\n        solution_code: ${JSON.stringify(c.solution_code || '')},\n        hints: ${JSON.stringify(c.hints || [])},\n        topic_id: '${c.topic_id}',\n        course_id: 'c-programming'\n      };\n`;
    }
    fileContent += `    default:\n      return null;\n  }\n};\n\n`;

    fileContent += `module.exports = {\n  getFallbackChallengeById,\n  getFallbackChallengeByTopicId,\n  getFallbackChallengeByTopicTitle\n};\n`;

    fs.writeFileSync('c:\\files\\projects\\CS studio\\backend\\data\\cProgrammingChallengeFallbacks.js', fileContent);
    fs.writeFileSync('c:\\files\\projects\\CS studio\\frontend\\src\\data\\cProgrammingChallengeFallbacks.js', fileContent);
    console.log('Successfully regenerated cProgrammingChallengeFallbacks.js with ' + challenges.length + ' challenges!');
}

regenerate();
