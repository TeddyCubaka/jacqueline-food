-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total" REAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "updateBy" TEXT,
    "createBy" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isDeleted" BOOLEAN DEFAULT false,
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("clientId", "createBy", "createdAt", "currencyId", "id", "isClosed", "isDeleted", "referenceNumber", "status", "total", "updateBy", "updatedAt") SELECT "clientId", "createBy", "createdAt", "currencyId", "id", "isClosed", "isDeleted", "referenceNumber", "status", "total", "updateBy", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
