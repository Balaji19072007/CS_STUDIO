-- ================================================
-- AUTOMATIC QUIZ GENERATION FOR C PROGRAMMING
-- Run this SQL in Supabase SQL Editor
-- ================================================

-- This script generates quizzes based on the configuration:
-- - Topic-group quiz every 4 topics
-- - Phase-level quiz for phases with 5+ topics

DO $$
DECLARE
    phase_record RECORD;
    topic_count INTEGER;
    num_quizzes INTEGER;
    quiz_num INTEGER;
    start_idx INTEGER;
    end_idx INTEGER;
    quiz_order INTEGER;
BEGIN
    -- Loop through all C Programming phases
    FOR phase_record IN 
        SELECT * FROM phases 
        WHERE course_id = 'c-programming' 
        ORDER BY order_index
    LOOP
        RAISE NOTICE 'Processing Phase: %', phase_record.title;
        
        -- Count topics in this phase
        SELECT COUNT(*) INTO topic_count
        FROM topics
        WHERE phase_id = phase_record.id;
        
        quiz_order := 1000; -- Start after topics
        
        -- Generate topic-group quizzes (every 4 topics)
        num_quizzes := topic_count / 4;
        
        FOR quiz_num IN 1..num_quizzes LOOP
            start_idx := (quiz_num - 1) * 4 + 1;
            end_idx := start_idx + 3;
            
            INSERT INTO quizzes (
                id,
                phase_id,
                quiz_type,
                title,
                topic_start_index,
                topic_end_index,
                order_index,
                min_questions,
                max_questions,
                pass_percentage,
                is_mandatory
            ) VALUES (
                phase_record.id || '-quiz-' || quiz_num,
                phase_record.id,
                'topic_group',
                'Quiz ' || quiz_num || ' – Topics ' || start_idx || ' to ' || end_idx,
                start_idx,
                end_idx,
                quiz_order,
                15,
                20,
                60,
                true
            );
            
            quiz_order := quiz_order + 1;
            RAISE NOTICE '  Created topic-group quiz %', quiz_num;
        END LOOP;
        
        -- Generate phase-level quiz (if 5+ topics)
        IF topic_count >= 5 THEN
            INSERT INTO quizzes (
                id,
                phase_id,
                quiz_type,
                title,
                topic_start_index,
                topic_end_index,
                order_index,
                min_questions,
                max_questions,
                pass_percentage,
                is_mandatory
            ) VALUES (
                phase_record.id || '-final-quiz',
                phase_record.id,
                'phase_level',
                phase_record.title || ' – Final Quiz',
                NULL,
                NULL,
                quiz_order,
                15,
                20,
                60,
                true
            );
            
            RAISE NOTICE '  Created phase-level quiz';
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Quiz generation complete!';
END $$;

-- Verify quiz creation
SELECT 
    p.title AS phase,
    q.quiz_type,
    q.title AS quiz_title,
    q.order_index
FROM quizzes q
JOIN phases p ON q.phase_id = p.id
WHERE p.course_id = 'c-programming'
ORDER BY p.order_index, q.order_index;
