import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/css/main.css';
import user from './store/user.js';
import entreprise from './store/entreprise.js';
import router from '@/router';
import '@/vee-validate'
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

user.dispatch('initApplication').then((res) => {
    const app = createApp(App);
    app.use(Vue3Toasity,
        {
            autoClose: 3000,
            position: 'top-right',
            theme: 'colored',
        }
    )
    app.use(user);
    app.use(entreprise);
    app.use(router);
    app.mount('#app');
})


