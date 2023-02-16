/*
  Warnings:

  - You are about to drop the `Change` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `availableChange` to the `VendingMachine` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Change";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "machineId" TEXT NOT NULL,
    CONSTRAINT "Products_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "VendingMachine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("description", "id", "machineId", "name", "price") SELECT "description", "id", "machineId", "name", "price" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE TABLE "new_VendingMachine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalSales" REAL NOT NULL DEFAULT 0,
    "availableChange" INTEGER NOT NULL,
    "productSlots" INTEGER NOT NULL
);
INSERT INTO "new_VendingMachine" ("id", "productSlots", "totalSales") SELECT "id", "productSlots", "totalSales" FROM "VendingMachine";
DROP TABLE "VendingMachine";
ALTER TABLE "new_VendingMachine" RENAME TO "VendingMachine";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
