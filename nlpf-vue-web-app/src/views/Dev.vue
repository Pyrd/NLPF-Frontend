<template>
  <v-container>
    <!-- <hello-world /> -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text class="h1"> You have {{ counter }} tasks </v-card-text>
          <v-card-actions>
            <v-text-field
              v-model="userInput"
              label="Add a task"
              placeholder="Your task"
              outlined
              clearable
              :disabled="isLoading"
            ></v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn outlined @click="add">
          <v-icon>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn outlined @click="soustract">
          <v-icon>mdi-minus</v-icon>
          Soustract
        </v-btn>
      </v-col>
    </v-row>
    APPEL D'API EN COURS? {{ isLoading }}
    <v-row>
      <v-col v-for="(task, i) in tasks" :key="i" cols="12">
        <v-card>
          <v-card-title>
            Task {{ i }} - {{ task.name }}
            <v-btn icon @click="soustract(i)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>

            <!-- <div v-if="i % 3 === 0">Banane</div>
            <div v-else-if="i % 5 === 0">Fraise</div>
            <div v-else>
              <ExempleComponent :title="counter"></ExempleComponent>
            </div> -->
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-btn @click="travelToProfile"> go to profile </v-btn>
  </v-container>
</template>

<script>
import ExempleComponent from "../components/Exemple";

export default {
  name: "Home",

  components: {
    ExempleComponent,
  },
  data: () => {
    return {
      userInput: "",
      tasks: [],
      isLoading: true,
      counter: 0,
    };
  },
  mounted() {
    console.log("MOUNTED");
    setTimeout(() => {
      console.log("API CALL DONE");
      this.isLoading = false;
    }, 4000);
  },
  methods: {
    travelToProfile() {
      this.$router.push("profile");
    },
    add() {
      if (this.userInput.length == 0) {
        return;
      }

      this.tasks.push({
        name: this.userInput,
      });
      this.userInput = "";
    },
    soustract(index) {
      this.tasks.splice(index, 1);
    },
  },
  computed: {
    generateNUmberOfFraise() {
      let count = 0;
      for (let i = 0; i < this.counter; i++) {
        if (i % 5 == 0) {
          count++;
        }
      }

      return count;
    },
  },
};
</script>

<style lang="scss">
.myclass {
  background: red;
}
</style>
