-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "accommodationPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "onlinePrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "presentialPrice" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "isOnline" BOOLEAN NOT NULL,
    "withAccommodation" BOOLEAN NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
