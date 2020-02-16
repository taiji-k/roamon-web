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
            text: 't-prefix',
            align: 'left',
            sortable: false,
            value: 'prefix',
          },
          {text: 't-rov_status', value: 'rov_status'},
          {text: 't-advertised_prefix', value: 'advertised_prefix'},
          {text: 't-advertising_asn', value: 'advertising_asn'},
          {text: 't-data_fetched_at', value: 'data_fetched_at'},
        ],
        items: []
      }
    },
    mounted: function () {
      // APIを通してデータを取得し表示
      this.$axios
        .$get('/api/all-rov-result')
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
