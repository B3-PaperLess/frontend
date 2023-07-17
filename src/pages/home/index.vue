<template>
  <div class="grid grid-cols-3 px-24" v-if="!loading">
    <div class="mt-4 w-fit px-12 col-span-1">
      <img src="@/assets/image/logo.png" alt="logo" class="w-fit"/>
      <card-home class="w-full mx-2 mt-10">
        <template v-slot:title>
          Entreprise
        </template>

        <template v-slot:content>
          <div class="flex">
            <p>nom</p>
            <div class="ml-2">{{ entreprise.nom }}</div>
          </div>

          <div class="flex">
            <p>adresse</p>
            <div class="ml-2">
              {{entreprise.adresse}}
            </div>
          </div>

          <div class="flex">
            <p>ville</p>
            <div class="ml-2">
              {{entreprise.ville}}
            </div>
          </div>

          <div class="flex">
            <p>SIRET</p>
            <div class="ml-2">
              {{entreprise.siret}}
            </div>
          </div>
        </template>
      </card-home>

      <card-home class="w-full mx-2 mt-10">
        <template v-slot:title>
          Information
        </template>

        <template v-slot:content>
          <div class="flex">
            <p>nom</p> <div class="ml-2">{{ user.nom }}</div>
          </div>

          <div class="flex">
            <p>prenom</p>
            <div class="ml-2">
              {{user.prenom}}
            </div>
          </div>

          <div class="flex">
            <p>email</p>
            <div class="ml-2">
              {{user.email}}
            </div>
          </div>

          <div class="flex">
            <p>numéro</p>
            <div class="ml-2">
              {{user.tel}}
            </div>
          </div>
        </template>

        <template v-slot:button>
          <div class="w-full flex justify-center">
            <button-default class="p-2 mt-4" @click="showModalUser = true">Modifier</button-default>
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

    <modal-user v-model="showModalUser" :user="Object.assign({}, user)" @update:user="(newUser) => updateUser(newUser)"></modal-user>
    <modal-facture v-model="showModalFacture"></modal-facture>
  </div>
  </template>
  
  <script>
  import datatable from "@/components/datatable.vue"
  import ModalFacture from "@/pages/home/components/modalFacture.vue";
  import ModalUser from "@/pages/home/components/modalUser.vue";
  import ButtonDefault from "@/components/ButtonDefault.vue";
  import cardHome from "@/components/cardHome.vue"
  import useEntrepriseStore from "../../store/entreprise";
  import useUserStore from "../../store/user";
  import {toast} from 'vue3-toastify'

  export default {
    name: "indexApp",
    components: {ModalUser, ButtonDefault, ModalFacture, datatable, cardHome },
    data() {
      return {
        loading:true,
        entreprise: null,
        user: null,
        factures: [],
        showModalFacture: false,
        showModalUser: false,
        val: null,
        headers: [
          "Document",
          "Utilisateur",
          "date",
          "taille",
          "etat"
        ],
        items:[],
        keys: ['nom','user', 'date', 'taille', 'state'],
      }
    },
    created() {
      this.entreprise = useEntrepriseStore.getters.getEntreprise
      this.user = useUserStore.getters.getUser
      this.loadFactures()
    },
    methods: {
      loadFactures() {
        this.loading = true
        useEntrepriseStore.dispatch('getFactures').then(() => {
          this.entreprise = useEntrepriseStore.getters.getEntreprise
          this.loading = false
        })
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
          console.log('la')
          toast('Modification accepter', {type: 'success'})
        })
      }
    },
    watch: {
      entreprise:{
        handler() {
          if (this.entreprise.factures !== this.factures) {
            this.factures = this.entreprise.factures
          }
        }, deep:true
      },
      factures: {
        handler() {
          this.items = []
          this.factures.forEach((facture) => {
            this.items.push({
              user: facture.user.nom + ' ' + facture.user.prenom,
              nom: facture.nom,
              taille: this.formattedSize(facture.taille),
              state: facture.state,
              date: facture.date
            })
          })
        },deep:true
      },
      showModalFacture() {
        this.loadFactures()
      }
    }
  }
  </script>
  
  <style scoped>
  </style>