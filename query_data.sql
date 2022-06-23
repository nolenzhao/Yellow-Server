CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100),
    item_colours text[],
    colour_codes text[],
    img_url text[],
    alt_text VARCHAR(100),
    item_description text
)