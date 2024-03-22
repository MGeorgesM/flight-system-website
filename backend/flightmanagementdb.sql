-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2024 at 11:26 AM
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
-- Database: `flightmanagementdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`) VALUES
(1, 'admin', 'admin1@example.com', '$2y$10$iWrA1OmNA0iaVGBh3JAX6ubjOZg7yVK4Is7HOEvmV2D8KmsEKDrIq');

-- --------------------------------------------------------

--
-- Table structure for table `airlines`
--

CREATE TABLE `airlines` (
  `id` int(11) NOT NULL,
  `airline_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airlines`
--

INSERT INTO `airlines` (`id`, `airline_name`) VALUES
(1, 'Delta Air Lines'),
(2, 'American Airlines'),
(3, 'United Airlines'),
(4, 'Emirates'),
(5, 'Lufthansa');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `departure_flight_id` int(11) NOT NULL,
  `return_flight_id` int(11) DEFAULT NULL,
  `booking_status` enum('pending','confirmed','cancelled','') NOT NULL DEFAULT 'pending',
  `passengers_number` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `departure_flight_id`, `return_flight_id`, `booking_status`, `passengers_number`) VALUES
(1, 1, 1, 2, 'confirmed', 2),
(2, 2, 3, NULL, 'confirmed', 1),
(3, 1, 4, NULL, 'pending', 1),
(4, 2, 5, NULL, 'cancelled', 2),
(5, 1, 2, NULL, 'confirmed', 1),
(13, 1, 2, 9, 'confirmed', 2),
(14, 6, 3, NULL, 'pending', 2),
(15, 8, 2, NULL, 'confirmed', 2);

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `user_text` text DEFAULT NULL,
  `user_text_date` datetime NOT NULL DEFAULT current_timestamp(),
  `message_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `user_id`, `admin_id`, `user_text`, `user_text_date`, `message_type`) VALUES
(1, 1, 1, 'Hi, I need assistance.', '2024-03-19 11:29:11', 'text'),
(2, 2, 1, 'How can I help you?', '2024-03-19 11:29:11', 'text'),
(3, 1, 1, 'I have a question about my booking.', '2024-03-19 11:29:11', 'text'),
(4, 2, 1, 'Is there any discount available?', '2024-03-19 11:29:11', 'text'),
(5, 1, 1, 'I\'m having trouble with my account.', '2024-03-19 11:29:11', 'text');

-- --------------------------------------------------------

--
-- Table structure for table `coins_requests`
--

CREATE TABLE `coins_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','accepted','rejected','') NOT NULL DEFAULT 'pending',
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coins_requests`
--

INSERT INTO `coins_requests` (`id`, `user_id`, `amount`, `status`, `date`) VALUES
(1, 1, 50.00, 'pending', '2024-03-17 10:00:00'),
(2, 2, 30.00, 'accepted', '2024-03-17 11:00:00'),
(3, 1, 20.00, 'rejected', '2024-03-17 12:00:00'),
(4, 2, 40.00, 'pending', '2024-03-17 13:00:00'),
(5, 1, 60.00, 'accepted', '2024-03-17 14:00:00'),
(6, 1, 1000.00, 'accepted', '2024-03-19 14:55:08'),
(7, 9, 800.00, 'accepted', '2024-03-21 12:10:01');

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` int(11) NOT NULL,
  `airline_id` int(11) NOT NULL,
  `departure_location` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `departure_date` varchar(255) NOT NULL,
  `arrival_date` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('on time','delayed','cancelled','arrived','boarding') NOT NULL DEFAULT 'on time',
  `code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `airline_id`, `departure_location`, `destination`, `departure_date`, `arrival_date`, `price`, `status`, `code`) VALUES
(1, 1, 'New York', 'Los Angeles', '2024-03-20 08:00:00', '2024-03-20 10:30:00', 200.00, 'on time', 'NYLA001'),
(2, 2, 'New York', 'Los Angeles', '2024-03-24 08:00:00', '2024-03-24 10:30:00', 200.00, 'on time', 'NYLA022'),
(3, 3, 'New York', 'Los Angeles', '2024-03-26 08:00:00', '2024-03-26 10:30:00', 200.00, 'on time', 'NYLA333'),
(4, 1, 'New York', 'Los Angeles', '2024-03-28 08:00:00', '2024-03-28 10:30:00', 200.00, 'on time', 'NYLA001'),
(5, 2, 'Los Angeles', 'New York', '2024-03-21 09:00:00', '2024-03-21 11:30:00', 150.00, 'delayed', 'LACH002'),
(6, 3, 'Chicago', 'Miami', '2024-03-22 10:00:00', '2024-03-22 12:30:00', 180.00, 'cancelled', 'CHMI003'),
(7, 4, 'Miami', 'Chicago', '2024-03-23 11:00:00', '2024-03-24 13:30:00', 220.00, 'boarding', 'MIHO004'),
(8, 1, 'Los Angeles', 'New York', '2024-03-27 09:00:00', '2024-03-27 11:30:00', 150.00, 'on time', 'LANY011'),
(9, 3, 'Los Angeles', 'New York', '2024-03-30 09:00:00', '2024-03-30 11:30:00', 150.00, 'on time', 'LANY330'),
(10, 4, 'Los Angeles', 'New York', '2024-04-10 09:00:00', '2024-04-10 11:30:00', 150.00, 'on time', 'LANY444');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('accepted','refunded','','') NOT NULL DEFAULT 'accepted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `booking_id`, `amount`, `date`, `status`) VALUES
(1, 1, 1, 400.00, '2024-03-20 10:45:00', 'accepted'),
(2, 2, 2, 150.00, '2024-03-21 11:30:00', 'accepted'),
(3, 1, 3, 180.00, '2024-03-22 12:45:00', 'accepted'),
(4, 2, 4, 660.00, '2024-03-23 13:45:00', 'accepted'),
(5, 1, 5, 250.00, '2024-03-24 14:45:00', 'accepted'),
(6, 1, 13, 700.00, '2024-03-21 04:20:48', 'accepted'),
(7, 8, 15, 400.00, '2024-03-21 11:37:42', 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `flight_id` int(11) NOT NULL,
  `airline_id` int(11) NOT NULL,
  `rating_flight` decimal(3,1) NOT NULL,
  `rating_airline` decimal(3,1) NOT NULL,
  `review_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `flight_id`, `airline_id`, `rating_flight`, `rating_airline`, `review_text`) VALUES
(1, 1, 1, 1, 4.5, 4.0, 'Great flight experience overall.'),
(2, 2, 2, 2, 3.5, 3.0, 'Could be better. Average experience.'),
(3, 1, 3, 3, 4.0, 6.0, 'Excellent service! Highly recommended.'),
(4, 2, 4, 4, 4.5, 4.0, 'Comfortable journey. Satisfied.'),
(5, 1, 5, 5, 5.0, 5.0, 'Best airline ever! Will definitely fly again.'),
(6, 1, 6, 3, 4.0, 0.0, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `passport_number` varchar(255) DEFAULT NULL,
  `coins` decimal(10,2) DEFAULT 400.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `address`, `passport_number`, `coins`) VALUES
(1, 'george', 'george@mail.com', '$2y$10$iWrA1OmNA0iaVGBh3JAX6ubjOZg7yVK4Is7HOEvmV2D8KmsEKDrIq', 'George', 'Mouawad', 'Mian street', 'LR444444', 1660.00),
(2, 'user2', 'user2@example.com', '$2y$10$iWrA1OmNA0iaVGBh3JAX6ubjOZg7yVK4Is7HOEvmV2D8KmsEKDrIq', 'Jane', 'Smith', '456 Elm St, Los Angeles', 'US789012', 50.00),
(3, 'user', 'user@mail.com', '$2y$10$iWrA1OmNA0iaVGBh3JAX6ubjOZg7yVK4Is7HOEvmV2D8KmsEKDrIq', NULL, NULL, NULL, NULL, 520.00),
(5, 'muser', 'muser@mail.com', '$2y$10$MNeDhLUUcXtd4fiG.pMsaufdiXXTOE2yXNbErIeGbKrdvQ2lbMywm', NULL, NULL, NULL, NULL, NULL),
(6, 'george', 'george@mail.com', '$2y$10$vsC8sEEXQCbps1yOWPewu.tkwpR8lpZXkuyp6inKLMLwUWwcaZ1gi', 'Georges', 'Mouawad', 'Main street', 'LRTT', 100.00),
(7, 'user19', 'user2', '$2y$10$Swf5yme9yB2stkEiHZD9iOfwDYBoyNt0iY2OvQciJxTkE.dwLzk7K', NULL, NULL, NULL, NULL, NULL),
(8, 'keira', 'keira@mail.com', '$2y$10$8qcDM8Q7wocLEUiilBtdUO1UoSJkqfx0xsmACLpM44mw8NywRCpWK', 'Keira', 'Mouawad', 'Zgharta', 'LR888999', 0.00),
(9, 'sef', 'sef', '$2y$10$apMYUbe8Vf6T7ZRpMbmfo.KTPl.pwES1yeDZpj74/eoHjPPN8uVre', NULL, NULL, NULL, NULL, 400.00),
(10, 'admino', 'admine@hmail.com', '$2y$10$RCbW2V4qSHQ3MvsbL0s1eu2yp5nh/j0DkpIiA93O4Fud4Xf2Oshe6', NULL, NULL, NULL, NULL, 400.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `airlines`
--
ALTER TABLE `airlines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `flight_id` (`departure_flight_id`),
  ADD KEY `FK_booking_return_flight_id_flights_id` (`return_flight_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_chats_user_id_users_id` (`user_id`),
  ADD KEY `FK_chats_admin_id_admins_id` (`admin_id`);

--
-- Indexes for table `coins_requests`
--
ALTER TABLE `coins_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_coin_requests_user_id_users_id` (`user_id`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_flights_airline_id_airlines_id` (`airline_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_reviews_user_id_users_id` (`user_id`),
  ADD KEY `FK_reviews_flight_id_flights_id` (`flight_id`),
  ADD KEY `FK_reviews_airline_id_airlines_id` (`airline_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `airlines`
--
ALTER TABLE `airlines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `coins_requests`
--
ALTER TABLE `coins_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `FK_booking_departure_flight_id_flights_id` FOREIGN KEY (`departure_flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_booking_return_flight_id_flights_id` FOREIGN KEY (`return_flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_booking_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `FK_chats_admin_id_admins_id` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_chats_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `coins_requests`
--
ALTER TABLE `coins_requests`
  ADD CONSTRAINT `FK_coin_requests_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `flights`
--
ALTER TABLE `flights`
  ADD CONSTRAINT `FK_flights_airline_id_airlines_id` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FK_payments_booking_id_bookings_id	` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_payments_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FK_reviews_airline_id_airlines_id` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_reviews_flight_id_flights_id` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_reviews_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
