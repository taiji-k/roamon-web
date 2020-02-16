<template>
  <div class="container">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :single-select="singleSelect"
      item-key="id"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: "contact-info-list",
    data() {
      return {
        // 主にvuetify.jsのテーブル表示のためのもの
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 't-id',
            align: 'left',
            sortable: false,
            value: 'id',
          },
          {text: 't-contact_type', value: 'contact_type'},
          {text: 't-contact_information', value: 'contact_information'},
        ],
        items: []
      }
    },
    mounted: function () {
      // APIを通してデータを取得し表示
      this.$axios
        .$get('/api/all-contact-info')
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
