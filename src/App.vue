<template>
  <NavBar :is-logged-in="auth.isLoggedIn" @logout="auth.logout" />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import NavBar from '@/components/ui/NavBar.vue';
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount } from 'vue';

const auth = useAuthStore();

onBeforeMount(() => {
  auth.checkLoginStatus();
});
</script>

<style scoped lang="scss"></style>
