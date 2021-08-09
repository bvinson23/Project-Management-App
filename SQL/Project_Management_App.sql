USE [master]

if db_id('Project_Management_App') IS NULL
	CREATE DATABASE[Project_Management_App]
GO

USE [Project_Management_App]
GO

DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Contact];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [Note];
DROP TABLE IF EXISTS [Task];
DROP TABLE IF EXISTS [Priority];
DROP TABLE IF EXISTS [ProjectContact];
DROP TABLE IF EXISTS [ProjectNote];
DROP TABLE IF EXISTS [TaskNote];
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Project] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Contact] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Phone] int NULL,
  [Email] nvarchar(255) NOT NULL,
  [Title] nvarchar(255) NULL,
  [Company] nvarchar(255) NULL
)
GO

CREATE TABLE [Note] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [DateCreated] datetime NOT NULL,
  [Content] nvarchar(255) NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Task] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [ProjectId] int NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Deadline] datetime NULL,
  [PriorityId] int  NOT NULL
)
GO

CREATE TABLE [Priority] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Level] nvarchar(255)  NOT NULL
)
GO

CREATE TABLE [ProjectContact] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [ContactId] int NOT NULL,
  [ProjectId] int NOT NULL
)
GO

CREATE TABLE [ProjectNote] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [NoteId] int NOT NULL,
  [ProjectId] int NOT NULL
)
GO

CREATE TABLE [TaskNote] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [NoteId] int NOT NULL,
  [TaskId] int NOT NULL
)
GO

ALTER TABLE [Note] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Task] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [Task] ADD FOREIGN KEY ([PriorityId]) REFERENCES [Priority] ([Id])
GO

ALTER TABLE [ProjectContact] ADD FOREIGN KEY ([ContactId]) REFERENCES [Contact] ([Id])
GO

ALTER TABLE [ProjectContact] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [ProjectNote] ADD FOREIGN KEY ([NoteId]) REFERENCES [Note] ([Id])
GO

ALTER TABLE [ProjectNote] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [TaskNote] ADD FOREIGN KEY ([NoteId]) REFERENCES [Note] ([Id])
GO

ALTER TABLE [TaskNote] ADD FOREIGN KEY ([TaskId]) REFERENCES [Task] ([Id])
GO
