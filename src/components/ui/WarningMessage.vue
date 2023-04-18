<template>
  <article class="message mt-4" :class="severity">
    <div class="message-header">
      <p>{{ messageTitle }}</p>
    </div>
    <div class="message-body">
      {{ messageContent }}
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { SeverityClasses } from '@/models/basic.model';

const props = defineProps<{
  messageTitle: string;
  messageContent: string;
  severity: SeverityClasses;
}>();
</script>

<style lang="scss" scoped></style>
