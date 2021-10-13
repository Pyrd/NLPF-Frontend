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
    <v-row no-gutters class="px-4">
      <v-col cols="4">
        <v-tabs v-model="tab">
          <v-tab>Par Département</v-tab>

          <v-tab>Par ville</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row no-gutters class="px-4 pt-4">
              <v-col cols="12">
                <div class="h3 font-weight-bold">
                  Statistiques d'un département
                </div>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-select
                  v-model="departementInputA"
                  :items="filterDepartementsA"
                  :item-text="(e) => `${e.code} - ${e.nom}`"
                  item-value="code"
                  label="Départements"
                  required
                  outlined
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon> mdi-text-search </v-icon>
                      </v-list-item-action>
                      <v-list-item-content class="py-0">
                        <v-text-field
                          v-model="departementFilterInputA"
                          label="Recherche"
                          hide-hints
                        >
                        </v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  outlined
                  clearable
                  v-model="type1"
                  :items="getTypes"
                  item-value="code"
                  :item-text="(e) => `${e.code} - ${e.label}`"
                  label="Type"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <div class="font-weight-bold">Surface</div></v-col
              >
              <v-col cols="12" class="mt-14">
                <v-range-slider
                  v-model="surface1"
                  :max="maxsurface"
                  :min="minsurface"
                  hide-details
                  step="1"
                  class="align-center"
                  thumb-color="primary"
                  thumb-label="always"
                  :thumb-size="48"
                >
                </v-range-slider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col class="center">
                    <v-text-field
                      outlined
                      :value="surface1[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(surface1, 0, $event)"
                    ></v-text-field>
                  </v-col>
                  <v-col class="center">
                    <v-text-field
                      outlined
                      :value="surface1[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(surface1, 1, $event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <div class="font-weight-bold">Nombre de pièces</div></v-col
              >
              <v-col cols="12" class="mt-10">
                <v-range-slider
                  v-model="nbpieces1"
                  :max="maxnbpieces"
                  :min="minnbpieces"
                  hide-details
                  step="1"
                  class="align-center"
                  thumb-color="primary"
                  thumb-label="always"
                  :thumb-size="34"
                >
                </v-range-slider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col class="center">
                    <v-text-field
                      outlined
                      :value="nbpieces1[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(nbpieces1, 0, $event)"
                    ></v-text-field>
                  </v-col>
                  <v-col class="center">
                    <v-text-field
                      outlined
                      :value="nbpieces1[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(nbpieces1, 1, $event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="mt-4"
                  block
                  outlined
                  color="primary"
                  @click="statsDepartement"
                  :disabled="departementInputA.length == 0"
                >
                  Recherche
                </v-btn>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row no-gutters class="px-4">
              <v-col cols="12" class="mt-4">
                <v-divider></v-divider>
                <div class="h3 font-weight-bold">Statistiques par ville</div>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-select
                  v-model="departementInputB"
                  :items="filterDepartementsB"
                  :item-text="(e) => `${e.code} - ${e.nom}`"
                  item-value="code"
                  label="Départements"
                  required
                  outlined
                  @change="fetchCommunesB"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon> mdi-text-search </v-icon>
                      </v-list-item-action>
                      <v-list-item-content class="py-0">
                        <v-text-field
                          v-model="departementFilterInputB"
                          label="Recherche"
                          hide-hints
                        >
                        </v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12">
                <div class="mb-2">
                  Il y a {{ getCommunesListB.length }} communes.
                </div>
                <v-select
                  :disabled="getCommunesListB.length == 0"
                  v-model="communeInputB"
                  label="Communes"
                  :items="filterCommunesB"
                  :item-text="
                    (e) => `${e.properties.code} - ${e.properties.nom}`
                  "
                  item-value="properties.code"
                  :loading="communeLoadingB"
                  required
                  outlined
                  @change="resetResults"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon> mdi-text-search </v-icon>
                      </v-list-item-action>
                      <v-list-item-content class="py-0">
                        <v-text-field
                          v-model="communeFilterInputB"
                          label="Recherche"
                          hide-hints
                        >
                        </v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  outlined
                  clearable
                  v-model="type2"
                  :items="getTypes"
                  item-value="code"
                  :item-text="(e) => `${e.code} - ${e.label}`"
                  label="Type"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <div class="font-weight-bold">Surface</div></v-col
              >
              <v-col cols="12" class="mt-14">
                <v-range-slider
                  v-model="surface2"
                  :max="maxsurface"
                  :min="minsurface"
                  hide-details
                  step="1"
                  class="align-center"
                  thumb-color="primary"
                  thumb-label="always"
                  :thumb-size="48"
                >
                </v-range-slider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col class="center">
                    <v-text-field
                      outlined
                      :value="surface2[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(surface2, 0, $event)"
                    ></v-text-field>
                  </v-col>
                  <v-col class="center">
                    <v-text-field
                      outlined
                      :value="surface2[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(surface2, 1, $event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <div class="font-weight-bold">Nombre de pièces</div></v-col
              >
              <v-col cols="12" class="mt-10">
                <v-range-slider
                  v-model="nbpieces2"
                  :max="maxnbpieces"
                  :min="minnbpieces"
                  hide-details
                  step="1"
                  class="align-center"
                  thumb-color="primary"
                  thumb-label="always"
                  :thumb-size="34"
                >
                </v-range-slider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col class="center">
                    <v-text-field
                      outlined
                      :value="nbpieces2[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(nbpieces2, 0, $event)"
                    ></v-text-field>
                  </v-col>
                  <v-col class="center">
                    <v-text-field
                      outlined
                      :value="nbpieces2[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(nbpieces2, 1, $event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="mt-4"
                  block
                  outlined
                  color="primary"
                  @click="statsCommune"
                  :disabled="communeInputB == null || communeInputB.length == 0"
                >
                  Recherche
                </v-btn>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="8">
        <v-card height="100%" min-height="calc(100vh - 64px)">
          <v-card-title>Résultats</v-card-title>
          <v-row
            v-if="resultsLoading"
            align="center"
            justify="center"
            class="fheight"
          >
            <v-col cols="6" class="center" style="flex-direction: column">
              <v-progress-circular
                indeterminate
                :size="70"
                :width="7"
                color="primary"
              ></v-progress-circular>
              <div class="mt-4 font-weight-bold h3">Chargement en cours !</div>
            </v-col>
          </v-row>
          <v-card-actions v-else-if="results != null">
            <v-row>
              <v-col cols="12">
                <v-card outlined>
                  <v-card-title v-if="results.code"
                    >{{ results.code }} - {{ results.nom }}
                  </v-card-title>
                  <v-card-title v-else
                    >{{ results.code_commune }} -
                    {{ getCommuneName(results.code_commune) }}
                  </v-card-title>
                  <v-card-text>
                    <b>Nombre de transactions</b>: {{ results.count }}
                  </v-card-text>
                  <v-card-text
                    ><b>Moyenne des prix:</b>
                    {{ results.moy.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b> Moyenne des surfaces:</b>
                    {{ results.suf.toFixed(2) }}m²</v-card-text
                  ><v-card-text
                    ><b>Moyenne des prix par m²:</b>
                    {{ results.moy_m2.toFixed(2) }}€/m²</v-card-text
                  >
                  <v-card-text
                    ><b>Minimum des prix:</b>
                    {{ results.min.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b>Maximum des prix:</b>
                    {{ results.max.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b>Mediane des prix:</b>
                    {{ results.med.toFixed(2) }}€</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-actions v-else>
            <v-row align="center" justify="center" class="fheight">
              <v-col cols="6" class="center" style="flex-direction: column">
                <div class="mt-4 font-weight-bold h3">
                  Choisie une catégorie et récupère les stats !
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
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
  statDepartement,
  statCommune,
} from "../services/api.service";
import { typesdebiens } from "../assets/constants";

export default {
  components: {
    Map,
    MapFilters,
  },
  data: () => ({
    type1: null,
    minsurface: 0,
    maxsurface: 100000,
    minnbpieces: 0,
    maxnbpieces: 100,
    surface1: [0, 100000],
    nbpieces1: [0, 100],
    type2: null,
    surface2: [0, 100000],
    nbpieces2: [0, 100],
    tab: 0,
    departements: departements,
    departementInputA: "",
    departementFilterInputA: "",
    communeInputA: "",
    communeLoadingA: false,
    communeFilterInputA: "",
    departementInputB: "",
    departementFilterInputB: "",
    communeInputB: "",
    communeLoadingB: false,
    communeFilterInputB: "",
    compareCityLoading: false,
    communes: {},
    communesA: {},
    communesB: {},
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
    results: null,
    resultsLoading: false,
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
    async fetchCommunesA() {
      const input = this.departementInputA;
      console.log(`A: Fetching city of departement code: ${input}`);
      this.snackbar = true;
      this.loading = true;
      const communes = await fetchCityOfDepartementContour(input);
      // this.snackbar = false;
      setTimeout(() => (this.loading = false), 1000);
      console.log("A>", communes);

      this.communesA = communes;
      // this.resetFilters();
    },
    async fetchCommunesB() {
      this.resetResults();
      const input = this.departementInputB;

      console.log(`B: Fetching city of departement code: ${input}`);
      this.snackbar = true;
      this.loading = true;
      const communes = await fetchCityOfDepartementContour(input);
      // this.snackbar = false;
      setTimeout(() => (this.loading = false), 1000);
      console.log("B>", communes);
      this.communesB = communes;
      // this.resetFilters();
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
    async compareCity() {
      console.log("compareCity");
      this.compareCityLoading = true;
      const results = await compareCity();
      this.compareCityLoading = false;
    },
    async statsDepartement() {
      console.log(`Stats dep : ${this.departementInputA}`);
      this.resultsLoading = true;
      const result = await statDepartement(
        this.departementInputA,
        this.type1,
        this.surface1,
        this.nbpieces1
      );
      this.resultsLoading = false;
      console.log(result);
      this.results = result;
    },
    async statsCommune() {
      console.log(`Stats dep : ${this.communeInputB}`);
      this.resultsLoading = true;
      const result = await statCommune(
        this.communeInputB,
        this.type2,
        this.surface2,
        this.nbpieces2
      );
      this.resultsLoading = false;
      this.results = result;
    },
    getCommuneName(code) {
      const communes = this.getCommunesListB;
      for (let i = 0; i < communes.length; i++) {
        const commune = communes[i];
        if (commune.properties.code == code) {
          return commune.properties.nom;
        }
      }
    },
    resetResults() {
      this.results = null;
    },
  },
  computed: {
    filterCommunesA() {
      return this.getCommunesListA.filter((e) => {
        if (this.communeFilterInputA.length === 0) {
          return true;
        } else {
          const str = e.properties.code + e.properties.nom.toLowerCase();
          return str.includes(this.communeFilterInputA);
        }
      });
    },
    filterDepartementsA() {
      return this.getDepartementsList.filter((e) => {
        if (this.departementFilterInputA.length === 0) {
          return true;
        } else {
          const str = e.code + e.nom.toLowerCase();
          return str.includes(this.departementFilterInputA);
        }
      });
    },
    filterCommunesB() {
      return this.getCommunesListB.filter((e) => {
        if (this.communeFilterInputB.length === 0) {
          return true;
        } else {
          const str = e.properties.code + e.properties.nom.toLowerCase();
          return str.includes(this.communeFilterInputB);
        }
      });
    },
    filterDepartementsB() {
      return this.getDepartementsList.filter((e) => {
        if (this.departementFilterInputB.length === 0) {
          return true;
        } else {
          const str = e.code + e.nom.toLowerCase();
          return str.includes(this.departementFilterInputB);
        }
      });
    },
    getDepartementsList() {
      return this.departements["features"]
        .map((e) => e.properties)
        .sort((a, b) => a.code > b.code);
    },
    getCommunesList() {
      return this.communes["features"] || [];
    },
    getCommunesListA() {
      return this.communesA["features"] || [];
    },
    getCommunesListB() {
      return this.communesB["features"] || [];
    },
    getMatchingResults() {
      if (!this.selectedParcelle) {
        return [];
      }
      return this.results.filter(
        (e) => e.id_parcelle === this.selectedParcelle
      );
    },
    getResults() {
      const matching = this.getMatchingResults;

      const reduced = [];
      const skip = [];
      for (let i = 0; i < matching.length; i++) {
        const { date_mutation, valeur_fonciere, nature_mutation } = matching[i];
        const bien = {
          date_mutation,
          valeur_fonciere,
          nature_mutation,
          biens: [matching[i]],
        };
        if (skip.includes(i)) {
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
    getTypes() {
      return typesdebiens;
    },
  },
};
</script>

<style>
</style>