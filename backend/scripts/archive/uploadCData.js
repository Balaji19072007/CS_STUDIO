import { createClient } from '@supabase/supabase-js';
import { C_PROGRAMMING_PHASES } from '../frontend/src/data/cProgrammingPhaseFallbacks.js';

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    console.log('Uploading C_PROGRAMMING_PHASES to Supabase...');

    for (const phase of C_PROGRAMMING_PHASES) {
      console.log(`Inserting Phase: ${phase.title}`);
      
      const { topics, ...phaseData } = phase;
      
      // Override course_id to 'c' to match the frontend expectation
      phaseData.course_id = 'c';
      
      const { error: phaseError } = await supabase.from('phases').insert([phaseData]);
      if (phaseError) throw phaseError;

      if (topics && topics.length > 0) {
        console.log(`  Inserting ${topics.length} topics for ${phase.title}`);
        const topicsWithPhaseId = topics.map(t => ({
          ...t,
          phase_id: phase.id
        }));

        const { error: topicsError } = await supabase.from('topics').insert(topicsWithPhaseId);
        if (topicsError) throw topicsError;
      }
    }

    console.log('Successfully uploaded all new data to Supabase!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

run();
