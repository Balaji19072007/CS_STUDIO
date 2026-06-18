-- ================================================
-- QUICK QUIZ QUESTION GENERATION (SQL Approach)
-- Much faster than Node.js script
-- Generates 15-20 questions per quiz with options
-- ================================================

-- This script creates generic questions for all quizzes
-- Can be customized later with topic-specific questions

DO $$
DECLARE
    quiz_record RECORD;
    question_id UUID;
    i INTEGER;
    num_questions INTEGER;
    question_types TEXT[] := ARRAY['multiple_choice', 'true_false', 'code_output'];
    question_type TEXT;
BEGIN
    -- Loop through all quizzes
    FOR quiz_record IN 
        SELECT q.* 
        FROM quizzes q
        JOIN phases p ON q.phase_id = p.id
        WHERE p.course_id = 'c-programming'
        ORDER BY q.order_index
    LOOP
        RAISE NOTICE 'Processing: %', quiz_record.title;
        
        -- Random number of questions (15-20)
        num_questions := 15 + floor(random() * 6)::INTEGER;
        
        -- Generate questions
        FOR i IN 1..num_questions LOOP
            -- Cycle through question types
            question_type := question_types[(i % 3) + 1];
            
            -- Insert question
            INSERT INTO quiz_questions (
                quiz_id,
                question_type,
                question_text,
                code_snippet,
                correct_answer,
                explanation,
                order_index
            ) VALUES (
                quiz_record.id,
                question_type,
                CASE 
                    WHEN question_type = 'multiple_choice' THEN 
                        'Question ' || i || ': Which of the following is correct?'
                    WHEN question_type = 'true_false' THEN 
                        'Question ' || i || ': This statement is true.'
                    ELSE 
                        'Question ' || i || ': What is the output of this code?'
                END,
                CASE 
                    WHEN question_type = 'code_output' THEN 
                        E'#include <stdio.h>\nint main() {\n    printf("Output");\n    return 0;\n}'
                    ELSE NULL
                END,
                CASE 
                    WHEN question_type = 'true_false' THEN 'true'::jsonb
                    ELSE '0'::jsonb
                END,
                'This is the correct answer explanation.',
                i
            ) RETURNING id INTO question_id;
            
            -- Insert options for multiple choice questions
            IF question_type IN ('multiple_choice', 'code_output') THEN
                INSERT INTO quiz_question_options (question_id, option_text, is_correct, order_index)
                VALUES 
                    (question_id, 'Option A (Correct)', true, 1),
                    (question_id, 'Option B', false, 2),
                    (question_id, 'Option C', false, 3),
                    (question_id, 'Option D', false, 4);
            END IF;
        END LOOP;
        
        RAISE NOTICE '  Created % questions', num_questions;
    END LOOP;
    
    RAISE NOTICE 'Quiz question generation complete!';
END $$;

-- Verify question creation
SELECT 
    COUNT(*) as total_questions,
    COUNT(DISTINCT quiz_id) as quizzes_with_questions
FROM quiz_questions;

-- Questions by type
SELECT 
    question_type,
    COUNT(*) as count
FROM quiz_questions
GROUP BY question_type;
