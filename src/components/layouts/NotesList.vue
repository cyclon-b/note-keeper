<template>
  <NotesForm
    v-model:content="addNoteFormState.content"
    v-model:show-content-warning="addNoteFormState.warningContent"
    v-model:show-title-warning="addNoteFormState.warningTitle"
    v-model:title="addNoteFormState.title"
    :background-color="'has-background-success-dark'"
    :form-title="'New note'"
    :max-length-content="150"
    :max-length-title="30"
    :placeholder-content="'Add a note'"
    :placeholder-title="'Add a title'"
  >
    <template #submitButton>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            :disabled="!addNoteFormState.title || !addNoteFormState.content"
            class="button is-link is-success"
            @click.prevent="newNote"
          >
            <span class="icon"><i class="fa fa-plus-square"></i></span><span>Add Note</span>
          </button>
        </div>
      </div>
    </template>
  </NotesForm>
  <NoteCard
    v-for="note in notes.notes"
    :key="note.id"
    :note-data="note"
    @delete-note="deleteNote($event)"
  />
  <ConfirmModal
    v-if="deleteNoteState.showConfirmModal"
    v-model:show-confirm-modal="deleteNoteState.showConfirmModal"
    cancel-button-text="Cancel"
    confirm-button-text="Delete"
    modal-content="Are you sure to delete this note?"
    modal-title="Delete note"
    @confirm="deleteNoteConfirm"
  />
</template>

<script lang="ts" setup>
import { reactive, ref, toRef } from 'vue';
import NoteCard from '@/components/ui/NoteCard.vue';
import NotesForm from '@/components/ui/NotesForm.vue';
import { useNotesStore } from '@/stores/notes';
import { useWatchCharacters } from '@/use/useWatchCharacters';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { toInteger as _toInteger } from 'lodash-es';

const notes = useNotesStore();
const confirmModalRef = ref(null);

const addNoteFormState = reactive({
  title: '',
  content: '',
  warningTitle: false,
  warningContent: false
});

const deleteNoteState = reactive({
  showConfirmModal: false,
  noteForDeleteId: ''
});

const newNote = (): void => {
  notes.addNote(addNoteFormState);
  resetAddForm();
};

const resetAddForm = () => {
  addNoteFormState.title = '';
  addNoteFormState.content = '';
};

const deleteNote = (id: string) => {
  deleteNoteState.showConfirmModal = true;
  deleteNoteState.noteForDeleteId = id;
};

const deleteNoteConfirm = () => {
  notes.deleteNote(_toInteger(deleteNoteState.noteForDeleteId));
  deleteNoteState.showConfirmModal = false;
};

useWatchCharacters(toRef(addNoteFormState, 'title'), toRef(addNoteFormState, 'warningTitle'), 30);
useWatchCharacters(
  toRef(addNoteFormState, 'content'),
  toRef(addNoteFormState, 'warningContent'),
  150
);
</script>

<style lang="scss" scoped></style>
