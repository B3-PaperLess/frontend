<template>
<div class="">
  <div class="mt-4">
    <img src="@/assets/image/logo.png" alt="logo" class="w-2/3"/>
  </div>

  <div class="mt-12 flex flex-row justify-center gap-x-12">
    <card-home class="rounded-3xl">
      <template v-slot:title>
        Je suis le title
      </template>

      <template v-slot:content>
        Je suis le content
      </template>

      <template v-slot:button>
        <button-default class="border border-gray-300 bg-base-lg">je suis le bouton</button-default>
      </template>
    </card-home>

    <card-home>
      <template v-slot:title>
        Je suis le title
      </template>

      <template v-slot:content>
        Je suis le content
      </template>
    </card-home>

    val :{{val}}
    <radio-fields v-model="val" :items="items"></radio-fields>
  </div>
</div>
</template>

<script>
import CardHome from "@/components/cardHome.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import RadioFields from "@/components/RadioFields.vue";

export default {
  name: "indexApp",
  components: {CardHome,ButtonDefault,RadioFields },
  data() {
    return {
      val: null,
      items: [
        {label:'rouge', value:'rouge'},
        {label:'blue', value:'blue'},
      ]
    }
  }
}
</script>

<style scoped>

</style>