# Quiz Generation and Validation Guide

## Step 1: Generate Quizzes

### Run SQL Script in Supabase
1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `backend/scripts/generate_quizzes.sql`
3. Paste and click "Run"
4. Wait for completion message

### What This Creates
- **Topic-Group Quizzes**: Every 4 topics
- **Phase-Level Quizzes**: For phases with 5+ topics
- **Total Expected**: ~51 quizzes

## Step 2: Validate Quiz Generation

### Run Validation Script
```bash
node scripts/validate_quizzes.js
```

### Expected Output
```
Topic-Group Quizzes: ~33
Phase-Level Quizzes: ~18
Total Quizzes: ~51
```

### Validation Checklist
- [ ] All phases have appropriate quizzes
- [ ] Topic-group quizzes cover every 4 topics
- [ ] Phase-level quizzes exist for phases with 5+ topics
- [ ] Quiz order_index is correct (after topics)
- [ ] All quizzes have proper metadata (min/max questions, pass %)

## Step 3: Test Quiz Flow

### UI Rendering Tests
1. **Course Page**: Verify C Programming appears
2. **Phase View**: Check all 18 phases display
3. **Topic List**: Verify 135 topics with content
4. **Quiz Placement**: Quizzes appear between topics
5. **Quiz UI**: Quiz cards display correctly

### Quiz Functionality Tests
1. **Quiz Access**: Can open quiz after completing topics
2. **Quiz Questions**: Questions display (when added)
3. **Quiz Submission**: Can submit answers
4. **Quiz Results**: Score calculation works
5. **Quiz Retake**: Can retake if failed

### Progress Tracking Tests
1. **Topic Completion**: Marking topics as complete
2. **Quiz Completion**: Marking quizzes as passed
3. **Phase Progress**: Percentage calculation
4. **Course Progress**: Overall completion tracking
5. **Locking Behavior**: Next topics/quizzes lock correctly

## Step 4: Verify Database

### Check Quiz Counts
```sql
-- Total quizzes
SELECT COUNT(*) FROM quizzes;

-- Quizzes by type
SELECT quiz_type, COUNT(*) 
FROM quizzes 
GROUP BY quiz_type;

-- Quizzes per phase
SELECT p.title, COUNT(q.id) as quiz_count
FROM phases p
LEFT JOIN quizzes q ON p.id = q.phase_id
WHERE p.course_id = 'c-programming'
GROUP BY p.id, p.title
ORDER BY p.order_index;
```

### Check Content Completeness
```sql
-- Topics with content
SELECT 
    (SELECT COUNT(*) FROM topics WHERE phase_id IN 
        (SELECT id FROM phases WHERE course_id = 'c-programming')) as total_topics,
    (SELECT COUNT(DISTINCT topic_id) FROM topic_content WHERE topic_id IN 
        (SELECT id FROM topics WHERE phase_id IN 
            (SELECT id FROM phases WHERE course_id = 'c-programming'))) as topics_with_content;

-- Topics with practice problems
SELECT 
    COUNT(DISTINCT topic_id) as topics_with_problems
FROM practice_problems 
WHERE topic_id IN 
    (SELECT id FROM topics WHERE phase_id IN 
        (SELECT id FROM phases WHERE course_id = 'c-programming'));
```

## Step 5: Next Steps

### After Validation
1. **Add Quiz Questions**: Populate quiz_questions table
2. **Add Question Options**: Populate quiz_question_options table
3. **Build Frontend**: Create quiz UI components
4. **Implement APIs**: Progress tracking endpoints
5. **Test End-to-End**: Complete learning flow

### Python Course Rollout
Once C Programming is validated:
1. Use same structure (18 phases, ~135 topics)
2. Apply same content generation approach
3. Auto-generate quizzes with same rules
4. Validate before expanding to other courses

## Troubleshooting

### No Quizzes Generated
- Check if SQL script ran successfully
- Verify phases exist in database
- Check topic counts per phase

### Wrong Quiz Count
- Verify topic count (should be 135)
- Check quiz generation logic (every 4 topics)
- Ensure phase-level quiz rules applied correctly

### Quiz Order Issues
- Check order_index values
- Verify quizzes appear after topics
- Ensure sequential ordering
