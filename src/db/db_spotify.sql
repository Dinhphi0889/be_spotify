/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Discuss` (
  `userId` int DEFAULT NULL,
  `discussId` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `songId` int DEFAULT NULL,
  `discussDate` datetime DEFAULT NULL,
  `replayDiscussId` text,
  PRIMARY KEY (`discussId`),
  KEY `userId` (`userId`),
  KEY `songId` (`songId`),
  CONSTRAINT `Discuss_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`),
  CONSTRAINT `Discuss_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `Song` (`songId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Following` (
  `followingId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `followingUserId` int DEFAULT NULL,
  PRIMARY KEY (`followingId`),
  KEY `userId` (`userId`),
  KEY `followingUserId` (`followingUserId`),
  CONSTRAINT `Following_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`),
  CONSTRAINT `Following_ibfk_2` FOREIGN KEY (`followingUserId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Genre` (
  `genreId` int NOT NULL AUTO_INCREMENT,
  `nameGenre` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`genreId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LikedSong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idSongLiked` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `liked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`userId`),
  KEY `idSongLiked` (`idSongLiked`),
  CONSTRAINT `LikedSong_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`),
  CONSTRAINT `LikedSong_ibfk_2` FOREIGN KEY (`idSongLiked`) REFERENCES `Song` (`songId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ListFriends` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `friendId` int DEFAULT NULL,
  `roomChat` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`userId`),
  KEY `friendId` (`friendId`),
  CONSTRAINT `ListFriends_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`),
  CONSTRAINT `ListFriends_ibfk_3` FOREIGN KEY (`friendId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Message` (
  `idMess` int NOT NULL AUTO_INCREMENT,
  `idSender` int DEFAULT NULL COMMENT 'useSender',
  `contentMess` text,
  `timeSend` datetime DEFAULT NULL,
  `roomChat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idMess`),
  KEY `idUser` (`idSender`),
  CONSTRAINT `Message_ibfk_2` FOREIGN KEY (`idSender`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `playlistName` varchar(255) DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Playlists_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PlaylistSongs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playlistId` int DEFAULT NULL,
  `songId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `playlistId` (`playlistId`),
  KEY `songId` (`songId`),
  CONSTRAINT `PlaylistSongs_ibfk_1` FOREIGN KEY (`playlistId`) REFERENCES `Playlists` (`id`),
  CONSTRAINT `PlaylistSongs_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `Song` (`songId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `RecentSong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `songId` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `songId` (`songId`),
  CONSTRAINT `RecentSong_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`),
  CONSTRAINT `RecentSong_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `Song` (`songId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Song` (
  `songId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `genreId` int DEFAULT NULL,
  `songName` varchar(255) NOT NULL,
  `viewer` int DEFAULT '0',
  `duration` text,
  `popular` tinyint(1) DEFAULT NULL,
  `description` text,
  `songImage` varchar(255) DEFAULT NULL,
  `publicDate` date DEFAULT NULL,
  `filePath` varchar(255) DEFAULT NULL,
  `discussQuality` int DEFAULT NULL,
  PRIMARY KEY (`songId`),
  KEY `userId` (`userId`),
  KEY `genreId` (`genreId`),
  CONSTRAINT `Song_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`),
  CONSTRAINT `Song_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `Genre` (`genreId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `User` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `chanalName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `desciption` text,
  `refreshToken` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Discuss` (`userId`, `discussId`, `content`, `songId`, `discussDate`, `replayDiscussId`) VALUES
(1, 1, 'Great song!', 13, '2024-07-26 15:31:50', 'reply');
INSERT INTO `Discuss` (`userId`, `discussId`, `content`, `songId`, `discussDate`, `replayDiscussId`) VALUES
(2, 2, 'Love this track!', 13, '2024-01-02 00:00:00', NULL);
INSERT INTO `Discuss` (`userId`, `discussId`, `content`, `songId`, `discussDate`, `replayDiscussId`) VALUES
(3, 3, 'Amazing!', 14, '2024-01-03 00:00:00', NULL);
INSERT INTO `Discuss` (`userId`, `discussId`, `content`, `songId`, `discussDate`, `replayDiscussId`) VALUES
(4, 4, 'Very catchy!', 14, '2024-01-04 00:00:00', NULL),
(5, 5, 'Nice melody!', 14, '2024-01-05 00:00:00', NULL),
(6, 6, 'Great vocals!', 15, '2024-01-06 00:00:00', NULL),
(7, 7, 'Beautiful song!', 16, '2024-01-07 00:00:00', NULL),
(8, 8, 'Fantastic!', 17, '2024-01-08 00:00:00', NULL),
(9, 9, 'Loved it!', 18, '2024-01-09 00:00:00', NULL),
(10, 10, 'Awesome!', 20, '2024-01-10 00:00:00', NULL),
(1, 11, 'Beautiful song!', 31, '2024-01-07 00:00:00', NULL),
(1, 12, 'Fantastic!', 33, '2024-01-08 00:00:00', NULL),
(2, 13, 'Loved it!', 34, '2024-01-09 00:00:00', NULL),
(3, 14, 'Awesome!', 30, '2024-01-10 00:00:00', NULL),
(27, 17, 'string', 13, '2024-07-31 07:21:23', NULL),
(27, 18, 'string', 13, '2024-07-31 07:21:23', NULL),
(27, 19, 'string', 13, '2024-07-31 07:21:23', NULL),
(27, 20, 'string', 13, '2024-07-31 07:41:23', NULL),
(27, 21, 'string', 13, '2024-07-31 07:41:23', NULL),
(27, 22, 'string', 13, '2024-07-31 08:15:46', NULL),
(27, 23, 'string', 13, '2024-07-31 08:15:46', NULL);

INSERT INTO `Following` (`followingId`, `userId`, `followingUserId`) VALUES
(1, 1, 2);
INSERT INTO `Following` (`followingId`, `userId`, `followingUserId`) VALUES
(2, 1, 3);
INSERT INTO `Following` (`followingId`, `userId`, `followingUserId`) VALUES
(3, 1, 6);
INSERT INTO `Following` (`followingId`, `userId`, `followingUserId`) VALUES
(4, 1, 10),
(5, 2, 1),
(6, 2, 3),
(7, 3, 1),
(8, 3, 2),
(9, 4, 1),
(10, 4, 2),
(11, 5, 9),
(12, 5, 10),
(13, 4, 8),
(14, 4, 7),
(15, 5, 5),
(16, 5, 1);

INSERT INTO `Genre` (`genreId`, `nameGenre`, `createTime`) VALUES
(1, 'Pop', '2024-07-13 10:00:00');
INSERT INTO `Genre` (`genreId`, `nameGenre`, `createTime`) VALUES
(2, 'Rock', '2024-07-13 10:00:00');
INSERT INTO `Genre` (`genreId`, `nameGenre`, `createTime`) VALUES
(3, 'Jazz', '2024-07-13 10:00:00');
INSERT INTO `Genre` (`genreId`, `nameGenre`, `createTime`) VALUES
(4, 'Rap', '2024-07-13 10:00:00'),
(5, 'Classical', '2024-07-13 10:00:00'),
(6, 'R&B', '2024-07-13 10:00:00'),
(7, 'EDM', '2024-07-13 10:00:00'),
(8, 'Folk', '2024-07-13 10:00:00'),
(9, 'Hip-Hop', '2024-07-13 10:00:00');

INSERT INTO `LikedSong` (`id`, `idSongLiked`, `userId`, `liked`) VALUES
(25, 15, 1, 1);
INSERT INTO `LikedSong` (`id`, `idSongLiked`, `userId`, `liked`) VALUES
(26, 15, 1, 1);
INSERT INTO `LikedSong` (`id`, `idSongLiked`, `userId`, `liked`) VALUES
(27, 15, 1, 1);
INSERT INTO `LikedSong` (`id`, `idSongLiked`, `userId`, `liked`) VALUES
(28, 13, 1, 1),
(29, 20, 1, 1);

INSERT INTO `ListFriends` (`id`, `userId`, `friendId`, `roomChat`) VALUES
(1, 2, 1, '1-2');
INSERT INTO `ListFriends` (`id`, `userId`, `friendId`, `roomChat`) VALUES
(2, 3, 5, '3-5');
INSERT INTO `ListFriends` (`id`, `userId`, `friendId`, `roomChat`) VALUES
(3, 1, 2, '1-2');
INSERT INTO `ListFriends` (`id`, `userId`, `friendId`, `roomChat`) VALUES
(4, 4, 6, '4-6'),
(5, 1, 3, '1-3'),
(6, 5, 3, '3-5'),
(7, 2, 3, '2-3'),
(8, 6, 4, '4-6'),
(9, 3, 2, '3-2'),
(10, 7, 1, '1-7'),
(12, 27, 1, '27-1');

INSERT INTO `Message` (`idMess`, `idSender`, `contentMess`, `timeSend`, `roomChat`) VALUES
(1, 1, 'Hello! How are you?', '2024-01-01 10:00:00', '1-2');
INSERT INTO `Message` (`idMess`, `idSender`, `contentMess`, `timeSend`, `roomChat`) VALUES
(2, 2, 'I am good, thank you!', '2024-01-01 10:01:00', '1-2');
INSERT INTO `Message` (`idMess`, `idSender`, `contentMess`, `timeSend`, `roomChat`) VALUES
(3, 1, 'What are you doing?', '2024-01-01 10:05:00', '1-2');
INSERT INTO `Message` (`idMess`, `idSender`, `contentMess`, `timeSend`, `roomChat`) VALUES
(4, 3, 'Just listening to some music.', '2024-01-01 10:06:00', '3-5'),
(5, 1, 'Do you like this song?', '2024-01-01 10:10:00', '1-2'),
(6, 4, 'Yes, it is great!', '2024-01-01 10:11:00', '4-6'),
(7, 2, 'Check out this new album!', '2024-01-01 10:15:00', '1-2'),
(8, 5, 'Thanks, I will!', '2024-01-01 10:16:00', '3-5'),
(9, 3, 'Let\'s meet up this weekend.', '2024-01-01 10:20:00', '3-5'),
(10, 6, 'Sure, sounds good!', '2024-01-01 10:21:00', '4-6');

INSERT INTO `Playlists` (`id`, `userId`, `imagePath`, `playlistName`, `description`, `createDate`) VALUES
(10, 1, 'path/to/image1.jpg', 'string', 'string', '2024-07-20 10:00:00');
INSERT INTO `Playlists` (`id`, `userId`, `imagePath`, `playlistName`, `description`, `createDate`) VALUES
(11, 2, 'path/to/image1.jpg', 'New playlist', 'A playlist for relaxing and chilling', '2024-07-20 10:00:00');


INSERT INTO `PlaylistSongs` (`id`, `playlistId`, `songId`) VALUES
(11, 10, 13);


INSERT INTO `RecentSong` (`id`, `userId`, `songId`, `time`) VALUES
(1, 1, 16, '2024-07-16 10:00:00');
INSERT INTO `RecentSong` (`id`, `userId`, `songId`, `time`) VALUES
(2, 1, 15, '2024-07-16 10:00:00');
INSERT INTO `RecentSong` (`id`, `userId`, `songId`, `time`) VALUES
(3, 1, 14, '2024-07-16 10:00:00');
INSERT INTO `RecentSong` (`id`, `userId`, `songId`, `time`) VALUES
(4, 2, 13, '2024-07-16 10:00:00'),
(5, 8, 30, '2024-07-16 10:00:00'),
(6, 8, 33, '2024-07-16 10:05:00'),
(7, 4, 22, '2024-07-16 10:10:00'),
(8, 4, 20, '2024-07-16 10:15:00'),
(9, 5, 18, '2024-07-16 10:20:00'),
(10, 5, 19, '2024-07-16 10:25:00'),
(11, 6, 16, '2024-07-16 10:30:00'),
(12, 6, 17, '2024-07-16 10:35:00'),
(13, 7, 13, '2024-07-16 10:40:00'),
(14, 7, 16, '2024-07-16 10:45:00');

INSERT INTO `Song` (`songId`, `userId`, `genreId`, `songName`, `viewer`, `duration`, `popular`, `description`, `songImage`, `publicDate`, `filePath`, `discussQuality`) VALUES
(13, 1, 4, 'Lạc Trôi', 1000000, '4:32', 1, 'Hit song by Sơn Tùng M-TP', 'https://photo-resize-zmp3.zmdcdn.me/w600_r300x169_jpeg/thumb_video/4/a/4add7fcd19812492fb53e0ecd5125601_1483425414.jpg', '2017-01-01', 'https://www.youtube.com/watch?v=Llw9Q6akRo4', 1);
INSERT INTO `Song` (`songId`, `userId`, `genreId`, `songName`, `viewer`, `duration`, `popular`, `description`, `songImage`, `publicDate`, `filePath`, `discussQuality`) VALUES
(14, 1, 4, 'Chạy Ngay Đi', 900000, '4:33', 1, 'Popular song by Sơn Tùng M-TP', 'https://upload.wikimedia.org/wikipedia/vi/thumb/8/85/Chay_ngay_di.png/220px-Chay_ngay_di.png', '2018-01-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208647/ChayNgayDi.mp3', 1);
INSERT INTO `Song` (`songId`, `userId`, `genreId`, `songName`, `viewer`, `duration`, `popular`, `description`, `songImage`, `publicDate`, `filePath`, `discussQuality`) VALUES
(15, 2, 1, 'Đừng Hỏi Em', 800000, '4:21', 1, 'Hit song by Mỹ Tâm', 'https://i.ytimg.com/vi/SNVE42IIY_s/maxresdefault.jpg', '2019-01-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208615/DungHoiEm.mp3', 1);
INSERT INTO `Song` (`songId`, `userId`, `genreId`, `songName`, `viewer`, `duration`, `popular`, `description`, `songImage`, `publicDate`, `filePath`, `discussQuality`) VALUES
(16, 2, 1, 'Người Hãy Quên Em Đi', 700000, '3:51', 1, 'Popular song by Mỹ Tâm', 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/b/a/7/b/ba7bc87306fd23514ccb5c04b5c1f05a.jpg', '2019-06-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208591/NguoiHayQuenEmDi.mp3', 1),
(17, 3, 4, 'Anh Đếch Cần Gì Nhiều Ngoài Em', 600000, '3:38', 1, 'Hit song by Đen Vâu', 'https://i.ytimg.com/vi/KdrbBJNFwGw/maxresdefault.jpg', '2019-11-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208566/AnhDechCanGiNhieuNgoaiEm.mp3', 1),
(18, 3, 4, 'Lối Nhỏ', 500000, '4:56', 1, 'Popular song by Đen Vâu', '/images/loinho.jpg', '2020-01-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208547/LoiNho.mp3', 1),
(19, 4, 5, 'Tháng Tư Là Lời Nói Dối Của Em', 400000, '5:56', 1, 'Hit song by Hà Anh Tuấn', 'https://i.ytimg.com/vi/UCXao7aTDQM/maxresdefault.jpg', '2018-04-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208518/ThangTuVaLoiNoiDoiCuaEm.mp3', 1),
(20, 4, 5, 'Xuân Thì', 300000, '5:53', 1, 'Popular song by Hà Anh Tuấn', 'https://i.ytimg.com/vi/gt3U934kyPQ/maxresdefault.jpg', '2019-05-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208496/XuanThi.mp3', 1),
(21, 5, 1, 'Có Em Chờ', 200000, '4:03', 1, 'Hit song by Min', 'https://upload.wikimedia.org/wikipedia/vi/2/2e/B%C3%ACa_album_C%C3%B3_em_ch%E1%BB%9D.jpg', '2017-06-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208474/CoEmCho.mp3', 1),
(22, 5, 1, 'Đừng Yêu Nữa, Em Mệt Rồi', 100000, '4:55', 1, 'Popular song by Min', 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/2/7/d/9/27d9bf0671538484ddc719c125cba369.jpg', '2018-07-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208443/DungYeuNuaEmMetRoi.mp3', 1),
(23, 6, 5, 'Em Không Sai, Chúng Ta Sai', 900000, '6:28', 1, 'Hit song by Erik', 'https://i.ytimg.com/vi/iwGuiSnr2Qc/maxresdefault.jpg', '2019-08-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208411/EmKhongSaiChungTaSai.mp3', 1),
(24, 6, 5, 'Có Tất Cả Nhưng Thiếu Anh', 800000, '5:34', 1, 'Popular song by Erik', 'https://i.ytimg.com/vi/LSjFMH1tsFc/maxresdefault.jpg', '2020-09-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208382/CoTatCaNhungThieuEm.mp3', 1),
(27, 7, 1, 'Bùa Yêu', 3000000, '4:28', 1, 'Popular song by Bích Phương', 'https://upload.wikimedia.org/wikipedia/vi/4/42/B%C3%ACa_%C4%91%C4%A9a_B%C3%B9a_y%C3%AAu_-_B%C3%ADch_Ph%C6%B0%C6%A1ng.png', '2024-07-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208361/BuaYeu.mp3', 700),
(28, 7, 1, 'Đi Đu Đưa Đi', 3500000, '3:43', 1, 'Hit song by Bích Phương', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ieTDrsIz1nRnTUxWVy_TaLen6lHjN2t0Ig&s', '2024-08-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208328/DiDuDuaDi.mp3', 800),
(29, 8, 1, 'Cause I Love You', 1000000, '6:14', 1, 'Popular song by Noo Phước Thịnh', 'https://i.ytimg.com/vi/_E-7A81Ac8U/maxresdefault.jpg', '2024-01-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208301/CauseILoveYou.mp3', 100),
(30, 8, 1, 'Wanna Stay In Love', 1500000, '5:30', 1, 'Hit song by Noo Phước Thịnh', 'https://avatar-ex-swe.nixcdn.com/song/2016/06/17/6/d/d/8/1466144485971_640.jpg', '2024-02-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208279/WannaStayInLove.mp3', 200),
(31, 9, 1, 'Để Mị Nói Cho Mà Nghe', 2000000, '4:41', 1, 'Popular song by Hoàng Thùy Linh', 'https://upload.wikimedia.org/wikipedia/vi/b/bc/Deminoichomanghehtl.png', '2024-03-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208250/DeMiNoiChoMaNghe.mp3', 300),
(32, 9, 1, 'See Tình', 2500000, '3:56', 1, 'Hit song by Hoàng Thùy Linh', 'https://upload.wikimedia.org/wikipedia/vi/4/41/SeeTinhcover.jpg', '2024-04-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208228/SeeTinh.mp3', 400),
(33, 10, 5, 'Giả Vờ Yêu', 500000, '4:39', 1, 'Popular song by Ngô Kiến Huy', 'https://avatar-ex-swe.nixcdn.com/song/2023/02/08/f/b/7/8/1675844391876_640.jpg', '2024-05-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208202/GiaVoYeu.mp3', 500),
(34, 10, 1, 'Truyền Thái Y', 750000, '2:59', 1, 'Hit song by Ngô Kiến Huy', 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/e/b/d/e/ebdeb9e23249e0aba569d7374250c39d.jpg', '2024-06-01', 'https://res.cloudinary.com/dmg28mhji/video/upload/v1721208124/TruyenThaiY.mp3', 600);

INSERT INTO `User` (`userId`, `account`, `name`, `nationality`, `chanalName`, `avatar`, `desciption`, `refreshToken`, `password`, `banner`, `role`) VALUES
(1, 'sonTungMTP', 'Sơn Tùng M-TP', 'Vietnam', 'Sơn Tùng M-TP Channel', 'https://yt3.googleusercontent.com/oN0p3-PD3HUzn2KbMm4fVhvRrKtJhodGlwocI184BBSpybcQIphSeh3Z0i7WBgTq7e12yKxb=s900-c-k-c0x00ffffff-no-rj', 'Vietnamese pop singer and songwriter', 'string', 'password11', 'https://images.spiderum.com/sp-images/57559e00615611e7be8d59a5a1121573.jpg', 'Singer');
INSERT INTO `User` (`userId`, `account`, `name`, `nationality`, `chanalName`, `avatar`, `desciption`, `refreshToken`, `password`, `banner`, `role`) VALUES
(2, 'myTam', 'Mỹ Tâm', 'Vietnam', 'Mỹ Tâm Channel', 'https://www.elle.vn/wp-content/uploads/2019/09/elle-viet-nam-my-tam-1-1024x1397.jpg', 'Vietnamese pop singer', '', 'password12', 'https://cdn.popsww.com/blog/sites/2/2022/03/show-my-tam-1920x1080.jpg', 'Singer');
INSERT INTO `User` (`userId`, `account`, `name`, `nationality`, `chanalName`, `avatar`, `desciption`, `refreshToken`, `password`, `banner`, `role`) VALUES
(3, 'denVau', 'Đen Vâu', 'Vietnam', 'Đen Vâu Channel', 'https://toquoc.mediacdn.vn/280518851207290880/2022/9/11/dv2-1662837338124821760706.jpg', 'Vietnamese rapper', '', 'password13', 'https://ss-images.saostar.vn/2019/11/06/6391684/vau-ngang-copy.jpg', 'Singer');
INSERT INTO `User` (`userId`, `account`, `name`, `nationality`, `chanalName`, `avatar`, `desciption`, `refreshToken`, `password`, `banner`, `role`) VALUES
(4, 'haAnhTuan', 'Hà Anh Tuấn', 'Vietnam', 'Hà Anh Tuấn Channel', 'https://toquoc.mediacdn.vn/280518851207290880/2023/4/9/hat2-16810240271281216191316.jpg', 'Vietnamese pop singer', '', 'password14', 'https://bookkol.com/wp-content/uploads/2023/01/banner-ha-anh-tuan.jpg', 'Singer'),
(5, 'min', 'Min', 'Vietnam', 'Min Channel', 'https://i1-giaitri.vnecdn.net/2022/03/06/MIN-4-3792-1646534264.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=bmJD8H1wDwtsxtSKm4J2MA', 'Vietnamese pop singer', '', 'password15', 'https://vcdn1-giaitri.vnecdn.net/2022/03/05/Ca-si-Min-2-1998-1646449221.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=fG44zPFcHWw6UfSriqWpBQ', 'Singer'),
(6, 'erik', 'Erik', 'Vietnam', 'Erik Channel', 'https://iv1cdn.vnecdn.net/giaitri/images/web/2023/07/21/erik-to-tinh-voi-nua-kia-tai-hop-bao-ra-mv-moi-1689915694.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=VA8w30QgGQKO1ql8utCt9Q', 'Vietnamese pop singer', '', 'password16', 'https://bookkol.com/wp-content/uploads/2023/01/banner-erik.jpg', 'Singer'),
(7, 'bichPhuong', 'Bích Phương', 'Vietnam', 'Bích Phương Channel', 'https://showbizvietnam.vn/wp-content/uploads/2023/08/ca-si-bich-phuong-2.webp', 'Vietnamese pop singer', '', 'password17', 'https://rgb.vn/wp-content/uploads/2021/05/rgb-casi-bich-phuong-spotify-billboard-time-square-1024x691.jpg', 'Singer'),
(8, 'nooPhuocThinh', 'Noo Phước Thịnh', 'Vietnam', 'Noo Phước Thịnh Channel', 'https://image.vietnamnews.vn/uploadvnnews/Article/2017/11/20/Noo58251613PM.jpg', 'Vietnamese pop singer', '', 'password18', 'https://kenh14cdn.com/thumb_w/600/2016/img-0013-3-1459760184314.jpg', 'Singer'),
(9, 'hoangThuyLinh', 'Hoàng Thùy Linh', 'Vietnam', 'Hoàng Thùy Linh Channel', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/HO%C3%80NG_TH%C3%99Y_LINH.jpg/250px-HO%C3%80NG_TH%C3%99Y_LINH.jpg', 'Vietnamese pop singer', '', 'password19', 'https://bookkol.com/wp-content/uploads/2023/02/banner-hoang-thuy-linh.jpg', 'Singer'),
(10, 'ngoKienHuy', 'Ngô Kiến Huy', 'Vietnam', 'Ngô Kiến Huy Channel', 'https://media-cdn-v2.laodong.vn/storage/newsportal/2024/1/7/1289463/Ngo-Kien-Huy-171.jpg', 'Vietnamese pop singer', '', 'password20', 'https://avatar-ex-swe.nixcdn.com/song/share/2020/03/13/8/1/7/b/1584075667500.jpg', 'Singer'),
(11, 'test', 'John Doe', 'VietNam', 'pihihi', 'path/to/image', NULL, 'some_refresh_token', '123123', 'path/to/banner', 'user'),
(27, 'admin', 'admin', 'Vietnam', 'none', 'none', 'none', 'none', 'admin1234', 'none', 'admin');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;