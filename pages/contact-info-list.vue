<template>
  <div class="container">
<!--    <v-data-table-->
<!--      v-model="selected"-->
<!--      :headers="headers"-->
<!--      :items="items"-->
<!--      :single-select="singleSelect"-->
<!--      item-key="id"-->
<!--      show-select-->
<!--      class="elevation-1"-->
<!--    >-->
<!--      <template v-slot:top>-->
<!--        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>-->
<!--      </template>-->
<!--    </v-data-table>-->


    <table border="1">
      <tbody>
      <tr>
        <th>ID</th>
        <th>contact-dest</th>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.contact_information }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "contact-info-list",
    data() {
      return {
        items: []
      }
    },
    mounted: function () {
      this.$axios
        .$get('/api/allcontactinfo')
        .then(response => {
          this.items = response
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<style scoped>

</style>
