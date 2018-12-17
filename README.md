To build/run/test the code you must run it locally:

Download the bProj folder from branch Blythe In Postgres use the queries to create your database and populate some data:

CREATE DATABASE cureview; CREATE TABLE classes(classnumber INT, classname TEXT, upvotes INT, downvotes INT, classid INT); ALTER TABLE classes ALTER COLUMN upvotes SET DEFAULT 0; ALTER TABLE classes ALTER COLUMN downvotes SET DEFAULT 0; INSERT INTO classes(classnumber, classname, upvotes, downvotes) values (1200, 'Introduction to Computational Thinking',100, 20), (2820, 'Linear Algebra with Computer Science Applications', 30, 20), (2824, 'Discrete Stuctures', 60, 10),(3010, 'Programming Project Workshop : Game Development', 0, 0);

Run a server on your machine for port 4000

Navigate to your bProj directory you downloaded.

run the command : node server.js

Navigate to localhost:4000 in your browser and you should see the homescreen to the website
