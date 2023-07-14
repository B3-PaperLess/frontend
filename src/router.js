import { createRouter, createWebHistory } from 'vue-router';
import indexApp from '@/pages/index.vue'
import indexConnexion from '@/pages/connexion/index.vue'
import indexHome from '@/pages/home/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', component: indexApp, name:'index'},
        {path:'/connexion', component: indexConnexion, name:'connexion'},
        {path:'/home', component: indexHome, name:'home'},
    ],
});

export default router;