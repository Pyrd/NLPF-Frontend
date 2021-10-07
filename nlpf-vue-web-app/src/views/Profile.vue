<template>
  <div class="h1">Modification du Profile
      <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text class="h1"> Vos informations </v-card-text>
            <v-card-actions>
              <v-text-field
                v-model="userInput"
                label="Name"
                placeholder="Your name"
                outlined
                clearable
                :disabled="isLoading"
              ></v-text-field>
            </v-card-actions>
            <v-card-actions>
              <v-text-field
                v-model="userInput"
                label="Firstname"
                placeholder="Your firstname"
                outlined
                clearable
                :disabled="isLoading"
              ></v-text-field>
            </v-card-actions>
            <v-card-actions>
              <v-text-field
                v-model="userInput"
                label="Age"
                placeholder="Your age"
                outlined
                clearable
                :disabled="isLoading"
              ></v-text-field>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-btn @click="travelToFavoris"> Go to favoris </v-btn>
    </v-container>
  </div>

</template>

<script>
export default {
  methods:{
    travelToFavoris() {
      this.$router.push("favoris");
    },
  }

};
</script>

<style>
</style>