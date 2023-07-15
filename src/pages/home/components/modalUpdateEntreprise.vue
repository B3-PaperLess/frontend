<template>
  <modal-default v-model="show" @update:model-value="emits('update:modelValue')">
    <div class="py-2 px-4">
      <div class="text-3xl font-medium px-12 mt-2">
        Vos informations
      </div>

      <div class="mt-6">
        <div class="mx-4">
          <label class="text-base">
            N° de siret : {{ currentEntreprise.siret }}
          </label>
        </div>

        <div class="w-full h-[0.01em] bg-black/20 mt-4"></div>

        <div class="mt-4">
          <text-field :width="16" class="mb-4" label="Nom" v-model="currentEntreprise.nom"></text-field>
          <text-field :width="16" class="mb-4" label="Adresse" v-model="currentEntreprise.adresse"></text-field>
          <text-field :width="16" label="Ville" v-model="currentEntreprise.ville"></text-field>
        </div>

        <div class="mt-6 flex flex-row-reverse mb-4 mr-4">
          <button-default class="px-4 py-2" @click="updateEntreprise">Modifier</button-default>
        </div>

        <div v-if="showValidationMessage" :class="validationMessageClass">
          {{ validationMessageText }}
        </div>
      </div>
    </div>
  </modal-default>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue:{}
})
let show = toRef(props, 'modelValue')
</script>

<script>
  import ModalDefault from "@/components/ModalDefault.vue";
  import { toRef, ref } from "vue";
  import ButtonDefault from "@/components/ButtonDefault.vue";
  import TextField from "@/components/TextField.vue";
  export default {
    name: "modalUpdateEntreprise",
    components: { ButtonDefault, ModalDefault, TextField },
    props: {
    classes: {
        entreprise: Object,
      },
    },
    data() {
      return {
        currentEntreprise: {
          siret: null,
          nom: "",
          adresse: "",
          ville: "",
          valide: true,
        }
      }
    },
    // created() {
    //   currentEntreprise = this.entreprise;
    // },
    methods: {
    updateEntreprise() {
      const updateSuccessful = Math.random() < 0.5; // Randomly true or false

      if (updateSuccessful) {
        this.showValidationMessage = true;
        this.validationMessageClass = "validation-success";
        this.validationMessageText = "Modification réussie.";
      } else {
        this.showValidationMessage = true;
        this.validationMessageClass = "validation-error";
        this.validationMessageText = "Échec de la modification.";
      }

      setTimeout(() => {
        this.showValidationMessage = false;
      }, 3000);
    },
  },
};
</script>
<style>
.validation-success {
  color: #0FFF00;
}

.validation-error {
  color: #FF0000;
}
</style>
