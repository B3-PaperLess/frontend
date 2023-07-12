import { createApp } from 'vue'
import App from './App.vue'
import router from '../router';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/css/main.css';
import user from './store/user.js';
import entreprise from './store/entreprise.js';

const app = createApp(App);

app.use(user);
app.use(entreprise);
app.use(router);
app.mount('#app');
