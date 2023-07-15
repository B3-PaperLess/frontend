import { createRouter, createWebHistory } from 'vue-router';
import indexApp from '@/pages/index.vue'
import indexConnexion from '@/pages/connexion/index.vue'
import indexHome from '@/pages/home/index.vue'
import indexAdmin from '@/pages/admin/index.vue'
import axios from '@/axiosConfig'

const excluded_path = ['/admin', '/home']

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', component: indexApp, name:'index'},
        {path:'/connexion', component: indexConnexion, name:'connexion'},
        {path:'/home', component: indexHome, name:'home'},
        {path:'/admin', component: indexAdmin, name:'admin'},
    ],
});

router.beforeEach((to, from, next) => {
    axios.get('paperless/me').then(({data}) => {}).then(() => {
        next()
    }).catch((e) => {
        if (excluded_path.includes(to.path)) {
            next('/')
        }
        next()
    })
})
export default router;