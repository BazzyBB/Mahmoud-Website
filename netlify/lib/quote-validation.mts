export const statuses = ['new', 'contacted', 'completed'] as const;
export const projectTypes = ['Live-edge & epoxy tables', 'Cabinets & built-ins', 'Jewelry & retail displays', 'Jeweler benches', 'Other'] as const;
export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateSubmission(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Please provide your project details.');
  const body = input as Record<string, unknown>;
  const field = (key: string, min: number, max: number) => {
    const value = body[key] === undefined ? '' : body[key];
    if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) throw new Error(`Please check the ${key} field.`);
    return value.trim();
  };
  const submissionId = field('submissionId', 36, 36);
  if (!uuidPattern.test(submissionId)) throw new Error('Please refresh the page and try again.');
  const name = field('name', 2, 120);
  const email = field('email', 3, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Please enter a valid email address.');
  const phoneNumber = field('phoneNumber', 0, 40);
  if (phoneNumber && !/^[+\d\s().-]+$/.test(phoneNumber)) throw new Error('Please check your phone number.');
  const subject = field('subject', 0, 200);
  const message = field('message', 10, 5000);
  const projectType = field('projectType', 1, 80);
  if (!projectTypes.includes(projectType as typeof projectTypes[number])) throw new Error('Please choose a project type.');
  return { submissionId, name, email, phoneNumber, subject, message, projectType };
}

export function validateUpdate(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid update.');
  const { status, notes } = input as Record<string, unknown>;
  if (!statuses.includes(status as typeof statuses[number])) throw new Error('Invalid status.');
  if (typeof notes !== 'string' || notes.length > 5000) throw new Error('Notes must not exceed 5000 characters.');
  return { status: status as typeof statuses[number], notes: notes.trim() };
}

export function isAdmin(user: { roles?: string[]; appMetadata?: Record<string, unknown> } | null | undefined) {
  const roles = user?.appMetadata?.roles;
  const authorization = user?.appMetadata?.authorization;
  const nestedRoles = authorization && typeof authorization === 'object'
    ? (authorization as Record<string, unknown>).roles : undefined;
  return Boolean(user?.roles?.includes('admin') || (Array.isArray(roles) && roles.includes('admin'))
    || (Array.isArray(nestedRoles) && nestedRoles.includes('admin')));
}
