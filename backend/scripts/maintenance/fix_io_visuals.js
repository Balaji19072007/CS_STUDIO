const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixVisuals() {
    // Fix c-p4-t4
    const p4t4Update = await supabase.from('course_challenges').update({
        output_format: 'Enter a character:\nYou entered:\nC',
        reference_output: 'Enter a character:\nYou entered:\nA',
        solution_code: `#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf("Enter a character:\\n");\n    ch = getchar();\n\n    printf("You entered:\\n");\n    putchar(ch);\n    printf("\\n");\n\n    return 0;\n}`
    }).eq('topic_id', 'c-p4-t4');
    console.log('Fixed c-p4-t4 visuals:', p4t4Update.error ? p4t4Update.error : 'Success');

    // Fix c-p4-t5
    const p4t5Update = await supabase.from('course_challenges').update({
        output_format: 'Enter a string:\nYou entered:\nWelcome To CS Studio',
        reference_output: 'Enter a string:\nYou entered:\nWelcome To CS Studio',
        solution_code: `#include <stdio.h>\n\nint main() {\n    char str[100];\n\n    printf("Enter a string:\\n");\n    gets(str);\n\n    printf("You entered:\\n");\n    puts(str);\n\n    return 0;\n}`
    }).eq('topic_id', 'c-p4-t5');
    console.log('Fixed c-p4-t5 visuals:', p4t5Update.error ? p4t5Update.error : 'Success');
}

fixVisuals();
