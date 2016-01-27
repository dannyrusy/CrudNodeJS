-- --------------------------------------------------------
-- Host:                         localhost
-- Versione server:              5.7.10-log - MySQL Community Server (GPL)
-- S.O. server:                  Win64
-- HeidiSQL Versione:            9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dump della struttura del database crud_test
CREATE DATABASE IF NOT EXISTS `crud_test` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `crud_test`;


-- Dump della struttura di tabella crud_test.indirizzi
CREATE TABLE IF NOT EXISTS `indirizzi` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(255) DEFAULT NULL,
  `COGNOME` varchar(255) DEFAULT NULL,
  `GEO` geometry NOT NULL,
  PRIMARY KEY (`ID`),
  SPATIAL KEY `GEO` (`GEO`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella crud_test.indirizzi: ~3 rows (circa)
/*!40000 ALTER TABLE `indirizzi` DISABLE KEYS */;
REPLACE INTO `indirizzi` (`ID`, `NOME`, `COGNOME`, `GEO`) VALUES
	(9, 'DANNY', 'RUSY', _binary 0x0000000001010000009A99999999992640CDCCCCCCCC0C4640),
	(10, 'DANIELE', 'PERUZZI', _binary 0x0000000001010000009A99999999992840CDCCCCCCCC0C4540),
	(11, 'ANNA', 'BENEDETTI', _binary 0x0000000001010000003333333333332840CDCCCCCCCC8C4540);
/*!40000 ALTER TABLE `indirizzi` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
