<template>
  <v-container>
    <!-- <v-row>
      <v-card class="mx-auto" max-width="344">
        <v-card-text>
          <div>Favoris id : {{ wholeResponse.response[0].id }}</div>
          <p class="text-h4 text--primary">
            En {{ wholeResponse.response[0].year }} pour un montant de
            {{ wholeResponse.response[0].price }} $
          </p>
          <p>Localisation</p>
          <div class="text--primary">
            Code postal:
            {{ wholeResponse.response[0].localisation.postal_code }}
          </div>
          <div class="text--primary">
            Ville: {{ wholeResponse.response[0].localisation.city }}
          </div>
          <div class="text--primary">
            Adresse: {{ wholeResponse.response[0].localisation.address }}
          </div>
          <div class="text--primary">
            Number: {{ wholeResponse.response[0].localisation.number }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="teal accent-4" @click="reveal = true">
            Favoris
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row> -->

    <v-row>
      <v-col cols="12" md="4" v-for="(e, i) in getFavoris" :key="i">
        <v-card class="mx-auto mt-4" max-width="344" height="200">
          <v-card-title class="primary--text"
            >Vente / {{ e.price }} € <v-spacer></v-spacer
            ><v-btn icon color="red" @click="e.reveal = false"
              ><v-icon>mdi-heart</v-icon></v-btn
            >
          </v-card-title>
          <v-card-subtitle>{{ e.year }}</v-card-subtitle>
          <v-card-text>
            <div>
              Adresse:
              {{ e.localisation.address }}, {{ e.localisation.postal_code }}
              {{ e.localisation.city }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="teal accent-4" @click="goTo">
              Voir le bien
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      wholeResponse: null,
    };
  },
  methods: {
    async fetchFavoris() {
      const resp = await axios.get(
        "https://stormy-taiga-31121.herokuapp.com/favoris"
      );
      this.wholeResponse = resp.data.response.map((e) => ({
        ...e,
        reveal: true,
      }));
    },
    goTo() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.fetchFavoris();
  },
  computed: {
    getFavoris() {
      if (this.wholeResponse == null) {
        return [];
      }
      return this.wholeResponse.filter((e) => e.reveal);
    },
  },
};
</script>

<style>
</style>