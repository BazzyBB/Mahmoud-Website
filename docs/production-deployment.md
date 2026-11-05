# Production deployment with Netlify Database

## Verified configuration

The Netlify project uses `npm run build` and publishes `dist`. Drizzle reads `db/schema.ts` and writes migrations to `netlify/database/migrations`, where Netlify discovers them automatically.

The existing `20261105043208_create_quote_requests` migration creates the quote status enum, quotes table and two indexes. It contains no DROP, TRUNCATE, DELETE or UPDATE statements. Keep this applied migration unchanged.

The preview database status check reported one applied migration and zero pending migrations. This describes the preview branch, not production. Production migration history was not verified by this check.

## Publish the latest version

Use **Publish on the agent run page** for this workspace. Alternatively, merge the branch containing all latest application files and the migration into the configured GitHub production branch, `main`. That triggers a new production build.

Do not use the Deploy Preview action that promotes existing preview artifacts to production: Netlify does not support that operation for database-backed sites. Retrying that action or changing the frontend will not resolve the restriction. Retrying the existing production build before the latest code reaches main will not publish workspace-only changes.

Let Netlify apply any outstanding production migrations during deployment. Do not add manual migration execution to the build command. Do not reset, delete, recreate or unlink the database, and do not import the preview database over production. Preview-only quote requests are separate from production records and are not automatically transferred.

## Verify the release

In the Netlify project's Deploys list, verify that the new deploy has the production context, the expected latest source revision and a successful published state. If a migration fails, inspect that deployment's migration error instead of resetting the database or changing an applied migration.

After publication, verify the updated homepage and submit one clearly identified test quote. Sign in to `/admin` with an administrator account, confirm the test quote appears and check that previous production quotes remain present. The first administrator still requires an accepted Identity invitation and the admin role.

## Verification in this run

Server TypeScript checks, quote validation and authorization tests, and SEO checks for 13 public pages passed. No production deployment was triggered, no database records were changed, no database was reset, and no migrations were manually applied.
