-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3309
-- Tempo de geração: 24-Jun-2020 às 02:22
-- Versão do servidor: 10.4.10-MariaDB
-- versão do PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `trabalho`
--
CREATE DATABASE IF NOT EXISTS `trabalho` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `trabalho`;

DELIMITER $$
--
-- Procedimentos
--
DROP PROCEDURE IF EXISTS `SP_BUSCAR_FUNCIONARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BUSCAR_FUNCIONARIO` (IN `p_cpf` VARCHAR(14), IN `p_senha` VARCHAR(20))  BEGIN
	SELECT nome, cpf, senha
    FROM funcionario
    WHERE cpf = p_cpf AND
		  senha = MD5(p_senha);
END$$

DROP PROCEDURE IF EXISTS `SP_CRIAR_CLIENTE`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CRIAR_CLIENTE` (IN `p_nome` VARCHAR(60), IN `p_dataNasc` DATE, IN `p_sexo` ENUM('M','F'), IN `p_telefone` VARCHAR(14), IN `p_cpf` VARCHAR(14))  BEGIN
	INSERT INTO cliente
    (nome, dataNasc, sexo, telefone, cpf)
    VALUES
	(p_nome, p_dataNasc, p_sexo, p_telefone, p_cpf);
END$$

DROP PROCEDURE IF EXISTS `SP_CRIAR_FUNCIONARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CRIAR_FUNCIONARIO` (IN `p_nome` VARCHAR(60), IN `p_dataNasc` DATE, IN `p_sexo` ENUM('M','F'), IN `p_telefone` VARCHAR(14), IN `p_cpf` VARCHAR(14), IN `p_senha` VARCHAR(20))  BEGIN
	INSERT INTO funcionario
    (nome, dataNasc, sexo, telefone, cpf, senha)
    VALUES
	(p_nome, p_dataNasc, p_sexo, p_telefone, p_cpf, MD5(p_senha));
END$$

DROP PROCEDURE IF EXISTS `SP_CRIAR_PRODUTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CRIAR_PRODUTO` (IN `p_nome` VARCHAR(50), IN `p_estoque` SMALLINT, IN `p_precoUnitario` DECIMAL(8,2))  BEGIN

	INSERT INTO produto
    (nome, estoque, precoUnitario)
    VALUES
	(p_nome, p_estoque, p_precoUnitario);
    
END$$

DROP PROCEDURE IF EXISTS `SP_CRIAR_VENDA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CRIAR_VENDA` (IN `p_cpfCliente` VARCHAR(14), IN `p_idProduto` SMALLINT, IN `p_precoUnitario` DECIMAL(8,2), IN `p_quantidade` SMALLINT)  BEGIN

	INSERT INTO venda
    (dataVenda, cpfCliente, idProduto, precoUnitario, quantidade)
    VALUES
	(NOW(), p_cpfCliente, p_idProduto, p_precoUnitario, p_quantidade);
    
END$$

DROP PROCEDURE IF EXISTS `SP_DELETAR_CLIENTE`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DELETAR_CLIENTE` (IN `p_cpf` VARCHAR(14))  BEGIN

	DELETE FROM cliente
    WHERE cpf = p_cpf;
    
END$$

DROP PROCEDURE IF EXISTS `SP_DELETAR_PRODUTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DELETAR_PRODUTO` (IN `p_id` SMALLINT)  BEGIN

	DELETE FROM produto
    WHERE id = p_id;
    
END$$

DROP PROCEDURE IF EXISTS `SP_DELETAR_VENDA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DELETAR_VENDA` (IN `p_id` SMALLINT)  BEGIN

	DELETE FROM venda
	WHERE id = p_id;
    
END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_CLIENTE`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_CLIENTE` (IN `p_nome` VARCHAR(60), IN `p_dataNasc` DATE, IN `p_sexo` ENUM('M','F'), IN `p_telefone` VARCHAR(14), IN `p_cpf` VARCHAR(14))  BEGIN

	UPDATE cliente
    SET nome = p_nome,
		dataNasc = p_dataNasc,
        sexo = p_sexo,
        telefone = p_telefone
	WHERE cpf = p_cpf;
    
END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_PRODUTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_PRODUTO` (IN `p_nome` VARCHAR(50), IN `p_estoque` SMALLINT, IN `p_precoUnitario` DECIMAL(8,2), IN `p_id` SMALLINT)  BEGIN

	UPDATE produto
    SET nome = p_nome,
		estoque = p_estoque,
        precoUnitario = p_precoUnitario
	WHERE id = p_id;
    
END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_VENDA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_VENDA` (IN `p_cpfCliente` VARCHAR(14), IN `p_id` SMALLINT)  BEGIN

	UPDATE venda
    SET cpfCliente = p_cpfCliente
	WHERE id = p_id;
    
END$$

DROP PROCEDURE IF EXISTS `SP_PESQUISAR_REGISTRO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PESQUISAR_REGISTRO` (IN `p_caractere` VARCHAR(60), IN `p_tipo` TINYINT)  BEGIN

	IF p_tipo = 1 THEN
		SELECT nome,
			   date_format(dataNasc, '%d/%m/%Y') AS 'dataNasc',
               sexo,
               telefone,
               cpf
        FROM cliente 
		WHERE nome LIKE CONCAT(p_caractere, '%')
        ORDER BY nome ASC;
	ELSEIF p_tipo = 2 THEN
		SELECT id,
			   nome,
               estoque,
               FORMAT(precoUnitario, 2, 'de_DE') AS 'preco'
        FROM produto
        WHERE nome LIKE CONCAT(p_caractere, '%');
	ELSEIF p_tipo = 3 THEN
		SELECT id,
			   date_format(dataVenda, '%d/%m/%Y %H:%i:%s') AS 'dataHora',
               cpfCliente,
               idProduto,
			   FORMAT(precoUnitario, 2, 'de_DE') AS 'precoUnitario',
               quantidade,
               FORMAT(valorTotal, 2, 'de_DE') AS 'valorTotal'
		FROM venda
        WHERE cpfCliente LIKE CONCAT(p_caractere, '%');
    END IF;
    
END$$

DROP PROCEDURE IF EXISTS `SP_PRODUTO_MAIS_VENDIDO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PRODUTO_MAIS_VENDIDO` ()  BEGIN

	DECLARE p_idProduto, p_qtdVendida SMALLINT;
	
	SELECT idProduto,
		   SUM(quantidade) AS qtd
	INTO   p_idProduto,
           p_qtdVendida
	FROM venda
	GROUP BY idProduto
	ORDER BY qtd DESC
	LIMIT 1;
    
    SELECT id,
		   nome,
		   p_qtdVendida AS qtdVendida,
		   format(precoUnitario, 2, 'de_DE') AS preco
    FROM produto
    WHERE id = p_idProduto; 
    
END$$

--
-- Funções
--
DROP FUNCTION IF EXISTS `F_MELHOR_CLIENTE`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `F_MELHOR_CLIENTE` (`p_opcao` TINYINT) RETURNS VARCHAR(14) CHARSET utf8 BEGIN
 
	DECLARE cpf VARCHAR(14);
    DECLARE maior DECIMAL(8, 2);
    
	IF p_opcao = 1 THEN
		SELECT SUM(valorTotal) AS m,
			   cpfCliente INTO maior, cpf 
		FROM venda
		GROUP BY cpfCliente
		ORDER BY m DESC
		LIMIT 1;
    ELSEIF p_opcao = 2 THEN
		SELECT SUM(valorTotal) AS m,
			   cpfCliente INTO maior, cpf 
		FROM venda
		WHERE dataVenda LIKE DATE_FORMAT(CURDATE(), '%Y-%m-%')
		GROUP BY cpfCliente
		ORDER BY m DESC
		LIMIT 1;
    END IF;
    
    RETURN cpf;
    
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `nome` varchar(60) NOT NULL,
  `dataNasc` date NOT NULL,
  `sexo` enum('M','F') DEFAULT NULL,
  `telefone` varchar(14) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  PRIMARY KEY (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `cliente`
--

INSERT INTO `cliente` (`nome`, `dataNasc`, `sexo`, `telefone`, `cpf`) VALUES
('Henry Edson Novaes', '1998-11-11', 'M', '(21) 2727-2759', '389.076.625-09'),
('Tiago Raimundo', '1997-12-09', 'M', '(47) 2524-0190', '728.900.475-20'),
('Antonella Luiza Alves', '1999-08-12', 'F', '(37) 3732-1103', '969.795.607-35');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
CREATE TABLE IF NOT EXISTS `funcionario` (
  `nome` varchar(60) NOT NULL,
  `dataNasc` date NOT NULL,
  `sexo` enum('M','F') DEFAULT NULL,
  `telefone` varchar(14) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `senha` varchar(50) NOT NULL,
  PRIMARY KEY (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `funcionario`
--

INSERT INTO `funcionario` (`nome`, `dataNasc`, `sexo`, `telefone`, `cpf`, `senha`) VALUES
('LUANA SANDRA CARVALHO', '1999-01-03', 'F', '(22) 2222-2222', '322.930.675-99', '827ccb0eea8a706c4c34a16891f84e7b'),
('DANILO MIRANDA FERREIRA', '2000-09-03', 'M', '(61) 1111-1111', '757.830.690-19', '827ccb0eea8a706c4c34a16891f84e7b');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

DROP TABLE IF EXISTS `produto`;
CREATE TABLE IF NOT EXISTS `produto` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `estoque` smallint(6) NOT NULL,
  `precoUnitario` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`id`, `nome`, `estoque`, `precoUnitario`) VALUES
(1, 'Computador', 15, '5500.00'),
(2, 'Notebook', 2, '5500.00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `venda`
--

DROP TABLE IF EXISTS `venda`;
CREATE TABLE IF NOT EXISTS `venda` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `dataVenda` datetime NOT NULL,
  `cpfCliente` varchar(14) DEFAULT NULL,
  `idProduto` smallint(6) DEFAULT NULL,
  `precoUnitario` decimal(8,2) NOT NULL,
  `quantidade` smallint(6) NOT NULL,
  `valorTotal` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cpfCliente` (`cpfCliente`),
  KEY `idProduto` (`idProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `venda`
--

INSERT INTO `venda` (`id`, `dataVenda`, `cpfCliente`, `idProduto`, `precoUnitario`, `quantidade`, `valorTotal`) VALUES
(1, '2020-05-18 19:33:35', '969.795.607-35', 1, '5000.00', 1, '5000.00'),
(2, '2020-05-18 19:33:47', '969.795.607-35', 2, '5500.00', 1, '5500.00'),
(3, '2020-05-18 19:34:15', '389.076.625-09', 1, '5000.00', 1, '5000.00'),
(4, '2020-05-19 20:40:58', '728.900.475-20', 2, '5500.00', 2, '11000.00'),
(8, '2020-06-01 10:03:00', '728.900.475-20', 1, '5000.00', 2, '10000.00'),
(11, '2020-06-21 12:49:44', '389.076.625-09', 1, '5500.00', 1, '5500.00');

--
-- Acionadores `venda`
--
DROP TRIGGER IF EXISTS `TRG_CALC_TOTAL`;
DELIMITER $$
CREATE TRIGGER `TRG_CALC_TOTAL` BEFORE INSERT ON `venda` FOR EACH ROW SET NEW.valorTotal = NEW.quantidade * NEW.precoUnitario
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `TRG_DEDUZ_ESTOQUE`;
DELIMITER $$
CREATE TRIGGER `TRG_DEDUZ_ESTOQUE` AFTER INSERT ON `venda` FOR EACH ROW UPDATE produto SET estoque = estoque - NEW.quantidade
WHERE id = NEW.idProduto
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `TRG_ESTORNO`;
DELIMITER $$
CREATE TRIGGER `TRG_ESTORNO` AFTER DELETE ON `venda` FOR EACH ROW UPDATE produto SET estoque = estoque + OLD.quantidade
WHERE id = OLD.idProduto
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_listar_clientes`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_listar_clientes`;
CREATE TABLE IF NOT EXISTS `vw_listar_clientes` (
`nome` varchar(60)
,`dataNasc` varchar(10)
,`sexo` enum('M','F')
,`telefone` varchar(14)
,`cpf` varchar(14)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_listar_produtos`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_listar_produtos`;
CREATE TABLE IF NOT EXISTS `vw_listar_produtos` (
`id` smallint(6)
,`nome` varchar(50)
,`estoque` smallint(6)
,`preco` varchar(12)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_listar_vendas`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_listar_vendas`;
CREATE TABLE IF NOT EXISTS `vw_listar_vendas` (
`id` smallint(6)
,`dataHora` varchar(24)
,`cpfCliente` varchar(14)
,`idProduto` smallint(6)
,`precoUnitario` varchar(12)
,`quantidade` smallint(6)
,`valorTotal` varchar(12)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_maior_estoque`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_maior_estoque`;
CREATE TABLE IF NOT EXISTS `vw_maior_estoque` (
`id` smallint(6)
,`nome` varchar(50)
,`estoque` smallint(6)
,`preco` varchar(12)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_maior_venda`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_maior_venda`;
CREATE TABLE IF NOT EXISTS `vw_maior_venda` (
`id` smallint(6)
,`dataHora` varchar(24)
,`valorTotal` varchar(12)
,`cliente` varchar(60)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_maior_venda_mes`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_maior_venda_mes`;
CREATE TABLE IF NOT EXISTS `vw_maior_venda_mes` (
`id` smallint(6)
,`dataHora` varchar(24)
,`valorTotal` varchar(12)
,`cliente` varchar(60)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_melhor_cliente`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_melhor_cliente`;
CREATE TABLE IF NOT EXISTS `vw_melhor_cliente` (
`nome` varchar(60)
,`telefone` varchar(14)
,`cpfCliente` varchar(14)
,`totalGasto` varchar(41)
,`qtdCompras` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_melhor_cliente_mes`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_melhor_cliente_mes`;
CREATE TABLE IF NOT EXISTS `vw_melhor_cliente_mes` (
`nome` varchar(60)
,`telefone` varchar(14)
,`cpfCliente` varchar(14)
,`totalGasto` varchar(41)
,`qtdCompras` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_menor_estoque`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_menor_estoque`;
CREATE TABLE IF NOT EXISTS `vw_menor_estoque` (
`id` smallint(6)
,`nome` varchar(50)
,`estoque` smallint(6)
,`preco` varchar(12)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_qtd_clientes`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_qtd_clientes`;
CREATE TABLE IF NOT EXISTS `vw_qtd_clientes` (
`qtdClientes` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_qtd_clientes_fem`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_qtd_clientes_fem`;
CREATE TABLE IF NOT EXISTS `vw_qtd_clientes_fem` (
`qtdClientesMulheres` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_qtd_clientes_masc`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_qtd_clientes_masc`;
CREATE TABLE IF NOT EXISTS `vw_qtd_clientes_masc` (
`qtdClientesHomens` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_qtd_produtos`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_qtd_produtos`;
CREATE TABLE IF NOT EXISTS `vw_qtd_produtos` (
`qtd` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_total_vendas`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_total_vendas`;
CREATE TABLE IF NOT EXISTS `vw_total_vendas` (
`valorTotal` varchar(41)
,`qtd` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_total_vendas_mes`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_total_vendas_mes`;
CREATE TABLE IF NOT EXISTS `vw_total_vendas_mes` (
`vendasMes` varchar(41)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_ultima_venda`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_ultima_venda`;
CREATE TABLE IF NOT EXISTS `vw_ultima_venda` (
`id` smallint(6)
,`dataHora` varchar(24)
,`valorTotal` varchar(12)
,`cliente` varchar(60)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vw_ultimo_produto`
-- (Veja abaixo para a view atual)
--
DROP VIEW IF EXISTS `vw_ultimo_produto`;
CREATE TABLE IF NOT EXISTS `vw_ultimo_produto` (
`id` smallint(6)
,`nome` varchar(50)
,`estoque` smallint(6)
,`preco` varchar(12)
);

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_listar_clientes`
--
DROP TABLE IF EXISTS `vw_listar_clientes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_listar_clientes`  AS  select `cliente`.`nome` AS `nome`,date_format(`cliente`.`dataNasc`,'%d/%m/%Y') AS `dataNasc`,`cliente`.`sexo` AS `sexo`,`cliente`.`telefone` AS `telefone`,`cliente`.`cpf` AS `cpf` from `cliente` order by `cliente`.`nome` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_listar_produtos`
--
DROP TABLE IF EXISTS `vw_listar_produtos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_listar_produtos`  AS  select `produto`.`id` AS `id`,`produto`.`nome` AS `nome`,`produto`.`estoque` AS `estoque`,format(`produto`.`precoUnitario`,2,'de_DE') AS `preco` from `produto` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_listar_vendas`
--
DROP TABLE IF EXISTS `vw_listar_vendas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_listar_vendas`  AS  select `venda`.`id` AS `id`,date_format(`venda`.`dataVenda`,'%d/%m/%Y %H:%i:%s') AS `dataHora`,`venda`.`cpfCliente` AS `cpfCliente`,`venda`.`idProduto` AS `idProduto`,format(`venda`.`precoUnitario`,2,'de_DE') AS `precoUnitario`,`venda`.`quantidade` AS `quantidade`,format(`venda`.`valorTotal`,2,'de_DE') AS `valorTotal` from `venda` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_maior_estoque`
--
DROP TABLE IF EXISTS `vw_maior_estoque`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_maior_estoque`  AS  select `produto`.`id` AS `id`,`produto`.`nome` AS `nome`,`produto`.`estoque` AS `estoque`,format(`produto`.`precoUnitario`,2,'de_DE') AS `preco` from `produto` where `produto`.`estoque` = (select max(`produto`.`estoque`) from `produto`) limit 1 ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_maior_venda`
--
DROP TABLE IF EXISTS `vw_maior_venda`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_maior_venda`  AS  select `v`.`id` AS `id`,date_format(`v`.`dataVenda`,'%d/%m/%Y %H:%i:%s') AS `dataHora`,format(`v`.`valorTotal`,2,'de_DE') AS `valorTotal`,`c`.`nome` AS `cliente` from (`venda` `v` join `cliente` `c`) where `v`.`valorTotal` = (select max(`venda`.`valorTotal`) from `venda`) and `v`.`cpfCliente` = `c`.`cpf` limit 1 ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_maior_venda_mes`
--
DROP TABLE IF EXISTS `vw_maior_venda_mes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_maior_venda_mes`  AS  select `v`.`id` AS `id`,date_format(`v`.`dataVenda`,'%d/%m/%Y %H:%i:%s') AS `dataHora`,format(`v`.`valorTotal`,2,'de_DE') AS `valorTotal`,`c`.`nome` AS `cliente` from (`venda` `v` join `cliente` `c`) where `v`.`valorTotal` = (select max(`venda`.`valorTotal`) from `venda` where `venda`.`dataVenda` like date_format(curdate(),'%Y-%m-%')) and `v`.`cpfCliente` = `c`.`cpf` limit 1 ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_melhor_cliente`
--
DROP TABLE IF EXISTS `vw_melhor_cliente`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_melhor_cliente`  AS  select `c`.`nome` AS `nome`,`c`.`telefone` AS `telefone`,`v`.`cpfCliente` AS `cpfCliente`,format(sum(`v`.`valorTotal`),2,'de_DE') AS `totalGasto`,count(0) AS `qtdCompras` from (`cliente` `c` join `venda` `v`) where `c`.`cpf` = `v`.`cpfCliente` and `v`.`cpfCliente` = `F_MELHOR_CLIENTE`(1) group by `v`.`cpfCliente` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_melhor_cliente_mes`
--
DROP TABLE IF EXISTS `vw_melhor_cliente_mes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_melhor_cliente_mes`  AS  select `c`.`nome` AS `nome`,`c`.`telefone` AS `telefone`,`v`.`cpfCliente` AS `cpfCliente`,format(sum(`v`.`valorTotal`),2,'de_DE') AS `totalGasto`,count(0) AS `qtdCompras` from (`cliente` `c` join `venda` `v`) where `c`.`cpf` = `v`.`cpfCliente` and `v`.`dataVenda` like date_format(curdate(),'%Y-%m-%') and `v`.`cpfCliente` = `F_MELHOR_CLIENTE`(2) group by `v`.`cpfCliente` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_menor_estoque`
--
DROP TABLE IF EXISTS `vw_menor_estoque`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_menor_estoque`  AS  select `produto`.`id` AS `id`,`produto`.`nome` AS `nome`,`produto`.`estoque` AS `estoque`,format(`produto`.`precoUnitario`,2,'de_DE') AS `preco` from `produto` where `produto`.`estoque` = (select min(`produto`.`estoque`) from `produto`) limit 1 ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_qtd_clientes`
--
DROP TABLE IF EXISTS `vw_qtd_clientes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_qtd_clientes`  AS  select count(0) AS `qtdClientes` from `cliente` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_qtd_clientes_fem`
--
DROP TABLE IF EXISTS `vw_qtd_clientes_fem`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_qtd_clientes_fem`  AS  select count(0) AS `qtdClientesMulheres` from `cliente` where `cliente`.`sexo` = 'F' ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_qtd_clientes_masc`
--
DROP TABLE IF EXISTS `vw_qtd_clientes_masc`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_qtd_clientes_masc`  AS  select count(0) AS `qtdClientesHomens` from `cliente` where `cliente`.`sexo` = 'M' ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_qtd_produtos`
--
DROP TABLE IF EXISTS `vw_qtd_produtos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_qtd_produtos`  AS  select count(0) AS `qtd` from `produto` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_total_vendas`
--
DROP TABLE IF EXISTS `vw_total_vendas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_total_vendas`  AS  select format(sum(`venda`.`valorTotal`),2,'de_DE') AS `valorTotal`,count(0) AS `qtd` from `venda` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_total_vendas_mes`
--
DROP TABLE IF EXISTS `vw_total_vendas_mes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_total_vendas_mes`  AS  select format(sum(`venda`.`valorTotal`),2,'de_DE') AS `vendasMes` from `venda` where `venda`.`dataVenda` like date_format(curdate(),'%Y-%m-%') ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_ultima_venda`
--
DROP TABLE IF EXISTS `vw_ultima_venda`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_ultima_venda`  AS  select `v`.`id` AS `id`,date_format(`v`.`dataVenda`,'%d/%m/%Y %H:%i:%s') AS `dataHora`,format(`v`.`valorTotal`,2,'de_DE') AS `valorTotal`,`c`.`nome` AS `cliente` from (`venda` `v` join `cliente` `c`) where `v`.`cpfCliente` = `c`.`cpf` and `v`.`id` = (select max(`venda`.`id`) from `venda`) ;

-- --------------------------------------------------------

--
-- Estrutura para vista `vw_ultimo_produto`
--
DROP TABLE IF EXISTS `vw_ultimo_produto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_ultimo_produto`  AS  select `produto`.`id` AS `id`,`produto`.`nome` AS `nome`,`produto`.`estoque` AS `estoque`,format(`produto`.`precoUnitario`,2,'de_DE') AS `preco` from `produto` where `produto`.`id` = (select max(`produto`.`id`) from `produto`) limit 1 ;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `venda`
--
ALTER TABLE `venda`
  ADD CONSTRAINT `venda_ibfk_1` FOREIGN KEY (`cpfCliente`) REFERENCES `cliente` (`cpf`),
  ADD CONSTRAINT `venda_ibfk_2` FOREIGN KEY (`idProduto`) REFERENCES `produto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
