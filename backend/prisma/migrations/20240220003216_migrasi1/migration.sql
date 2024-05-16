-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fost" (
    "id" SERIAL NOT NULL,
    "post" TEXT NOT NULL,

    CONSTRAINT "fost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registertest" (
    "id" SERIAL NOT NULL,
    "post" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "registertest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
