import { AuthError, MissingIdentityError } from '@netlify/identity';

export function authErrorMessage(error, mode = 'login') {
  if (error instanceof MissingIdentityError) return 'Sign-in is not available on this site. Please contact the site owner.';
  if (error instanceof AuthError) {
    if (error.status === 429) return 'Too many attempts. Please wait a few minutes and try again.';
    if (error.status === 403) return 'Sign-in is restricted. Accept your account invitation and confirm your email before trying again.';
    if (error.status === 422) return 'Please check your email address and password requirements.';
    if (mode === 'login' && [400, 401, 404].includes(error.status)) return 'Unable to sign in. Check your email and password. If this is your first sign-in, accept your account invitation first.';
    if (!error.status || error.status >= 500) return 'The sign-in service is currently unavailable. Check your connection and try again.';
  }
  return mode === 'login' ? 'Unable to sign in. Please try again or use Forgot your password.' : 'Unable to complete the request. Request a new invitation or password reset link and try again.';
}
