<template>
  <div class="grid grid-cols-3 px-24">
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
        >
        </datatable>
      </div>
    </div>

    <modal-facture v-model="showModalFacture"></modal-facture>
    <modal-update-entreprise v-model="showModalUpdateEntreprise"></modal-update-entreprise>
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
        showModalFacture: false,
        showModalUpdateEntreprise: false,
        val: null,
        headers: [
          "Utilisateur",
          "Lieu",
          "Etat"
        ],
        items: [
          { name: 'John Doe', location: "12 rue mes couilles", state: 'john@example.com' },
          { name: 'Jane Smith', location: "12 rue mes couilles", state: 'jane@example.com' },
          { name: 'Bob Johnson', location: "12 rue mes couilles", state: 'bob@example.com' },
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  </style>