export function useRouteTransition(pathname) {
  if (
    pathname === '/signin' ||
    pathname === '/signup' ||
    pathname.startsWith('/verify-certificate') ||
    pathname.startsWith('/auth/callback')
  ) {
    return 'minimal';
  }

  if (
    pathname.startsWith('/solve') ||
    pathname.startsWith('/challenge') ||
    pathname.startsWith('/course-challenge') ||
    pathname.startsWith('/course-project')
  ) {
    return 'challenge';
  }

  if (
    pathname.startsWith('/courses/') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/code-verification')
  ) {
    return 'lesson';
  }

  return 'dashboard';
}
