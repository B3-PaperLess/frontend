<template>
  <div class="grid grid-cols-3 px-24">
    <div class="mt-4 w-fit px-12 col-span-1">
      <img src="@/assets/image/logo.png" alt="logo" class="w-fit"/>
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
  </div>
  </template>
  
  <script>
  import datatable from "@/components/datatable.vue"
  import ModalFacture from "@/pages/home/components/modalFacture.vue";
  import ButtonDefault from "@/components/ButtonDefault.vue";
  
  export default {
    name: "indexApp",
    components: {ButtonDefault, ModalFacture, datatable },
    data() {
      return {
        showModalFacture: false,
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