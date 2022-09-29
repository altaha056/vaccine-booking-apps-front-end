-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2022 at 06:56 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vac`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `position` longtext DEFAULT NULL,
  `email` longtext DEFAULT NULL,
  `password` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `created_at`, `updated_at`, `deleted_at`, `name`, `position`, `email`, `password`) VALUES
(1, '2022-01-11 00:14:10.378', '2022-01-11 00:14:10.378', NULL, 'admin altaha', 'database manager', 'altaha@admin.com', '123123'),
(2, '2022-01-11 00:16:31.005', '2022-01-11 00:16:31.005', NULL, 'admin adit', 'database manager', 'adit@admin.com', '123123'),
(3, '2022-09-22 11:29:31.315', '2022-09-22 11:29:31.315', NULL, 'vettel', 'database manager', 'vettel@alta.com', '123123');

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `nik` longtext DEFAULT NULL,
  `fullname` longtext DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `phone_number` longtext DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `vac_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` longtext DEFAULT NULL,
  `applied_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`id`, `created_at`, `updated_at`, `deleted_at`, `nik`, `fullname`, `address`, `phone_number`, `user_id`, `vac_id`, `session_id`, `status`, `applied_at`) VALUES
(22, '2022-09-22 22:07:32.274', '2022-09-22 22:07:32.274', NULL, '1271140132000003', 'Michael Schumacher', 'Berlin, Germany', '0812123123123', 1, 21, 59, 'registered', '2022-09-22 22:07:32.273');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `vac_id` bigint(20) UNSIGNED DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `start_time` datetime(3) DEFAULT NULL,
  `end_time` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `created_at`, `updated_at`, `deleted_at`, `vac_id`, `description`, `start_time`, `end_time`) VALUES
(59, '2022-09-13 06:50:10.717', '2022-09-13 06:51:37.415', NULL, 21, 'Sesi Siang', '2022-09-13 13:50:00.000', '2023-09-16 13:50:00.000'),
(60, '2022-09-13 06:51:27.014', '2022-09-13 06:51:27.014', NULL, 22, 'Sesi Siang', '2022-09-13 13:51:00.000', '2023-09-15 13:51:00.000'),
(61, '2022-09-13 06:52:19.557', '2022-09-13 06:52:19.557', NULL, 23, 'Sesi Siang', '2022-09-13 13:52:00.000', '2023-09-16 13:52:00.000'),
(62, '2022-09-13 07:16:45.862', '2022-09-13 07:16:45.862', NULL, 24, 'Sesi Siang', '2022-09-13 14:16:00.000', '2023-09-15 14:16:00.000'),
(63, '2022-09-13 07:17:23.948', '2022-09-13 07:19:57.824', NULL, 25, 'Sesi Siang', '2022-09-13 14:17:00.000', '2023-09-16 14:17:00.000'),
(66, '2022-09-14 11:37:37.207', '2022-09-14 11:37:37.207', NULL, 27, 'Sesi Siang', '2022-09-14 18:37:00.000', '2023-09-30 18:37:00.000'),
(67, '2022-09-14 11:57:35.463', '2022-09-14 11:57:35.463', NULL, 28, 'Sesi Siang', '2022-09-14 18:57:00.000', '2023-09-30 18:57:00.000'),
(68, '2022-09-14 11:59:50.305', '2022-09-14 11:59:50.305', NULL, 29, 'Sesi Siang', '2022-09-14 18:59:00.000', '2023-09-30 18:59:00.000'),
(69, '2022-09-14 12:01:08.095', '2022-09-14 12:01:08.095', NULL, 30, 'Sesi Siang', '2022-09-14 19:01:00.000', '2023-09-30 19:01:00.000'),
(70, '2022-09-14 12:02:38.121', '2022-09-14 12:02:38.121', NULL, 31, 'Sesi Siang', '2022-09-14 19:02:00.000', '2023-09-30 19:02:00.000'),
(71, '2022-09-22 11:34:12.550', '2022-09-22 11:40:56.678', '2022-09-22 11:41:03.294', 32, 'sesi 1', '2022-09-22 22:00:00.000', '0000-00-00 00:00:00.000'),
(72, '2022-09-22 11:34:12.550', '2022-09-22 11:34:12.550', '2022-09-22 11:41:03.294', 32, 'sesi 2', '0000-00-00 00:00:00.000', '0000-00-00 00:00:00.000'),
(73, '2022-09-22 11:42:03.186', '2022-09-22 11:42:03.186', NULL, 33, 'Sesi Siang', '2022-09-22 18:41:00.000', '2023-03-31 18:41:00.000'),
(74, '2022-09-23 10:48:30.912', '2022-09-23 10:48:30.912', '2022-09-23 10:54:08.553', 34, 'sesi 1', '2022-01-30 15:00:00.000', '0000-00-00 00:00:00.000'),
(75, '2022-09-23 10:48:30.912', '2022-09-23 10:48:30.912', '2022-09-23 10:54:08.553', 34, 'sesi 2', '0000-00-00 00:00:00.000', '0000-00-00 00:00:00.000'),
(76, '2022-09-23 10:55:21.487', '2022-09-23 10:55:21.487', NULL, 35, 'Sesi Siang', '2022-09-23 17:55:00.000', '2023-12-01 17:55:00.000'),
(77, '2022-09-23 18:06:53.905', '2022-09-23 18:06:53.905', NULL, 36, 'Sesi 1', '2022-09-24 01:06:00.000', '2023-05-24 01:06:00.000'),
(78, '2022-09-23 18:09:12.686', '2022-09-23 18:09:12.686', NULL, 37, 'Sesi 1', '2022-09-24 01:09:00.000', '2023-10-24 01:09:00.000'),
(79, '2022-09-23 18:12:21.583', '2022-09-23 18:12:21.583', NULL, 38, 'Sesi Siang', '2022-09-24 01:12:00.000', '2023-06-24 01:12:00.000'),
(80, '2022-09-23 18:15:07.023', '2022-09-23 18:15:07.023', NULL, 39, 'Sesi 1', '2022-09-24 01:14:00.000', '2024-02-24 01:15:00.000'),
(81, '2022-09-23 18:15:54.930', '2022-09-23 18:15:54.930', NULL, 40, 'Sesi 1', '2022-09-24 01:15:00.000', '2023-10-24 01:15:00.000'),
(82, '2022-09-23 18:16:51.895', '2022-09-23 18:16:51.895', NULL, 41, 'Sesi 1', '2022-09-24 01:16:00.000', '2024-01-24 01:16:00.000'),
(83, '2022-09-23 18:18:08.329', '2022-09-23 18:18:08.329', NULL, 42, 'Sesi Siang', '2022-09-24 01:18:00.000', '2023-12-24 01:18:00.000'),
(84, '2022-09-23 18:19:02.080', '2022-09-23 18:19:02.080', NULL, 43, 'Sesi Siang', '2022-09-24 01:18:00.000', '2023-12-24 01:18:00.000'),
(85, '2022-09-23 18:21:52.008', '2022-09-23 18:21:52.008', NULL, 44, 'Sesi Siang', '2022-09-24 01:21:00.000', '2023-12-24 01:21:00.000'),
(86, '2022-09-23 18:23:38.480', '2022-09-23 18:23:38.480', NULL, 45, 'Sesi Siang', '2022-09-24 01:23:00.000', '2023-12-24 01:23:00.000'),
(87, '2022-09-23 18:25:58.273', '2022-09-23 21:33:36.806', NULL, 46, 'Sesi Siang', '2022-09-24 01:25:00.000', '2023-12-24 01:25:00.000'),
(88, '2022-09-23 21:42:54.795', '2022-09-23 21:42:54.795', NULL, 47, 'Sesi Siang', '2022-09-24 04:42:00.000', '2023-11-24 04:42:00.000'),
(89, '2022-09-23 21:49:54.211', '2022-09-23 21:49:54.211', NULL, 48, 'Sesi Siang', '2022-09-24 04:49:00.000', '2023-12-24 04:49:00.000'),
(90, '2022-09-23 22:01:50.754', '2022-09-23 22:01:50.754', NULL, 49, 'Sesi Siang', '2022-09-24 05:01:00.000', '2023-12-24 05:01:00.000'),
(91, '2022-09-23 22:03:09.733', '2022-09-23 22:03:09.733', NULL, 50, 'Sesi Siang', '2022-09-24 05:03:00.000', '2023-12-24 05:03:00.000'),
(92, '2022-09-23 22:04:34.934', '2022-09-23 22:04:34.934', NULL, 51, 'Sesi Siang', '2022-09-24 05:04:00.000', '2023-12-24 05:04:00.000'),
(93, '2022-09-23 22:07:02.172', '2022-09-23 22:07:02.172', NULL, 52, 'Sesi Siang', '2022-09-24 05:06:00.000', '2023-12-24 05:06:00.000'),
(94, '2022-09-23 22:34:29.523', '2022-09-23 22:34:29.523', NULL, 53, 'Sesi Siang', '2022-09-24 05:34:00.000', '2023-12-24 05:34:00.000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `nik` longtext DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `phone_number` longtext DEFAULT NULL,
  `email` longtext DEFAULT NULL,
  `password` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `created_at`, `updated_at`, `deleted_at`, `nik`, `name`, `phone_number`, `email`, `password`) VALUES
(1, '2022-01-11 00:13:58.240', '2022-01-11 00:49:13.487', NULL, '1234567890123456', 'altahaaa', '0812121212', 'alta@gmail.com', '123123'),
(2, '2022-01-11 00:48:29.701', '2022-01-11 00:49:39.366', NULL, '1234567891123435', 'adit', '08121212', 'adit@alta.com', '123123'),
(3, '2022-01-11 00:58:52.641', '2022-01-11 00:58:52.641', NULL, '1234567891123434', 'tomas', '08121212', 'tomas@alta.com', '123123'),
(4, '2022-01-20 07:23:29.107', '2022-01-20 07:23:29.107', NULL, '1271041112000002', 'tata', '0182301230123', 'tataantartikaa@gmail.com', 'asd123asd'),
(5, '2022-01-20 07:32:54.984', '2022-01-20 07:32:54.984', NULL, '1271041112000003', 'tata antartika', '0182301230123', 'tataantartika@gmail.com', 'asd123asd'),
(10, '2022-01-22 01:26:05.201', '2022-01-22 01:26:05.201', NULL, '1234567891123456', 'Altaha', '0813123123', 'altaha2@alta.com', '123asd123'),
(11, '2022-01-22 01:30:06.610', '2022-01-22 01:30:06.610', NULL, '1234567891123452', 'Altaha', '01923019283', 'altaha3@alta.com', 'asd123asd');

-- --------------------------------------------------------

--
-- Table structure for table `vacs`
--

CREATE TABLE `vacs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `location` longtext DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `vac_type` longtext DEFAULT NULL,
  `stock` bigint(20) DEFAULT NULL,
  `admin_id` bigint(20) DEFAULT NULL,
  `distance` double DEFAULT NULL,
  `address` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacs`
--

INSERT INTO `vacs` (`id`, `created_at`, `updated_at`, `deleted_at`, `description`, `location`, `latitude`, `longitude`, `vac_type`, `stock`, `admin_id`, `distance`, `address`) VALUES
(21, '2022-09-13 06:50:10.716', '2022-09-13 06:51:37.413', NULL, 'Vaksinasi covid-19\n', 'RS USU', 3.567852, 98.657516, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RS USU P.Bulan, Jl. dr. Mansyur, Medan, North Sumatra 20154, Indonesia'),
(22, '2022-09-13 06:51:27.013', '2022-09-13 06:51:27.013', NULL, 'Vaksinasi covid-19\n\n', 'RS Prof. Dr. Boloni', 3.570892, 98.668738, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RS Prof. Dr. Boloni, Jl. W. Mongonsidi No. 11, Medan, North Sumatra 20157, Indonesia'),
(23, '2022-09-13 06:52:19.556', '2022-09-13 06:52:19.556', NULL, 'Vaksinasi covid-19', 'RS. Santa Elisabeth', 3.575397, 98.676898, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RS. Santa Elisabeth, Medan, North Sumatra 20152, Indonesia'),
(24, '2022-09-13 07:16:45.861', '2022-09-13 07:16:45.861', NULL, 'Vaksinasi covid-19', 'Rumah Sakit KESDAM Putri Hijau', 3.599419, 98.672631, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'Rumah Sakit KESDAM Putri Hijau, Jl.putri hijau, Medan, North Sumatra 20111, Indonesia'),
(25, '2022-09-13 07:17:23.947', '2022-09-13 07:19:57.821', NULL, 'Vaksinasi covid-19', 'RS. Siti Hajar', 3.571516, 98.660577, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RS. Siti Hajar, Jl. Letjend Jamin Ginting No. 2, Medan, North Sumatra 20154, Indonesia'),
(27, '2022-09-14 11:37:37.205', '2022-09-14 11:37:37.205', NULL, 'Vaksinasi tetanus, difteri, dan, pertusis (batuk rejan)', 'RS Advent', 3.590026, 98.649793, 'J07AM01', 100, 2, 0, 'RS Advent, Jln. Gatot subroto, Medan, North Sumatra 20119, Indonesia'),
(28, '2022-09-14 11:57:35.462', '2022-09-14 11:57:35.462', NULL, 'Vaksinasi Influenza', 'RSIA Stella Maris', 3.572419, 98.680703, 'Fluarix, Fluzone', 100, 2, 0, 'RSIA Stella Maris, Jl. Samanhudi No. 20, Medan, North Sumatra 20152, Indonesia'),
(29, '2022-09-14 11:59:50.304', '2022-09-14 11:59:50.304', NULL, 'Vaksin Hepatitis A dan B', 'Rumah Sakit Umum Imelda Pekerja Indonesia', 3.6229, 98.674908, 'J07BC01, Hav A, Hav B', 100, 2, 0, 'Rumah Sakit Umum Imelda Pekerja Indonesia, Jl. Bilal No. 24, Medan, North Sumatra 20239, Indonesia'),
(30, '2022-09-14 12:01:08.094', '2022-09-14 12:01:08.094', NULL, 'Vaksinasi Booster Covid-19', 'RSU. Muhammadiyah Sumatera Utara', 3.582954, 98.71076, 'Corona Vac, Pfizer, Sinopharm', 100, 2, 0, 'RSU. Muhammadiyah Sumatera Utara, Mandala By Pass 27, Medan, North Sumatra 20226, Indonesia'),
(31, '2022-09-14 12:02:38.120', '2022-09-14 12:02:38.120', NULL, 'Vaksinasi Booster Covid-19', 'RSIA Badrul Aini Medan', 3.577254, 98.705649, 'Corona Vac, Pfizer, Sinopharm', 100, 2, 0, 'RSIA Badrul Aini Medan, Jl.Bromo Lr.Sukri, Medan, North Sumatra 20216, Indonesia'),
(32, '2022-09-22 11:34:12.548', '2022-09-22 11:40:56.674', '2022-09-22 11:41:03.291', 'vaksin untuk anak 10 - 15 tahun', 'RSU Bethesda', 3.5965913, 98.590082, 'astra zaneca', 100, 1, 0, 'Jl Binjai KM 10, Gg. Sama Gg. Murni No.71, Medan Krio, Sunggal, Deli Serdang Regency, North Sumatra 20351'),
(33, '2022-09-22 11:42:03.186', '2022-09-22 11:42:03.186', NULL, 'Vaksin Untuk Anak 10-15 Tahun', 'Rumah Sakit Umum Imelda Pekerja Indonesia', 3.6229, 98.674908, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'Rumah Sakit Umum Imelda Pekerja Indonesia, Jl. Bilal No. 24, Medan, North Sumatra 20239, Indonesia'),
(34, '2022-09-23 10:48:30.911', '2022-09-23 10:48:30.911', '2022-09-23 10:54:08.547', 'vaksin tegar', 'RSU Bethesda', 3.5965913, 98.590082, 'astra zaneca', 7, 1, 0, 'Jl Binjai KM 10, Gg. Sama Gg. Murni No.71, Medan Krio, Sunggal, Deli Serdang Regency, North Sumatra 20351'),
(35, '2022-09-23 10:55:21.485', '2022-09-23 10:55:21.485', NULL, 'Vaksinasi Covid-19 untuk Lansia', 'RSU Permata Bunda', 3.580783, 98.685761, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RSU Permata Bunda, Jl. Sisingamangaraja No. 7, Medan, North Sumatra 20213, Indonesia'),
(36, '2022-09-23 18:06:53.903', '2022-09-23 18:06:53.903', NULL, 'Vaksinasi Booster Covid-19', 'RSU BHAKTI', 3.568336, 98.701775, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RSU BHAKTI, Jln. HM Joni No. 64, Medan, North Sumatra 20217, Indonesia'),
(37, '2022-09-23 18:09:12.684', '2022-09-23 18:09:12.684', NULL, 'Vaksin Covid-19 untuk Ibu Hamil', 'RSU Madani', 3.574916, 98.703438, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RSU Madani, Jl. A.R Hakim No. 168, Medan, North Sumatra 20216, Indonesia'),
(38, '2022-09-23 18:12:21.582', '2022-09-23 18:12:21.582', NULL, 'Vaksinasi Covid-19 untuk seluruh kalangan usia', 'Rumah Sakit Setia Budi', 3.5733045, 98.643315, 'Corona Vac, Pfizer, Sinopharm', 97, 1, 0, 'Rumah Sakit Setia Budi, Jl. Mesjid-Setia Budi, Medan, North Sumatra 20122, Indonesia'),
(39, '2022-09-23 18:15:07.022', '2022-09-23 18:15:07.022', NULL, 'Covid-19 Vaccination for All (International Visitors and Indonesia Citizen)', 'Columbia Asia Intl. Hospital', 3.585538, 98.676586, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'Columbia Asia Intl. Hospital, Jl. Listrik No. 2, Medan, North Sumatra 20112, Indonesia'),
(40, '2022-09-23 18:15:54.929', '2022-09-23 18:15:54.929', NULL, 'Vaksinasi Covid-19 untuk seluruh kalangan usia', 'Murni Teguh Memorial Hospital', 3.590296, 98.681266, 'Corona Vac, Pfizer, Sinopharm', 96, 1, 0, 'Murni Teguh Memorial Hospital, Jl. Jawa No. 2, Medan, North Sumatra 20231, Indonesia'),
(41, '2022-09-23 18:16:51.894', '2022-09-23 18:16:51.894', NULL, 'Vaksinasi Covid-19 untuk seluruh kalangan usia', 'RSUP Dr. Pirngadi', 3.597951, 98.688276, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RSUP Dr. Pirngadi, Jl. Prof. H. M. Yamin, SH No. 47, Medan, North Sumatra 20231, Indonesia'),
(42, '2022-09-23 18:18:08.328', '2022-09-23 18:18:08.328', NULL, 'Vaksinasi Covid-19 untuk Seluruh Kalangan Usia', 'RSU Methodist', 3.583494, 98.692547, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RSU Methodist, Jl. H.M. Thamrin No. 105, Medan, North Sumatra 20214, Indonesia'),
(43, '2022-09-23 18:19:02.079', '2022-09-23 18:19:02.079', NULL, 'Vaksinasi Covid-19 untuk Seluruh Kalangan Usia', 'RSU Bunda Thamrin', 3.585153, 98.651379, 'Corona Vac, Pfizer, Sinopharm', 100, 1, 0, 'RSU Bunda Thamrin, Jl. Sei Batanghari No. 28-30, Medan, North Sumatra 20121, Indonesia'),
(44, '2022-09-23 18:21:52.007', '2022-09-23 18:21:52.007', NULL, 'Vaksinasi Covid-19 untuk Seluruh Kalangan Usia', 'RSU Methodist Susanna Wesley', 3.555001, 98.638589, 'Corona Vac, Pfizer, Sinopharm', 95, 2, 0, 'RSU Methodist Susanna Wesley, Jl. Pasar II, Medan, North Sumatra 20131, Indonesia'),
(45, '2022-09-23 18:23:38.479', '2022-09-23 18:23:38.479', NULL, 'Vaksinasi Covid-19 untuk Seluruh Kalangan Usia', 'RSU Tere Margareth', 3.560721, 98.626249, 'Corona Vac, Pfizer, Sinopharm', 100, 2, 0, 'RSU Tere Margareth No. 7,8,9, Medan, North Sumatra 20132, Indonesia'),
(46, '2022-09-23 18:25:58.272', '2022-09-23 21:33:36.802', NULL, 'Vaksinasi Covid-19 untuk Seluruh Kalangan Usia', 'RSUP H. Adam Malik', 3.518407, 98.609586, 'Corona Vac, Pfizer, Sinopharm', 100, 2, 0, 'Departemen Kulit & Kelamin RSHAM, Jln Bungalau No.17, Medan, North Sumatra 20136, Indonesia'),
(47, '2022-09-23 21:42:54.794', '2022-09-23 21:42:54.794', NULL, 'Vaksinasi Covid-19 untuk semua kalangan usia', 'RS Hermina Medan', 3.59506, 98.627597, 'Corona Vac, Pfizer, Sinopharm', 100, 2, 0, 'RS Hermina Medan, Jl. Ampera II, Medan, North Sumatra 20123, Indonesia'),
(48, '2022-09-23 21:49:54.203', '2022-09-23 21:49:54.203', NULL, 'Vaksinasi untuk Seluruh Kalangan Usia di Kota Medan', 'RSU. Vina Estetica', 3.586896, 98.66123, 'Corona Vac, Pfizer, Sinopharm', 97, 2, 0, 'RSU. Vina Estetica, Jl. Sultan Iskandar Muda No. 119, Medan, North Sumatra 20119, Indonesia'),
(49, '2022-09-23 22:01:50.753', '2022-09-23 22:01:50.753', NULL, 'Vaksinasi Covid-19 untuk Semua Kalangan Usia', 'RSU. Sinar Husni', 3.634826, 98.663644, 'Corona Vac, Pfizer, Sinopharm', 94, 2, 0, 'RSU. Sinar Husni, Deli Serdang, North Sumatra 20351, Indonesia'),
(50, '2022-09-23 22:03:09.732', '2022-09-23 22:03:09.732', NULL, 'Vaksinasi Covid-19 untuk Semua Kalangan Usia', 'RSU Bina Kasih', 3.578381, 98.613109, 'Corona Vac, Pfizer, Sinopharm', 99, 2, 0, 'RSU Bina Kasih, Jl. T.B. Simatupang No. 148, Medan, North Sumatra 20128, Indonesia'),
(51, '2022-09-23 22:04:34.933', '2022-09-23 22:04:34.933', NULL, 'Vaksinasi Covid-19 untuk Semua Kalangan Usia', 'RSU Mitra Sejati', 3.541233, 98.679552, 'Corona Vac, Pfizer, Sinopharm', 100, 2, 0, 'RSU Mitra Sejati, jl. AH. Nasution, Medan, North Sumatra 20143, Indonesia'),
(52, '2022-09-23 22:07:02.171', '2022-09-23 22:07:02.171', NULL, 'Vaksinasi Booster untuk Covid-19 Seluruh Kalangna Usia', 'RSU Ridos', 3.556039, 98.717677, 'Corona Vac, Pfizer, Sinopharm', 100, 2, 0, 'RSU Ridos, Jl. Menteng VII No.62, Medan, North Sumatra 20228, Indonesia'),
(53, '2022-09-23 22:34:29.523', '2022-09-23 22:34:29.523', NULL, 'Covid 19 Vaksin untuk dosis pertama, kedua, dan booster.', 'RS Haji', 3.610682, 98.714876, 'Corona Vac, Pfizer, Sinopharm', 97, 2, 0, 'RS Haji Medan, Jl. Peratun No. 3 Komp. Medan Estate, Deli Serdang, North Sumatra 20371, Indonesia');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_admins_deleted_at` (`deleted_at`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_participants_deleted_at` (`deleted_at`),
  ADD KEY `fk_participants_user` (`user_id`),
  ADD KEY `fk_participants_session` (`session_id`),
  ADD KEY `fk_participants_vac` (`vac_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_sessions_deleted_at` (`deleted_at`),
  ADD KEY `fk_vacs_sessions` (`vac_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_users_deleted_at` (`deleted_at`);

--
-- Indexes for table `vacs`
--
ALTER TABLE `vacs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_vacs_deleted_at` (`deleted_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vacs`
--
ALTER TABLE `vacs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `fk_participants_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`),
  ADD CONSTRAINT `fk_participants_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_participants_vac` FOREIGN KEY (`vac_id`) REFERENCES `vacs` (`id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `fk_vacs_sessions` FOREIGN KEY (`vac_id`) REFERENCES `vacs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
