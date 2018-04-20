CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    post_id varchar(40),
    contents TEXT,
    like_percentile_rating decimal(4,2)
)