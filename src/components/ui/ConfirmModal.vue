<template>
  <div :class="showConfirmModal ? 'is-active' : ''" class="modal">
    <div class="modal-background"></div>
    <div ref="modalRef" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button
          aria-label="close"
          class="delete"
          @click="$emit('update:showConfirmModal', false)"
        ></button>
      </header>
      <section class="modal-card-body">
        {{ modalContent }}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="$emit('confirm')">{{ confirmButtonText }}</button>
        <button class="button" @click="$emit('update:showConfirmModal', false)">
          {{ cancelButtonText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const modalRef = ref(null);
const props = defineProps<{
  modalTitle: string;
  modalContent: string;
  confirmButtonText: string;
  cancelButtonText: string;
  showConfirmModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'update:showConfirmModal', value: boolean): void;
}>();

onClickOutside(modalRef, () => {
  emit('update:showConfirmModal', false);
});
</script>

<style lang="scss" scoped></style>
