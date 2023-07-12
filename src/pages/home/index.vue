<template>
  <div class="grid grid-cols-3 px-24">
    <div class="mt-4 w-fit px-12">
      <img src="@/assets/image/logo.png" alt="logo" class="w-fit"/>
    </div>
    <div class="mt-4 col-span-2">
      <datatable
      :headers="headers"
      :items="items"
      >
      </datatable>
    </div>
  </div>
  </template>
  
  <script>
  import datatable from "@/components/datatable.vue"
  
  export default {
    name: "indexApp",
    components: { datatable },
    data() {
      return {
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