export function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Authentication failed. Please try again.';
}

export function getFriendlyRoleName(role: string) {
  switch (role) {
    case 'recruiter':
      return 'Recruiter';
    case 'mentor':
      return 'Mentor';
    case 'alumni':
      return 'Alumni';
    case 'admin':
      return 'Admin';
    default:
      return 'Student';
  }
}
