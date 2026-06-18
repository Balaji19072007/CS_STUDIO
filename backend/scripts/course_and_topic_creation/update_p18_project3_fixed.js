const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const description = `# Project 3: Mini Text Editor

## Project Overview

A Text Editor is software used to create and edit text documents.

**Examples:**
* Notepad
* Notepad++
* VS Code
* Sublime Text

In this project, students will build a simplified version of a text editor.

---

## Features

### Enter Text
Save text entered by user.

### Display Text
View saved content.

### Count Characters
Calculate total characters.

### Clear Text
Remove all content.

---

## How the Project Works

**Step 1**
User enters text.
*(Example: Hello World)*

**Step 2**
Program stores text in a character array.

**Step 3**
User selects menu option.
*(Example: Display Text)*

**Step 4**
Program shows stored text.

**Step 5**
Additional operations can be performed.

<!-- SPLIT -->

Hints & Logic Guide

**Hint 1** Store text in a character array (e.g., \`char text[1000]\`).  
**Hint 2** Use \`strlen()\` to count the number of characters.  
**Hint 3** Use a \`switch-case\` menu inside an infinite loop to handle user choices.

Sample Input
\`\`\`text
1.Enter Text
2.Display Text
3.Count Characters
4.Clear Text
5.Exit

Choice: 1

Enter Text: Hello World
\`\`\`
Sample Output
\`\`\`text
Saved Successfully
\`\`\`
`;

async function run() {
    const { error } = await supabase
        .from('course_challenges')
        .update({
            description: description,
        })
        .eq('topic_id', 'c-p18-t7');

    if (error) {
        console.error('Error updating DB:', error);
    } else {
        console.log('Successfully updated Project 3 DB content.');
    }
}

run();
