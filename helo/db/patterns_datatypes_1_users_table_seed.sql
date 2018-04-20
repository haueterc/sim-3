CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(40),
    user_statistical_number integer,
    img TEXT,
    auth_id,
    crypto_currency_total numeric(4, 2)
)