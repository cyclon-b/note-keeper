<template>
  <div class="view-notes-list">
    <NotesList />
    <ProgressBar v-if="notes.isLoading" :value="65" class="my-3" severity="is-success" />
  </div>
</template>

<script lang="ts" setup>
import NotesList from '@/components/layouts/NotesList.vue';
import { onMounted } from 'vue';
import { useNotesStore } from '@/stores/notes';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import { useAuthStore } from '@/stores/auth';

const notes = useNotesStore();
const auth = useAuthStore();

onMounted(() => notes.fetchNotes(auth?.userData?.userId || ''));
</script>

<style lang="scss" scoped></style>
