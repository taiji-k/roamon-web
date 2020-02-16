<template>
  <div class="container">
    <h1>boke</h1>
  </div>
</template>

<script>
  const querystring = require('querystring');
  const axios = require('axios');

  export default {
    name: "add-contact-info",
    mounted: function () {
      axios
        .post('/api/add-contact-info',{ contact_type:"email", contact_dest:"example-fromweb@example.com", prefix_list:["192.168.40.0/24", "192.168.60.0/24"] , asn_list:[2020]})
        .then(response => {
          // this.items = response
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<style scoped>

</style>
