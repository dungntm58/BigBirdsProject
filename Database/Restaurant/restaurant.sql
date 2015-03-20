-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2015 at 05:22 PM
-- Server version: 5.5.36
-- PHP Version: 5.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `danh_muc`
--

CREATE TABLE IF NOT EXISTS `danh_muc` (
  `id_dm` int(11) NOT NULL AUTO_INCREMENT,
  `ten_dm` varchar(255) NOT NULL,
  PRIMARY KEY (`id_dm`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `danh_muc`
--

INSERT INTO `danh_muc` (`id_dm`, `ten_dm`) VALUES
(1, 'Khai aaaaa'),
(2, 'Tráng miệng'),
(3, 'Món chính'),
(7, 'ikik');

-- --------------------------------------------------------

--
-- Table structure for table `san_pham`
--

CREATE TABLE IF NOT EXISTS `san_pham` (
  `id_sp` int(11) NOT NULL AUTO_INCREMENT,
  `ten_sp` varchar(255) NOT NULL,
  `mo_ta` text NOT NULL,
  `anh_mo_ta` varchar(255) NOT NULL,
  `gia_sp` int(30) NOT NULL,
  `id_dm` int(11) NOT NULL,
  PRIMARY KEY (`id_sp`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `san_pham`
--

INSERT INTO `san_pham` (`id_sp`, `ten_sp`, `mo_ta`, `anh_mo_ta`, `gia_sp`, `id_dm`) VALUES
(12, 'aaaa', 'ppp', 'anh1.jpg', 123, 7),
(16, 'Nokia 1280', 'k', 'cover-02.jpg', 1200001, 3);

-- --------------------------------------------------------

--
-- Table structure for table `thanh_vien`
--

CREATE TABLE IF NOT EXISTS `thanh_vien` (
  `id_thanhvien` int(11) NOT NULL AUTO_INCREMENT,
  `tai_khoan` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `phan_quyen` int(1) NOT NULL,
  PRIMARY KEY (`id_thanhvien`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `thanh_vien`
--

INSERT INTO `thanh_vien` (`id_thanhvien`, `tai_khoan`, `mat_khau`, `phan_quyen`) VALUES
(1, 'admin1', 'admin', 1),
(5, 'hung2', 'hung2', 1),
(6, 'hungkaka', 'hunghung', 2),
(7, '-h0angnhat-', '12345', 1),
(8, '-h0angnhat-', '12345', 1),
(9, 'bocuaadmin', '12345678', 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
