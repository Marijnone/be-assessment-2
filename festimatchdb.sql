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
-- Table structure for table `festivals`
--

DROP TABLE IF EXISTS `festivals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `festivals` (
  `festival` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `festivals`
--

LOCK TABLES `festivals` WRITE;
/*!40000 ALTER TABLE `festivals` DISABLE KEYS */;
INSERT INTO `festivals` VALUES (NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),(NULL,NULL),('Awakenings Festival','test@gmail.com'),('Solar Weekender','test@gmail.com'),('Open Air','test@gmail.com'),('Awakenings Festival','test@gmail.com'),('Defcon','test@gmail.com'),('Open Air','test@gmail.com'),('Awakenings Festival','test@gmail.com'),('Defcon','test@gmail.com');
/*!40000 ALTER TABLE `festivals` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gebruiker`
--

LOCK TABLES `gebruiker` WRITE;
/*!40000 ALTER TABLE `gebruiker` DISABLE KEYS */;
INSERT INTO `gebruiker` VALUES (16,'Kasper','Marijn-m@hotmail.com','$argon2i$v=19$m=4096,t=3,p=1$AQqNt6xoRxZTh7I4eGwuBw$6GecLOXD6s1dcUm6BHwPYA0qGGH1u9ZeTn4M8DbyqO4','man','dancer','vrouw','Lente Kabinet'),(17,'Martijn','martijn@hotmail.com','$argon2i$v=19$m=4096,t=3,p=1$gpiP7K+IHf9s8s+A/Mnmcw$5l0m2xPqkacWtBJIPF3UKSvPboj/xhDw0i4BN6Zy75g','man','dancer','man','Open Air'),(18,'Marijn','marijn-m@hotmail.com','$argon2i$v=19$m=4096,t=3,p=1$YDU4nXmeE8A/SV3kdIrMmw$nRY8nMCDwrC9/b9TCrp2IJstOT+MASW8GV6xZZaYwjE','man ♂️','dancer','vrouw','Awakenings Festival');
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

-- Dump completed on 2018-04-07 13:37:28
