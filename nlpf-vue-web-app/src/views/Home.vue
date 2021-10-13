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
          :price_range="properties.price_range"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="selectedParcelle ? 8 : 10">
        <v-card height="100%" min-height="calc(100vh - 64px)">
          <Map
            ref="MapComponent"
            :departementList="departements"
            :communesList="communes"
            :sectionsList="sections"
            :parcellesList="parcelles"
            :selectedDepartement="selectedDepartement"
            :selectedComunes="selectedComunes"
            :loading="loading"
            :results="results"
            v-on:selectDepartement="handleMapClickDepartement"
            v-on:selectCity="handleMapClickCommunes"
            v-on:selectSection="handleMapClickSection"
            v-on:selectParcelles="handleMapClickParcelle"
          />
        </v-card>
      </v-col>
      <v-col v-if="selectedParcelle" cols="2" class="pt-4 pr-4">
        <div class="font-weight-bold h4">Resultats</div>
        <div>{{ getResults.length }} ventes en 2020</div>
        <v-row no-gutters>
          <v-col v-for="(e, i) in getResults" :key="i" cols="12">
            <v-card outlined>
              <v-card-title
                >{{ e.valeur_fonciere }}€ /
                {{ e.nature_mutation }}</v-card-title
              >
              <v-card-subtitle>
                {{ formatDate(e.date_mutation) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-row>
                  <v-col v-for="(b, j) in e.biens" :key="j" cols="12">
                    <v-card outlined>
                      <v-card-title>
                        {{ b.surface_reelle_bati }}m²</v-card-title
                      >
                      <v-card-subtitle>
                        {{ b.type_local }}
                        <span v-if="b.nombre_pieces_principales > 0"
                          >/ {{ b.nombre_pieces_principales }}p</span
                        >
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-actions>
              <!-- <v-card-text>{{ e }}</v-card-text> -->
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Map from "../components/Map.vue";
import MapFilters from "../components/MapFilters.vue";
import departements from "../assets/departements.json";

import {
  fetchCityOfDepartementContour,
  fetchParcelles,
  fetchSection,
  fetchBiens,
} from "../services/api.service";

export default {
  components: {
    Map,
    MapFilters,
  },
  data: () => ({
    departements: departements,
    communes: {},
    sections: {},
    parcelles: {},
    results: [],
    total_result: 0,
    page: 0,
    selectedDepartement: "",
    selectedComunes: "",
    selectedParcelle: null,
    snackbar: false,
    loading: false,
    properties: {
      price_range: [0, 10000],
    },
  }),
  methods: {
    handleMapClickDepartement(data) {
      // console.log("handleMapClickDepartement", data);
      this.selectedParcelle = null;
      this.fetchCommunes(data);
      this.$refs["FiltersComponent"].setDepartementInput(data.input);
    },
    handleMapClickCommunes(data) {
      this.selectedParcelle = null;

      // console.log("handleMapClickCommunes", data);
      // this.fetchBiens(data);
      this.$refs["FiltersComponent"].setCommuneInput(data.input);
      this.fetchSections(data.input);
    },
    handleMapClickSection(data) {
      console.log("handleMapClickSection", data);
      this.selectedParcelle = null;

      // this.fetchBiens(data);
      // this.$refs["FiltersComponent"].setCommuneInput(data.input);
      this.fetchParcelles(data.input, data.sectionId);
      this.fetchBiens(data.sectionId);
    },
    handleMapClickParcelle(data) {
      console.log("handleMapClickParcelle", data);
      this.selectedParcelle = data.input;
    },
    async fetchBiens(id_parcelle) {
      this.loading = true;

      const biens = await fetchBiens(id_parcelle, this.properties, this.page);

      setTimeout(() => (this.loading = false), 2500);

      console.log("Biens fetched", biens);
      const { page, total_result, results } = biens;
      this.page = page;
      this.total_result = total_result;
      this.results = results;
    },
    async fetchCommunes(data) {
      // console.log(`Fetching city of departement code: ${data.input}`);
      this.snackbar = true;
      this.loading = true;
      const communes = await fetchCityOfDepartementContour(data.input);
      // this.snackbar = false;
      setTimeout(() => (this.loading = false), 1000);

      this.communes = communes;
      this.resetFilters();
    },
    async fetchParcelles(input, id) {
      // console.log(`Fetching parcelles: ${data}`);

      const parcelles = await fetchParcelles(input, id);
      this.parcelles = parcelles;
    },
    async fetchSections(data) {
      // console.log(`Fetching sections: ${data}`);
      const sections = await fetchSection(data);
      this.sections = sections;
    },
    filter(data) {
      console.log(`Filtering ${JSON.stringify(data)}`);
      this.selectedComunes = data.communeInput;
      this.selectedDepartement = data.departementInput;
      this.properties.price_range = data.price_range;
    },
    resetFilters(data) {
      console.log(`Filtering ${data}`);
      this.selectedComunes = "";
      this.selectedDepartement = "";
    },
    formatDate(date) {
      const parsed = Date.parse(date);
      const newDate = new Date(parsed);
      return newDate.toLocaleDateString("fr-FR");
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
    getResults() {
      if (!this.selectedParcelle) {
        return [];
      }
      const matching = this.results.filter(
        (e) => e.id_parcelle === this.selectedParcelle
      );

      const reduced = [];
      const skip = [];
      for (let i = 0; i < matching.length; i++) {
        const {
          date_mutation,
          valeur_fonciere,
          nature_mutation,
          surface_reelle_bati,
        } = matching[i];
        const bien = {
          date_mutation,
          valeur_fonciere,
          nature_mutation,
          biens: [matching[i]],
        };
        if (skip.includes(i) || surface_reelle_bati == null) {
          continue;
        }
        for (let j = i + 1; j < matching.length; j++) {
          console.log(
            matching[j].date_mutation == date_mutation,
            matching[j].valeur_fonciere == valeur_fonciere,
            matching[j].nature_mutation == nature_mutation
          );
          if (
            matching[j].date_mutation == date_mutation &&
            matching[j].valeur_fonciere == valeur_fonciere &&
            matching[j].nature_mutation == nature_mutation
          ) {
            bien.biens.push(matching[j]);
            skip.push(j);
          }
        }
        reduced.push(bien);
      }
      return reduced;
    },
  },
};
</script>

<style>
</style>