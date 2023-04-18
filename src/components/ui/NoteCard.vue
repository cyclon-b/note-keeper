<template>
  <div class="card mb-4">
    <header class="card-header">
      <p class="card-header-title">
        {{ noteData.title }}
      </p>
      <button aria-label="more options" class="card-header-icon">
        <span class="icon">
          <i aria-hidden="true" class="fas fa-angle-down"></i>
        </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content">
        {{ noteData.content }}
        <br />
        <div class="has-text-right has-text-grey-light">
          <small>Characters count: {{ noteData.charactersCount }}</small>
        </div>
        <div class="has-text-right has-text-grey-light">
          <small>
            <time v-if="noteData.publishDate" :datetime="noteData.publishDate"
              >{{ noteData.publishDate }}
            </time>
          </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink class="card-footer-item" :to="`/edit-note/${noteData.id}`">Edit</RouterLink>
      <a class="card-footer-item" href="#" @click="deleteNote(noteData.id)">Delete</a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import type { NoteModel } from '@/models/note.model';

const props = defineProps<{ noteData: NoteModel }>();
const emit = defineEmits<{
  (e: 'deleteNote', id: string): void;
}>();

const deleteNote = (id: string) => {
  emit('deleteNote', id);
};
</script>

<style lang="scss" scoped></style>
