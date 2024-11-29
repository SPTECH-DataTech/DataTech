CREATE DATABASE IF NOT EXISTS datatech;
USE datatech;

-- -----------------------------------------------------
--                  TABELA EMPRESA                    --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.empresa (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  nomeEmpresa VARCHAR(45) NULL,
  cnpj VARCHAR(14) NULL,
  emailRepresentante VARCHAR(45) NULL,
  PRIMARY KEY (id)
  );

-- -----------------------------------------------------
--               TABELA ESTADO MUNICIPIO              --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.estadoMunicipio (
  id INT NOT NULL AUTO_INCREMENT UNIQUE, -- INSERIR O ID DO MUNICIPIO AQUI <-
  idUf INT NOT NULL,
  estado CHAR(2) NULL,
  municipio VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--                 TABELA FASE CAFE                   --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.faseCafe (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fase VARCHAR(45) NULL,
  medida VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--                 TABELA TIPO CAFE                   --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.tipoCafe (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  nome VARCHAR(45),
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--          TABELA MEDIDA FASE CAFE POR TIPO          --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.MedidaFaseCafePorTipo (
  fkFaseCafe INT NOT NULL,
  fkTipoCafe INT NOT NULL,
  valor DECIMAL(5,2) NULL,
  PRIMARY KEY (fkFaseCafe, fkTipoCafe),
  CONSTRAINT fk_fasescafe_medidafasecafe FOREIGN KEY (fkFaseCafe) REFERENCES datatech.faseCafe (id),
  CONSTRAINT fk_tipocafe_medidafasecafe FOREIGN KEY (fkTipoCafe) REFERENCES datatech.tipoCafe (id)
);

-- -----------------------------------------------------
--                   TABELA FAZENDA                   --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.fazenda (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fkEmpresa INT NOT NULL,
  fkEstadoMunicipio INT NOT NULL,
  nome VARCHAR(45) NULL,
  fkTipoCafe INT NOT NULL,
  PRIMARY KEY (id, fkEmpresa, fkEstadoMunicipio),
  CONSTRAINT fk_empresa_fazenda FOREIGN KEY (fkEmpresa) REFERENCES datatech.empresa (id),
  CONSTRAINT fk_estado_municipio_fazenda FOREIGN KEY (fkEstadoMunicipio) REFERENCES datatech.estadoMunicipio (id),
  CONSTRAINT fk_tipo_cafe_fazenda FOREIGN KEY (fkTipoCafe) REFERENCES datatech.empresa (id)
);

-- -----------------------------------------------------
--                   TABELA CARGO                     --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.cargo (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fkFazenda INT NOT NULL,
  fazenda_fkEmpresa INT NOT NULL,
  fazenda_fkEstadoMunicipio INT NOT NULL,
  nomeCargo VARCHAR(45) NULL,
  permissaoCargos TINYINT NULL,
  permissaoFazendas TINYINT NULL,
  permissaoFuncionarios TINYINT NULL,
  PRIMARY KEY (id, fkFazenda, fazenda_fkEmpresa, fazenda_fkEstadoMunicipio),
  CONSTRAINT fk_fazenda_empresa_estado_cargo FOREIGN KEY (fkFazenda, fazenda_fkEmpresa, fazenda_fkEstadoMunicipio) 
		REFERENCES datatech.fazenda (id , fkEmpresa , fkEstadoMunicipio)
);

-- -----------------------------------------------------
--                 TABELA FUNCIONARIO                 --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.funcionario (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fkEmpresa INT NOT NULL,
  nome VARCHAR(45) NULL,
  cpf VARCHAR(14) NULL,
  email VARCHAR(45) NULL,
  senha VARCHAR(45) NULL,
  fkCargo INT NULL,
  fkFazenda INT NULL,
  fazenda_fkEmpresa INT NULL,
  fazenda_fkEstadoMunicipio INT NULL,
  PRIMARY KEY (id, fkEmpresa),
  CONSTRAINT fk_cargo_funcionario FOREIGN KEY (fkCargo) REFERENCES datatech.cargo (id),
  CONSTRAINT fk_empresa_funcionario FOREIGN KEY (fkEmpresa) REFERENCES datatech.empresa (id),
  CONSTRAINT fk_fazenda_empresa_estado_funcionario FOREIGN KEY (fkFazenda, fazenda_fkEmpresa, fazenda_fkEstadoMunicipio)
		REFERENCES datatech.fazenda (id , fkEmpresa , fkEstadoMunicipio)
);

-- -----------------------------------------------------
--                 TABELA LOG JAVA                    --
-- -----------------------------------------------------
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS datatech.logJava (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fkFazenda INT NOT NULL,
  fkEmpresa INT NOT NULL,
  fkEstadoMunicipio INT NOT NULL,
  statusLog varchar(45),
  descricao VARCHAR(200) NULL,
  dataLog DATETIME NULL,
  PRIMARY KEY (id, fkFazenda, fkEmpresa, fkEstadoMunicipio),
  CONSTRAINT fk_fazenda_empresa_estado_logjava FOREIGN KEY (fkFazenda , fkEmpresa , fkEstadoMunicipio) 
		REFERENCES datatech.fazenda (id , fkEmpresa , fkEstadoMunicipio)
);



-- -----------------------------------------------------
--             TABELA PLANTACAO FAZENDA               --
-- -----------------------------------------------------

-- CREATE DE ACORDO COM O DER, PROVAVELMENTE VAI PRECISAR DE ALTERAÇÕES....

CREATE TABLE IF NOT EXISTS datatech.plantacaoFazenda (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fkEstadoMunicipio INT NOT NULL,
  ano INT NOT NULL,
  areaPlantada DECIMAL(5,2) NULL,
  quantidadeColhida DECIMAL(5,2) NULL,
  valorTotalReais DECIMAL(5,2) NULL,
  fkFazenda INT NOT NULL, -- ---------------
  fazenda_fkEmpresa INT NOT NULL, -- ---------------
  fazenda_fkEstadoMunicipio INT NOT NULL, -- ---------------
  fkTipoCafe INT NOT NULL,
  PRIMARY KEY (id, fkEstadoMunicipio),
  CONSTRAINT fk_municipio_UX UNIQUE INDEX (fkEstadoMunicipio),
  CONSTRAINT fk_municipio_plantacaofazenda FOREIGN KEY (fkEstadoMunicipio) 
		REFERENCES datatech.estadoMunicipio (id),
  CONSTRAINT fk_tipocafe_plantacaofazenda FOREIGN KEY (fkTipoCafe)
		REFERENCES datatech.tipoCafe (id),
  CONSTRAINT fk_fazenda_empresa_estado_plantacaofazenda FOREIGN KEY (fkFazenda, fazenda_fkEmpresa, fazenda_fkEstadoMunicipio)
		REFERENCES datatech.fazenda (id, fkEmpresa, fkEstadoMunicipio)
);

-- -----------------------------------------------------
--             TABELA CLIMA MUNICIPIO DASH            --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.climaMunicipioDash (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fkMunicipio INT NOT NULL,
  dataCaptura DATETIME NOT NULL,
  temperaturaMax DECIMAL(2,2) NULL,
  temperaturaMin DECIMAL(2,2) NULL,
  umidadeMax DECIMAL(2,2) NULL,
  umidadeMin DECIMAL(2,2) NULL,
  PRIMARY KEY (id, fkMunicipio),
  CONSTRAINT municipio_data_UX UNIQUE INDEX (fkMunicipio, dataCaptura),
  CONSTRAINT fk_municipio_climamunicipiodash FOREIGN KEY (fkMunicipio) REFERENCES datatech.estadoMunicipio (id)
);

-- -----------------------------------------------------
--                   TABELA TOKEN                     --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.token (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  token VARCHAR(45) NOT NULL,
  dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT token_UX UNIQUE INDEX (token)

);

-- -----------------------------------------------------
--           TABELA HISTORICO TOKEN EMPRESA           --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.HistoricoTokenEmpresa (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fkEmpresa INT NOT NULL,
  fkToken INT NOT NULL,
  dataHistoricoToken DATETIME NULL,
  descricao VARCHAR(145) NULL,
  PRIMARY KEY (id, fkEmpresa, fkToken),
  CONSTRAINT fk_empresa_historicotoken FOREIGN KEY (fkEmpresa) REFERENCES datatech.empresa (id),
  CONSTRAINT fk_token_historicotoken FOREIGN KEY (fkToken) REFERENCES datatech.token (id)

);

-- -----------------------------------------------------
--        TABELA HISTORICO STATUS FUNCIONARIO         --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.historicoStatusFuncionario (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  fkFuncionario INT NOT NULL,
  statusFuncionario varchar(45),
  descricaoMudancaStatus VARCHAR(45) NULL,
  dataMudancaStatus DATETIME NULL,
  funcionario_fkFazenda INT NOT NULL,
  PRIMARY KEY (id, fkFuncionario),
  CONSTRAINT fk_funcionario_historicostatus FOREIGN KEY (fkFuncionario) REFERENCES datatech.funcionario (id)

);

---------- INSERTS ---------------

-- INSERT INTO datatech.empresa (nomeEmpresa, cnpj, emailRepresentante)
-- VALUES ('DataTech LTDA.', '12345678000100', 'datatech@gmail.com');
 
-- SELECT * FROM empresa;

-- INSERT INTO datatech.estadoMunicipio (idUf, idMunicipio, estado, municipio)
-- VALUES 
--     (1, 101, 'SP', 'São Paulo'),
--     (1, 102, 'SP', 'Guarulhos'),
--     (3, 103, 'MG', 'Belo Horizonte'),
--     (3, 104, 'MG', 'Extrema'),
--     (5, 105, 'RS', 'Porto Alegre');

-- SELECT * FROM estadoMunicipio;

-- INSERT INTO token (token)
-- VALUES ('1234');

-- INSERT INTO HistoricoTokenEmpresa(fkEmpresa, fkToken, data, descricao)
-- VALUES (1, 1, '2024-11-23 23:55:19', 'Token de acesso ao sistema');