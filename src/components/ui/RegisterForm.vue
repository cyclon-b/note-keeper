<template>
  <div class="columns">
    <div class="card column is-half mx-auto">
      <div class="card-content is-flex-direction-row is-justify-content-center">
        <div class="content">
          <form>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="formData.email"
                  class="input"
                  placeholder="Email"
                  required
                  type="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="formData.password"
                  :class="{
                    'is-danger': !useCheckPasswordMatch(formData.password, formData.confirmPassword)
                  }"
                  class="input"
                  placeholder="Password"
                  required
                  type="password"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password confirmation</label>
              <div class="control">
                <input
                  v-model="formData.confirmPassword"
                  :class="{
                    'is-danger': !useCheckPasswordMatch(formData.password, formData.confirmPassword)
                  }"
                  class="input"
                  placeholder="Password again"
                  required
                  type="password"
                />
              </div>
            </div>
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button
                  :disabled="
                    !formData.email.length ||
                    !formData.email.length ||
                    !useCheckPasswordMatch(formData.password, formData.confirmPassword)
                  "
                  class="button is-link is-success"
                  @click.prevent="
                    $emit('update:email', formData.email);
                    $emit('update:password', formData.password);
                    $emit('confirm-register');
                  "
                >
                  <span class="icon"><i class="fa fa-user-plus"></i></span><span>Register</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCheckPasswordMatch } from '@/use/auth/useCheckPasswordMatch';
import { reactive } from 'vue';

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});
const props = defineProps<{
  email: string;
  password: string;
}>();

const emit = defineEmits<{
  (e: 'update:email', value: string): void;
  (e: 'update:password', value: string): void;
  (e: 'confirm-register'): void;
}>();
</script>

<style lang="scss" scoped></style>
