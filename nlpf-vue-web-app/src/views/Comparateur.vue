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
      <v-col cols="4">
        <v-row no-gutters class="px-4 pt-4">
          <v-col cols="12">
            <div class="h3 font-weight-bold">Ville A</div>
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
              @change="fetchCommunesA"
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
            <div class="mb-2">
              Il y a {{ getCommunesListA.length }} communes.
            </div>
            <v-select
              :disabled="getCommunesListA.length == 0"
              v-model="communeInputA"
              label="Communes"
              :items="filterCommunesA"
              :item-text="(e) => `${e.properties.code} - ${e.properties.nom}`"
              item-value="properties.code"
              :loading="communeLoadingA"
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
                      v-model="communeFilterInputA"
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
            <v-divider></v-divider>
            <div class="h3 font-weight-bold">Ville B</div>
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
              :item-text="(e) => `${e.properties.code} - ${e.properties.nom}`"
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
              v-model="type"
              :items="getTypes"
              item-value="code"
              :item-text="(e) => `${e.code} - ${e.label}`"
              label="Type"
            ></v-select>
          </v-col>
          <v-col cols="12"> <div class="font-weight-bold">Surface</div></v-col>
          <v-col cols="12" class="mt-14">
            <v-range-slider
              v-model="surface"
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
                  :value="surface[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(surface, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col class="center">
                <v-text-field
                  outlined
                  :value="surface[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(surface, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <div class="font-weight-bold">Nombre de pièces</div></v-col
          >
          <v-col cols="12" class="mt-10">
            <v-range-slider
              v-model="nbpieces"
              :max="maxsurface"
              :min="minsurface"
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
                  :value="nbpieces[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(nbpieces, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col class="center">
                <v-text-field
                  outlined
                  :value="nbpieces[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(nbpieces, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="mt-4">
            <v-btn block outlined color="primary" @click="compareCity">
              Comparer
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8">
        <v-card height="100%" min-height="calc(100vh - 64px)">
          <v-card-title> Résultats de la comparaison </v-card-title>
          <v-row
            v-if="compareCityLoading"
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
          <v-card-actions v-else-if="comparaison != null">
            <v-row>
              <v-col cols="6">
                <v-card outlined>
                  <v-card-title
                    >{{ communeInputA }} - {{ getCommuneInputAName }}
                  </v-card-title>
                  <v-card-text>
                    <b>Nombre de transactions</b>: {{ comparaison.city1.count }}
                  </v-card-text>
                  <v-card-text
                    ><b>Moyenne des prix:</b>
                    {{ comparaison.city1.moy.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b>Minimum des prix:</b>
                    {{ comparaison.city1.min.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b>Maximum des prix:</b>
                    {{ comparaison.city1.max.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b>Mediane des prix:</b>
                    {{ comparaison.city1.med.toFixed(2) }}€</v-card-text
                  >
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card outlined>
                  <v-card-title
                    >{{ communeInputB }} - {{ getCommuneInputBName }}
                  </v-card-title>
                  <v-card-text>
                    <b>Nombre de transactions</b>: {{ comparaison.city2.count }}
                  </v-card-text>
                  <v-card-text
                    ><b>Moyenne des prix:</b>
                    {{ comparaison.city2.moy.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b>Minimum des prix:</b>
                    {{ comparaison.city2.min.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b>Maximum des prix:</b>
                    {{ comparaison.city2.max.toFixed(2) }}€</v-card-text
                  >
                  <v-card-text
                    ><b>Mediane des prix:</b>
                    {{ comparaison.city2.med.toFixed(2) }}€</v-card-text
                  >
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card outlined>
                  <v-card-title>Difference </v-card-title>
                  <v-card-text>
                    <b>Nombre de transactions:</b> {{ getCommuneInputBName }} à
                    <span
                      class="text-font-weight"
                      :class="
                        comparaison.count_diff < 0
                          ? 'error--text'
                          : 'success--text'
                      "
                      >{{ (comparaison.count_diff * 100).toFixed(2) }}%</span
                    >
                    transactions de
                    {{ comparaison.count_diff < 0 ? "moins" : "plus" }} que à
                    {{ getCommuneInputAName }}
                  </v-card-text>
                  <v-card-text
                    ><b>Moyenne</b> Le prix est en moyenne
                    <span
                      class="text-font-weight"
                      :class="
                        comparaison.moy_diff < 0
                          ? 'error--text'
                          : 'success--text'
                      "
                      >{{ (comparaison.moy_diff * 100).toFixed(2) }}%</span
                    >
                    {{ comparaison.moy_diff < 0 ? "moins" : "plus" }} élevé à
                    {{ getCommuneInputBName }} que à
                    {{ getCommuneInputAName }}</v-card-text
                  >
                  <v-card-text>
                    <b>Minimum</b> Le prix est minimum
                    <span
                      class="text-font-weight"
                      :class="
                        comparaison.min_diff < 0
                          ? 'error--text'
                          : 'success--text'
                      "
                      >{{ (comparaison.min_diff * 100).toFixed(2) }}%</span
                    >

                    {{ comparaison.min_diff < 0 ? "moins" : "plus" }} élevé à
                    {{ getCommuneInputBName }} que à
                    {{ getCommuneInputAName }}
                  </v-card-text>
                  <v-card-text>
                    <b>Maximum</b> Le prix est maximum
                    <span
                      class="text-font-weight"
                      :class="
                        comparaison.max_diff < 0
                          ? 'error--text'
                          : 'success--text'
                      "
                      >{{ (comparaison.max_diff * 100).toFixed(2) }}%</span
                    >
                    {{ comparaison.max_diff < 0 ? "moins" : "plus" }} élevé à
                    {{ getCommuneInputBName }} que à
                    {{ getCommuneInputAName }}
                  </v-card-text>
                  <v-card-text>
                    <b>Mediane</b> Le prix est medium
                    <span
                      class="text-font-weight"
                      :class="
                        comparaison.med_diff < 0
                          ? 'error--text'
                          : 'success--text'
                      "
                      >{{ (comparaison.max_diff * 100).toFixed(2) }}%</span
                    >

                    {{ comparaison.med_diff < 0 ? "moins" : "plus" }} élevé à
                    {{ getCommuneInputBName }} que à
                    {{ getCommuneInputAName }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-actions v-else>
            <v-row align="center" justify="center" class="fheight">
              <v-col cols="6" class="center" style="flex-direction: column">
                <div class="mt-4 font-weight-bold h3">
                  Choisie 2 villes et compare les !
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
import { typesdebiens } from "../assets/constants";
import {
  fetchCityOfDepartementContour,
  fetchParcelles,
  fetchSection,
  fetchBiens,
  compareCity,
} from "../services/api.service";

export default {
  components: {
    Map,
    MapFilters,
  },
  data: () => ({
    minsurface: 0,
    maxsurface: 100000,
    surface: [0, 100000],
    minnbpieces: 0,
    maxnbpieces: 100,
    nbpieces: [0, 100],
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
    type: null,
    comparaison: null,
  }),
  methods: {
    resetResults() {
      this.comparaison = null;
    },
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
      this.resetResults();
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
      console.log(
        "compareCity",
        this.departementInputA,
        this.communeInputA,
        this.departementInputB,
        this.communeInputB,
        this.type,
        this.surface,
        this.nbpieces
      );
      this.compareCityLoading = true;
      const results = await compareCity(
        this.communeInputA,
        this.communeInputB,
        this.type,
        this.surface,
        this.nbpieces
      );
      this.compareCityLoading = false;
      this.comparaison = results;
      console.log("Results >", results);
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
    getCommuneInputAName() {
      const code = this.communeInputA;
      const communes = this.getCommunesListA;
      for (let i = 0; i < communes.length; i++) {
        const commune = communes[i];
        if (commune.properties.code == code) {
          return commune.properties.nom;
        }
      }
    },
    getCommuneInputBName() {
      const code = this.communeInputB;
      const communes = this.getCommunesListB;
      for (let i = 0; i < communes.length; i++) {
        const commune = communes[i];
        if (commune.properties.code == code) {
          return commune.properties.nom;
        }
      }
    },
  },
};
</script>

<style>
</style>