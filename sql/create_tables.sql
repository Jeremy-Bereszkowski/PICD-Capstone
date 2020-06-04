USE picd ;

-- -----------------------------------------------------
-- Table projects
-- -----------------------------------------------------
DROP TABLE IF EXISTS projects ;

CREATE TABLE IF NOT EXISTS projects (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(45) NULL,
  deleted TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table versions
-- -----------------------------------------------------
DROP TABLE IF EXISTS versions ;

CREATE TABLE IF NOT EXISTS versions (
  id INT NOT NULL AUTO_INCREMENT,
  project_id INT NOT NULL,
  version VARCHAR(45) NOT NULL,
  PRIMARY KEY (id,  project_id),
  CONSTRAINT fk_versions_projects
    FOREIGN KEY (project_id)
    REFERENCES projects (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION


-- -----------------------------------------------------
-- Table files
-- -----------------------------------------------------
DROP TABLE IF EXISTS files ;

CREATE TABLE IF NOT EXISTS files (
  id INT NOT NULL AUTO_INCREMENT,
  version_id INT NOT NULL,
  path VARCHAR(45) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (id, version_id),
  UNIQUE INDEX path (path ASC),
  INDEX fk_files_versions1_idx (version_id ASC),
  CONSTRAINT fk_files_versions1
    FOREIGN KEY (version_id)
    REFERENCES versions (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table roles
-- -----------------------------------------------------
DROP TABLE IF EXISTS roles ;

CREATE TABLE IF NOT EXISTS roles (
  id INT NOT NULL AUTO_INCREMENT,
  role VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX role (role ASC)
);


-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
DROP TABLE IF EXISTS users ;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  fname VARCHAR(45) NOT NULL,
  lname VARCHAR(45) NOT NULL,
  role_id INT NOT NULL,
  email VARCHAR(45) NOT NULL,
  password CHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  deleted TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE INDEX email (email ASC),
  INDEX role_id (role_id ASC),
  CONSTRAINT users_ibfk_1
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table users_has_projects
-- -----------------------------------------------------
DROP TABLE IF EXISTS users_has_projects ;

CREATE TABLE IF NOT EXISTS users_has_projects (
  users_id INT NOT NULL,
  projects_id INT NOT NULL,
  PRIMARY KEY (users_id, projects_id),
  INDEX fk_users_has_projects_projects1_idx (projects_id ASC),
  INDEX fk_users_has_projects_users1_idx (users_id ASC),
  CONSTRAINT fk_users_has_projects_projects1
    FOREIGN KEY (projects_id)
    REFERENCES projects (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_users_has_projects_users1
    FOREIGN KEY (users_id)
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);