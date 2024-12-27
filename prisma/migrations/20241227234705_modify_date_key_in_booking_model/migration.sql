/*
  Warnings:

  - You are about to drop the column `data` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `date` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "serviceType" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "updateBy" TEXT,
    "createBy" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isDeleted" BOOLEAN DEFAULT false,
    CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("clientId", "createBy", "createdAt", "id", "isDeleted", "place", "serviceType", "updateBy", "updatedAt") SELECT "clientId", "createBy", "createdAt", "id", "isDeleted", "place", "serviceType", "updateBy", "updatedAt" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_id_key" ON "Booking"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
