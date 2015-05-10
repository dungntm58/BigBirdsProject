-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2015 at 06:12 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `restaurant_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `catalog`
--

CREATE TABLE IF NOT EXISTS `catalog` (
  `ctl_id` int(10) NOT NULL AUTO_INCREMENT,
  `ctl_name` varchar(255) NOT NULL,
  `ctl_content` text NOT NULL,
  `user_id` int(10) NOT NULL,
  PRIMARY KEY (`ctl_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `catalog`
--

INSERT INTO `catalog` (`ctl_id`, `ctl_name`, `ctl_content`, `user_id`) VALUES
(1, 'drink', 'vodka', 2),
(2, 'desert', 'nothing', 2),
(3, 'aaaaaaaaa', 'sdfsdf', 2),
(4, 'fdsgdfsgsd', 'sdfgsfdg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `or_id` int(10) NOT NULL AUTO_INCREMENT,
  `or_time` time DEFAULT NULL,
  `or_list` varchar(255) NOT NULL,
  `or_amount` double NOT NULL,
  `or_table` int(10) NOT NULL,
  `or_date` date NOT NULL,
  PRIMARY KEY (`or_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`or_id`, `or_time`, `or_list`, `or_amount`, `or_table`, `or_date`) VALUES
(1, '10:10:00', 'adsfasdfasf', 12345, 1, '2015-05-11'),
(2, '20:00:00', 'ádfasf', 123123, 2, '2015-05-12');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `pro_id` int(10) NOT NULL AUTO_INCREMENT,
  `pro_name` varchar(255) NOT NULL,
  `pro_price` int(20) NOT NULL,
  `pro_image` varchar(255) NOT NULL,
  `pro_description` text NOT NULL,
  `user_id` int(10) NOT NULL,
  `ctl_id` int(10) NOT NULL,
  PRIMARY KEY (`pro_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pro_id`, `pro_name`, `pro_price`, `pro_image`, `pro_description`, `user_id`, `ctl_id`) VALUES
(1, 'aaa', 12, 'ádfdsa', 'sadfdsaf', 1, 1),
(2, 'sdfsdf', 23, 'adsfasdf', 'aasdf', 1, 2),
(3, 'ểtrt', 123, 'ểtrt', 'ẻtret', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `table`
--

CREATE TABLE IF NOT EXISTS `table` (
  `table_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `table_instant` int(4) NOT NULL,
  `table_content` varchar(255) NOT NULL,
  PRIMARY KEY (`table_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `table`
--

INSERT INTO `table` (`table_id`, `user_id`, `table_instant`, `table_content`) VALUES
(1, 2, 1, 'sadfsadf'),
(2, 2, 3, 'aa');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `user_pass` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `user_level` int(2) NOT NULL,
  `user_image` varchar(255) NOT NULL,
  `user_add` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `restaurant_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_pass`, `user_level`, `user_image`, `user_add`, `user_name`, `restaurant_name`) VALUES
(1, 'hung1@gmail.com', 'hunghung1', 1, '', '', '', ''),
(2, 'hung2@gmail.com', 'hunghung2', 2, '', 'cho lon', '', 'AAAAAAAAAAAAAA'),
(3, 'hung11', 'hung1', 2, 'khong co gi', 'xuan thuy, cau giay,ha noi', '', ''),
(4, '', '', 1, 'aaaaa', 'duong quang ham, cau giay', '', ''),
(5, '', '', 2, '123kjlk.jpg', 'le duc tho keo dai', '', ''),
(6, '', '', 2, '7987sdf.png', 'san van dong my dinh', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
