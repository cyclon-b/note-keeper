<template>
  <div class="edit-note">
    <NotesForm
      v-model:content="editNotFormModel.content"
      v-model:show-content-warning="editNotFormModel.warningContent"
      v-model:show-title-warning="editNotFormModel.warningTitle"
      v-model:title="editNotFormModel.title"
      :form-title="'Edit note'"
      :max-length-content="150"
      :max-length-title="30"
      :placeholder-content="'Edit a note'"
      :placeholder-title="'Adit a title'"
      :background-color="'has-background-info-dark'"
    >
      <template #submitButton>
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button
              :disabled="!editNotFormModel.title || !editNotFormModel.content"
              class="button is-link is-info"
              @click.prevent="editNote"
            >
              <span class="icon"><i class="fa fa-pencil-square"></i></span><span>Save edited</span>
            </button>
          </div>
        </div>
      </template>
    </NotesForm>
  </div>
</template>

<script lang="ts" setup>
import NotesForm from '@/components/ui/NotesForm.vue';
import { reactive } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { useRoute, useRouter } from 'vue-router';
import { toInteger as _toInteger } from 'lodash-es';

const notes = useNotesStore();
const route = useRoute();
const router = useRouter();

const editNotFormModel = reactive({
  title: notes.getNoteById(_toInteger(route.params.id))?.title || '',
  content: notes.getNoteById(_toInteger(route.params.id))?.content || '',
  warningTitle: false,
  warningContent: false
});

const editNote = () => {
  notes.editNote({
    title: editNotFormModel.title,
    content: editNotFormModel.content,
    noteId: _toInteger(route.params.id)
  });
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
