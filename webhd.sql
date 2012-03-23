-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生日期: 2012 年 03 月 23 日 16:37
-- 伺服器版本: 5.5.16
-- PHP 版本: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 資料庫: `webhd`
--

-- --------------------------------------------------------

--
-- 表的結構 `dir_data`
--

CREATE TABLE IF NOT EXISTS `dir_data` (
  `dir_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dir_owner_id` int(10) unsigned NOT NULL,
  `dir_name` varchar(50) NOT NULL,
  `dir_parent` int(10) unsigned NOT NULL,
  `dir_creat_time` datetime NOT NULL,
  PRIMARY KEY (`dir_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的結構 `down_log`
--

CREATE TABLE IF NOT EXISTS `down_log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(100) NOT NULL,
  `down_ip` varchar(20) NOT NULL,
  `down_time` datetime NOT NULL,
  `down_user` varchar(15) NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的結構 `file_data`
--

CREATE TABLE IF NOT EXISTS `file_data` (
  `file_id` int(10) NOT NULL AUTO_INCREMENT,
  `file_owner_id` int(10) unsigned NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_upname` varchar(255) NOT NULL,
  `file_size` int(50) unsigned NOT NULL,
  `file_type` varchar(100) NOT NULL,
  `file_info` text,
  `file_dir` int(10) unsigned NOT NULL DEFAULT '0',
  `upload_time` datetime NOT NULL,
  `last_edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的結構 `user_data`
--

CREATE TABLE IF NOT EXISTS `user_data` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_pass` varchar(50) NOT NULL,
  `user_group` int(10) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 轉存資料表中的資料 `user_data`
--

INSERT INTO `user_data` (`user_id`, `user_name`, `user_pass`, `user_group`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1);

-- --------------------------------------------------------

--
-- 表的結構 `user_group`
--

CREATE TABLE IF NOT EXISTS `user_group` (
  `group_id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 轉存資料表中的資料 `user_group`
--

INSERT INTO `user_group` (`group_id`, `group_name`) VALUES
(1, 'administrator');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
