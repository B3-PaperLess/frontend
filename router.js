import { createRouter, createWebHistory } from 'vue-router';
import indexApp from '@/pages/index.vue'
import indexConnexion from '@/pages/connexion/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', component: indexApp, name:'index'},
        {path:'/connexion', component: indexConnexion, name:'connexion'},
    ],
});

export default router;