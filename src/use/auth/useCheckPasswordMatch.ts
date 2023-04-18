export function useCheckPasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}