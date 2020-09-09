USE picd;



-- -----------------------------------------------------
-- Table clearance
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clearance`;

CREATE TABLE IF NOT EXISTS `clearance` (
  clearance_id INT(11) NOT NULL AUTO_INCREMENT,
  clearance ENUM('user', 'admin') NOT NULL,
  PRIMARY KEY (clearance_id)
);


-- -----------------------------------------------------
-- Table clearance
-- -----------------------------------------------------
DROP TABLE IF EXISTS `collaboration`;

CREATE TABLE IF NOT EXISTS `collaboration` (
  collaboration_id INT(11) NOT NULL AUTO_INCREMENT,
  privilege ENUM('read', 'write', 'admin') NOT NULL,
  PRIMARY KEY (collaboration_id)
);

-- -----------------------------------------------------
-- Table user
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  fname CHAR(255) NOT NULL,
  lname CHAR(255) NOT NULL,
  clearance_id INT(11) NOT NULL,
  profile CHAR(255) NOT NULL DEFAULT 'default.png',
  email CHAR(255) NOT NULL,
  password CHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  deleted TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id),
  UNIQUE INDEX email (email ASC),
  INDEX fk_user_clearance1_idx (clearance_id ASC),
  CONSTRAINT fk_user_clearance
    FOREIGN KEY (clearance_id)
    REFERENCES clearance (clearance_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table project
-- -----------------------------------------------------
DROP TABLE IF EXISTS `project`;

CREATE TABLE IF NOT EXISTS `project` (
  project_id INT(11) NOT NULL AUTO_INCREMENT,
  owner INT(11) NOT NULL,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(45) NULL,
  deleted TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (project_id),
  CONSTRAINT fk_project_owner
    FOREIGN KEY (owner)
    REFERENCES user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table user_has_project
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_project`;

CREATE TABLE IF NOT EXISTS `user_has_project` (
  user_id INT(11) NOT NULL,
  project_id INT(11) NOT NULL,
  collaboration_id INT(11) NOT NULL,
  PRIMARY KEY (user_id, project_id),
  INDEX fk_users_has_projects_projects1_idx (project_id ASC),
  INDEX fk_users_has_projects_users1_idx (user_id ASC),
  CONSTRAINT fk_users_has_projects_projects
    FOREIGN KEY (project_id)
    REFERENCES project (project_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_user_has_project_users
    FOREIGN KEY (user_id)
    REFERENCES user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_user_has_project_collaborators
    FOREIGN KEY (collaboration_id)
    REFERENCES  collaboration (collaboration_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);





-- -----------------------------------------------------
-- Table stage
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stage`;

CREATE TABLE IF NOT EXISTS `stage` (
  stage_id INT NOT NULL AUTO_INCREMENT,
  project_id INT(11) NOT NULL,
  name VARCHAR(45) NULL,
  PRIMARY KEY (stage_id, project_id),
  INDEX fk_stages_project1_idx (project_id ASC),
  CONSTRAINT fk_stages_project
    FOREIGN KEY (project_id)
    REFERENCES project (project_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- -----------------------------------------------------
-- Table version
-- -----------------------------------------------------
DROP TABLE IF EXISTS `version`;

CREATE TABLE IF NOT EXISTS `version` (
  version_id INT NOT NULL AUTO_INCREMENT,
  stage_id INT NOT NULL,
  project_id INT(11) NOT NULL,
  revision INT(3) NOT NULL,
  name VARCHAR(45) NULL,
  PRIMARY KEY (version_id, stage_id, project_id),
  INDEX fk_version_stages1_idx (stage_id ASC, project_id ASC),
  CONSTRAINT fk_version_stages
    FOREIGN KEY (stage_id , project_id)
    REFERENCES stage (stage_id , project_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- -----------------------------------------------------
-- Table file
-- -----------------------------------------------------
DROP TABLE IF EXISTS `file`;

CREATE TABLE IF NOT EXISTS `file` (
  file_id INT(11) NOT NULL AUTO_INCREMENT,
  path VARCHAR(255) NOT NULL,
  original_filename VARCHAR(45) NOT NULL,
  mime VARCHAR(45) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  version_id INT NOT NULL,
  stage_id INT NOT NULL,
  project_id INT(11) NOT NULL,
  PRIMARY KEY (file_id, version_id, stage_id, project_id),
  UNIQUE INDEX path (path ASC),
  INDEX fk_file_version1_idx (version_id ASC, stage_id ASC, project_id ASC),
  CONSTRAINT fk_file_version
    FOREIGN KEY (version_id , stage_id , project_id)
    REFERENCES version (version_id , stage_id , project_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);