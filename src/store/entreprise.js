import { createStore } from "vuex";
import axios from "@/axiosConfig";

const entreprise = createStore({
    state() {
        return {
            nom:'',
            siret:'',
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
        set(state, data) {
            state.nom = data.nom
            state.adresse = data.adresse
            state.ville = data.ville
            state.siret = data.siret
            state.admin = data.admin
        },
        logout(state) {
            state.nom = ''
            state.adresse = ''
            state.ville = ''
            state.adresse = ''
            state.siret = ''
            state.admin = {
                nom:'',
                prenom:'',
                email:'',
                tel:''
            }
        }
    },
    actions: {
        initEntreprise(context, id) {
            axios.get('paperless/entreprise?id=' + id, {withCredentials:true}).then(({data}) => {
                console.log(data)
                const value = {
                    nom:data.entreprise.nom,
                    adresse:data.entreprise.adresse,
                    ville:data.entreprise.ville,
                    siret:data.entreprise.siret,
                    admin: {
                        nom:data.admin.nom,
                        prenom:data.admin.nom,
                        tel:data.admin.num_tel,
                        email:data.admin.email
                    }
                }

                context.commit('set', value)
            })
        },
        logout(context) {
            context.commit('logout')
        }
    },
    getters: {
        getEntreprise(state) {
            return state
        }
    },
});

export default entreprise;