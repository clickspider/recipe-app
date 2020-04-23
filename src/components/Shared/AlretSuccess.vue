<template>
  <v-snackbar v-model="getSuccess" fixed top right color="success">
    <span>{{ success }}</span>
    <v-icon dark>mdi-checkbox-marked-circle</v-icon>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["clearSuccess"])
  },
  computed: {
    ...mapGetters(["success"]),

    getSuccess: {
      get() {
        return this.success;
      },
      set(newVal) {
        if (!newVal) {
          this.clearSuccess();
        }
        return newVal;
      }
    }
  }
};
</script>

<style></style>
