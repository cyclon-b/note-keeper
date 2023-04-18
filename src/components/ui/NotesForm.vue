<template>
  <form>
    <div class="card p-4 my-4" :class="backgroundColor">
      <header class="card-header">
        <p class="card-header-title has-text-white">{{ formTitle }}</p>
      </header>
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            v-autofocus
            :maxlength="maxLengthTitle"
            :placeholder="placeholderTitle"
            :value="title"
            class="input is-success"
            required
            type="text"
            @input="$emit('update:title', $event.target.value)"
          />
          <span class="icon is-small is-left">
            <i class="fa fa-header"></i>
          </span>
        </div>
      </div>
      <WarningMessage
        v-if="showTitleWarning"
        :message-content="`Max length of title: ${maxLengthTitle} characters`"
        message-title="Warning"
        severity="is-warning"
      />
      <div class="field">
        <div class="control">
          <textarea
            :maxlength="maxLengthContent"
            :placeholder="placeholderContent"
            :value="content"
            class="textarea"
            required
            @input="$emit('update:content', $event.target.value)"
          ></textarea>
        </div>
        <WarningMessage
          v-if="showContentWarning"
          :message-content="`Max length of title: ${maxLengthContent} characters`"
          message-title="Warning"
          severity="is-warning"
        />
      </div>
      <slot name="submitButton"></slot>
    </div>
  </form>
</template>

<script lang="ts" setup>
import WarningMessage from '@/components/ui/WarningMessage.vue';
import { vAutofocus } from '@/directives/vAutofocus';
import type { BackgroundClasses } from '@/models/basic.model';

const emit = defineEmits<{
  (e: 'update:title', value: string): void;
  (e: 'update:content', value: string): void;
}>();

const props = defineProps<{
  title: string;
  content: string;
  placeholderTitle: string;
  placeholderContent: string;
  backgroundColor?: BackgroundClasses;
  maxLengthContent?: number;
  maxLengthTitle?: number;
  formTitle?: string;
  showTitleWarning?: boolean;
  showContentWarning?: boolean;
}>();
</script>

<style lang="scss" scoped></style>
