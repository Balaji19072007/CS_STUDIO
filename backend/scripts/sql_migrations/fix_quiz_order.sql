-- Fix Quiz Order for C Programming - Phase 1
-- Goal: Place Quiz immediately after Topic 4 (so Quiz becomes item 5)

DO $$
DECLARE
    target_phase_id UUID;
BEGIN
    -- Get Phase 1 ID for C Programming
    SELECT id INTO target_phase_id
    FROM phases
    WHERE course_id = 'c-programming' AND title LIKE 'Phase 1%';

    IF target_phase_id IS NOT NULL THEN
        -- 1. Shift Topics: Increment order_index for all topics after Topic 4 (order_index > 4)
        -- This makes a "hole" at index 5
        UPDATE topics
        SET order_index = order_index + 1
        WHERE phase_id = target_phase_id
          AND order_index > 4;

        -- 2. Place Quiz: Set Quiz order_index to 5
        UPDATE quizzes
        SET order_index = 5
        WHERE phase_id = target_phase_id;
        
        RAISE NOTICE 'Successfully updated Quiz order for Phase 1';
    ELSE
        RAISE NOTICE 'Phase 1 not found for C Programming';
    END IF;
END $$;
