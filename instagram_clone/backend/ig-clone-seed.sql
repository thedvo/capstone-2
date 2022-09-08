-- This file will contain seed data for database
-- Create fake user + post data which will be added to the tables. 


INSERT INTO users (id, username, password, first_name, last_name, email, is_admin)
VALUES (1000,
        'arnold',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Arnold',
        'Test',
        'arnold@test.com',
        FALSE),
        (1001,
        'dan',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Dan',
        'Test',
        'dan@test.com',
        FALSE),
        (1002,
        'chris',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Chris',
        'Test',
        'chris@test.com',
        FALSE),
        (1003,
        'jim',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Jim',
        'Test',
        'jim@test.com',
        FALSE),
        (1004,
        'ash',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Ash',
        'Test',
        'ash@test.com',
        FALSE)
       ;

INSERT INTO posts (id, image_file, caption, user_id)
VALUES (1000, 'image.png', 'hello world!', 1000),
        (1001, 'image.png', 'hello world!', 1000),
        (1002, 'image.png', 'hello world!', 1000),
        (1003, 'image.png', 'hello world!', 1001),
        (1004, 'image.png', 'hello world!', 1001),
        (1005, 'image.png', 'hello world!', 1001),
        (1006, 'image.png', 'hello world!', 1002),
        (1007, 'image.png', 'hello world!', 1002),
        (1008, 'image.png', 'hello world!', 1003),
        (1009, 'image.png', 'hawaii is beautiful!', 1003),
        (1010, 'image.png', 'had a great vacation!', 1003),
        (1011, 'image.png', 'love dogs!', 1003),
        (1012, 'image.png', 'love cats!', 1004);

INSERT INTO likes (user_id, post_id)
VALUES 
    (1000, 1001),
    (1000, 1002),
    (1000, 1003),
    (1001, 1005),
    (1001, 1006),
    (1001, 1012),
    (1003, 1001),
    (1003, 1005),
    (1003, 1006),
    (1004, 1006),
    (1004, 1007),
    (1004, 1009),
    (1004, 1010);

-- posts 1000, 1004, 1008, 1011 do not have likes

INSERT INTO comments (id, user_id, post_id, comment)
VALUES 
    (500, 1000, 1001, 'looks fun!'),
    (501, 1000, 1002, 'looks fun!'),
    (502, 1000, 1007, 'looks fun!'),
    (503, 1002, 1002, 'that looks so good'),
    (504, 1004, 1004, 'invite me next time!'),
    (505, 1004, 1005, 'LOL'),
    (506, 1004, 1006, 'tfti'),
    (507, 1003, 1008, 'best team in the world'),
    (508, 1003, 1009, 'congrats!'),
    (509, 1002, 1004, 'cute!'),
    (510, 1001, 1005, 'noooooooo');

INSERT INTO follows (user_following_id, user_followed_id)
VALUES 
    (1000, 1001),
    (1000, 1002),
    (1000, 1003),
    (1000, 1004),
    (1001, 1000),
    (1001, 1002),
    (1002, 1001),
    (1002, 1003),
    (1003, 1000),
    (1003, 1001),
    (1003, 1002),
    (1003, 1004),
    (1004, 1001),
    (1004, 1003);


