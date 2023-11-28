CREATE DATABASE mydbtask,;
USE mydbtask;
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(40) NOT NULL,
  lastName VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR (255),
  PRIMARY KEY ( id )
);

CREATE TABLE todos(
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN,
  datetime VARCHAR(40) NOT NULL,
  ownerid INT NOT NULL,
  PRIMARY KEY ( id ),
  FOREIGN KEY ( ownerid ) REFERENCES Users ( id )
);

