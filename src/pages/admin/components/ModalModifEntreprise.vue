<template>
<modal-default v-model="show" @update:model-value="emits('update:modelValue', false)" classe="w-2/3">
  <div class="px-4 py-12 flex flex-col items-center">
    <div class="text-4xl px-32 text-center font-medium">
      La modification des informations de l'entreprise entrainera une suspensions à l'acces au depot de facture
    </div>

    <div class="mt-8 text-center px-48">
      Le temps que nos équipe valide vos nouvelles informations, vous ainsi que vos collabrateur pourront toujours accèder
      a l'applicaiton mais l'envoie de facture vous sera momentanement retirer
    </div>

    <div class="mt-12 flex justify-around w-full">
      <button-default @click="emits('update:modelValue', false)"
                      class="px-12 py-2"
                      :background="'#fa9292'">
          Abandonner
      </button-default>

      <button-default @click="emits('confirm');emits('update:modelValue', false)"
                      class="px-12 py-2"
                      :background="'#a5ef92'">
          Confirmer
        </button-default>
    </div>
  </div>
</modal-default>
</template>

<script setup>
import ModalDefault from "@/components/ModalDefault.vue";
import {toRef} from "vue";
import ButtonDefault from "@/components/ButtonDefault.vue";

const emits = defineEmits(['update:modelValue', 'confirm'])
const props = defineProps({
  modelValue:{}
})

const show = toRef(props, 'modelValue')

</script>

<script>

export default {
  name: "ModalModifEntreprise",
}
</script>

<style scoped>

</style>