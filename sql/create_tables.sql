use test;

CREATE TABLE IF NOT EXISTS users
(
	user_id int not null AUTO_INCREMENT,
	fname varchar(25) NOT NULL,
	lname varchar(25) NOT NULL,
	clearance enum('read-only', 'edit', 'admin') not null,
	email varchar(50) NOT NULL,
	password varchar(25) NOT NULL,

	PRIMARY KEY (user_id)
);

+-----------+----------------------------------+------+-----+---------+----------------+
| Field     | Type                             | Null | Key | Default | Extra          |
+-----------+----------------------------------+------+-----+---------+----------------+
| user_id   | int(11)                          | NO   | PRI | NULL    | auto_increment |
| fname     | varchar(25)                      | NO   |     | NULL    |                |
| lname     | varchar(25)                      | NO   |     | NULL    |                |
| clearance | enum('read-only','edit','admin') | NO   |     | NULL    |                |
| email     | varchar(50)                      | NO   |     | NULL    |                |
| password  | varchar(25)                      | NO   |     | NULL    |                |
+-----------+----------------------------------+------+-----+---------+----------------+


CREATE TABLE IF NOT EXISTS projects
(
	project_id int not null AUTO_INCREMENT,
	title varchar(25) NOT NULL,
	description varchar(125),
	revision varchar(12),
	date_stamp TIMESTAMP not null,

	PRIMARY KEY (project_id)
);

+-------------+--------------+------+-----+-------------------+-----------------------------+
| Field       | Type         | Null | Key | Default           | Extra                       |
+-------------+--------------+------+-----+-------------------+-----------------------------+
| project_id  | int(11)      | NO   | PRI | NULL              | auto_increment              |
| title       | varchar(25)  | NO   |     | NULL              |                             |
| description | varchar(125) | YES  |     | NULL              |                             |
| revision    | varchar(12)  | YES  |     | NULL              |                             |
| date_stamp  | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-----------------------------+