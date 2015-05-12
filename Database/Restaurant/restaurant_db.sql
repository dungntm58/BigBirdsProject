-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2015 at 05:53 AM
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
  `user_id` int(10) NOT NULL,
  `ctl_content` varchar(255) NOT NULL,
  PRIMARY KEY (`ctl_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `catalog`
--

INSERT INTO `catalog` (`ctl_id`, `ctl_name`, `user_id`, `ctl_content`) VALUES
(1, 'drink', 2, ''),
(2, 'desert', 2, ''),
(3, 'aaaaaaaaa', 2, ''),
(4, 'fdsgdfsgsd', 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `or_id` int(10) NOT NULL AUTO_INCREMENT,
  `or_list` varchar(255) NOT NULL,
  `or_amount` double NOT NULL,
  `or_table` int(10) NOT NULL,
  `or_date` varchar(255) NOT NULL,
  `or_time` int(5) NOT NULL,
  PRIMARY KEY (`or_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`or_id`, `or_list`, `or_amount`, `or_table`, `or_date`, `or_time`) VALUES
(1, 'adsfasdfasf', 12345, 1, '2015-05-12', 36000),
(2, 'ádfasf', 123123, 2, '2015-05-13', 72000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
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
-- Dumping data for table `product`
--

INSERT INTO `product` (`pro_id`, `pro_name`, `pro_price`, `pro_image`, `user_id`, `ctl_id`, `pro_description`) VALUES
(1, 'aaa', 12, 'ádfdsa', 1, 1, ''),
(2, 'sdfsdf', 23, 'adsfasdf', 1, 2, ''),
(3, 'ểtrt', 123, 'ểtrt', 1, 2, '');

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
(2, 'hung2@gmail.com', 'hunghung2', 2, '', 'cho lon', '', 'AAAAAAAAAAAAAAAAAA'),
(3, 'hung11', 'hung1', 2, 'khong co gi', 'xuan thuy, cau giay,ha noi', '', ''),
(4, '', '', 1, 'aaaaa', 'duong quang ham, cau giay', '', ''),
(5, '', '', 2, '123kjlk.jpg', 'le duc tho keo dai', '', ''),
(6, '', '', 2, '7987sdf.png', 'san van dong my dinh', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
