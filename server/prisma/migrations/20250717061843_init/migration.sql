-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'RESERVED', 'SOLD');

-- CreateTable
CREATE TABLE "Number" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',
    "reservedBy" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "reservedAt" TIMESTAMP(3),

    CONSTRAINT "Number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Number_number_key" ON "Number"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
