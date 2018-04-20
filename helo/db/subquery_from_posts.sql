SELECT id
FROM posts
WHERE EXISTS(SELECT 1 FROM users WHERE user_id = posts.user_id);