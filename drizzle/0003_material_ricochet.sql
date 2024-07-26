ALTER TABLE "projects" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "projects" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "isPro" DROP NOT NULL;