<template>
<modal-default v-model="show" @update:model-value="emits('update:modelValue')">
  <div class="px-10 py-6">
    <div class="text-3xl font-medium">
      Ajouter un utilisateur
    </div>

    <div class="mt-8 flex flex-col gap-y-4">
      <text-field label="nom" v-model="newUser.nom"></text-field>
      <text-field label="prenom" v-model="newUser.prenom"></text-field>
      <text-field label="email" v-model="newUser.email"></text-field>
      <text-field label="numero" v-model="newUser.num_tel"></text-field>
      <text-field label="mot de passe" class="mt-2" v-model="newUser.password"></text-field>
      <text-field label="confirmer mot de passe" v-model="newUser.passwordAgain"></text-field>

      <button-default class="mt-4" @click="createUser"> valider </button-default>
    </div>
  </div>
</modal-default>
</template>

<script setup>
import ModalDefault from "@/components/ModalDefault.vue";
import {ref, toRef} from "vue";
import TextField from "@/components/TextField.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";


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