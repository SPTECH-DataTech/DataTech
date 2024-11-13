CREATE DATABASE IF NOT EXISTS datatech;
USE datatech;

CREATE TABLE IF NOT EXISTS empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(60),
    cnpj VARCHAR(20),
    token INT NOT NULL
);

-- INSERT INTO empresa (razao_social, cnpj, token)
-- VALUES ('DataTech LTDA.', '12.345.678/0001-00', 1234);

CREATE TABLE IF NOT EXISTS usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cpf CHAR(14) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa (id)
);

CREATE TABLE IF NOT EXISTS cargo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeCargo VARCHAR(45),
    descricaoCargo VARCHAR(45),
    nivelPermissao INT
);

CREATE TABLE IF NOT EXISTS estadosMunicipio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estado CHAR(2),
    municipio VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS tipoCafe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS fasesCafe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fase VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS medidaIdealFaseCafePorTipo (
    idFasesCafe INT,
    fkTipoCafe INT,
    medida VARCHAR(45),
    valor DECIMAL(5,2),
    PRIMARY KEY (idFasesCafe, fkTipoCafe),
    FOREIGN KEY (idFasesCafe) REFERENCES fasesCafe(id),
    FOREIGN KEY (fkTipoCafe) REFERENCES tipoCafe(id)
);

CREATE TABLE IF NOT EXISTS fazenda (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    tipoCafe VARCHAR(20),
    fkempresa INT,
    fkEstadosMunicipio INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
    FOREIGN KEY (fkEstadosMunicipio) REFERENCES estadosMunicipio(id)
);
CREATE TABLE IF NOT EXISTS funcionario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkFazenda INT,
    fkCargo INT,
    nome VARCHAR(45),
    cpf VARCHAR(11),
    email VARCHAR(45),
    senha VARCHAR(45),
    FOREIGN KEY (fkFazenda) REFERENCES fazenda(id),
    FOREIGN KEY (fkCargo) REFERENCES cargo(id)
);

CREATE TABLE IF NOT EXISTS plantacaoMunicipioDash (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkMunicipio INT,
    ano INT,
    fkTipoCafe INT,
    areaPlantada DECIMAL(5,2),
    quantidadeColhida DECIMAL(5,2),
    valorTotalReais DECIMAL(5,2),
    FOREIGN KEY (fkMunicipio) REFERENCES estadosMunicipio(id),
    FOREIGN KEY (fkTipoCafe) REFERENCES tipoCafe(id)
);

CREATE TABLE IF NOT EXISTS climaMunicipioDash (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkMunicipio INT,
    data DATE,
    temperaturaMax DECIMAL(2,2),
    temperaturaMin DECIMAL(2,2),
    umidadeMedia DECIMAL(2,2),
    FOREIGN KEY (fkMunicipio) REFERENCES estadosMunicipio(id)
);

CREATE TABLE IF NOT EXISTS logsJava (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(200),
    fkFazenda INT,
    fkEmpresa INT,
    fkEstadosMunicipio INT,
    FOREIGN KEY (fkFazenda) REFERENCES fazenda(id),
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
    FOREIGN KEY (fkEstadosMunicipio) REFERENCES estadosMunicipio(id)
);

CREATE TABLE IF NOT EXISTS recomendacaoIa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    perguntaIa VARCHAR(150),
    respostaIa VARCHAR(200),
    fkFazenda INT,
    fkEmpresa INT,
    fkEstadosMunicipio INT,
    FOREIGN KEY (fkFazenda) REFERENCES fazenda(id),
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
    FOREIGN KEY (fkEstadosMunicipio) REFERENCES estadosMunicipio(id)
);
