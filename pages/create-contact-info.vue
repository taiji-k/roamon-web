<template>
  <div class="container">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="contact_type"
              :rules="maxRules"
              :counter="256"
              label="Contact_type"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="contact_dest"
              :rules="maxRules"
              :counter="256"
              label="Contact_dest"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="prefix_list"
              :rules="existRules"
              label="Prefix_list"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="asn_list"
              :rules="existRules"
              label="ASN_list"
              required
            ></v-text-field>
          </v-col>

          <v-btn class="mr-4" color="success" @click="submit">submit</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  const querystring = require('querystring');
  const axios = require('axios');

  export default {
    name: "add-contact-info",
    data: () => ({
      // formで使うものなど
      valid: false,
      contact_type: '',
      contact_dest: '',
      maxRules: [
        v => !!v || 'required',
        v => v.length <= 256 || 'must be less than 10 characters',
      ],
      prefix_list: '',
      existRules: [
        v => !!v || 'required'
        // v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      asn_list: '',
    }),
    methods: {
      // formに入れたものをAPIを使いDBに書き込む
      submit () {
        console.log("buttoned!")
        console.log(this.prefix_list.replace(' ', '').split(','))
        console.log(this.asn_list.replace(' ', '').split(','))
        //this.$v.$touch();

        // DBに送信
        axios
          .post('/api/add-contact-info', {
            contact_type: this.contact_type,
            contact_dest: this.contact_dest,
            prefix_list: this.prefix_list.replace(' ', '').split(','),
            asn_list: this.asn_list.replace(' ', '').split(',')
          })
          .then(response => {
            // this.items = response
          })
          .catch(error => {
            console.log(error)
          })
      },
    },
    mounted: function () {
    }
  }
</script>

<style scoped>

</style>
