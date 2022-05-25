
CREATE TABLE person(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(20)
);

CREATE TABLE list(
    list_id SERIAL,
    task TEXT,
    userid INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES person(id)
);

INSERT INTO  person (username) VALUES('john');
INSERT INTO list (task, userid) VALUES ('clean house', 1);