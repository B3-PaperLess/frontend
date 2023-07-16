<template>
    <div class="w-full  p-4">
      <div class="text-center text-5xl">
        Inscription
      </div>
    </div>


    <div class="mt-12 w-full">
      <div class="w-full flex">
        <div class="text-base text-center w-full">
          Utilisateur Admin
        </div>

        <div class="text-base text-center w-full">
          Entreprise
        </div>
      </div>

      <div class="w-full flex mt-4 ">
        <div class="flex flex-col items-center gap-y-6 w-full ">
          <div>
            <text-field  class="w-60" label="Nom" v-model="userInscription.nom"></text-field>
            <text-field  class="w-60" label="Prenom" v-model="userInscription.prenom"></text-field>
            <text-field class="w-60" label="Email" v-model="userInscription.email" type="email"></text-field>
            <text-field  class="w-60" label="N° de téléphone" v-model="userInscription.num_tel" type="tel"></text-field>
          </div>
          <div>
            <text-field class="w-60 mt-4" label="Mot de passe" v-model="userInscription.password" type="password"></text-field>
            <text-field class="w-60" label="Confirmation mot de passe" v-model="userInscription.passwordAgain" type="password"></text-field>
          </div>
        </div>
        <div class="flex flex-col items-center gap-y-4 w-full">
          <text-field class="w-80" label="Raison social" v-model="entreprise.raison_social"></text-field>
          <text-field class="w-80" label="SIRET" v-model="entreprise.siret"></text-field>
          <text-field class="w-80" label="Ville" v-model="entreprise.ville"></text-field>
          <text-field class="w-80" label="Adresse" v-model="entreprise.adresse"></text-field>

        </div>
      </div>
      <div class="flex flex-col items-center m-8">
        <button-default class="w-1/2 p-2" @click="inscription">Insciption</button-default>
        <div class="error">
          {{errorMessage}}
        </div>
      </div>
    </div>

    <modal-default v-model="showModal" @close="showModal=false" classe="w-3/4">
      <div class="flex flex-col items-center px-10">
        <div class="text-2xl mt-7">
          Inscription réussi
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
  </template>
  
  
  <script setup>
  import TextField from "@/components/TextField.vue";
  import {ref} from "vue";
  import ButtonDefault from "@/components/ButtonDefault.vue";
  import axios from '@/axiosConfig'
  import ModalDefault from "@/components/ModalDefault.vue";

  import {useRouter} from "vue-router";
  
  let errorMessage = ref('')
  let showModal = ref(false)

  let userInscription = ref({
    nom: '',
    prenom: '',
    email: '',
    num_tel:'',
    password:'',
    passwordAgain:''
  })

  let entreprise = ref({
    siret: '',
    raison_social: '',
    adresse: '',
    ville: '',
  })

  function inscription() {
    axios.post('paperless/signup', {
      ...userInscription.value,
      ...entreprise.value
    }).then((res) => {
      showModal.value = true
    })
    .catch((err) => {
      console.log(err)
      errorMessage.value = 'Une erreur est survenue veuillez réessayer plus tard'
    })
  }
    
  </script>
  
  <script>
  
  
  export default {
    name: "indexRegister",
  }
  </script>
  
  <style scoped>
    .error {
      color: red;
    }
  </style>