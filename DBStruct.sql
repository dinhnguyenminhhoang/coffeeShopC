CREATE DATABASE CoffeManagement;

DROP TABLE IF EXISTS [Drinks];
CREATE TABLE [Drinks] (
  [Id] INT IDENTITY(1, 1) PRIMARY KEY,
  [Name] NVARCHAR(255) NOT NULL,
  [Image] VARCHAR(255) NOT NULL,
  [Description] NVARCHAR(MAX) NOT NULL,
);

DROP TABLE IF EXISTS [DrinksSizes];
CREATE TABLE [DrinksSizes] (
  [Id] INT IDENTITY(1, 1) PRIMARY KEY,
  [DrinkId] INT NOT NULL,
  [Size] NVARCHAR(255) NOT NULL,
  [Ratio] FLOAT NOT NULL,
  [Price] FLOAT NOT NULL,
  CONSTRAINT FK_DrinksSizes_Drinks FOREIGN KEY ([DrinkId]) REFERENCES [Drinks] ([Id])
);

DROP TABLE IF EXISTS [Staffs];
CREATE TABLE [Staffs] (
  [Id] INT IDENTITY(1, 1) PRIMARY KEY,
  [FullName] NVARCHAR(50) NOT NULL,
  [Birthday] DATE NOT NULL,
  [Address] NVARCHAR(255) NOT NULL,
  [Avatar] NVARCHAR(255) NOT NULL,
  [CCCD] CHAR(20) NOT NULL,
  [Phone] CHAR(20) NOT NULL,
  [Email] VARCHAR(60) NOT NULL,
  [Salary] FLOAT NOT NULL DEFAULT(0),
  [OnJobDays] INT NOT NULL DEFAULT(0),
  [AsentDays] INT NOT NULL DEFAULT(0),
  [Position] INT NOT NULL,
  [BranchId] INT NOT NULL,
  [AccountId] INT,
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_Staffs_Accounts FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id])
);

DROP TABLE IF EXISTS [Customers];
CREATE TABLE [Customers] (
  [Id] INT IDENTITY(1, 1) PRIMARY KEY,
  [FullName] NVARCHAR(50),
  [Phone] CHAR(20) NOT NULL,
  [Address] NVARCHAR(255) NOT NULL,
  [AccountId] INT,
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_Customers_Accounts FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id])
);

DROP TABLE IF EXISTS [Accounts];
CREATE TABLE [Accounts] (
  [Id] INT IDENTITY(1, 1) PRIMARY KEY,
  [Username] NVARCHAR(50) NOT NULL UNIQUE,
  [HashedPassword] NVARCHAR(100) NOT NULL,
  [Type] VARCHAR(10) NOT NULL,
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
);


-- TRIGGERS -- 

CREATE TRIGGER TRG_UpdateUpdatedAtOfStaffsTable
ON Staffs
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Staffs
    SET UpdatedAt = SYSDATETIME()
    FROM Staffs
    INNER JOIN inserted ON Staffs.Id = inserted.Id;
END;

CREATE TRIGGER TRG_UpdateUpdatedAtOfCustomersTable
ON Customers
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Customers
    SET UpdatedAt = SYSDATETIME()
    FROM Customers
    INNER JOIN inserted ON Customers.Id = inserted.Id;
END;

CREATE TRIGGER TRG_UpdateUpdatedAtOfAccountsTable
ON Accounts
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Accounts
    SET UpdatedAt = SYSDATETIME()
    FROM Accounts
    INNER JOIN inserted ON Accounts.Id = inserted.Id;
END;

