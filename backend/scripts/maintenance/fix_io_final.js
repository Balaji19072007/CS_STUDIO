const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixFinal() {
    const p4t4Update = await supabase.from('course_challenges').update({
        output_format: 'Enter a character: C\nYou entered: C',
        reference_output: 'Enter a character: You entered: A',
        solution_code: `#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf("Enter a character: ");\n    ch = getchar();\n\n    printf("You entered: ");\n    putchar(ch);\n\n    return 0;\n}`
    }).eq('topic_id', 'c-p4-t4');
    console.log('Fixed c-p4-t4:', p4t4Update.error || 'Success');

    const p4t5Update = await supabase.from('course_challenges').update({
        output_format: 'Enter a string: Welcome To CS Studio\nYou entered: Welcome To CS Studio',
        reference_output: 'Enter a string: You entered: Welcome To CS Studio',
        solution_code: `#include <stdio.h>\n\nint main() {\n    char str[100];\n\n    printf("Enter a string: ");\n    gets(str);\n\n    printf("You entered: ");\n    puts(str);\n\n    return 0;\n}`
    }).eq('topic_id', 'c-p4-t5');
    console.log('Fixed c-p4-t5:', p4t5Update.error || 'Success');
}

fixFinal();
