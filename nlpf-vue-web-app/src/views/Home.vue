<template>
  <div>
    <v-snackbar v-model="snackbar">
      Chargement en cours

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col cols="2">
        <MapFilters
          ref="FiltersComponent"
          v-on:filter="filter"
          v-on:fetchCommunes="fetchCommunes"
          :departementList="getDepartementsList"
          :communesList="getCommunesList"
        />
      </v-col>
      <v-col cols="10">
        <v-card height="100%" min-height="calc(100vh - 64px)">
          <Map
            ref="MapComponent"
            :departementList="departements"
            :communesList="communes"
            :selectedDepartement="selectedDepartement"
            :selectedComunes="selectedComunes"
            :loading="loading"
            v-on:selectDepartement="handleMapClickDepartement"
            v-on:selectCity="handleMapClickCommunes"
          />
        </v-card>
      </v-col>
      <!-- <v-col cols="1">COL2</v-col> -->
    </v-row>
  </div>
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
    snackbar: false,
    loading: false,
  }),
  methods: {
    handleMapClickDepartement(data) {
      console.log("handleMapClickDepartement", data);

      this.fetchCommunes(data);
      this.$refs["FiltersComponent"].setDepartementInput(data.input);
    },
    handleMapClickCommunes(data) {
      console.log("handleMapClickCommunes", data);
      this.fetchBiens(data);
      this.$refs["FiltersComponent"].setCommuneInput(data.input);
    },
    async fetchBiens() {},
    async fetchCommunes(data) {
      console.log(`Fetching city of departement code: ${data.input}`);
      this.snackbar = true;
      this.loading = true;
      const communes = await fetchCityOfDepartementContour(data.input);
      // this.snackbar = false;
      this.loading = false;

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