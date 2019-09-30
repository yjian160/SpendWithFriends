DROP TABLE IF EXISTS person, transaction, circle, category, person_circle, person_transaction;

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  username VARCHAR(64) UNIQUE
);

CREATE TABLE circle (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) UNIQUE
);

CREATE TABLE person_circle (
  person_id INTEGER,
  circle_id INTEGER,
  UNIQUE (person_id, circle_id),
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (circle_id) REFERENCES circle(id) ON DELETE CASCADE
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) UNIQUE
);

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  description VARCHAR(256),
  total_amount NUMERIC(9,2),
  payer_id INTEGER,
  payer_name VARCHAR(64) UNIQUE
  circle_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY (payer_id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (circle_id) REFERENCES circle(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE person_transaction (
  person_id INTEGER,
  transaction_id INTEGER,
  UNIQUE (person_id, transaction_id),
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE
);