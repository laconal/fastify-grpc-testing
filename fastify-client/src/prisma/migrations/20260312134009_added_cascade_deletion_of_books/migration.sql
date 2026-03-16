-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorID_fkey";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
