/*
  Warnings:

  - Made the column `compileOutput` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "compileOutput" SET NOT NULL;
