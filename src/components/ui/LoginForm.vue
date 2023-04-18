<template>
  <div class="columns">
    <div class="card column is-half mx-auto">
      <div class="card-content is-flex-direction-row is-justify-content-center">
        <div class="content">
          <form>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model='formData.email' class="input" placeholder="Email" required type="email"/>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input v-model="formData.password" class="input" placeholder="Password" required type="password" />
              </div>
            </div>
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button
                  :disabled="
                    !formData.email.length ||
                    !formData.password.length
                  "
                  class="button is-link is-success"
                  @click.prevent="
                    $emit('update:email', formData.email);
                    $emit('update:password', formData.password);
                    $emit('confirm-login');
                  "
                >
                  <span class="icon"><i class="fa fa-lock-open"></i></span><span>Login</span>
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
import { reactive } from 'vue'

const formData = reactive({
  email: '',
  password: '',
});

const props = defineProps<{
  email: string;
  password: string;
}>();

const emit = defineEmits<{
  (e: 'update:email', value: string): void;
  (e: 'update:password', value: string): void;
  (e: 'confirm-login'): void;
}>();
</script>

<style lang="scss" scoped></style>
