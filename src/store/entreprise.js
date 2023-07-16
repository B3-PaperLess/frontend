import { createStore } from "vuex";
import axios from "@/axiosConfig";

const entreprise = createStore({
    state() {
        return {
            nom:'',
            siret:'',
            adresse:'',
            ville:'',
            users: [],
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
        setUsers(state, users) {
            state.users = users
        },
        addUser(state, user) {
          state.users.push(user)
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
            axios.get('paperless/entreprise?id=' + id).then(({data}) => {
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
            }).catch((e) => {
                console.error(e)
            })
        },
        logout(context) {
            context.commit('logout')
        },
        createUser(context, user) {
            axios.post('paperless/user', user).then(({data}) => {
                context.commit('addUser', data.user)
            })
        },
        deleteUser(context, email) {
            axios.delete('paperless/user?email=' + email).then(({data}) => {
                context.dispatch('getUsers')
            })
        },
        adminSwitch(context, email) {
            axios.post('paperless/transfer_admin', email)
        },
        getUsers(context) {
            axios.get('paperless/entreprise-users').then(({data}) => {
                context.commit('setUsers', data.users)
            }).catch((e) => {
                console.error(e)
            })
        }
    },
    getters: {
        getEntreprise(state) {
            return state
        },
        getUsers(state) {
            console.log('state', state.users)
            return state.users
        }
    },
});

export default entreprise;