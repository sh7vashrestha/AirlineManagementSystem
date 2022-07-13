-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2022 at 07:59 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodemysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `flight`
--

CREATE TABLE `flight` (
  `f_id` int(11) NOT NULL,
  `f_status` varchar(20) DEFAULT NULL,
  `f_capacity` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `flight`
--

INSERT INTO `flight` (`f_id`, `f_status`, `f_capacity`) VALUES
(100, 'active', 44),
(101, 'active', 56);

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `p_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `zip` int(10) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `p_num` int(11) NOT NULL,
  `p_id` int(11) DEFAULT NULL,
  `t_num` int(11) DEFAULT NULL,
  `amount` decimal(50,2) DEFAULT NULL,
  `card_num` int(50) DEFAULT NULL,
  `card_type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `route`
--

CREATE TABLE `route` (
  `f_id` int(11) DEFAULT NULL,
  `r_id` int(11) NOT NULL,
  `date_time` datetime DEFAULT NULL,
  `start_location` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `route`
--

INSERT INTO `route` (`f_id`, `r_id`, `date_time`, `start_location`, `destination`) VALUES
(100, 2000, '2022-08-22 12:00:00', 'Kathmandu', 'Pokhara');

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `seat_num` int(11) NOT NULL,
  `f_id` int(11) DEFAULT NULL,
  `seat_status` varchar(25) DEFAULT NULL,
  `s_type` varchar(40) DEFAULT NULL,
  `rate` decimal(30,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `p_id` int(11) DEFAULT NULL,
  `f_id` int(11) DEFAULT NULL,
  `t_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_seat`
--

CREATE TABLE `ticket_seat` (
  `p_id` int(11) DEFAULT NULL,
  `t_num` int(11) DEFAULT NULL,
  `seat_num` int(11) DEFAULT NULL,
  `p_num` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `flight`
--
ALTER TABLE `flight`
  ADD PRIMARY KEY (`f_id`);

--
-- Indexes for table `passenger`
--
ALTER TABLE `passenger`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`p_num`),
  ADD KEY `p_id` (`p_id`),
  ADD KEY `t_num` (`t_num`);

--
-- Indexes for table `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`r_id`),
  ADD KEY `f_id` (`f_id`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`seat_num`),
  ADD KEY `f_id` (`f_id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`t_num`),
  ADD KEY `f_id` (`f_id`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `ticket_seat`
--
ALTER TABLE `ticket_seat`
  ADD KEY `t_num` (`t_num`),
  ADD KEY `p_id` (`p_id`),
  ADD KEY `p_num` (`p_num`),
  ADD KEY `seat_num` (`seat_num`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `passenger`
--
ALTER TABLE `passenger`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `p_num` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `t_num` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `passenger` (`p_id`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`t_num`) REFERENCES `ticket` (`t_num`);

--
-- Constraints for table `route`
--
ALTER TABLE `route`
  ADD CONSTRAINT `route_ibfk_1` FOREIGN KEY (`f_id`) REFERENCES `flight` (`f_id`);

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`f_id`) REFERENCES `flight` (`f_id`);

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `passenger` (`p_id`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`f_id`) REFERENCES `flight` (`f_id`),
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`p_id`) REFERENCES `passenger` (`p_id`),
  ADD CONSTRAINT `ticket_ibfk_4` FOREIGN KEY (`f_id`) REFERENCES `flight` (`f_id`),
  ADD CONSTRAINT `ticket_ibfk_5` FOREIGN KEY (`p_id`) REFERENCES `passenger` (`p_id`);

--
-- Constraints for table `ticket_seat`
--
ALTER TABLE `ticket_seat`
  ADD CONSTRAINT `ticket_seat_ibfk_1` FOREIGN KEY (`t_num`) REFERENCES `ticket` (`t_num`),
  ADD CONSTRAINT `ticket_seat_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `passenger` (`p_id`),
  ADD CONSTRAINT `ticket_seat_ibfk_3` FOREIGN KEY (`t_num`) REFERENCES `ticket` (`t_num`),
  ADD CONSTRAINT `ticket_seat_ibfk_4` FOREIGN KEY (`p_id`) REFERENCES `passenger` (`p_id`),
  ADD CONSTRAINT `ticket_seat_ibfk_5` FOREIGN KEY (`p_num`) REFERENCES `payment` (`p_num`),
  ADD CONSTRAINT `ticket_seat_ibfk_6` FOREIGN KEY (`p_num`) REFERENCES `payment` (`p_num`),
  ADD CONSTRAINT `ticket_seat_ibfk_7` FOREIGN KEY (`seat_num`) REFERENCES `seat` (`seat_num`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
