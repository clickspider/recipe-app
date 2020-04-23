<template>
  <v-btn
    class="mx-2"
    large
    fixed
    bottom
    right
    fab
    dark
    color="#017c72"
    @click="updateDialog(true)"
  >
    <v-icon dark>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["updateDialog"])
  }
};
</script>

<style></style>
