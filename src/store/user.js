import { createStore } from "vuex";
import store from "@/store/store";
import axios from "@/axiosConfig";
import Cookies from 'js-cookie';

const user = createStore({
    state() {
        return {
            nom:'',
            prenom:'',
            email:'',
            tel:'',
            token:'',
            isLoggedIn:false
        };
    },
    mutations: {
        updateUser(state, user) {
            state.nom = user.nom;
            state.prenom = user.prenom;
            state.email = user.email;
            state.tel = user.num_tel;
        },
        login(state) {
            state.isLogged = true;
        },
        logout(state) {
            state.nom = '';
            state.prenom = '';
            state.email = '';
            state.tel = '';
            state.isLogged = false;
        }
    },
    actions: {
        initUser(context, data) {
            Cookies.set('token', data.token);
            context.commit('updateUser', data.user);
            context.commit('login', data.user);
        },
        logout(context) {
            context.commit('logout')
            Cookies.remove('token');
        }
    },
    getters: {
        getUser(state) {
            return state
        }
    },
});

export default user;