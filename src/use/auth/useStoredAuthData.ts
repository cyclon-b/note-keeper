import { useStorage } from '@vueuse/core';

export function useStoredAuthData() {
  const storedAuthToken = useStorage('auth-token', '');

  return { storedAuthToken };
}
