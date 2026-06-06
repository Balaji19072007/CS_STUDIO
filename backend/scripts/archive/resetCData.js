import { createClient } from '@supabase/supabase-js';
import { C_PROGRAMMING_PHASES } from '../frontend/src/data/cProgrammingPhaseFallbacks.js';

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    const COURSE_ID = 'c-lang';
    
    console.log(`Fetching existing phases for ${COURSE_ID}...`);
    const { data: phases } = await supabase
      .from('phases')
      .select('id')
      .eq('course_id', COURSE_ID);

    if (phases && phases.length > 0) {
      const phaseIds = phases.map(p => p.id);
      console.log('Deleting existing topics and quizzes for these phases...');
      await supabase.from('topics').delete().in('phase_id', phaseIds);
      await supabase.from('quizzes').delete().in('phase_id', phaseIds);
      
      console.log(`Deleting existing phases for ${COURSE_ID}...`);
      await supabase.from('phases').delete().eq('course_id', COURSE_ID);
    }

    console.log(`Uploading new C_PROGRAMMING_PHASES to ${COURSE_ID}...`);

    for (const phase of C_PROGRAMMING_PHASES) {
      console.log(`Inserting Phase: ${phase.title}`);
      
      const { topics, ...phaseData } = phase;
      phaseData.course_id = COURSE_ID;
      
      const { error: phaseError } = await supabase.from('phases').insert([phaseData]);
      if (phaseError) {
        console.error('Failed to insert phase:', phaseError);
        continue;
      }

      if (topics && topics.length > 0) {
        const topicsWithPhaseId = topics.map(t => ({
          ...t,
          phase_id: phase.id
        }));

        const { error: topicsError } = await supabase.from('topics').insert(topicsWithPhaseId);
        if (topicsError) {
          console.error(`Failed to insert topics for ${phase.title}:`, topicsError);
        }
      }
    }

    console.log('Successfully completed data reset and upload for c-lang!');
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
