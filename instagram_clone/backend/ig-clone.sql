-- Contains commands for dropping/creating our database depending on answers to prompts. 

\echo 'Delete and recreate ig-clone db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE ig-clone;
CREATE DATABASE ig-clone;
\connect ig-clone

\i ig-clone-schema.sql
\i ig-clone-seed.sql

\echo 'Delete and recreate ig-clone_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE ig-clone_test;
CREATE DATABASE ig-clone_test;
\connect ig-clone_test

\i ig-clone-schema.sql
