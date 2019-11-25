CREATE TABLE blogs
(
    id      VARCHAR(60) PRIMARY KEY,
    `token` VARCHAR(60) NOT NULL
);

CREATE TABLE posts
(
    id        INT AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `date`    VARCHAR(256) NOT NULL,
    `blog`    VARCHAR(60)  NOT NULL,
    PRIMARY KEY (id)
);