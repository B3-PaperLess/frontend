import { createStore } from "vuex";
import store from "@/store/store";
import axios from "@/axiosConfig";

const entreprise = createStore({
    state() {
        return {
            nom:'',
            adresse:'',
            ville:'',
            admin: {
                nom:'',
                prenom:'',
                email:'',
                tel:''
            },
        };
    },
    mutations: {
        // Mutations pour modifier l'état du store
    },
    actions: {

    },
    getters: {
        // Getters pour accéder aux données du store
    },
});

export default entreprise;