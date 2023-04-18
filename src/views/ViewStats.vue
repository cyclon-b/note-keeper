<template>
  <div class="view-stats">
    <StatsTable :notes="notes.notes" />
  </div>
</template>

<script setup lang="ts">
import StatsTable from '@/components/layouts/StatsTable.vue';
import { useNotesStore } from '@/stores/notes';

const notes = useNotesStore();
</script>

<style scoped lang="scss"></style>
