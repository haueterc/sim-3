CREATE TABLE users_posts (
        user_id varchar(40) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
    ,   post_id varchar(40) REFERENCES posts (post_id) ON UPDATE CASCADE ON DELETE CASCADE
    ,   amount  numeric NOT NULL DEFAULT 1
    ,   CONSTRAINT users_posts_pkey PRIMARY KEY (user_id, post_id)
);