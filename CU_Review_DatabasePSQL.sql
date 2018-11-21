#create db
create database CUReview;

# create users table
create table users(username TEXT, password TEXT, major TEXT, Gender TEXT);

#create classes table
create table classes(classnumber INT, classname TEXT, classdetails TEXT, classrating REAL);

#create Comments table
create table comments( classnumber INT, username TEXT, massage TEXT, upvotes INT,  downvotes INT);	

#Mock users 
insert into users(username, password, major, Gender) values ('Block-k', '12345', 'CS', 'Male'), ('WitWoman', 'wordpass', 'CS', 'Female'), ('Gigatior', 'Buffs123', 'CS', 'Male');

#Classes 
insert into classes(classnumber, classname, classdetails, classrating) values (1300, 'Computer Science 1: Starting Computing', 'Entry level course in c++', 3.5), (2270, 'Computer Science 2: Data Structures', 'Explores vary code Structures taught in c++', 4.3), (2400, 'Computer Systems', 'Covering low level code and softwares interaction with physical processes.', 2.5);

#Comments
insert into comments(classnumber, username, massage, upvotes, downvotes) values (2400, 'Block-k' , 'Super hard, test will make you cry. Good luck!', 7 , 2), (1300, 'WitWoman', 'I loved c++, class is fun and exciting.', 5, 0) ;