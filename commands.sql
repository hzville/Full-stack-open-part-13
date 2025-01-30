CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('Blog 1 author', 'first.blog.example', 'First blog of the database');
INSERT INTO blogs (author, url, title) values ('Blog 2 author', 'second.blog.example', 'Second blog of the database');
