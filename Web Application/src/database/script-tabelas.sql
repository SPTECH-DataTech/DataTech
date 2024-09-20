CREATE DATABASE dataTech;
USE dataTech;

CREATE TABLE empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(60),
    cnpj VARCHAR(20),
    token INT NOT NULL
);

INSERT INTO empresa (razao_social, cnpj)
VALUES ('DataTech LTDA.', '12.345.678/0001-00');

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cpf char(11) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    fk_empresa INT,
    FOREIGN KEY (fk_empresa)
        REFERENCES empresa (id)
);

SELECT * FROM empresa;
SELECT * FROM usuario; 