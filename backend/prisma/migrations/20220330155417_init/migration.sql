-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
