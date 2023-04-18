import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { NoteModel } from '@/models/note.model';
import { useArrayFilter, useDateFormat, useNow } from '@vueuse/core';
import { findIndex as _findIndex, replace as _replace, find as _find } from 'lodash-es';
import axios from 'axios';
import { URL_API_NOTES } from '@/utils/misc/constants';
import { useAuthStore } from '@/stores/auth';

export const useNotesStore = defineStore('notesStore', () => {
  const notes = ref([] as NoteModel[]);
  const isLoading = ref(false);
  const auth = useAuthStore();
  const addNote = (note: { title: string; content: string }) => {
    const publishDate = useDateFormat(useNow(), 'DD/MM/YYYY HH:mm:ss');
    const charCount = _replace(note.content, ' ', '').length;
    const newNote = {
      title: note.title,
      content: note.content,
      publishDate: publishDate.value,
      charactersCount: charCount,
      userId: auth.userData.userId
    } as NoteModel;

    axios
      .post(URL_API_NOTES, { ...newNote })
      .then((savedNote) => (notes.value = [...notes.value, savedNote.data]));
  };

  const editNote = (note: { title: string; content: string; noteId: number }) => {
    const charCount = _replace(note.content, ' ', '').length;
    const newNote = {
      title: note.title,
      content: note.content,
      charactersCount: charCount,
      publishDate: getNoteById(note.noteId)?.publishDate,
      userId: auth.userData.userId
    } as NoteModel;

    axios.put(`${URL_API_NOTES}/${note.noteId}`, { ...newNote }).then((savedNote) => {
      const index = _findIndex(notes.value, (item) => item.id === note.noteId);
      notes.value[index] = savedNote.data;
    });
  };

  const getNoteById = (noteId: number): NoteModel => {
    return _find([...notes.value], (note) => note.id === noteId) as NoteModel;
  };

  const deleteNote = (e: number): void => {
    axios.delete(`${URL_API_NOTES}/${e}`).then(() => {
      notes.value = useArrayFilter([...notes.value], (note) => note.id !== e).value;
    });
  };

  const fetchNotesByUserId = (userId = ''): void => {
    isLoading.value = true;
    axios
      .get(URL_API_NOTES, {
        params: {
          userId
        }
      })
      .then((resp) => {
        isLoading.value = false;
        notes.value = resp.data;
      });
  };

  return {
    notes,
    isLoading,
    addNote,
    deleteNote,
    fetchNotes: fetchNotesByUserId,
    editNote,
    getNoteById
  };
});
