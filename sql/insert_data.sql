USE picd;


INSERT INTO `collaboration` (privilege)
VALUES ('read');

INSERT INTO `collaboration` (privilege)
VALUES ('write');

INSERT INTO `collaboration` (privilege)
VALUES ('admin'); 

INSERT INTO `user` (email)
VALUES 
('2bc33731776fa6f54ed7c489f621a00d'),
('b0f9d646cdf0e73731ce96d77fdf8e7b'),
('14bd6bea0e013bf8535a7809c3542a71'),
('8715e94c14f0dd96cab2175d72eaf299');

INSERT INTO `project` (owner, title, description)
VALUES
(5, 'Project 1', 'First Project'),
(5, 'Project 2', 'Second Project'),
(5, 'Project 3', 'Third Project');

INSERT INTO `stage` (project_id, name, description)
VALUES
(1, 'Design', 'Design Stage'), (1, 'Simulation', 'Simulation Stage'), (1, 'Layout', 'Layout Stage'), (1, 'Test', 'Test Stage'),
(2, 'Design', 'Design Stage'), (2, 'Simulation', 'Simulation Stage'), (2, 'Layout', 'Layout Stage'), (2, 'Test', 'Test Stage'),
(3, 'Design', 'Design Stage'), (3, 'Simulation', 'Simulation Stage'), (3, 'Layout', 'Layout Stage'), (3, 'Test', 'Test Stage');

INSERT INTO `version` (stage_id, project_id, revision, name)
VALUES
(1, 1, 1, 'init'), (2, 1, 1, 'init'), (3, 1, 1, 'init'), (4, 1, 1, 'init'),
(5, 2, 1, 'init'), (6, 2, 1, 'init'), (7, 2, 1, 'init'), (8, 2, 1, 'init'),
(9, 3, 1, 'init'), (10, 3, 1, 'init'), (11, 3, 1, 'init'), (12, 3, 1, 'init');

INSERT INTO `user_has_project` (user_id, project_id, collaboration_id)
VALUES (5, 1, 2), (5, 3, 2),
      (5, 2, 2);
(3, 1, 3), (1, 3, 2),
(3, 2, 3), (4, 3, 3),
(5, 1, 2), (5, 3, 2),
(5, 2, 2), (5, 3, 2);

INSERT INTO `user_has_project` (user_id, project_id, collaboration_id)
VALUES
(1, 1, 2), (2, 3, 2),
(1, 2, 2), (3, 3, 2);

/* 
(1, 'Jane', 'Doe', 1, 'jane@doe.com', 'user'),
(2, 'John', 'Doe', 1, 'john@doe.com', 'user'),
(3, 'John', 'Smith', 2, 'jane@smith.com', 'admin'),
(4, 'Jane', 'Smith', 2, 'john@smith.com', 'admin'); */
