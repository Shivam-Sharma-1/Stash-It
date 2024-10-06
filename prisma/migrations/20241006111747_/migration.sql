/*
  Warnings:

  - You are about to drop the column `cid` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `keyvalues` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `mime_type` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `number_of_files` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Project` table. All the data in the column will be lost.
  - Added the required column `pinataUserId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "cid",
DROP COLUMN "keyvalues",
DROP COLUMN "mime_type",
DROP COLUMN "number_of_files",
DROP COLUMN "size",
ADD COLUMN     "pinataUserId" TEXT NOT NULL,
ADD COLUMN     "updated_at" TEXT NOT NULL,
ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE TEXT;
