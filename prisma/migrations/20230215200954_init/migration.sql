/*
  Warnings:

  - You are about to alter the column `totalSales` on the `VendingMachine` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `type` on the `Change` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VendingMachine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalSales" REAL NOT NULL DEFAULT 0,
    "productSlots" INTEGER NOT NULL
);
INSERT INTO "new_VendingMachine" ("id", "productSlots", "totalSales") SELECT "id", "productSlots", "totalSales" FROM "VendingMachine";
DROP TABLE "VendingMachine";
ALTER TABLE "new_VendingMachine" RENAME TO "VendingMachine";
CREATE TABLE "new_Change" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" DECIMAL NOT NULL DEFAULT 0.25,
    "quantity" INTEGER NOT NULL DEFAULT 100,
    "machineId" TEXT NOT NULL,
    CONSTRAINT "Change_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "VendingMachine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Change" ("id", "machineId", "quantity") SELECT "id", "machineId", "quantity" FROM "Change";
DROP TABLE "Change";
ALTER TABLE "new_Change" RENAME TO "Change";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
