<template>
<v-container>
<v-row>
 <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Favoris id : {{wholeResponse.response[0].id}}</div>
      <p class="text-h4 text--primary">
         En {{wholeResponse.response[0].year}} pour un montant de {{wholeResponse.response[0].price}} $
      </p>
      <p>Localisation</p>
      <div class="text--primary">
        Code postal:  {{wholeResponse.response[0].localisation.postal_code}}
      </div>
      <div class="text--primary">
       Ville: {{wholeResponse.response[0].localisation.city}}
      </div>
      <div class="text--primary">
       Adresse: {{wholeResponse.response[0].localisation.address}}
      </div>
      <div class="text--primary">
       Number: {{wholeResponse.response[0].localisation.number}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
      >
        Favoris
      </v-btn>
    </v-card-actions>
  </v-card>
</v-row>



<v-row v-for="n in 4">
 <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Favoris id : {{wholeResponse.response[n].id}}</div>
      <p class="text-h4 text--primary">
         En {{wholeResponse.response[n].year}} pour un montant de {{wholeResponse.response[n].price}} $
      </p>
      <p>Localisation</p>
      <div class="text--primary">
        Code postal:  {{wholeResponse.response[n].localisation.postal_code}}
      </div>
      <div class="text--primary">
       Ville: {{wholeResponse.response[n].localisation.city}}
      </div>
      <div class="text--primary">
       Adresse: {{wholeResponse.response[n].localisation.address}}
      </div>
      <div class="text--primary">
       Number: {{wholeResponse.response[n].localisation.number}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
      >
        Favoris
      </v-btn>
    </v-card-actions>
  </v-card>
</v-row>
</v-container>
</template>

<script>
import axios from "axios";
export default {
 data: () => {
    return {
      wholeResponse: {},

    };
  },
mounted () {
  axios.get("https://stormy-taiga-31121.herokuapp.com/favoris").then(response => (this.wholeResponse = response.data));
}
};
</script>

<style>
</style>