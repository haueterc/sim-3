CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR (80),
    user_statistical_number integer,
    img TEXT,
    auth_id,
    crypto_currency_total numeric(4, 2)
)