<template>
  <v-row>
    <v-col cols="2">
      <MapFilters
        v-on:filter="filter"
        v-on:fetchCommunes="fetchCommunes"
        :departementList="getDepartementsList"
        :communesList="communes"
      />
    </v-col>
    <v-col cols="10">
      <v-card height="100%" min-height="90vh">
        <Map />
      </v-card>
    </v-col>
    <!-- <v-col cols="1">COL2</v-col> -->
  </v-row>
</template>

<script>
import Map from "../components/Map.vue";
import MapFilters from "../components/MapFilters.vue";
import departements from "../assets/departements.json";
import { fetchCityOfDepartementContour } from "../services/api.service";

export default {
  components: {
    Map,
    MapFilters,
  },
  data: () => ({
    departements: departements["features"],
    communes: [],
  }),
  methods: {
    async fetchCommunes(data) {
      console.log(
        `Fetching city of departement code: ${data.departementInput}`
      );
      const communes = await fetchCityOfDepartementContour(
        data.departementInput
      );

      this.communes = communes["features"];
    },
    filter(data) {
      console.log(`Filtering ${data}`);
    },
  },
  computed: {
    getDepartementsList() {
      return this.departements
        .map((e) => e.properties)
        .sort((a, b) => a.code > b.code);
    },
  },
};
</script>

<style>
</style>