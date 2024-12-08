/*
  Warnings:

  - Added the required column `exchangeRate` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Currency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "exchangeRate" REAL NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "updateBy" TEXT,
    "createBy" TEXT,
    "isDeleted" BOOLEAN DEFAULT false
);
INSERT INTO "new_Currency" ("createBy", "createdAt", "id", "isDeleted", "name", "updateBy", "updatedAt") SELECT "createBy", "createdAt", "id", "isDeleted", "name", "updateBy", "updatedAt" FROM "Currency";
DROP TABLE "Currency";
ALTER TABLE "new_Currency" RENAME TO "Currency";
CREATE UNIQUE INDEX "Currency_id_key" ON "Currency"("id");
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
