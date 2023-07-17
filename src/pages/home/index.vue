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


  
<script>
import ModalFacture from "@/pages/home/components/modalFacture.vue";
import ModalUser from "@/pages/home/components/modalUser.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import useEntrepriseStore from "../../store/entreprise";
import datatable from "@/components/datatable.vue"
import cardHome from "@/components/cardHome.vue"
import useUserStore from "../../store/user";
import {toast} from 'vue3-toastify'
import entreprise from "../../store/entreprise";

export default {
  name: "indexApp",
  components: {ModalUser, ButtonDefault, ModalFacture, datatable, cardHome },
  data() {
    return {
      items:[],
      val: null,
      user: null,
      factures: [],
      loading:true,
      entreprise: null,
      showModalUser: false,
      showModalFacture: false,
      headers: ["Document", "Utilisateur", "date", "taille", "etat"],
      keys: ['nom','user', 'date', 'taille', 'state'],
    }
  },
  created() {
    this.entreprise = useEntrepriseStore.getters.getEntreprise;
    this.user = useUserStore.getters.getUser;
    this.loadFactures();
  },
  methods: {
    loadFactures() {
      this.loading = true;
      useEntrepriseStore.dispatch('getFactures').then(() => {
        this.items = [];

        useEntrepriseStore.getters.getFactures.forEach((facture) => {
          this.items.push({
            user: facture.user.nom + ' ' + facture.user.prenom,
            nom: facture.nom,
            taille: this.formattedSize(facture.taille),
            state: facture.state,
            date: facture.date
          })
        });

        this.loading = false;
      });
    },
    formattedSize(sizeInBytes) {
      const kiloByte = 1024;
      const megaByte = kiloByte * 1024;

      if (sizeInBytes >= megaByte) {
        return (sizeInBytes / megaByte).toFixed(2) + ' Mo';
      } else if (sizeInBytes >= kiloByte) {
        return (sizeInBytes / kiloByte).toFixed(2) + ' Ko';
      } else {
        return sizeInBytes + ' octets';
      }
    },
    updateUser(newUser) {
      useUserStore.dispatch('updateUser', newUser).then(() => {
        toast('Modification accepter', {type: 'success'});
      })
    }
  },
  watch: {
    showModalFacture() {
      this.loadFactures();
    }
  }
}
</script>

<style scoped>
</style>