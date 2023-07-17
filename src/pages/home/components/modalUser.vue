<template>
<modal-default v-model="show" @update:model-value="emits('update:modelValue')" classe="w-3/6">
  <div class="text-3xl text-center font-medium mt-8">
    Vos informations
  </div>

  <div class="w-full py-4 px-16 flex flex-row gap-x-20 mt-8 pb-12">
    <div class="w-full flex flex-col justify-center">
      <div class="text-xl font-medium">Modification de vos informations</div>

      <formulaire @submit="updateUser" class="flex flex-col gap-y-6 mt-6">
        <text-field label="nom" vid="nom" v-model="userInfo.nom" rules="required|noNumber"></text-field>
        <text-field label="prenom" vid="prenom" v-model="userInfo.prenom" rules="required|noNumber"></text-field>
        <text-field label="email" vid="email" v-model="userInfo.email" rules="required|email"></text-field>
        <text-field label="tel" vid="tel" v-model="userInfo.tel" rules="required|digits:10"></text-field>

        <button-default class="mt-4 text-xl py-2">Valider</button-default>
      </formulaire>
    </div>

    <div class="w-full flex justify-center flex-col">
      <div class="text-xl font-medium">
        Modification du mot de passe
      </div>

      <formulaire @submit="updatePassword" class="mt-4 flex flex-col gap-y-6">
        <text-field label="mot de passe Actuel" type="password" vid="currentPassword" v-model="passwordUpdate.passwordCurrent" rules="required"></text-field>

        <text-field label="Nouveau mot de passe" type="password" vid="newPassword" v-model="passwordUpdate.passwordNew" rules="required|min:4|oneUppercase|oneLowercase|oneNumber"></text-field>
        <text-field label="Confirmation mot de passe" type="password" vid="confirmPassword" rules="required|confirmed:@newPassword"></text-field>

        <button-default>Valider</button-default>
      </formulaire>
    </div>
  </div>
</modal-default>
</template>

<script setup>
import ModalDefault from "@/components/ModalDefault.vue";
import {ref, toRef} from "vue";
import Formulaire from "@/components/Formulaire.vue";
import TextField from "@/components/TextField.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import axios from '@/axiosConfig'
import {toast} from 'vue3-toastify'

const emits = defineEmits(['update:modelValue', 'update:user'])
const props = defineProps({
  modelValue:{},
  user: {
    type: Object
  }
})

const show = toRef(props, 'modelValue')
const userInfo = ref(props.user)
const passwordUpdate = ref({
  passwordCurrent:'',
  passwordNew:'',
})

function updateUser() {
  emits('update:user', userInfo.value)
  emits('update:modelValue', false)
}

function updatePassword() {
  axios.post('paperless/password-change', passwordUpdate.value).then(({data}) => {
    if (data.response) {
      toast('Mot de passe modifier', {type: 'success'})
      passwordUpdate.value = {
        passwordCurrent: '',
        passwordNew: ''
      }
    }
    else {
      toast('Une erreur est survenu', {type: 'error'})
    }
  }).catch((e) => {
    toast('Une erreur est survenu', {type: 'error'})
  })
}

</script>
<script>

export default {
  name: "modalUser",
}
</script>

<style scoped>

</style>