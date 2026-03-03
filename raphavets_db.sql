-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2026 at 04:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `raphavets_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `userpreference_tbl`
--

CREATE TABLE `userpreference_tbl` (
  `userprefID` int(11) NOT NULL,
  `accId` int(11) NOT NULL,
  `appointmentReminders` tinyint(1) NOT NULL,
  `petHealthUpd` tinyint(1) NOT NULL,
  `petCareTips` tinyint(1) NOT NULL,
  `petVideos` tinyint(1) NOT NULL,
  `forumPost` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userpreference_tbl`
--

INSERT INTO `userpreference_tbl` (`userprefID`, `accId`, `appointmentReminders`, `petHealthUpd`, `petCareTips`, `petVideos`, `forumPost`) VALUES
(1, 2, 0, 0, 1, 0, 0),
(2, 17, 1, 1, 1, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userpreference_tbl`
--
ALTER TABLE `userpreference_tbl`
  ADD PRIMARY KEY (`userprefID`),
  ADD KEY `accIdPreference` (`accId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userpreference_tbl`
--
ALTER TABLE `userpreference_tbl`
  MODIFY `userprefID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `userpreference_tbl`
--
ALTER TABLE `userpreference_tbl`
  ADD CONSTRAINT `accIdPreference` FOREIGN KEY (`accId`) REFERENCES `account_tbl` (`accId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
