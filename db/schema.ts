import { pgTable, pgEnum, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';

export const quoteStatus = pgEnum('quote_status', ['new', 'contacted', 'completed']);
export const quotes = pgTable('quotes', {
  id: uuid('id').defaultRandom().primaryKey(),
  submissionId: uuid('submission_id').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull().default(''),
  subject: text('subject').notNull().default(''),
  projectType: text('project_type').notNull().default('Other'),
  message: text('message').notNull(),
  status: quoteStatus('status').notNull().default('new'),
  notes: text('notes').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, table => [index('quotes_created_at_idx').on(table.createdAt), index('quotes_status_idx').on(table.status)]);
