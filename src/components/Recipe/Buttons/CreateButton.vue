<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2 btn-primary"
        large
        fixed
        bottom
        right
        fab
        dark
        v-bind="attrs"
        v-on="on"
        @click="onClick"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>Add recipe</span>
  </v-tooltip>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  methods: {
    ...mapActions(["setDialog", "setError"]),
    onClick() {
      if (!this.loggedIn) {
        return this.setError({
          message: "You must login before trying to do any actions!",
          type: "error",
        });
      }
      return this.setDialog({ isActive: true, mode: "create" });
    },
  },
};
</script>

<style></style>
