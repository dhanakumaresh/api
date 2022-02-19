CREATE DATABASE IF NOT EXISTS `handymen` /*!40100 DEFAULT CHARACTER SET latin1 */;

CREATE TABLE IF NOT EXISTS `handymen`.`handyman` (
  `company` varchar(255) NOT NULL,
  `ceo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `street` char(36) NOT NULL,
  `house_number` int(11) NOT NULL,
  `city` char(36) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `web` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `distance_wish` int(11) NOT NULL,
  `lat` int(11) NOT NULL,
  `lng` int(11) NOT NULL,
  `availability` char(36) NOT NULL,
  `profession` char(36) NOT NULL,
  `comments` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1
;