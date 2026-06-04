ALTER TABLE topic_content DROP CONSTRAINT IF EXISTS topic_content_content_type_check;
ALTER TABLE topic_content ADD CONSTRAINT topic_content_content_type_check CHECK (content_type IN ('definition', 'explanation', 'syntax', 'example', 'diagram', 'note', 'tip', 'bash', 'output'));
