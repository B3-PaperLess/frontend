import { createApp } from 'vue'
import App from './App.vue'
import router from '../router';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/css/main.css';
import store from './store/store.js';


const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
