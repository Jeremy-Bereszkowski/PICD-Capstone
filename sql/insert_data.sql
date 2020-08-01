USE picd;

INSERT INTO `clearance` (clearance_id, clearance)
VALUES (1, 'user');

INSERT INTO `clearance` (clearance_id, clearance)
VALUES (2, 'admin');

INSERT INTO `user` (user_id, fname, lname, clearance_id, email, password)
VALUES 
(1, 'Jane', 'Doe', 1, 'user@user.com', 'user'),
(2, 'John', 'Doe', 1, 'user2@user.com', 'user'),
(3, 'John', 'Smith', 2, 'admin@admin.com', 'admin'),
(4, 'Jane', 'Smith', 2, 'admin2@admin.com', 'admin');

INSERT INTO `project` (project_id, title, description)
VALUES
(1, 'Project 1', 'First Project'),
(2, 'Project 2', 'Second Project'),
(3, 'Project 3', 'Third Project');

INSERT INTO `stage` (stage_id, project_id, name)
VALUES
(1, 1, 'Design'), (2, 1, 'Simulation'), (3, 1, 'Layout'), (4, 1, 'Test'),
(5, 2, 'Design'), (6, 2, 'Simulation'), (7, 2, 'Layout'), (8, 2, 'Test'),
(9, 3, 'Design'), (10, 3, 'Simulation'), (11, 3, 'Layout'), (12, 3, 'Test');

INSERT INTO `version` (stage_id, project_id, version, description)
VALUES
(1, 1, 'init', 'init'), (2, 1, 'init', 'init'), (3, 1, 'init', 'init'), (4, 1, 'init', 'init'),
(5, 2, 'init', 'init'), (6, 2, 'init', 'init'), (7, 2, 'init', 'init'), (8, 2, 'init', 'init'),
(9, 3, 'init', 'init'), (10, 3, 'init', 'init'), (11, 3, 'init', 'init'), (12, 3, 'init', 'init');

INSERT INTO `user_has_project` (user_id, project_id)
VALUES
(1, 1), (1, 3),
(2, 2), (2, 3);