-- FIX: Correct Quiz Placement for ALL Phases (C Programming)
-- Goal: Ensure "Quiz 1" appears immediately after Topic 4 (at index 5)
-- Logic:
-- 1. Loop through all phases of 'c-programming'
-- 2. Shift all Topics with order_index > 4 to make space at index 5.
-- 3. Find the "Quiz 1" for that phase and force its order_index = 5.

DO $$
DECLARE
    r RECORD;
    quiz_id TEXT; -- CHANGED FROM UUID TO TEXT
BEGIN
    RAISE NOTICE '🚀 Starting Global Quiz Reordering for C Programming...';

    -- Loop through all phases (ordered by order_index)
    FOR r IN 
        SELECT id, title, order_index 
        FROM phases 
        WHERE course_id = 'c-programming' 
        ORDER BY order_index
    LOOP
        RAISE NOTICE 'Processing Phase %: %', r.order_index, r.title;

        -- 1. Shift Topics: Move topics at index 5, 6, 7... to 6, 7, 8...
        -- Simpler Strategy: Always shift > 4 to be safe and create the hole.
        
        UPDATE topics
        SET order_index = order_index + 1
        WHERE phase_id = r.id
          AND order_index > 4;

        -- 2. Find and Move "Quiz 1" to Index 5
        -- Pick the quiz that is NOT the Final Quiz.
        
        SELECT id INTO quiz_id
        FROM quizzes
        WHERE phase_id = r.id
        AND title NOT ILIKE '%Final%'
        ORDER BY title, order_index
        LIMIT 1;

        IF quiz_id IS NOT NULL THEN
            UPDATE quizzes
            SET order_index = 5
            WHERE id = quiz_id;
            
            RAISE NOTICE '  ✅ Quiz 1 moved to Index 5';
        ELSE
            RAISE NOTICE '  ⚠️ No "Quiz 1" found for this phase.';
        END IF;

    END LOOP;

    RAISE NOTICE '🎉 All phases updated!';
END $$;
