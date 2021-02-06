USE demo;

CREATE TABLE IF NOT EXISTS log
(
    id      int           NOT NULL AUTO_INCREMENT,
    created datetime      NOT NULL,
    user_id varchar(100)  NOT NULL,
    action  varchar(30)   NOT NULL,
    url     varchar(1000) NOT NULL,
    PRIMARY KEY (id),
    KEY `log_created_IDX` (created) USING BTREE,
    KEY `log_user_id_IDX` (user_id) USING BTREE
);

CREATE TABLE IF NOT EXISTS payload
(
    id      int          NOT NULL AUTO_INCREMENT,
    log_id  int          NOT NULL,
    item_id varchar(100) NOT NULL,
    amount  int DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY `payload_UN` (log_id),
    KEY `payload_log_id_IDX` (log_id) USING BTREE,
    CONSTRAINT `payload_FK` FOREIGN KEY (log_id) REFERENCES `log` (id)
);
