ALTER TABLE "leads" ADD COLUMN "ai_type" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "ai_industry" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "ai_priority" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "ai_features" text[];--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "ai_suggested_reply" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "ai_classified_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "replied_at" timestamp with time zone;