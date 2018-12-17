Our Project is called CUReview. The point of our website is to allow the user to review computer science classes at the University of Colorado Boulder. Our project uses a postgres database to store the classses and their information and a firebase database to hold a the user login data. From the home page you can choose to create an account. From there you will be able to see a list of classes to be reviewed along with their corresponding upvotes and downvotes. From here you can contribute the upvotes/downvotes. If you wish to add a class, navigate to the add class page and input the class number and name into the correct fields. Your class will now be added to the classes page wil intital values of 0 upvotes and 0 downvotes. When you return to the site you will be able to log back using the original account you made.



How our repository is set up :

Our master branch contains the readme for the project. It also includes the very intial code we used at the beginning of the project. The Blythe branch contains more code that was used throughout the project, some of which is not used in the final result. To view all of the complete and working code click on the folder bProj in Blythe branch. All of these files are used in the final website.

To build/run/test the code you must run it locally:

Download the bProj folder from branch Blythe
In Postgres use the queries to create your database and populate some data:

CREATE DATABASE cureview;
CREATE TABLE classes(classnumber INT, classname TEXT, upvotes INT, downvotes INT, classid INT);
ALTER TABLE classes ALTER COLUMN upvotes SET DEFAULT 0;
ALTER TABLE classes ALTER COLUMN downvotes SET DEFAULT 0;
INSERT INTO classes(classnumber, classname, upvotes, downvotes) values (1200, 'Introduction to Computational Thinking',100, 20), (2820, 'Linear Algebra with Computer Science Applications', 30, 20), (2824, 'Discrete Stuctures', 60, 10),(3010, 'Programming Project Workshop : Game Development', 0, 0);

Run a server on your machine for port 4000

Navigate to your bProj directory you downloaded.

run the command : node server.js

Navigate to localhost:4000 in your browser and you should see the homescreen to the website


