<template>
  <div class="grid grid-cols-3 px-24 pb-12" v-if="!loading">
    <div class="mt-4 w-fit px-4 col-span-1">
      <img src="@/assets/image/logo.png" alt="logo" class="w-fit"/>

      <card-home class="w-full mt-10 px-14 py-6 rounded-xl shadow-xl">
        <template v-slot:title>
          <div class="text-3xl">
            Entreprise
          </div>
        </template>

        <template v-slot:content>
          <div class="flex flex-col gap-y-4 mt-8">
            <div class="text-lg flex gap-x-4 items-center">
              <div>Nom:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ entreprise.nom }}</div>
            </div>

            <div class="flex gap-x-4 items-center">
              <div>Ville:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ entreprise.ville }}</div>
            </div>

            <div class="flex gap-x-4 items-center">
              <div>Adresse:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ entreprise.adresse }}</div>
            </div>

            <div class="flex gap-x-4 items-center ">
              <div>SIRET:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ entreprise.siret }}</div>
            </div>
          </div>
        </template>
      </card-home>

      <card-home class="w-full mt-10 px-14 py-6 rounded-xl shadow-xl">
        <template v-slot:title>
          <div class="text-3xl mt-4">
            Information
          </div>
        </template>

        <template v-slot:content>
          <div class="flex flex-col gap-y-4 mt-8">
            <div class="text-lg flex gap-x-4 items-center">
              <div>Nom:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ user.nom }}</div>
            </div>

            <div class="text-lg flex gap-x-4 items-center">
              <div>Prénom:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ user.prenom }}</div>
            </div>

            <div class="text-lg flex gap-x-4 items-center">
              <div>Email:</div>
              <div class="rounded-3xl border border-gray-200 py-2 px-4">{{ user.email }}</div>
            </div>

            <div class="text-lg flex gap-x-4 items-center">
              <div>Numéro de téléphone:</div>
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

    <div class="mt-4 col-span-2 w-full">
      <div class="flex flex-row-reverse my-4">
        <button-default class="p-2" @click="showModalFacture=true">Deposer une facture</button-default>
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
import ModalUser from "@/pages/admin/components/modalUser.vue";
import CardHome from "@/components/cardHome.vue";

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