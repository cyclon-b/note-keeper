import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useStoredAuthData } from '@/use/auth/useStoredAuthData';
import axios from 'axios';
import type { AppUserData, AuthModel, AuthPayload, AuthResponseData } from '@/models/auth.model';
import { URL_API_LOGIN, URL_API_REGISTER } from '@/utils/misc/constants';
import { useJwt } from '@vueuse/integrations/useJwt';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
  const authData = useStoredAuthData();
  const router = useRouter();
  const isLoggedIn = ref(false);

  const credentials: AuthModel = reactive({
    email: '',
    password: ''
  });

  const userData: AppUserData = reactive({
    token: '',
    userId: '',
    userEmail: ''
  });

  const login = () => {
    if (!isLoggedIn.value) {
      axios
        .post(URL_API_LOGIN, {
          ...credentials
        })
        .then((resp) => {
          setLoginState(resp.data);
          isLoggedIn.value = true;
          router.push('/');
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };

  const register = () => {
    if (!isLoggedIn.value) {
      axios
        .post(URL_API_REGISTER, {
          ...credentials
        })
        .then((resp) => {
          setLoginState(resp.data);
          isLoggedIn.value = true;
          router.push('/');
        })
        .catch((err) => {
          console.warn(err);
          alert(err.response.data);
        });
    }
  };

  const setLoginState = (data: AuthResponseData) => {
    userData.token = data.accessToken;
    userData.userId = useJwt(userData.token).payload.value?.sub;
    userData.userEmail = (useJwt(userData.token).payload.value as AuthPayload)?.email;
    authData.storedAuthToken.value = data.accessToken;
  };

  const logout = () => {
    userData.token = '';
    userData.userId = '';
    userData.userEmail = '';
    isLoggedIn.value = false;
    authData.storedAuthToken.value = null;
    router.push('/auth');
  };

  const setAuthState = (): boolean => {
    if (!!authData.storedAuthToken.value && !!authData.storedAuthToken.value.length) {
      isLoggedIn.value = true;
      userData.token = authData.storedAuthToken.value;
      userData.userId = useJwt(userData.token).payload.value?.sub;
      userData.userEmail = (useJwt(userData.token).payload.value as AuthPayload)?.email;
      return true;
    } else {
      return false;
    }
  };

  return {
    credentials,
    userData,
    isLoggedIn,
    login,
    register,
    checkLoginStatus: setAuthState,
    logout
  };
});
