<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">DVF Visualisateur</div>

      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthentified" text @click="login">
        Login / Sign In
      </v-btn>
      <v-menu v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="appBarMenuHandler(item.action)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: [
      { name: "Profile", action: { type: "ROUTE", data: "/profile" } },
      { name: "Favoris", action: { type: "ROUTE", data: "/favoris" } },
      { name: "Se déconnecter", action: { type: "LOGOUT" } },
    ],
    auth: false,
  }),
  methods: {
    logout() {
      console.log("Logging out");
      this.auth = false;
    },
    login() {
      this.auth = true;
    },
    appBarMenuHandler(action) {
      switch (action.type) {
        case "ROUTE":
          this.$router.push(action.data);
          break;
        case "LOGOUT":
          this.logout();
          break;
      }
    },
  },
  computed: {
    isAuthentified() {
      return this.auth;
    },
  },
};
</script>
