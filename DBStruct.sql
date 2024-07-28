CREATE DATABASE CoffeManagement;

DROP TABLE IF EXISTS [Categories];
CREATE TABLE [Categories] (
  [Id] INT CONSTRAINT PK_Categories PRIMARY KEY IDENTITY(1, 1),
  [Name] NVARCHAR(255) NOT NULL,
  [Description] NVARCHAR(MAX) NOT NULL,
  [IsDeleted] BIT DEFAULT(0),
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
);

DROP TABLE IF EXISTS [Ingredients];
CREATE TABLE [Ingredients] (
  [Id] INT CONSTRAINT PK_Ingredients PRIMARY KEY IDENTITY(1, 1),
  [Name] NVARCHAR(255) NOT NULL UNIQUE,
  [Description] NVARCHAR(MAX) NOT NULL,
  [IsDeleted] BIT DEFAULT(0),
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
);

DROP TABLE IF EXISTS [Accounts];
CREATE TABLE [Accounts] (
  [Id] INT CONSTRAINT PK_Accounts PRIMARY KEY IDENTITY(1, 1),
  [Username] NVARCHAR(50) NOT NULL UNIQUE,
  [HashedPassword] NVARCHAR(100) NOT NULL,
  [Type] VARCHAR(10) DEFAULT('ACC_CUS'), -- ACC_CUS, ACC_STA
  [IsActivated] BIT DEFAULT(1),
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
);

DROP TABLE IF EXISTS [Branches];
CREATE TABLE [Branches] (
  [Id] INT CONSTRAINT PK_Branches PRIMARY KEY IDENTITY(1, 1),
  [Name] NVARCHAR(255) NOT NULL,
  [Address] NVARCHAR(1255) NOT NULL,
  [IsDeleted] BIT DEFAULT(0),
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
);

DROP TABLE IF EXISTS [Drinks];
CREATE TABLE [Drinks] (
  [Id] INT CONSTRAINT PK_Drinks PRIMARY KEY IDENTITY(1, 1),
  [Name] NVARCHAR(255) NOT NULL,
  [Image] VARCHAR(255) NOT NULL,
  [Description] NVARCHAR(MAX) NOT NULL,
  [CategoryId] INT,
  [IsDeleted] BIT DEFAULT(0),
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_Drinks_Categories FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]),
);

DROP TABLE IF EXISTS [DrinkSizes];
CREATE TABLE [DrinkSizes] (
  [Id] INT CONSTRAINT PK_DrinkSizes PRIMARY KEY IDENTITY(1, 1),
  [DrinkId] INT NOT NULL,
  [Size] NVARCHAR(255) NOT NULL,
  [Ratio] FLOAT NOT NULL,
  [Price] FLOAT NOT NULL,
  [IsDeleted] BIT DEFAULT(0),
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_DrinkSizes_Drinks FOREIGN KEY ([DrinkId]) REFERENCES [Drinks] ([Id]),
);

DROP TABLE IF EXISTS [DrinkRatings];
CREATE TABLE [DrinkRatings] (
  [Id] INT CONSTRAINT PK_DrinkRatings PRIMARY KEY IDENTITY(1, 1),
  [DrinkId] INT NOT NULL,
  [OrderId] INT NOT NULL,
  [Rating] DECIMAL(2,1) NOT NULL,
  [Content] NVARCHAR(MAX) NOT NULL,
  [FeedbackStaffId] INT,
  [Feedback] NVARCHAR(MAX),
  [FeedbackAt] DateTime,
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_DrinkRatings_Drinks FOREIGN KEY ([DrinkId]) REFERENCES [Drinks] ([Id]),
  CONSTRAINT FK_DrinkRatings_Orders FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([Id]),
  CONSTRAINT FK_DrinkRatings_Staffs FOREIGN KEY ([FeedbackStaffId]) REFERENCES [Staffs] ([Id]),
);

DROP TABLE IF EXISTS [Staffs];
CREATE TABLE [Staffs] (
  [Id] INT CONSTRAINT PK_Staffs PRIMARY KEY IDENTITY(1, 1),
  [FullName] NVARCHAR(50) NOT NULL,
  [Birthday] DATE NOT NULL,
  [Address] NVARCHAR(255) NOT NULL,
  [Avatar] NVARCHAR(255) NOT NULL,
  [CCCD] VARCHAR(20) NOT NULL,
  [Phone] VARCHAR(20) NOT NULL,
  [Email] VARCHAR(60) NOT NULL,
  [Salary] FLOAT DEFAULT(0),
  [OnJobDays] INT DEFAULT(0),
  [AsentDays] INT DEFAULT(0),
  [Position] VARCHAR(20) DEFAULT('POS_STAFF'), -- POS_STAFF, POS_ADMIN
  [BranchId] INT NOT NULL,
  [AccountId] INT,
  [IsDeleted] BIT DEFAULT(0),
  [IsActivated] BIT DEFAULT(1),
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_Staffs_Accounts FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]),
  CONSTRAINT FK_Staffs_Branchs FOREIGN KEY ([BranchId]) REFERENCES [Branches] ([Id])
);

DROP TABLE IF EXISTS [Customers];
CREATE TABLE [Customers] (
  [Id] INT CONSTRAINT PK_Customers PRIMARY KEY IDENTITY(1, 1),
  [FullName] NVARCHAR(50),
  [Phone] VARCHAR(20) NOT NULL,
  [Email] VARCHAR(60) NOT NULL,
  [Address] NVARCHAR(255) NOT NULL,
  [AccountId] INT,
  [IsDeleted] BIT DEFAULT(0),
  [IsActivated] BIT DEFAULT(1),
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_Customers_Accounts FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id])
);

DROP TABLE IF EXISTS [IngredientStocks];
CREATE TABLE [IngredientStocks] (
  [Id] INT CONSTRAINT PK_IngredientStocks PRIMARY KEY IDENTITY(1, 1),
  [IngredientId] INT,
  [Amount] FLOAT NOT NULL,
  [Remain] FLOAT NOT NULL,
  [Cost] FLOAT NOT NULL,
  [ReceivedAt] DateTime DEFAULT(GETDATE()),
  [ExpiredAt] DateTime NOT NULL,
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_IngredientStocks_Ingredients FOREIGN KEY ([IngredientId]) REFERENCES [Ingredients] ([Id]),
);

DROP TABLE IF EXISTS [Recipes];
CREATE TABLE [Recipes] (
  [Id] INT CONSTRAINT PK_Recipes PRIMARY KEY IDENTITY(1, 1),
  [DrinkId] INT NOT NULL,
  [Intructon] NVARCHAR(MAX) NOT NULL,
  [CreatedAt] DateTime DEFAULT(GETDATE()),
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_Recipes_Drinks FOREIGN KEY ([DrinkId]) REFERENCES [Drinks] ([Id])
);

DROP TABLE IF EXISTS [RecipeDetails];
CREATE TABLE [RecipeDetails] (
  [Id] INT CONSTRAINT PK_RecipeDetails PRIMARY KEY IDENTITY(1, 1),
  [RecipeId] INT NOT NULL,
  [IngredientId] INT NOT NULL,
  [Amount] FLOAT NOT NULL,
  CONSTRAINT FK_RecipeDetails_Recipes FOREIGN KEY ([RecipeId]) REFERENCES [Recipes] ([Id]),
  CONSTRAINT FK_RecipeDetails_Ingredients FOREIGN KEY ([IngredientId]) REFERENCES [Ingredients] ([Id]),
);

DROP TABLE IF EXISTS [Orders];
CREATE TABLE [Orders] (
  [Id] INT CONSTRAINT PK_Orders PRIMARY KEY IDENTITY(1, 1),
  [Type] VARCHAR(10) DEFAULT('ODR_OFF'), -- ODR_OFF, ODR_ON
  [StaffId] INT,
  [BranchId] INT NOT NULL,
  [CustomerId] INT,
  [VoucherId] INT,
  [ShippingAddress] NVARCHAR(255),
  [Status] VARCHAR(10) DEFAULT('ODR_INIT'), -- ODR_INIT, ODR_COMF, ODR_COML, ODR_CANL, ODR_SERV, ODR_SHIP, ODR_SHIPED, ODR_FAIL
  [PaymentMethod] VARCHAR(10) DEFAULT('PAY_CASH'), -- PAY_CASH, PAY_CCARD, PAY_INTBK
  [IsPaid] BIT DEFAULT(0),
  [CustomerNote] NVARCHAR(255),
  [StaffNote] NVARCHAR(255),
  [OrderdAt] DateTime DEFAULT(GETDATE()),
  [Discount] FLOAT DEFAULT(0),
  [TotalPrice] FLOAT NOT NULL,
  [StaffCanceledId] INT,
  [CanceledNote] NVARCHAR(255),
  [FailedComment] NVARCHAR(255),
  [CreatedAt] DateTime DEFAULT(GETDATE()), 
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
  CONSTRAINT FK_Orders_Branches FOREIGN KEY ([BranchId]) REFERENCES [Branches] ([Id]),
  CONSTRAINT FK_Orders_Staffs FOREIGN KEY ([StaffId]) REFERENCES [Staffs] ([Id]),
  CONSTRAINT FK_Orders_Customers FOREIGN KEY ([CustomerId]) REFERENCES [Customers] ([Id]),
  CONSTRAINT FK_Orders_Vouchers FOREIGN KEY ([VoucherId]) REFERENCES [Vouchers] ([Id]),
  CONSTRAINT FK_Orders_Staffs_Cancel FOREIGN KEY ([StaffCanceledId]) REFERENCES [Staffs] ([Id]),
);

DROP TABLE IF EXISTS [OrderDetails];
CREATE TABLE [OrderDetails] (
  [Id] INT CONSTRAINT PK_OrderDetails PRIMARY KEY IDENTITY(1, 1),
  [OrderId] INT NOT NULL,
  [DrinkId] INT NOT NULL,
  [DrinkSizeId] INT NOT NULL,
  [Quantity] INT NOT NULL,
  [Price] FLOAT NOT NULL,
  [TotalIngredientCost] FLOAT NOT NULL,
  [Note] NVARCHAR(255),
  CONSTRAINT FK_OrderDetails_Orders FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([Id]),
  CONSTRAINT FK_OrderDetails_Drinks FOREIGN KEY ([DrinkId]) REFERENCES [Drinks] ([Id]),
  CONSTRAINT FK_OrderDetails_DrinkSizes FOREIGN KEY ([DrinkSizeId]) REFERENCES [DrinkSizes] ([Id]),
);


DROP TABLE IF EXISTS [Vouchers];
CREATE TABLE [Vouchers] (
  [Id] INT CONSTRAINT PK_Vouchers PRIMARY KEY IDENTITY(1, 1),
  [Code] VARCHAR(10) NOT NULL UNIQUE,
  [Staus] VARCHAR(10) DEFAULT('VOUC_INIT'), -- VOUC_INIT, VOUC_USING
  [Discount] FLOAT NOT NULL,
  [Amount] INT NOT NULL,
  [Remain] Int NOT NULL,
  [ExpiredAt] DateTime NOT NULL,
  [CreatedAt] DateTime DEFAULT(GETDATE()), 
  [UpdatedAt] DateTime DEFAULT(GETDATE()),
);

DROP TABLE IF EXISTS [VoucherApplies];
CREATE TABLE [VoucherApplies] (
  [Id] INT CONSTRAINT PK_VoucherApplies PRIMARY KEY IDENTITY(1, 1),
  [VoucherId] INT NOT NULL,
  [DrinkId] Int NOT NULL,
  CONSTRAINT FK_VoucherApplies_Vouchers FOREIGN KEY ([VoucherId]) REFERENCES [Vouchers] ([Id]) ON DELETE CASCADE,
  CONSTRAINT FK_VoucherApplies_Drinks FOREIGN KEY ([DrinkId]) REFERENCES [Drinks] ([Id]),
);

-- TRIGGERS -- 