<template>
<v-container>
<v-row>
 <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Favoris id</div>
      <p class="text-h4 text--primary">
        Favoris 1: Année PRIX
      </p>
      <p>Localisation</p>
      <div class="text--primary">
        Code postal:
      </div>
      <div class="text--primary">
       Ville:
      </div>
      <div class="text--primary">
       Adresse:
      </div>
      <div class="text--primary">
       Number:
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

<v-row>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Favoris id</div>
      <p class="text-h4 text--primary">
        Favoris 2: Année PRIX
      </p>
      <p>Localisation</p>
      <div class="text--primary">
        Code postal:
      </div>
      <div class="text--primary">
       Ville:
      </div>
      <div class="text--primary">
       Adresse:
      </div>
      <div class="text--primary">
       Number:
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
export default {};
</script>

<style>
</style>