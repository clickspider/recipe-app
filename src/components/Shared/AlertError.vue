<template>
  <v-snackbar v-model="getError" fixed top right color="error">
    <span>{{ getError }}</span>
    <v-icon dark>mdi-alert</v-icon>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["clearError"])
  },
  computed: {
    ...mapGetters(["error"]),

    getError: {
      get() {
        return this.error ? this.error.message : this.error;
      },
      set(newVal) {
        if (!newVal) {
          this.clearError();
        }
        return newVal;
      }
    }
  }
};
</script>

<style></style>
