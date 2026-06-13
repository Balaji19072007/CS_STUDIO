-- Add missing indexes on ratings tables to fix slow queries
-- These indexes speed up the checkRatingStatus and checkCourseRatingStatus endpoints

CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_course_ratings_course_id ON course_ratings(course_id);
