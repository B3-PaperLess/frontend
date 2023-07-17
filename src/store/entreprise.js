import { createStore } from "vuex";
import axios from "@/axiosConfig";
import router from '@/router';
import {toast} from "vue3-toastify";

const entreprise = createStore({
    state() {
        return {
            nom:'',
            siret:'',
            adresse:'',
            ville:'',
            users: [],
            factures: [],
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
            state.nom = data.nom;
            state.adresse = data.adresse;
            state.ville = data.ville;
            state.siret = data.siret;
            state.admin = data.admin;
        },
        update(state, data) {
          state.nom = data.nom;
          state.adresse = data.adresse;
          state.ville = data.ville;
          state.siret = data.siret;
        },
        setUsers(state, users) {
            state.users = users;
        },
        addUser(state, user) {
          state.users.push(user);
        },
        setFactures(state, factures) {
          state.factures = factures;
        },
        logout(state) {
            state.nom = '';
            state.adresse = '';
            state.ville = '';
            state.adresse = '';
            state.siret = '';
            state.factures = [];
            state.users = [];
            state.admin = {
                nom:'',
                prenom:'',
                email:'',
                tel:''
            };
        }
    },
    actions: {
        getEntreprise(context) {
            return axios.get('paperless/entreprise').then(({data}) => {
                const value = {
                    nom: data.entreprise.nom,
                    adresse: data.entreprise.adresse,
                    ville: data.entreprise.ville,
                    siret: data.entreprise.siret,
                    admin: {
                        nom: data.admin.nom,
                        prenom: data.admin.nom,
                        tel: data.admin.num_tel,
                        email: data.admin.email
                    }
                };

                context.commit('set', value);
            }).catch((e) => {
                console.error(e);
            });
        },
        updateEntreprise(context, data) {
            const val = {
                nom: data.nom,
                ville: data.ville,
                adresse: data.adresse,
                siret: data.siret,
            };

            return axios.put('paperless/entreprise', val).then(() => {
              context.commit('update', val);
          });
        },
        getUsers(context) {
            return axios.get('paperless/entreprise-users').then(({data}) => {
                context.commit('setUsers', data.users);
            }).catch((e) => {
                console.error(e);
            });
        },
        logout(context) {
            context.commit('logout');
        },
        createUser(context, user) {
            return axios.post('paperless/user', user).then(({data}) => {
                context.commit('addUser', user);
            });
        },
        deleteUser(context, email) {
            axios.delete('paperless/user?email=' + email).then(({data}) => {
                context.dispatch('getUsers');
            });
        },
        adminSwitch(context, email) {
            return axios.post('paperless/transfer-admin', {email: email}).then(({data}) => {
                router.push({name: 'home'});

            }).catch((e) => {
                toast('une erreur est survenue' , {type: "error"})
            });
        },
        getFactures(context) {
            return axios.get('paperless/entreprise-factures').then(({data}) => {
                context.commit('setFactures', data.factures);
            })
        }
    },
    getters: {
        getEntreprise(state) {
            return state;
        },
        getUsers(state) {
            return state.users;
        },
        getFactures(state) {
            return state.factures;
        }
    },
});

export default entreprise;