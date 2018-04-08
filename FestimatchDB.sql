-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: Festimatch
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gebruiker`
--

DROP TABLE IF EXISTS `gebruiker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gebruiker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8,
  `email` text CHARACTER SET utf8,
  `hash` text CHARACTER SET utf8,
  `geslacht` text CHARACTER SET utf8,
  `voorkeur1` text CHARACTER SET utf8,
  `opzoeknaar` text CHARACTER SET utf8,
  `festival` varchar(45) DEFAULT NULL,
  `profileimage` varchar(50) DEFAULT NULL,
  `gebruikercol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gebruiker`
--

LOCK TABLES `gebruiker` WRITE;
/*!40000 ALTER TABLE `gebruiker` DISABLE KEYS */;
INSERT INTO `gebruiker` VALUES (49,'Marijn','marijn-m@hotmail.com','$argon2i$v=19$m=4096,t=3,p=1$UMfgt4OfYdvtA3jGrk43cQ$5aITXsriFow4kHXpSlGptk16QOZIwFvYfsJYPrP+VsE','man','dancer','vrouw','Lente Kabinet',NULL,NULL),(51,'Steven','steven@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$xmWcJOc4ZUJYwDByvqPN7A$OB68AFtiJOUqx/999fZ/tfU3p3RFMUMew+HOBF662t0','man','zitter','vrouw','Lente Kabinet',NULL,NULL),(52,'Emma','emma@hotmail.com','$argon2i$v=19$m=4096,t=3,p=1$3T5MoQhzJIkj8BPR2uQOuw$R/RQk0UNlX/OwDzpplVU3T25c0v1btZi3Etew0Z424s','vrouw','dancer','festivalmaatje','Solar Weekender',NULL,NULL),(54,'Amber','amber@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$927PCXA5rWMNW/m3XJ3aqA$tc97nOy3JFvmUi/DWUBa5907optiHLay79zQhSB04UA','vrouw','dancer','festivalmaatje','Open Air',NULL,NULL),(55,'Roos','roos@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$ALD85rWzxJYS77hAzcrfUQ$jTChI8CC0HS6m1CM6gyTVjicJwREDKh+VOZNab33sbo','vrouw','zitter','man','We Are Electric',NULL,NULL);
/*!40000 ALTER TABLE `gebruiker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-08 20:58:18
