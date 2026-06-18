-- ================================================
-- VERIFICATION QUERIES FOR C PROGRAMMING COURSE
-- Run these to validate the complete setup
-- ================================================

-- 1. Course Structure Overview
SELECT 
    'Phases' as component,
    COUNT(*) as count
FROM phases 
WHERE course_id = 'c-programming'

UNION ALL

SELECT 
    'Topics' as component,
    COUNT(*) as count
FROM topics 
WHERE phase_id IN (SELECT id FROM phases WHERE course_id = 'c-programming')

UNION ALL

SELECT 
    'Content Items' as component,
    COUNT(*) as count
FROM topic_content 
WHERE topic_id IN (
    SELECT id FROM topics WHERE phase_id IN (
        SELECT id FROM phases WHERE course_id = 'c-programming'
    )
)

UNION ALL

SELECT 
    'Practice Problems' as component,
    COUNT(*) as count
FROM practice_problems 
WHERE topic_id IN (
    SELECT id FROM topics WHERE phase_id IN (
        SELECT id FROM phases WHERE course_id = 'c-programming'
    )
)

UNION ALL

SELECT 
    'Quizzes' as component,
    COUNT(*) as count
FROM quizzes 
WHERE phase_id IN (SELECT id FROM phases WHERE course_id = 'c-programming')

UNION ALL

SELECT 
    'Quiz Questions' as component,
    COUNT(*) as count
FROM quiz_questions 
WHERE quiz_id IN (
    SELECT id FROM quizzes WHERE phase_id IN (
        SELECT id FROM phases WHERE course_id = 'c-programming'
    )
);

-- 2. Topics per Phase
SELECT 
    p.order_index,
    p.title,
    COUNT(t.id) as topic_count,
    COUNT(DISTINCT q.id) as quiz_count
FROM phases p
LEFT JOIN topics t ON p.id = t.phase_id
LEFT JOIN quizzes q ON p.id = q.phase_id
WHERE p.course_id = 'c-programming'
GROUP BY p.id, p.order_index, p.title
ORDER BY p.order_index;

-- 3. Quiz Distribution
SELECT 
    quiz_type,
    COUNT(*) as count,
    AVG(min_questions) as avg_min_questions,
    AVG(max_questions) as avg_max_questions
FROM quizzes 
WHERE phase_id IN (SELECT id FROM phases WHERE course_id = 'c-programming')
GROUP BY quiz_type;

-- 4. Question Type Distribution
SELECT 
    qq.question_type,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM quiz_questions qq
JOIN quizzes q ON qq.quiz_id = q.id
JOIN phases p ON q.phase_id = p.id
WHERE p.course_id = 'c-programming'
GROUP BY qq.question_type
ORDER BY count DESC;

-- 5. Content Type Distribution
SELECT 
    content_type,
    COUNT(*) as count
FROM topic_content
WHERE topic_id IN (
    SELECT id FROM topics WHERE phase_id IN (
        SELECT id FROM phases WHERE course_id = 'c-programming'
    )
)
GROUP BY content_type
ORDER BY count DESC;

-- 6. Questions per Quiz
SELECT 
    q.title,
    COUNT(qq.id) as question_count
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
WHERE q.phase_id IN (SELECT id FROM phases WHERE course_id = 'c-programming')
GROUP BY q.id, q.title
ORDER BY question_count DESC
LIMIT 10;

-- 7. Completeness Check
SELECT 
    'Topics without content' as check_type,
    COUNT(*) as count
FROM topics t
WHERE t.phase_id IN (SELECT id FROM phases WHERE course_id = 'c-programming')
AND NOT EXISTS (
    SELECT 1 FROM topic_content tc WHERE tc.topic_id = t.id
)

UNION ALL

SELECT 
    'Topics without practice problems' as check_type,
    COUNT(*) as count
FROM topics t
WHERE t.phase_id IN (SELECT id FROM phases WHERE course_id = 'c-programming')
AND NOT EXISTS (
    SELECT 1 FROM practice_problems pp WHERE pp.topic_id = t.id
)

UNION ALL

SELECT 
    'Quizzes without questions' as check_type,
    COUNT(*) as count
FROM quizzes q
WHERE q.phase_id IN (SELECT id FROM phases WHERE course_id = 'c-programming')
AND NOT EXISTS (
    SELECT 1 FROM quiz_questions qq WHERE qq.quiz_id = q.id
);
