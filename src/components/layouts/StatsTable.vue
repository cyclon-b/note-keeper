<template>
  <table class="table">
    <thead>
      <tr>
        <th>Metric name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Notes count</td>
        <td>{{ notesCount }}</td>
      </tr>
      <tr>
        <td>Total characters</td>
        <td>{{ totalCharactersCount }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { NoteModel } from '@/models/note.model';
import { computed } from 'vue';
import { reduce as _reduce } from 'lodash-es';

const props = defineProps<{ notes: NoteModel[] }>();

const notesCount = computed(() => {
  return props.notes.length;
});

const totalCharactersCount = computed(() => {
  return _reduce(props.notes, (acc: number, note: NoteModel) => acc + note?.charactersCount, 0);
});
</script>

<style lang="scss" scoped></style>
