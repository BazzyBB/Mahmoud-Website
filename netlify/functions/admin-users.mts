import type { Config } from '@netlify/functions';
import { admin, getUser } from '@netlify/identity';
import { manageUsers } from '../lib/admin-users.mjs';

export default async (req: Request) => manageUsers(req, await getUser(), admin);

export const config: Config = { path: '/api/admin/users' };
