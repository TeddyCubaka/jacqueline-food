-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "isWhatsappOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "updateBy" TEXT,
    "createBy" TEXT,
    "isDeleted" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "Command" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total" REAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isClosed" TEXT NOT NULL,
    "updateBy" TEXT,
    "createBy" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isDeleted" BOOLEAN DEFAULT false,
    CONSTRAINT "Command_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Currency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Command_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "ProductCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommandLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "commandId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "updateBy" TEXT,
    "createBy" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isDeleted" BOOLEAN DEFAULT false,
    CONSTRAINT "CommandLine_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommandLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_key" ON "Client"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Command_id_key" ON "Command"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CommandLine_id_key" ON "CommandLine"("id");
