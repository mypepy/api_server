use new_db_01;
create table ev_users
(id int primary key auto_increment,
username varchar(255) not null unique,
password varchar(255) not null,
nickname varchar(255),
email varchar(255),
user_pic text
);
insert into ev_users(username,password)values('zs','123')
select * from ev_users
drop table ev_users
create table ev_article_cate
(id int primary key auto_increment,
name varchar(255) not null unique,
alias varchar(255) not null unique,
is_delete tinyint(1) not null default(0)
)
select * from ev_article_cate
drop table ev_article_cate
insert into ev_article_cate(name,alias) values
('历史','lishi'),
('科学','kexue')
create table ev_articles
(id int primary key auto_increment,
title varchar(255) not null,
content text not null,
cover_img varchar(255) not null,
pub_date varchar(255) not null,
state varchar(255) not null,
is_delete tinyint(1) not null default(0),
cate_id int not null,
author_id int not null
)
select * from ev_articles