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
          <text-field :width="16" class="mb-4" placeholder label="Nom" v-model="currentEntreprise.nom"></text-field>
          <text-field :width="16" class="mb-4" label="Adresse" v-model="currentEntreprise.adresse"></text-field>
          <text-field :width="16" label="Ville" v-model="currentEntreprise.ville"></text-field>
        </div>

        <div class="mt-6 flex flex-row-reverse mb-4 mr-4">
          <button-default class="px-4 py-2" @click="updateEntreprise">Modifier</button-default>
        </div>

        <div v-if="isSuccess" class="text-xl validation-success mt-2">
          Modification réussie !
        </div>
        <div v-if="isError" class="text-xl validation-error mt-2">
          Une erreur s'est produite lors de la modification.
        </div>
      </div>
    </div>
  </modal-default>
</template>

<script setup>
import ButtonDefault from "@/components/ButtonDefault.vue";
import TextField from "@/components/TextField.vue";
import modalDefault from "@/components/ModalDefault.vue";
import axios from '@/axiosConfig'
import useEntrepriseStore from '@/store/entreprise'
import { mapGetters } from "vuex";
import {toRef} from "vue";

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue:{}
})
let show = toRef(props, 'modelValue')
</script>

<script>

  export default {
    name: "modalUpdateEntreprise",
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
        },
        isSuccess: false,
        isError: false,
      }
    },
    created() {
      this.currentEntreprise = useEntrepriseStore.getters.getEntreprise
    },
    computed: {
      ...mapGetters("entreprise", ["getEntreprise"]),
    },
    methods: {
    updateEntreprise() {
      
      axios.put('paperless/entreprise', this.currentEntreprise).then(({data}) => {
          console.log(data)
          this.isSuccess = true;
          this.isError = false;
      }).catch((e) => {
          console.error(e)
          this.isSuccess = false;
          this.isError = true;
      })
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
