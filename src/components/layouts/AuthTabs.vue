<template>
  <div class="tabs">
    <ul>
      <li :class="{ 'is-active': !authViewState.isRegister }">
        <a @click="authViewState.isRegister = false">Login</a>
      </li>
      <li :class="{ 'is-active': authViewState.isRegister }">
        <a @click="authViewState.isRegister = true">Register</a>
      </li>
    </ul>
  </div>

  <LoginForm
    v-if="!authViewState.isRegister"
    v-model:email="authViewState.email"
    v-model:password="authViewState.password"
    @confirm-login="confirmLogin()"
  />
  <RegisterForm
    v-if="authViewState.isRegister"
    v-model:email="authViewState.email"
    v-model:password="authViewState.password"
    @confirm-register="confirmRegister()"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import LoginForm from '@/components/ui/LoginForm.vue';
import RegisterForm from '@/components/ui/RegisterForm.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'

const auth = useAuthStore();
const router = useRouter();

const authViewState = reactive({
  email: '',
  password: '',
  isRegister: false
});

const confirmRegister = () => {
  auth.credentials.email = authViewState.email;
  auth.credentials.password = authViewState.password;
  auth.register();
};

const confirmLogin = () => {
  auth.credentials.email = authViewState.email;
  auth.credentials.password = authViewState.password;
  auth.login();
};
</script>

<style lang="scss" scoped></style>
