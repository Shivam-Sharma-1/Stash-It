/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[groupId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_groupId_key" ON "Project"("groupId");
