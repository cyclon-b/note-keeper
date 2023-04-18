<template>
  <div class="progress-bar">
    <progress class="progress" :class="severity" :value="value" max="100"></progress>
  </div>
</template>

<script setup lang="ts">
import type { SeverityClasses } from '@/models/basic.model';

const props = defineProps<{ value: number; severity: SeverityClasses }>();
</script>

<style scoped lang="scss"></style>
