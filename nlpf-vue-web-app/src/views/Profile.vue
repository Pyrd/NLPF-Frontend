
<template>
  <div class="h1">
    <v-container class="px-0">
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="3" class="left-col">
          <v-row>
            <v-avatar color="indigo" size="100">
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
          </v-row>
          <v-row>
            <v-card>
              <v-card-title> John Doe</v-card-title>
            </v-card>
          </v-row>
          <v-row>
            <v-card>
              <v-card-title> john.doe@gmail.com</v-card-title>
            </v-card>
          </v-row>
          <v-row>
            <v-card>
              <v-card-title> Acheteur</v-card-title>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="8" class="mr-4">
          <v-row justify="center">
            <v-dialog v-model="dialogprofil" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Editer votre profil
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Vos informations</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Prénom*" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Nom*" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Email*" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="['Acheteur', 'Vendeur']"
                          label="Catégorie*"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*Champs obligatoire</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="dialogprofil = false"
                  >
                    Annuler
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialogprofil = false"
                  >
                    Confirmer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <v-row> <v-container> </v-container> </v-row>

          <v-row justify="center">
            <v-dialog v-model="dialog1" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Changer votre mot de passe
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Mot de passe</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Nouveau mot de passe*"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Confirmer le nouveau de passe*"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*Champs obligatoire à remplir</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialog1 = false">
                    Annuler
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog1 = false">
                    Sauvegarder
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <v-row> <v-container> </v-container> </v-row>

          <v-row justify="center">
            <v-btn color="primary" @click="travelToFavoris">
              Accéder au Favoris
            </v-btn>
          </v-row>

          <v-row> <v-container> </v-container> </v-row>

          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" dark v-bind="attrs" v-on="on">
                  Supprimer votre compte
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Voulez-vous supprimer votre compte?
                </v-card-title>
                <v-card-text
                  >Cette action est irreversible. Une fois votre compte supprimé
                  vous ne pourrez plus accèder à vos favoris.</v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialog = false">
                    Supprimer
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Annuler
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <!--             
            <v-card-actions class="px-4">
              <v-form class="fwidth">
                <v-text-field
                  v-model="userInput"
                  label="Name"
                  placeholder="Your name"
                  outlined
                  clearable
                  :disabled="isLoading"
                ></v-text-field>
                <v-text-field
                  v-model="userInput"
                  label="Firstname"
                  placeholder="Your firstname"
                  outlined
                  clearable
                  :disabled="isLoading"
                ></v-text-field>
                <v-text-field
                  v-model="userInput"
                  label="Age"
                  placeholder="Your age"
                  outlined
                  clearable
                  :disabled="isLoading"
                ></v-text-field>
              </v-form>
            </v-card-actions>  
          </v-card> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog1: false,
      dialog: false,
      dialogprofil: false,
      user: {},
    };
  },

  methods: {
    travelToFavoris() {
      this.$router.push("favoris");
    },

    async fetchUser() {
      const users = this.fetchUser(data.input);
    },
  },
};
</script>

<style lang="scss" scoped>
.left-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.first-line {
  margin: 2;
}
</style>