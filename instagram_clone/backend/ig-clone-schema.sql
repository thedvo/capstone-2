-- Contains schema to create tables for our ig_clone database. 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(15) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  profile_image TEXT, 
  bio TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  image_file TEXT NOT NULL,
  caption VARCHAR(100) NOT NULL,
  date_posted TIMESTAMP NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE likes (
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  post_id INTEGER NOT NULL
    REFERENCES posts ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  post_id INTEGER NOT NULL
    REFERENCES posts ON DELETE CASCADE,
  comment VARCHAR(100) NOT NULL,
  date_posted TIMESTAMP NOT NULL
);

CREATE TABLE follows (
  user_following_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  user_followed_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE
);

-- REFERENCES is used to set up the FOREIGN KEY

-- by default if you reference another table, it will look for the standard primary key(typically ID). You can specify which table column you want to reference by using "REFERENCES users(username) ON DELETE CASCADE."