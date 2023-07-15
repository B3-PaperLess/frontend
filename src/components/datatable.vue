<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="item in headers" :key="item.value">{{ item }}</th>
          <th v-if="actions.length > 0">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id" align="center">
          <td v-for="key in keys" >
            {{item[key]}}
          </td>

          <td v-if="actions.length > 0">
            <div class="flex gap-x-4 justify-center">
              <div v-if="actions.includes('delete')" class="cursor-pointer rounded-full hover:bg-black/10 p-1" @click="emits('delete', items[index].email)">
                <trash-solid class="w-6"></trash-solid>
              </div>

              <div v-if="actions.includes('admin')" class="cursor-pointer rounded-full hover:bg-black/10 p-1" @click="emits('admin', items[index].email)">
                <arrow-narrow-up-solid class="w-6"></arrow-narrow-up-solid>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import TrashSolid from "@/components/icons/TrashSolid.vue";
import ArrowNarrowUpSolid from "@/components/icons/ArrowNarrowUpSolid.vue";

const emits = defineEmits(['admin', 'delete'])
</script>

<script>

export default {
  name: 'datatable',
  props: {
      headers: {
      type: Array,
    },
    items:{
      type: Array,
    },
    actions:{
      type:Array,
      required:false,
      default: []
    },
    keys: {
      array: [],
      required:false,
      default: []
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  background-color: white;
}

th {
  background-color: #f2f2f2;
}
</style>