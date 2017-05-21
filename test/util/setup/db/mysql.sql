create database email_scraper_1;
use email_scraper_1;
create table billing ( hash VARCHAR(128), date VARCHAR(128), billing DECIMAL(7,2), PRIMARY KEY (hash) );
create table last_email_read ( email_message_index INT );
CREATE USER 'foo'@'localhost' IDENTIFIED BY 'bar';
GRANT ALL PRIVILEGES ON email_scraper_1.* TO 'foo'@'localhost';
