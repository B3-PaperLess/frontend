<template>
<div class="flex items-center w-full flex-col px-32">
  <div class="text-7xl font-medium text-center w-full mt-12">
    Panel Administrateur
  </div>

  <div class="flex flex-row gap-x-24 mt-32 w-full">
    <card-home class="w-3/12 h-fit flex flex-col items-center rounded-xl shadow-xl py-4 px-12 pb-8">
      <template v-slot:title>
        <div class="text-center text-2xl font-medium mt-4">
          Informations Entreprise
        </div>
      </template>

      <template v-slot:content>
        <formulaire @submit="showModalModifInformation = true" class="flex flex-col gap-y-6 mt-8">
          <text-field v-model="entreprise.nom"
                      label="Nom"
                      rules="required"
                      vid="nomEntreprise"
                      class="">
          </text-field>

          <text-field v-model="entreprise.adresse"
                      label="Adresse"
                      rules="required"
                      vid="adresseEntreprise"
                      class="">
          </text-field>

          <text-field v-model="entreprise.ville"
                      label="Ville"
                      rules="required|noNumber"
                      vid="villeEntreprise"
                      class="">
          </text-field>

          <text-field v-model="entreprise.siret"
                      label="SIRET"
                      rules="required|digits:14"
                      vid="siretEntreprise"
                      class="">
          </text-field>

          <button-default class="mt-8 px-4 py-2">Modifier les informations</button-default>
        </formulaire>

        <modal-modif-entreprise v-model="showModalModifInformation" @confirm="sendModifEntreprise"></modal-modif-entreprise>
      </template>

    </card-home>

    <div class="w-9/12">
      <div class="w-full flex justify-between">
        <div class="text-lg font-medium">
          Utilisateur lié à l'entreprise ({{entreprise.users?.length}})
        </div>

        <button-default @click="showModalUser=true" class="px-4 py-2">Ajouter un utilisateur</button-default>

        <modal-user v-model="showModalUser" @create-user-entreprise="(e) => createUserEntreprise(e)"></modal-user>
      </div>

      <div class="w-full mt-8">
        <div>
          <datatable :headers="['nom', 'prenom', 'email', 'tel']"
                     :items="entreprise.users"
                     :keys="['nom', 'prenom', 'email', 'num_tel']"
                     :actions="['delete', 'admin']"
                      @delete="(email) => deleteUser(email)"
                      @admin="(email) => openModal(email)">
          </datatable>
        </div>
      </div>
    </div>

    <modal-user-switch-admin v-model="showModalAdmin" @confirm="adminUser"></modal-user-switch-admin>
  </div>
</div>
</template>

<script setup>
import ModalUser from "@/pages/admin/components/modalUser.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import Formulaire from "@/components/Formulaire.vue";
import useEntrepriseStore from '@/store/entreprise';
import useUserStore from '@/store/user'
import TextField from "@/components/TextField.vue";
import Datatable from "@/components/datatable.vue";
import {onMounted, ref} from "vue";
import {toast} from 'vue3-toastify';
import CardHome from "@/components/cardHome.vue";
import ModalModifEntreprise from "@/pages/admin/components/ModalModifEntreprise.vue";
import ModalUserSwitchAdmin from "@/pages/admin/components/ModalUserSwitchAdmin.vue";

let entreprise = ref(Object.assign({}, useEntrepriseStore.getters.getEntreprise))
let showModalUser = ref(false)
let showModalModifInformation = ref(false)
let emailUserSelected = ref(null)
let showModalAdmin = ref(false)

onMounted(() => {
  if (entreprise.value.siret?.length < 1) {
    useEntrepriseStore.dispatch('getEntreprise').then(() => {
      entreprise.value = Object.assign({}, useEntrepriseStore.getters.getEntreprise)
    })
  }

  getUsers()
})

function getUsers() {
  return useEntrepriseStore.dispatch('getUsers').then(() => {
    entreprise.value = Object.assign({}, useEntrepriseStore.getters.getEntreprise)
  })
}

function createUserEntreprise(newUser) {

  const user = useEntrepriseStore.dispatch('createUser', newUser).then(() => {
    toast('Utilisateur inscrit', {type: 'success'})
    entreprise.value = useEntrepriseStore.getters.getEntreprise
  })

  if (user) {
    showModalUser.value = false
  }
}

function deleteUser(email) {
  useEntrepriseStore.dispatch('deleteUser', email)
  getUsers()
}

function adminUser() {
  useEntrepriseStore.dispatch('adminSwitch', emailUserSelected.value).then(() => {
    emailUserSelected.value = null;
    showModalAdmin = false;
    useUserStore.dispatch('fetchUser')
  })
}

function sendModifEntreprise() {
  useEntrepriseStore.dispatch('updateEntreprise', entreprise.value).then(() => {
    toast('Les informations ont bien été modifiées', {type: 'success'})
  })
}

function openModal(email) {
  emailUserSelected.value = email;
  showModalAdmin.value = true;
}
</script>



<script>
export default {
  name: "index",
}
</script>

<style scoped>

</style>