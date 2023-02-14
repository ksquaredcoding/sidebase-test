-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "VendingMachine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalSales" INTEGER NOT NULL DEFAULT 0,
    "productSlots" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Change" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "machineId" TEXT NOT NULL,
    CONSTRAINT "Change_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "VendingMachine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
