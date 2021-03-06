-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: job_search
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

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
-- Table structure for table `job_reports`
--

DROP TABLE IF EXISTS `job_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_reports` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `company` varchar(60) NOT NULL,
  `user_id` mediumint(8) NOT NULL,
  `phone_interview` tinyint(1) DEFAULT '0',
  `onsite_interview` tinyint(1) DEFAULT '0',
  `interview_questions` longtext,
  `response_date` date DEFAULT NULL,
  `date_applied` date NOT NULL,
  `offer` tinyint(1) DEFAULT NULL,
  `salary` mediumint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_reports`
--

LOCK TABLES `job_reports` WRITE;
/*!40000 ALTER TABLE `job_reports` DISABLE KEYS */;
INSERT INTO `job_reports` VALUES (17,'Netflix',1,0,0,NULL,NULL,'2019-11-06',NULL,NULL),(18,'Google',1,0,0,NULL,NULL,'2019-11-08',NULL,NULL),(19,'Uber',1,0,0,NULL,NULL,'2019-11-07',NULL,NULL),(20,'Apple',11,0,0,'What is AJAX,What is the benefit of Javascript,Create a linklist in JS',NULL,'2019-11-09',NULL,NULL),(21,'Open Listing',11,NULL,NULL,NULL,NULL,'2019-11-12',NULL,NULL);
/*!40000 ALTER TABLE `job_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_list`
--

DROP TABLE IF EXISTS `user_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_list` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_list`
--

LOCK TABLES `user_list` WRITE;
/*!40000 ALTER TABLE `user_list` DISABLE KEYS */;
INSERT INTO `user_list` VALUES (11,'elee5696','el@mail.com','$2a$10$WcGeUVCFZfs3N4WozfZN/.N0Z19Nj/Od4ZrwoZ514K.60OSMgUN4O');
/*!40000 ALTER TABLE `user_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-08  7:22:41
