<template>
<modal-default v-model="show" @update:model-value="emits('update:modelValue', false)">
  <div class="py-6 px-12 flex flex-col items-center w-[34em]">
    <div class="font-medium text-center text-2xl">
      <div class="text-2xl">Attention en effectuant cette action vous perdez les droits administrateur.</div>
        <div class="mt-12">L'utilisateur selectionné deviendra l'administrateur de l'entreprise</div>
    </div>

    <div class="flex justify-around w-full mt-12">
      <button-default @click="emits('update:modelValue', false)"
                      class="py-2 px-4"
                      :background="'#fa9292'">
        Refuser
      </button-default>

      <button-default @click="emits('confirm', false)"
                      class="py-2 px-4"
                      :background="'#a5ef92'">
        Accepter
      </button-default>
    </div>
  </div>
</modal-default>
</template>

<script setup>

import {toRef} from "vue";

const emits = defineEmits(['update:modelValue', 'confirm'])
const props = defineProps({
  modelValue:{}
})

const show = toRef(props, 'modelValue')
</script>

<script>
import ModalDefault from "@/components/ModalDefault.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";

export default {
  name: "ModalUserSwitchAdmin",
  components: {ButtonDefault, ModalDefault}
}
</script>

<style scoped>

</style>