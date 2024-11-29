CREATE DATABASE IF NOT EXISTS datatech;
USE datatech;

-- -----------------------------------------------------
--                  TABELA EMPRESA                    --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.empresa (
  id INT NOT NULL AUTO_INCREMENT,
  nomeEmpresa VARCHAR(45) NULL,
  cnpj VARCHAR(14) NULL,
  emailRepresentante VARCHAR(45) NULL,
  PRIMARY KEY (id)
  );

-- -----------------------------------------------------
--               TABELA ESTADO MUNICIPIO              --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.estadoMunicipio (
  id INT NOT NULL AUTO_INCREMENT,
  idUf INT NOT NULL,
  idMunicipio INT NOT NULL,
  estado VARCHAR(45) NULL,
  municipio VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--                   TABELA FAZENDA                   --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.fazenda (
  id INT NOT NULL AUTO_INCREMENT,
  fkEmpresa INT NOT NULL,
  fkEstadoMunicipio INT NOT NULL,
  nome VARCHAR(45) NULL,
  PRIMARY KEY (id, fkEmpresa, fkEstadoMunicipio),
  CONSTRAINT fk_empresa_fazenda FOREIGN KEY (fkEmpresa) REFERENCES datatech.empresa (id),
  CONSTRAINT fk_estado_municipio_fazenda FOREIGN KEY (fkEstadoMunicipio) REFERENCES datatech.estadoMunicipio (id) ON DELETE CASCADE
);

-- -----------------------------------------------------
--                   TABELA CARGO                     --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.cargo (
  id INT NOT NULL AUTO_INCREMENT,
  fkFazenda INT NOT NULL,
  Fazenda_fkEmpresa INT NULL,
  Fazenda_fkEstadoMunicipio INT NULL,
  nomeCargo VARCHAR(45) NULL,
  permissaoCargos TINYINT NULL,
  permissaoFazendas TINYINT NULL,
  permissaoFuncionarios TINYINT NULL,
  PRIMARY KEY (id, fkFazenda),
  CONSTRAINT fk_fazenda_empresa_estado_cargo FOREIGN KEY (fkFazenda) 
		REFERENCES datatech.fazenda (id) ON DELETE CASCADE
);

-- -----------------------------------------------------
--                 TABELA FUNCIONARIO                 --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.funcionario (
  id INT NOT NULL AUTO_INCREMENT,
  fkEmpresa INT NOT NULL,
  nome VARCHAR(45) NULL,
  cpf VARCHAR(14) NULL,
  email VARCHAR(45) NULL,
  senha VARCHAR(45) NULL,
  fkCargo INT NULL,
  fkFazenda INT NULL,
  Fazenda_fkEmpresa INT NULL,
  Fazenda_fkEstadoMunicipio INT NULL,
  PRIMARY KEY (id, fkEmpresa),
  CONSTRAINT id_UX UNIQUE INDEX (id),
  CONSTRAINT fk_cargo_funcionario FOREIGN KEY (fkCargo) REFERENCES datatech.cargo (id),
  CONSTRAINT fk_empresa_funcionario FOREIGN KEY (fkEmpresa) REFERENCES datatech.Empresa (id),
  CONSTRAINT fk_fazenda_empresa_estado_funcionario FOREIGN KEY (fkFazenda, Fazenda_fkEmpresa, Fazenda_fkEstadoMunicipio)
		REFERENCES datatech.fazenda (id , fkEmpresa , fkEstadoMunicipio)
);

-- -----------------------------------------------------
--                 TABELA STATUS LOG                  --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.statusLog (
  id INT NOT NULL AUTO_INCREMENT,
  nomeStatus VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--                 TABELA LOG JAVA                    --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.logJava (
  id INT NOT NULL AUTO_INCREMENT,
  fkFazenda INT NOT NULL,
  fkEmpresa INT NOT NULL,
  fkEstadoMunicipio INT NOT NULL,
  descricao VARCHAR(200) NULL,
  data DATETIME NULL,
  fkStatus INT NOT NULL,
  PRIMARY KEY (id, fkFazenda, fkEmpresa, fkEstadoMunicipio, fkStatus),
  CONSTRAINT fk_status_logjava FOREIGN KEY (fkStatus) REFERENCES datatech.StatusLog (id),
  CONSTRAINT fk_fazenda_empresa_estado_logjava FOREIGN KEY (fkFazenda , fkEmpresa , fkEstadoMunicipio) 
		REFERENCES datatech.fazenda (id , fkEmpresa , fkEstadoMunicipio)
);

-- -----------------------------------------------------
--                 TABELA TIPO CAFE                   --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.tipoCafe (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--             TABELA PLANTACAO FAZENDA               --
-- -----------------------------------------------------

-- CREATE DE ACORDO COM O DER, PROVAVELMENTE VAI PRECISAR DE ALTERAÇÕES....

CREATE TABLE IF NOT EXISTS datatech.plantacaoFazenda (
  id INT NOT NULL AUTO_INCREMENT,
  fkMunicipio INT NOT NULL,
  fkTipoCafe INT NOT NULL,
  ano INT NOT NULL,
  areaPlantada DECIMAL(5,2) NULL,
  quantidadeColhida DECIMAL(5,2) NULL,
  valorTotalReais DECIMAL(5,2) NULL,
  fkFazenda INT NOT NULL,
  Fazenda_fkEmpresa INT NOT NULL,
  Fazenda_fkEstadoMunicipio INT NOT NULL,
  PRIMARY KEY (id, fkMunicipio, fkTipoCafe),
  CONSTRAINT fk_municipio_UX UNIQUE INDEX (fkMunicipio),
  CONSTRAINT fk_tipocafe_UX UNIQUE INDEX (fkTipoCafe),
  CONSTRAINT ano_UX UNIQUE INDEX (ano),
  CONSTRAINT fk_municipio_plantacaofazenda FOREIGN KEY (fkMunicipio) 
		REFERENCES datatech.estadoMunicipio (id),
  CONSTRAINT fk_tipocafe_plantacaofazenda FOREIGN KEY (fkTipoCafe)
		REFERENCES datatech.tipoCafe (id),
  CONSTRAINT fk_fazenda_empresa_estado_plantacaofazenda FOREIGN KEY (fkFazenda, Fazenda_fkEmpresa, Fazenda_fkEstadoMunicipio)
		REFERENCES datatech.fazenda (id, fkEmpresa, fkEstadoMunicipio) ON DELETE CASCADE
);

-- -----------------------------------------------------
--             TABELA CLIMA MUNICIPIO DASH            --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.climaMunicipioDash (
  id INT NOT NULL AUTO_INCREMENT,
  fkMunicipio INT NOT NULL,
  data DATETIME NOT NULL,
  temperaturaMax DECIMAL(2,2) NULL,
  temperaturaMin DECIMAL(2,2) NULL,
  umidadeMax DECIMAL(2,2) NULL,
  umidadeMin DECIMAL(2,2) NULL,
  PRIMARY KEY (id, fkMunicipio),
  CONSTRAINT fk_municipio_UX UNIQUE INDEX (fkMunicipio),
  CONSTRAINT data_UX UNIQUE INDEX (data),
  CONSTRAINT fk_municipio_climamunicipiodash FOREIGN KEY (fkMunicipio) REFERENCES datatech.estadoMunicipio (id)
);

-- -----------------------------------------------------
--                 TABELA FASE CAFE                   --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.faseCafe (
  id INT NOT NULL AUTO_INCREMENT,
  fase VARCHAR(45) NULL,
  medida VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--                 TABELA TIPO CAFE                   --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.tipoCafe (
  id INT NOT NULL AUTO_INCREMENT,
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
--            TABELA TIPO CAFE PLANTACAO              --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.tipoCafePlantacao (
  fkFazenda INT NOT NULL,
  Fazenda_fkEmpresa INT NOT NULL,
  fkTipoCafe INT NOT NULL,
  id INT PRIMARY KEY AUTO_INCREMENT,
  CONSTRAINT fk_fazenda_empresa_tipocafeplantacao FOREIGN KEY (fkFazenda, Fazenda_fkEmpresa)
    REFERENCES datatech.fazenda (id , fkEmpresa),
  CONSTRAINT fk_tipocafe_tipocafeplantacao FOREIGN KEY (fkTipoCafe)
    REFERENCES datatech.tipoCafe (id)
);
-- -----------------------------------------------------
--                   TABELA TOKEN                     --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.token (
  id INT NOT NULL AUTO_INCREMENT,
  token VARCHAR(45) NOT NULL,
  dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT token_UX UNIQUE INDEX (token)
);

-- -----------------------------------------------------
--           TABELA HISTORICO TOKEN EMPRESA           --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.HistoricoTokenEmpresa (
  id INT NOT NULL AUTO_INCREMENT,
  fkEmpresa INT NOT NULL,
  fkToken INT NOT NULL,
  data DATETIME NULL,
  descricao VARCHAR(145) NULL,
  PRIMARY KEY (id, fkEmpresa, fkToken),
  CONSTRAINT fk_empresa_historicotoken FOREIGN KEY (fkEmpresa) REFERENCES datatech.empresa (id),
  CONSTRAINT fk_token_historicotoken FOREIGN KEY (fkToken) REFERENCES datatech.token (id)
);

-- -----------------------------------------------------
--                 TABELA PERGUNTA IA                 --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.perguntaIA (
  id INT NOT NULL AUTO_INCREMENT,
  perguntaIA VARCHAR(150) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--                 TABELA RESPOSTA IA                 --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.respostaIA (
  id INT NOT NULL,
  fkPergunta INT NOT NULL,
  respostaIA VARCHAR(200) NULL,
  PRIMARY KEY (id, fkPergunta),
  CONSTRAINT fk_pergunta_respostaIA FOREIGN KEY (fkPergunta) REFERENCES datatech.perguntaIA (id)
);

-- -----------------------------------------------------
--           TABELA PERGUNTAIA_HAS_FAZENDA            --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.perguntaIA_has_Fazenda (
  fkPerguntaIA INT NOT NULL,
  fkFazenda INT NOT NULL,
  Fazenda_fkEmpresa INT NOT NULL,
  Fazenda_fkEstadoMunicipio INT NOT NULL,
  PRIMARY KEY (fkPerguntaIA, fkFazenda, Fazenda_fkEmpresa, Fazenda_fkEstadoMunicipio),
  CONSTRAINT fk_perguntaIA_has FOREIGN KEY (fkPerguntaIA)
		REFERENCES datatech.perguntaIA (id),
  CONSTRAINT fk_fazenda_empre_estado_has FOREIGN KEY (fkFazenda, Fazenda_fkEmpresa, Fazenda_fkEstadoMunicipio)
    REFERENCES datatech.fazenda (id, fkEmpresa , fkEstadoMunicipio)
);

-- -----------------------------------------------------
--            TABELA STATUS FUNCIONARIO               --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.statusFuncionario (
  id INT NOT NULL AUTO_INCREMENT,
  nomeStatus VARCHAR(45) NULL,
  descricao VARCHAR(145) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--        TABELA HISTORICO STATUS FUNCIONARIO         --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.historicoStatusFuncionario (
  fkFuncionario INT NOT NULL,
  fkStatusFuncionario INT NOT NULL,
  Funcionario_fkFazenda INT NOT NULL,
  Funcionario_Fazenda_fkEmpresa INT NOT NULL,
  descricaoMotivoMudancaStatus VARCHAR(45) NULL,
  dataMudancaStatus DATETIME NULL,
  PRIMARY KEY (fkFuncionario, fkStatusFuncionario, Funcionario_fkFazenda, Funcionario_Fazenda_fkEmpresa),
  CONSTRAINT fk_funcionario_historicostatus FOREIGN KEY (fkFuncionario) REFERENCES datatech.Funcionario (id),
  CONSTRAINT fk_status_funcionario_historicostatus FOREIGN KEY (fkStatusFuncionario)
		REFERENCES datatech.StatusFuncionario (id)
);

-- -----------------------------------------------------
--               TABELA STATUS PERGUNTA               --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.statusPergunta (
  id INT NOT NULL AUTO_INCREMENT,
  nomeStatus VARCHAR(45) NULL,
  descricao VARCHAR(145) NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
--           TABELA HISTORICO STATUS PERGUNTA         --
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS datatech.historicoStatusPergunta (
  id INT NOT NULL AUTO_INCREMENT,
  fkStatus INT NOT NULL,
  fkPergunta INT NOT NULL,
  descricao VARCHAR(145) NULL,
  data DATETIME NULL,
  PRIMARY KEY (id, fkStatus, fkPergunta),
  CONSTRAINT fk_status_historicopergunta FOREIGN KEY (fkStatus) REFERENCES datatech.statusPergunta (id),
  CONSTRAINT fk_pergunta_historicopergunta FOREIGN KEY (fkPergunta) REFERENCES datatech.perguntaIA (id)
);


-- ---------- INSERTS ---------------

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

-- INSERT INTO tipoCafe (nome)
-- VALUES ('arabica'),
-- 		    ('robusta');

