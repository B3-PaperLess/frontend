<template>
<modal-default v-model="show" @update:model-value="emits('update:modelValue')">
  <div class="px-24 py-6">
    <div class="text-3xl font-medium mt-4">
      Ajouter un utilisateur
    </div>

    <div class="mt-4 text-gray-500 w-80 text-center">
      Vous pouvez ici créer des utilisateur qui pourront déposer des factures sur notre plateforme
    </div>

    <formulaire @submit="createUser" class="mt-8 flex flex-col gap-y-6">
      <text-field label="nom"
                  rules="required|noNumber|min:2"
                  v-model="newUser.nom"
                  vid="newUserNom">
      </text-field>

      <text-field label="prenom"
                  v-model="newUser.prenom"
                  rules="required|noNumber|min:2"
                  vid="newUserPrenom">
      </text-field>

      <text-field label="email"
                  v-model="newUser.email"
                  rules="required|email"
                  vid="newUSerEmail">
      </text-field>

      <text-field label="numero de téléphone"
                  rules="required|digits:10"
                  v-model="newUser.num_tel"
                  vid="newUseNumtel">
      </text-field>

      <text-field label="mot de passe"
                  type="password"
                  class="mt-2" v-model="newUser.password"
                  rules="required|min:4|oneUppercase|oneLowercase|oneNumber"
                  vid="newUserPassword">
      </text-field>

      <text-field label="confirmer mot de passe"
                  type="password"
                  v-model="newUser.passwordAgain"
                  rules="confirmed:@newUserPassword"
                  vid="newUserPasswordAgain">
      </text-field>

      <button-default class="mt-4 py-2 px-8 w-fit m-auto"> valider </button-default>
    </formulaire>
  </div>
</modal-default>
</template>

<script setup>
import ModalDefault from "@/components/ModalDefault.vue";
import {ref, toRef} from "vue";
import TextField from "@/components/TextField.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import Formulaire from "@/components/Formulaire.vue";


const emits = defineEmits(['update:modelValue', 'createUserEntreprise'])
const props = defineProps({
  modalValue:{}
})

const show = toRef(props, 'modalValue')
let newUser = ref({
  nom:'',
  prenom:'',
  email:'',
  num_tel:'',
  password:'',
  passwordAgain:'',
})

function createUser() {
  emits('createUserEntreprise', newUser.value)
}
</script>

<script>

export default {
  name: "modalUser",
}
</script>

<style scoped>

</style>