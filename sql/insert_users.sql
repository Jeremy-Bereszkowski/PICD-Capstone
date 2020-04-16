use picd_capstone_test;

/*  Test users */
insert into users (fname,lname,clearance,email,password)
values ('jeremy', 'beresh', 'admin', 'j.beresh@hotmail.com', 'hello');

insert into users (fname,lname,clearance,email,password)
values ('brenton', 'holloway', 'admin', 'brenton.holloway@gmail.com', 'testpass');

+---------+---------+----------+-----------+------------------------------+----------+
| user_id | fname   | lname    | clearance | email                        | password |
+---------+---------+----------+-----------+------------------------------+----------+
|       1 | jeremy  | beresh   | admin     | s3539822@student.rmit.edu.au | hello    |
|       2 | brenton | holloway | admin     | brenton.holloway@gmail.com   | testpass |
+---------+---------+----------+-----------+------------------------------+----------+