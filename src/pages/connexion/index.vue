<template>
<div class="flex w-full mt-8">
  <div class="w-full  p-4">
    <div class="text-center text-3xl">
      Inscription
    </div>

    <div class="mt-12 w-full">
      <div class="w-full flex">
        <div class="text-base text-center w-full">
          Utilisateur Admin
        </div>

        <div class="text-base text-center w-full">
          entreprise
        </div>
      </div>

      <formulaire @submit="inscription" v-slot="{meta, errors, value}" class="w-full flex mt-4">
        <div class="flex flex-col items-center gap-y-6 w-full ">
          <div class="">
            <text-field  class="w-48"
                         label="Nom"
                         rules="required|noNumber|min:2"
                         vid="nomInscription"
                         v-model="userInscription.nom">
            </text-field>

            <text-field class="w-48"
                        label="Prenom"
                        rules="required|noNumber|min:2"
                        vid="prenomInscription"
                        v-model="userInscription.prenom">
            </text-field>

            <text-field class="w-48"
                        label="Email"
                        rules="required|email"
                        vid="emailInscription"
                        v-model="userInscription.email">
            </text-field>

            <text-field class="w-48"
                        label="N° de téléphone"
                        rules="required|digits:10"
                        vid="telInscription"
                        v-model="userInscription.num_tel">
            </text-field>

            <text-field class="mt-12"
                        label="Mot de passe"
                        rules="required|min:4|oneUppercase|oneLowercase|oneNumber"
                        vid="passwordInscription"
                        v-model="userInscription.password">
            </text-field>

            <text-field label="Confirmation mot de passe"
                        vid="passwordAgainInscription"
                        rules="confirmed:@passwordInscription"
                        v-model="userInscription.passwordAgain">
            </text-field>
          </div>
        </div>
        <div class="flex flex-col gap-y-4 w-full">
          <text-field label="Raison social"
                      vid="nomEntreprise"
                      v-model="entreprise.raison_social"
                      rules="required">
          </text-field>

          <text-field label="SIRET"
                      vid="siret"
                      rules="required|digit:14"
                      v-model="entreprise.siret">
          </text-field>

          <text-field label="Ville"
                      vid="ville"
                      rules="required|noNumber"
                      v-model="entreprise.ville">
          </text-field>

          <text-field label="Adresse"
                      vid="adresse"
                      rules="required"
                      v-model="entreprise.adresse">
          </text-field>

         <button-default class="mt-4 w-1/2">Insciption</button-default>
        </div>
      </formulaire>
    </div>
  </div>

  <div class="w-full">
    <div class="w-full">
      <div class="text-center text-3xl">
        Connexion
      </div>
      <formulaire @submit="connexion" class="flex items-center mt-12 flex-col gap-y-6 w-full">
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
                    v-model="user.password">
        </text-field>

        <button-default>Connexion</button-default>
      </formulaire>
    </div>

    <div class="w-full h-full rounded mt-8 bg-yellow-200/60">
        Spitch inscription
    </div>
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
import Formulaire from "@/components/Formulaire.vue";


const router = useRouter()

let entreprise = ref({
    siret: '',
    raison_social: '',
    adresse: '',
    ville: '',
})
let userInscription = ref({
    nom: '',
    prenom: '',
    email: '',
    num_tel:'',
    password:'',
    passwordAgain:''
})

let user = ref({
    email: '',
    password:''
})

function inscription() {
  axios.post('paperless/signup', {
    ...userInscription.value,
    ...entreprise.value
  })
}

function connexion() {
  axios.post('paperless/connect',
      {...user.value}).then(({data}) => {
    if (data) {
      useUserStore.dispatch('initUser', data);
      useEntrepriseStore.dispatch('initEntreprise', data.user.entreprise);
      useEntrepriseStore.dispatch('getUsers')
      router.push({name: 'home'})
    }
  })
}

</script>

<script>


export default {
  name: "indexConnexion",
}
</script>

<style scoped>

</style>