-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "serviceType" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "updateBy" TEXT,
    "createBy" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isDeleted" BOOLEAN DEFAULT false,
    CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_id_key" ON "Booking"("id");
