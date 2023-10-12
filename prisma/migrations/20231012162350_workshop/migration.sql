-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT,
    "category_slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "event_name" TEXT,
    "event_slug" TEXT NOT NULL,
    "event_date" TIMESTAMP(3),
    "event_capacity" INTEGER NOT NULL,
    "cat_slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "event_location" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Attendee" (
    "attendee_id" SERIAL NOT NULL,
    "attendee_name" TEXT NOT NULL,
    "attendee_surname" TEXT NOT NULL,
    "attendee_email" TEXT NOT NULL,
    "attendee_mobile" TEXT,
    "attendee_subscribe" BOOLEAN NOT NULL DEFAULT false,
    "ev_slug" TEXT NOT NULL,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("attendee_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_slug_key" ON "Category"("category_slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_slug_key" ON "Event"("event_slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_cat_slug_fkey" FOREIGN KEY ("cat_slug") REFERENCES "Category"("category_slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_ev_slug_fkey" FOREIGN KEY ("ev_slug") REFERENCES "Event"("event_slug") ON DELETE RESTRICT ON UPDATE CASCADE;
