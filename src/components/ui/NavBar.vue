<template>
  <nav
    ref="navMenuContainerRef"
    aria-label="main navigation"
    class="navbar is-success"
    role="navigation"
  >
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <RouterLink class="navbar-item has-text-weight-bold is-size-3" to="/">NoteKeeper</RouterLink>

        <a
          ref="navMenuRef"
          :class="{ 'is-active': showMobileNav }"
          aria-expanded="false"
          aria-label="menu"
          class="navbar-burger"
          data-target="mainNavbar"
          role="button"
          @click.prevent="showMobileNav = !showMobileNav"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="mainNavbar" :class="{ 'is-active': showMobileNav }" class="navbar-menu">
        <div class="navbar-start"></div>

        <div class="navbar-end">
          <RouterLink active-class="is-active" class="navbar-item" to="/"> Notes</RouterLink>

          <RouterLink active-class="is-active" class="navbar-item" to="/stats"> Stats</RouterLink>
          <a v-if="isLoggedIn" class="navbar-item" href="#" @click.prevent="$emit('logout')"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const navMenuRef = ref(null);
const navMenuContainerRef = ref(null);
const showMobileNav = ref(false);

onClickOutside(
  navMenuRef,
  () => {
    showMobileNav.value = false;
  },
  {
    ignore: [navMenuContainerRef]
  }
);

const emit = defineEmits<{
  (e: 'logout'): void;
}>();
const props = defineProps<{
  isLoggedIn?: boolean;
}>();
</script>

<style lang="scss" scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100vw;
  }
}
</style>
