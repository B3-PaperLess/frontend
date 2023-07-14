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
            <text-field class="w-60" label="Email" v-model="userInscription.email"></text-field>
            <text-field  class="w-60" label="N° de téléphone" v-model="userInscription.num_tel"></text-field>
          </div>
          <div>
            <text-field class="w-60 mt-4" label="Mot de passe" v-model="userInscription.password"></text-field>
            <text-field class="w-60" label="Confirmation mot de passe" v-model="userInscription.passwordAgain"></text-field>
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
        <button-default class="w-1/2" @click="inscription">Insciption</button-default>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import TextField from "@/components/TextField.vue";
  import {ref} from "vue";
  import ButtonDefault from "@/components/ButtonDefault.vue";
  import axios from '@/axiosConfig'
  import {useRouter} from "vue-router";
  import useUserStore from '@/store/user'
  import useEntrepriseStore from '@/store/entreprise'
  
  const router = useRouter()

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
      console.log(res)
    })
  }
    
  </script>
  
  <script>
  
  
  export default {
    name: "indexRegister",
  }
  </script>
  
  <style scoped>
  
  </style>