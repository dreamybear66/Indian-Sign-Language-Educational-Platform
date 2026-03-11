-- CreateTable
CREATE TABLE "signs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "duration_ms" INTEGER,
    "dominant_hand" TEXT NOT NULL DEFAULT 'RIGHT',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "supported_sentences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gloss" TEXT NOT NULL,
    "words" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "signs_word_key" ON "signs"("word");

-- CreateIndex
CREATE UNIQUE INDEX "supported_sentences_gloss_key" ON "supported_sentences"("gloss");
