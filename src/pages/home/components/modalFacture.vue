<template>
  <modal-default v-model="show" @update:model-value="emits('update:modelValue')">
    <div class="py-2 px-4">
      <div class="text-3xl font-medium px-12 mt-2">
        Déposer une facture
      </div>

      <div class="mt-6">
        <div class="mx-4">
          <label for="fileInput" class="custom-file-upload w-full">
            <button-default class="w-full" @click="fileInput.click()">Sélectionner un fichier</button-default>
          </label>

          <input type="file" id="fileInput" ref="fileInput" multiple @change="(e) => handleUpload(e)">
        </div>

        <div class="w-full h-[0.01em] bg-black/20 mt-4"></div>

        <div class="mt-4">
          <div class="text-base">
            Liste des fichier :
          </div>

          <div v-for="file in listFilesUploaded">
            {{file.name}} - {{formatFileSize(file.size)}}
          </div>
        </div>

        <div class="mt-6 flex flex-row-reverse mb-4 mr-4">
          <button-default class="px-4 py-2" @click="sendFiles">envoyer</button-default>
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

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue:{}
})


let show = toRef(props, 'modelValue')
let listFilesUploaded = ref([])
const fileInput = ref(null)

function handleUpload(e) {
  listFilesUploaded.value.push(...e.target.files);
}

function sendFiles() {
  let formData = new FormData();
  listFilesUploaded.value.forEach((file) => {
    formData.append('file', file);
  })
  console.log(listFilesUploaded.value.length)
  axios.post('paperless/test',
      {files: listFilesUploaded.value},
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(({data}) => {
    console.log(data)
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