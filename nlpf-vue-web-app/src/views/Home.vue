<template>
  <v-row>
    <v-col cols="2">
      <MapFilters
        v-on:filter="filter"
        v-on:fetchCommunes="fetchCommunes"
        :departementList="getDepartementsList"
        :communesList="getCommunesList"
      />
    </v-col>
    <v-col cols="10">
      <v-card height="100%" min-height="calc(100vh - 64px)">
        <Map
          :departementList="departements"
          :communesList="communes"
          :selectedDepartement="selectedDepartement"
          :selectedComunes="selectedComunes"
        />
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
    departements: departements,
    communes: {},
    selectedDepartement: "",
    selectedComunes: "",
  }),
  methods: {
    async fetchCommunes(data) {
      console.log(
        `Fetching city of departement code: ${data.departementInput}`
      );
      const communes = await fetchCityOfDepartementContour(
        data.departementInput
      );

      this.communes = communes;
      this.resetFilters();
    },
    filter(data) {
      console.log(`Filtering ${JSON.stringify(data)}`);
      this.selectedComunes = data.communeInput;
      this.selectedDepartement = data.departementInput;
    },
    resetFilters(data) {
      console.log(`Filtering ${data}`);
      this.selectedComunes = "";
      this.selectedDepartement = "";
    },
  },
  computed: {
    getDepartementsList() {
      return this.departements["features"]
        .map((e) => e.properties)
        .sort((a, b) => a.code > b.code);
    },
    getCommunesList() {
      return this.communes["features"] || [];
    },
  },
};
</script>

<style>
</style>