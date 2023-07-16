<template>
  <div class="grid grid-cols-3 px-24" v-if="!loading">
    <div class="mt-4 w-fit px-12 col-span-1">
      <img src="@/assets/image/logo.png" alt="logo" class="w-fit"/>
      <card-home class="w-full mx-2 mt-10">
        <template v-slot:title>
          Entreprise
        </template>

        <template v-slot:content>
          <p>nom</p>
          <p>adresse</p> 
          <p>ville</p> 
        </template>
        
        <template v-slot:button>
          <div class="text-center">
            <button-default class="w-1/2 mt-5" @click="showModalUpdateEntreprise=true">
              Modifier
            </button-default>
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

<<<<<<< Updated upstream
    <modal-facture v-model="showModalFacture"></modal-facture>
    <modal-update-entreprise v-model="showModalUpdateEntreprise"></modal-update-entreprise>
=======
    <modal-facture v-model="showModalFacture" ></modal-facture>
>>>>>>> Stashed changes
  </div>
  </template>
  
  <script>
  import datatable from "@/components/datatable.vue"
  import ModalFacture from "@/pages/home/components/modalFacture.vue";
  import ModalUpdateEntreprise from "@/pages/home/components/modalUpdateEntreprise.vue";
  import ButtonDefault from "@/components/ButtonDefault.vue";
  import cardHome from "@/components/cardHome.vue"
  
  export default {
    name: "indexApp",
    components: {ButtonDefault, ModalFacture, datatable, cardHome, ModalUpdateEntreprise },
    data() {
      return {
<<<<<<< Updated upstream
=======
        loading:true,
        entreprise: null,
        factures: [],
>>>>>>> Stashed changes
        showModalFacture: false,
        showModalUpdateEntreprise: false,
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
<<<<<<< Updated upstream
=======
    },
    created() {
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
>>>>>>> Stashed changes
    }
  }
  </script>
  
  <style scoped>
  </style>