<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="item in headers" :key="item.value">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.state }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'datatable',
  props: {
      headers: {
      type: Array,
    },
    items:{
      type: Array,
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