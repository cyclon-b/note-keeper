import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.scss';
import { authInterceptor } from '@/utils/interceptors/auth.interceptor';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(authInterceptor);

app.mount('#app');
