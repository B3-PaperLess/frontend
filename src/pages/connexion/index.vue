<template>
<div class="flex w-full h-[54.05em]">
  <div class="w-1/2 bg-base-blue h-full">
    <div class="w-full text-center text-5xl font-medium mt-12 ">
      Inscription
    </div>

    <div class="mt-12 w-full">
      <div class="w-full flex">
        <div class="text-base text-center w-full font-medium">
          Utilisateur Admin
        </div>

        <div class="text-base text-center w-full font-medium">
          Entreprise
        </div>
      </div>

      <formulaire @submit="inscription" v-slot="{meta, errors, value}" class="w-full flex flex-col mt-4">
        <div class="flex">
          <div class="flex flex-col items-center gap-y-6 w-full ">
              <text-field  class="w-60"
                           label="Nom"
                           rules="required|noNumber|min:2"
                           vid="nomInscription"
                           v-model="userInscription.nom">
              </text-field>
  
              <text-field class="w-60"
                          label="Prenom"
                          rules="required|noNumber|min:2"
                          vid="prenomInscription"
                          v-model="userInscription.prenom">
              </text-field>
  
              <text-field class="w-60"
                          label="Email"
                          rules="required|email"
                          vid="emailInscription"
                          v-model="userInscription.email">
              </text-field>
  
              <text-field class="w-60"
                          label="N° de téléphone"
                          rules="required|digits:10"
                          vid="telInscription"
                          v-model="userInscription.num_tel">
              </text-field>
  
              <text-field class="mt-12 w-60"
                          label="Mot de passe"
                          rules="required|min:4|oneUppercase|oneLowercase|oneNumber"
                          vid="passwordInscription"
                          type="password"
                          v-model="userInscription.password">
              </text-field>
  
              <text-field class="w-60"
                          label="Confirmation mot de passe"
                          vid="passwordAgainInscription"
                          rules="confirmed:@passwordInscription"
                          type="password"
                          v-model="userInscription.passwordAgain">
              </text-field>
          </div>

          <div class="flex flex-col items-center gap-y-4 w-full">
            <text-field 
                        class="w-60"
                        label="Raison social"
                        vid="nomEntreprise"
                        v-model="entreprise.raison_social"
                        rules="required">
            </text-field>
  
            <text-field 
                        class="w-60"
                        label="SIRET"
                        vid="siret"
                        rules="required|digits:14"
                        v-model="entreprise.siret">
            </text-field>
  
            <text-field 
                        class="w-60"
                        label="Ville"
                        vid="ville"
                        rules="required|noNumber"
                        v-model="entreprise.ville">
            </text-field>
  
            <text-field 
                        class="w-60"
                        label="Adresse"
                        vid="adresse"
                        rules="required"
                        v-model="entreprise.adresse">
            </text-field>
          </div>
        </div>
        <div class="flex flex-col items-center m-8">
          <button-default class="w-1/2 p-2">Inscription</button-default>
          <div class="error">
            {{errorMessage}}
          </div>
        </div>
      </formulaire>
    </div>

    <modal-default v-model="showModal" classe="w-3/4">
      <div class="flex flex-col items-center px-10">
        <div class="text-2xl mt-7">
          Inscription réussie
        </div>
        <div class="text-xl text-center mt-4">
          Votre compte est en attente de validation par un administrateur
          Vous recevrez un mail de confirmation lorsque votre compte sera validé
        </div>
        <div class="my-7">
          <button-default @click="$router.push({name: 'index'})" class="p-2">Retour à l'accueil</button-default>
        </div>
      </div>
    </modal-default>
  </div>

  <div class="w-1/2 flex flex-col items-center">
    <img src="@/assets/image/logo.png" alt="logo" class="w-5/6 mt-8"/>

    <div class="w-full mt-24">
      <div class="text-center text-5xl font-medium">
        Connexion
      </div>
    </div>

    <div class="mt-12 w-full">
      <formulaire @submit="connexion" class="flex items-center mt-4 flex-col w-full gap-y-4">
        <text-field vid="emailConnexion"
                    class="w-64"
                    label="Email"
                    rules="email|required"
                    v-model="user.email">
        </text-field>
  
        <text-field vid="passwordConnexion"
                    class="w-64"
                    label="Mot de passe"
                    rules="required"
                    type="password"
                    v-model="user.password">
        </text-field>

        <button-default class="py-2 px-12 m-8 ">Connexion</button-default>
      </formulaire>
    </div>
    
  </div>

</div>
</template>


<script setup>
import ButtonDefault from "@/components/ButtonDefault.vue";
import ModalDefault from "@/components/ModalDefault.vue";
import Formulaire from "@/components/Formulaire.vue";
import TextField from "@/components/TextField.vue";
import useEntrepriseStore from '@/store/entreprise'
import useUserStore from '@/store/user'
import {useRouter} from "vue-router";
import {toast} from "vue3-toastify";
import axios from '@/axiosConfig'
import {ref} from "vue";

let errorMessage = ref('');
let showModal = ref(false);

const router = useRouter();

let entreprise = ref({
    siret: '',
    raison_social: '',
    adresse: '',
    ville: '',
});

let userInscription = ref({
    nom: '',
    prenom: '',
    email: '',
    num_tel:'',
    password:'',
    passwordAgain:''
});

let user = ref({
    email: '',
    password:''
});

function inscription() {
  axios.post('paperless/signup', {
    ...userInscription.value,
    ...entreprise.value
  }).then((res) => {
    showModal.value = true;
  })
  .catch((err) => {
    console.log(err);
    toast('Une erreur est survenue veuillez réessayer plus tard', {type: 'error'});
  })
}

function connexion() {
  axios.post('paperless/connect',
      {...user.value}).then(({data}) => {
    if (data) {
      useUserStore.dispatch('initUser', data);

      useEntrepriseStore.dispatch('getEntreprise', data.user.entreprise).then(() => {
        useEntrepriseStore.dispatch('getUsers').then(() => {
          router.push({name: 'home'});
        });
      });
    }
  }).catch((e) => {
    toast('Email ou mot de passe invalide', {type: 'error'});
  })
}

</script>

<script>


export default {
  name: "indexConnexion",
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>