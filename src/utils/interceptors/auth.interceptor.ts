import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export function authInterceptor() {
  axios.interceptors.request.use((request) => {
    const auth = useAuthStore();
    request.headers.Authorization = `Bearer ${auth.userData.token}`;
    return request;
  });
}
