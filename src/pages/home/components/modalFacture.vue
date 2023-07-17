<template>
  <modal-default v-model="show" @update:model-value="emits('update:modelValue', false)">
    <div class="py-4 px-16">
      <div class="text-3xl font-medium px-12 mt-2">
        Déposer une facture
      </div>

      <div class="mt-4 text-gray-400">
        Seul le format PDF est accepter pour le depot de votre facture
      </div>

      <div class="mt-12">
        <div class="mx-4">
          <label for="fileInput" class="custom-file-upload w-full">
            <button-default class="w-full h-full" @click="fileInput.click()">Sélectionner un fichier</button-default>
          </label>

          <input type="file" id="fileInput" ref="fileInput" accept=".pdf" @change="(e) => handleUpload(e)">
        </div>

        <div class="w-full h-[0.01em] bg-black/20 mt-4"></div>

        <div class="mt-4">
          <div class="text-base">
            fichier :
          </div>

          <div v-if="filesUploaded" class="mt-4 flex justify-around">
            <div>
              <div class="font-medium">
                {{filesUploaded.name}}
              </div>

              <div class="text-sm text-gray-500/50">
                {{formatFileSize(filesUploaded.size)}}
              </div>
            </div>

            <div class="w-fit p-1.5 rounded-full hover:bg-black/20 cursor-pointer" @click="filesUploaded = null">
              <trash-solid class="w-8 text-red-500"></trash-solid>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-row-reverse mb-4 mr-4">
          <button-default :disabled="filesUploaded === null" class="px-4 py-2" @click="sendFiles">envoyer</button-default>
        </div>
      </div>
    </div>
  </modal-default>
</template>

<script setup>
import ModalDefault from "@/components/ModalDefault.vue";
import {ref, toRef} from "vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import axios from "@/axiosConfig";
import {toast} from 'vue3-toastify'
import TrashSolid from "@/components/icons/TrashSolid.vue";

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue:{}
})


let show = toRef(props, 'modelValue')
let filesUploaded = ref(null)
const fileInput = ref(null)

function handleUpload(e) {
  filesUploaded.value = e.target.files[0];
}

function sendFiles() {
  let formData = new FormData();
  formData.append('file', filesUploaded.value);

  axios.post('paperless/facture',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(({data}) => {
        if (data.facture) {
          toast('Facure déposer', {type: "success"})
        }
      emits('update:modelValue', false)
  }).catch(() => {
    toast('Une erreur est survenue', {type: "error"})
  })
}


function formatFileSize(sizeInBytes) {
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
</script>





<script>
export default {
  name: "modalFacture",
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>