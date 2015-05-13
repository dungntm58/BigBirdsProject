-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 13 Mai 2015 à 09:53
-- Version du serveur :  5.5.36
-- Version de PHP :  5.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `restaurant_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `catalog`
--

CREATE TABLE IF NOT EXISTS `catalog` (
  `ctl_id` int(10) NOT NULL AUTO_INCREMENT,
  `ctl_name` varchar(255) NOT NULL,
  `user_id` int(10) NOT NULL,
  `ctl_content` varchar(255) NOT NULL,
  PRIMARY KEY (`ctl_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `catalog`
--

INSERT INTO `catalog` (`ctl_id`, `ctl_name`, `user_id`, `ctl_content`) VALUES
(1, 'drink', 2, ''),
(2, 'desert', 2, ''),
(3, 'aaaaaaaaa', 2, ''),
(4, 'fdsgdfsgsd', 2, '');

-- --------------------------------------------------------

--
-- Structure de la table `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `or_id` int(10) NOT NULL AUTO_INCREMENT,
  `or_table` int(10) NOT NULL,
  `or_date` varchar(255) NOT NULL,
  `or_time` int(5) NOT NULL,
  PRIMARY KEY (`or_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Contenu de la table `order`
--

INSERT INTO `order` (`or_id`, `or_table`, `or_date`, `or_time`) VALUES
(1, 1, '2015-05-12', 36000),
(2, 2, '2015-05-13', 72000),
(3, 2, '2015-05-13', 10),
(4, 2, '2015-05-13', 0),
(5, 2, '2015-05-13', 0),
(6, 2, '2015-05-13', 0),
(7, 2, '2015-05-13', 0),
(8, 2, '2015-05-13', 0),
(9, 2, '2015-05-13', 36000),
(10, 2, '2015-05-13', 36000),
(11, 2, '2015-05-13', 36000),
(12, 2, '2015-05-13', 36000),
(13, 2, '2015-05-13', 36000),
(14, 2, '2015-05-13', 36000);

-- --------------------------------------------------------

--
-- Structure de la table `order_detail`
--

CREATE TABLE IF NOT EXISTS `order_detail` (
  `dishes` int(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `id_order` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_order`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `order_detail`
--

INSERT INTO `order_detail` (`dishes`, `quantity`, `id_order`) VALUES
(1, 2, 1),
(1, 2, 2),
(1, 2, 3),
(1, 2, 4),
(2, 3, 5),
(1, 2, 6),
(2, 3, 7);

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `pro_id` int(10) NOT NULL AUTO_INCREMENT,
  `pro_name` varchar(255) NOT NULL,
  `pro_price` int(20) NOT NULL,
  `pro_image` varchar(255) NOT NULL,
  `user_id` int(10) NOT NULL,
  `ctl_id` int(10) NOT NULL,
  `pro_description` varchar(255) NOT NULL,
  PRIMARY KEY (`pro_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `product`
--

INSERT INTO `product` (`pro_id`, `pro_name`, `pro_price`, `pro_image`, `user_id`, `ctl_id`, `pro_description`) VALUES
(1, 'aaa', 12, 'ádfdsa', 1, 1, ''),
(2, 'sdfsdf', 23, 'adsfasdf', 1, 2, ''),
(3, 'ểtrt', 123, 'ểtrt', 1, 2, '');

-- --------------------------------------------------------

--
-- Structure de la table `table`
--

CREATE TABLE IF NOT EXISTS `table` (
  `table_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `table_instant` int(4) NOT NULL,
  `table_content` varchar(255) NOT NULL,
  PRIMARY KEY (`table_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `table`
--

INSERT INTO `table` (`table_id`, `user_id`, `table_instant`, `table_content`) VALUES
(1, 2, 1, 'sadfsadf'),
(2, 2, 3, 'aa');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `user_pass` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `user_level` int(2) NOT NULL,
  `user_add` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `restaurant_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_pass`, `user_level`, `user_add`, `user_name`, `restaurant_name`) VALUES
(1, 'hung1@gmail.com', 'hunghung1', 1, '', '', ''),
(2, 'hung2@gmail.com', 'hunghung2', 2, 'cho lon', '', 'AAAAAAAAAAAAAAAAAA'),
(3, 'hung11', 'hung1', 2, 'xuan thuy, cau giay,ha noi', '', ''),
(4, '', '', 1, 'duong quang ham, cau giay', '', ''),
(5, '', '', 2, 'le duc tho keo dai', '', ''),
(6, '', '', 2, 'san van dong my dinh', '', ''),
(7, '', '', 0, '', '', ''),
(8, 'hungkaka1081995@gmail.com', 'hunghung', 0, '', '', ''),
(9, 'email@gmail.com', 'matkhauhay', 0, '', 'nhÃ  hÃ ng', ''),
(10, 'hungnm@gmail.com', 'hunghung', 2, 'HÃ  Ná»™i', '', 'aaaaa'),
(11, 'hungsdk@gmail.com', 'hunghung', 2, 'Hanoi', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
