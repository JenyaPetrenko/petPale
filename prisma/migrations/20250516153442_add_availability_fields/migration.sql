/*
  Warnings:

  - You are about to drop the column `availability` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
-- Перейменування колонки
-- Перейменування існуючої колонки availabilityTo -> availabilityUntil
ALTER TABLE "User" RENAME COLUMN "availabilityTo" TO "availabilityUntil";

-- Додавання нових колонок availabilityFrom і availabilityTo
ALTER TABLE "User" 
ADD COLUMN "availabilityFrom" TIMESTAMP(3),
ADD COLUMN "availabilityTo" TIMESTAMP(3);