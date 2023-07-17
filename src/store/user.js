import { createStore } from "vuex";
import axios from "@/axiosConfig";
import Cookies from 'js-cookie';
import useEntrepriseStore from '@/store/entreprise'

const user = createStore({
    state() {
        return {
            nom:'',
            prenom:'',
            email:'',
            tel:'',
            token:'',
            isAdmin: false,
            isLoggedIn:false
        };
    },
    mutations: {
        updateUser(state, user) {
            state.nom = user.nom;
            state.prenom = user.prenom;
            state.email = user.email;
            state.tel = user.num_tel;
            state.isAdmin = user.is_admin;
        },
        login(state) {
            state.isLogged = true;
        },
        logout(state) {
            state.nom = '';
            state.prenom = '';
            state.email = '';
            state.tel = '';
            state.isAdmin = false;
            state.isLogged = false;
        }
    },
    actions: {
        initUser(context, data) {
            Cookies.set('token', data.token);
            context.commit('updateUser', data.user);

            context.commit('login');
        },
        initApplication(context) {
            const token = Cookies.get('token')

            if (token?.length > 0) {
                axios.get('paperless/me').then(({data}) => {
                    context.commit('updateUser', data);
                    context.commit('login');
                    useEntrepriseStore.dispatch('initEntreprise', data.entreprise)
                })
            }
        },
        logout(context) {
            context.commit('logout');
            Cookies.remove('token');
        },
        updateUser(context, data) {
            axios.put('paperless/user', data).then(({data}) => {
                context.commit('updateUser', data.user)
            })
        }
    },
    getters: {
        getUser(state) {
            return state
        }
    },
});

export default user;