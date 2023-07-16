<template>
<div class="flex items-center w-full flex-col px-12">
  <div class="text-3xl font-medium text-center w-full mt-12">
    Gestion de l'entreprise
  </div>

  <div class="flex flex-row mt-8 w-full">
    <div class="w-full flex flex-col items-center">
      <div class="text-center">
        Information Entreprise
      </div>

      <div class=" flex flex-col mt-8 gap-y-4">
        <text-field label="Siret" v-model="entreprise.siret"></text-field>
        <text-field label="Raison sociale" v-model="entreprise.nom"></text-field>
        <text-field label="Ville" v-model="entreprise.ville"></text-field>
        <text-field label="Adresse" v-model="entreprise.adresse"></text-field>

        <button-default @click="updateInformation">Valider informations</button-default>
      </div>
    </div>

    <div class="w-full">
      <div class="text-center">
        Utilisateur lié à l'entreprise
      </div>

      <div class="w-full">
        <div class="w-full flex flex-row-reverse">
          <button-default @click="showModalUser=true">Ajouter un utilisateur</button-default>

          <modal-user v-model="showModalUser" @create-user-entreprise="(e) => createUserEntreprise(e)"></modal-user>
        </div>

        <div>
          <datatable :headers="['nom', 'prenom', 'email', 'tel']"
                     :items="entreprise.users"
                     :keys="['nom', 'prenom', 'email', 'num_tel']"
                     :actions="['delete', 'admin']"
                      @delete="(email) => deleteUser(email)"
                      @admin="(email) => addUser(email)">
          </datatable>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import TextField from "@/components/TextField.vue";
import useEntrepriseStore from '@/store/entreprise'
import ButtonDefault from "@/components/ButtonDefault.vue";
import {onMounted, ref} from "vue";
import ModalUser from "@/pages/admin/components/modalUser.vue";
import Datatable from "@/components/datatable.vue";


const entreprise = ref(useEntrepriseStore.getters.getEntreprise)
let showModalUser = ref(false)



onMounted(() => {
  getUsers()
})

function getUsers() {
  useEntrepriseStore.dispatch('getUsers')
}

function createUserEntreprise(newUser) {
  const user = useEntrepriseStore.dispatch('createUser', newUser)

  if (user) {
    showModalUser.value = false
  }
}
function updateInformation() {
  useEntrepriseStore.dispatch('updateInformation', entreprise)
}

function deleteUser(email) {
  useEntrepriseStore.dispatch('deleteUser', email)
  getUsers()
}

function addUser(email) {
  useEntrepriseStore.dispatch('adminSwitch', email)
}
</script>



<script>
export default {
  name: "index",
}
</script>

<style scoped>

</style>