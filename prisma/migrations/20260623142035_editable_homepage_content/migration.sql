-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconKey" TEXT NOT NULL DEFAULT 'clinic',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "iconKey" TEXT NOT NULL DEFAULT 'hospital',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StaffProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Service_isVisible_idx" ON "Service"("isVisible");

-- CreateIndex
CREATE INDEX "Service_sortOrder_idx" ON "Service"("sortOrder");

-- CreateIndex
CREATE INDEX "Facility_isVisible_idx" ON "Facility"("isVisible");

-- CreateIndex
CREATE INDEX "Facility_sortOrder_idx" ON "Facility"("sortOrder");

-- CreateIndex
CREATE INDEX "StaffProfile_isVisible_idx" ON "StaffProfile"("isVisible");

-- CreateIndex
CREATE INDEX "StaffProfile_sortOrder_idx" ON "StaffProfile"("sortOrder");
