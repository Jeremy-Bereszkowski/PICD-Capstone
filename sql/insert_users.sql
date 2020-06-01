use test;

/*  Test users */
insert into users (fname,lname,clearance,email,password)
values ('jeremy', 'beresh', 'admin', 'j.beresh@hotmail.com', 'hello');

insert into users (fname,lname,clearance,email,password)
values ('brenton', 'holloway', 'admin', 'brenton.holloway@gmail.com', 'testpass');

insert into users (fname,lname,clearance,email,password)
values ('test', 'one', 'edit', 'test@gmail.com', 'beep');

+---------+---------+----------+-----------+------------------------------+----------+
| user_id | fname   | lname    | clearance | email                        | password |
+---------+---------+----------+-----------+------------------------------+----------+
|       1 | jeremy  | beresh   | admin     | s3539822@student.rmit.edu.au | hello    |
|       2 | brenton | holloway | admin     | brenton.holloway@gmail.com   | testpass |
+---------+---------+----------+-----------+------------------------------+----------+


insert into projects (title, description, revision) values ('test1', 'test project 1', '0.0.1');
insert into projects (title, description, revision) values ('test2', 'test project 2', '0.0.2');
insert into projects (title, description, revision) values ('test3', 'test project 3', '0.0.3');

+------------+-------+---------------------+
| project_id | title | date_stamp          |
+------------+-------+---------------------+
|          1 | test  | 2020-05-02 03:35:15 |
|          2 | test1 | 2020-05-02 03:35:41 |
|          3 | test2 | 2020-05-02 03:35:45 |
+------------+-------+---------------------+