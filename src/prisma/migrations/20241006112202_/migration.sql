/*
  Warnings:

  - You are about to drop the column `created_at` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Project` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "created_at",
DROP COLUMN "group_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TEXT NOT NULL;
