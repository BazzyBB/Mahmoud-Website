CREATE TYPE "quote_status" AS ENUM('new', 'contacted', 'completed');--> statement-breakpoint
CREATE TABLE "quotes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"submission_id" uuid NOT NULL UNIQUE,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text DEFAULT '' NOT NULL,
	"subject" text DEFAULT '' NOT NULL,
	"project_type" text DEFAULT 'Other' NOT NULL,
	"message" text NOT NULL,
	"status" "quote_status" DEFAULT 'new'::"quote_status" NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "quotes_created_at_idx" ON "quotes" ("created_at");--> statement-breakpoint
CREATE INDEX "quotes_status_idx" ON "quotes" ("status");