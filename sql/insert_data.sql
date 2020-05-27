USE picd;

INSERT INTO roles (id, role)
VALUES (1, 'user');

INSERT INTO roles (id, role)
VALUES (2, 'admin');

INSERT INTO users (fname, lname, role_id, email, password)
VALUES ('Jane', 'Doe', 1, 'user@user.com', 'user');

INSERT INTO users (fname, lname, role_id, email, password)
VALUES ('John', 'Doe', 1, 'user2@user.com', 'user');



INSERT INTO users (fname, lname, role_id, email, password)
VALUES ('John', 'Smith', 2, 'admin@admin.com', 'admin');

INSERT INTO users (fname, lname, role_id, email, password)
VALUES ('Jane', 'Smith', 2, 'admin2@admin.com', 'admin');