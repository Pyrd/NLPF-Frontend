<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="1">COL1</v-col>
      <v-col cols="10">
        <v-card height="100%" min-height="90vh">
          <Map />
        </v-card>
      </v-col>
      <v-col cols="1">COL2</v-col>
    </v-row>
  </v-container>
</template>

<script>
import Map from "../components/Map.vue";
export default {
  components: {
    Map,
  },
};
</script>

<style>
</style>