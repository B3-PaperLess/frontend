import '@mdi/font/css/materialdesignicons.css';
import entreprise from './store/entreprise.js';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import user from './store/user.js';
import { createApp } from 'vue';
import '@/assets/css/main.css';
import router from '@/router';
import App from './App.vue';
import '@/vee-validate';

user.dispatch('initApplication').then((res) => {
    const app = createApp(App);
    app.use(Vue3Toasity,
        {
            autoClose: 3000,
            position: 'top-right',
            theme: 'colored',
        }
    );

    app.use(user);
    app.use(entreprise);
    app.use(router);
    app.mount('#app');
})


