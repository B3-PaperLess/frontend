<template>
  <div class="grid grid-cols-3 gap-x-12 px-24 pb-12" v-if="!loading">
    <div class="mt-4 w-fit px-4 col-span-1">
      <img src="@/assets/image/logo.png" alt="logo" class="w-fit"/>

      <card-home class="w-full mt-10 px-14 py-6 rounded-xl shadow-xl">
        <template v-slot:title>
          <div class="text-3xl font-medium">
            Entreprise
          </div>
        </template>

        <template v-slot:content>
          <div class="flex flex-col gap-y-4 mt-8">
            <div class="text-lg flex gap-x-4 items-center">
              <div class="font-medium">Nom:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ entreprise.nom }}</div>
            </div>

            <div class="flex gap-x-4 items-center">
              <div class="font-medium">Ville:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ entreprise.ville }}</div>
            </div>

            <div class="flex gap-x-4 items-center">
              <div class="font-medium">Adresse:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ entreprise.adresse }}</div>
            </div>

            <div class="flex gap-x-4 items-center ">
              <div class="font-medium">SIRET:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ entreprise.siret }}</div>
            </div>
          </div>
        </template>
      </card-home>

      <card-home class="w-full mt-10 px-14 py-6 rounded-xl shadow-xl">
        <template v-slot:title>
          <div class="text-3xl mt-4 font-medium">
            Information
          </div>
        </template>

        <template v-slot:content>
          <div class="flex flex-col gap-y-4 mt-8">
            <div class="text-lg flex gap-x-4 items-center">
              <div class="font-medium">Nom:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ user.nom }}</div>
            </div>

            <div class="text-lg flex gap-x-4 items-center">
              <div class="font-medium">Prénom:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ user.prenom }}</div>
            </div>

            <div class="text-lg flex gap-x-4 items-center">
              <div class="font-medium">Email:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ user.email }}</div>
            </div>

            <div class="text-lg flex gap-x-4 items-center">
              <div class="font-medium">Numéro de téléphone:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ user.tel }}</div>
            </div>

          </div>
        </template>

        <template v-slot:button>
          <div class="w-full flex justify-center mt-4">
            <button-default class="px-6 py-2 mt-4" @click="showModalUser = true">Modifier</button-default>
          </div>
        </template>
      </card-home>
    </div>

    <div class="mt-12 col-span-2 w-full">
      <div class="flex items-center justify-between my-4">
        <div class="flex">
          <div class="text-3xl font-medium">Factures</div>

          <information-tool-tip class="w-6 ml-2 mt-auto mb-0.5">
            <div class="w-48">
              Vous retrouver ici l'ensemble des factures déposé par votre entreprise
            </div>
          </information-tool-tip>
        </div>

        <button-default :disabled="entreprise.updated" class="p-2" @click="showModalFacture=true">Deposer une facture</button-default>
      </div>

      <div v-if="entreprise.updated" class="sm text-red-300">
        Le dépôt de facture est partiellement suspendu le temps que nos équipe valide vos nouvelles informations
      </div>

      <div>
        <datatable
            :headers="headers"
            :items="items"
            :keys="keys"
        >
        </datatable>
      </div>
    </div>

    <modal-user v-model="showModalUser"
                :user="Object.assign({}, user)"
                @update:user="(newUser) => updateUser(newUser)">
    </modal-user>

    <modal-facture v-model="showModalFacture"></modal-facture>
  </div>
</template>

<script setup>
import useEntrepriseStore from "@/store/entreprise";
import useUserStore from "@/store/user";
import {toast} from "vue3-toastify";
import {ref, watch} from "vue";
import datatable from "@/components/datatable.vue"
import cardHome from "@/components/cardHome.vue"
import ButtonDefault from "@/components/ButtonDefault.vue";
import ModalFacture from "@/pages/home/components/modalFacture.vue";
import ModalUser from "@/pages/home/components/modalUser.vue";
import CardHome from "@/components/cardHome.vue";
import InformationToolTip from "@/components/InformationToolTip.vue";

let items = ref([])
let loading= ref(true)
let showModalUser= ref(false)
let showModalFacture= ref( false)
let keys= ref(['nom','user', 'date', 'taille', 'state'])
let user= ref(Object.assign({}, useUserStore.getters.getUser))
let headers= ref(["Document", "Utilisateur", "date", "taille", "etat"])
let entreprise= ref(Object.assign({}, useEntrepriseStore.getters.getEntreprise))

loadFactures();

function loadFactures() {
  loading.value = true;
  useEntrepriseStore.dispatch('getFactures').then(() => {
    items.value = [];

    useEntrepriseStore.getters.getFactures.forEach((facture) => {
      items.value.push({
        user: facture.user.nom + ' ' + facture.user.prenom,
        nom: facture.nom,
        taille: formattedSize(facture.taille),
        state: facture.state,
        date: facture.date
      })
    });

  loading.value = false;
  });
}

function formattedSize(sizeInBytes) {
  const kiloByte = 1024;
  const megaByte = kiloByte * 1024;

  if (sizeInBytes >= megaByte) {
    return (sizeInBytes / megaByte).toFixed(2) + ' Mo';
  } else if (sizeInBytes >= kiloByte) {
    return (sizeInBytes / kiloByte).toFixed(2) + ' Ko';
  } else {
    return sizeInBytes + ' octets';
  }
}

function updateUser(newUser) {
  useUserStore.dispatch('updateUser', newUser).then(() => {
    user.value = Object.assign({}, useUserStore.getters.getUser)
    toast('Modification accepter', {type: 'success'});
  })
}

watch(showModalFacture, () => {
  loadFactures()
})
</script>
  
<script>
export default {
  name: "indexApp",
}
</script>

<style scoped>
</style>