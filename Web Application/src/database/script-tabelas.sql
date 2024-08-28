CREATE DATABASE dataTech;
USE dataTech;

CREATE TABLE empresa(
id int primary key auto_increment,
razao_social varchar(60),
cnpj varchar(20),
token varchar(10 )not null default (substring(md5(rand()), 1, 10))
);

insert into empresa (razao_social, cnpj)
values ('DataTech LTDA.', '12.345.678/0001-00');

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    fk_empresa INT,
    FOREIGN KEY (fk_empresa)
        REFERENCES empresa (id)
);
