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
    @click="setDialog(true)"
  >
    <v-icon dark>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setDialog"])
  }
};
</script>

<style></style>
