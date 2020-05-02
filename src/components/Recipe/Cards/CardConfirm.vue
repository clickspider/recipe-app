<template>
  <v-card>
    <v-card-title>
      Are you sure you want to delete "{{ recipeToDelete.label }}"?
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="error" text @click="closeDialog">
        Disagree
      </v-btn>

      <v-btn color="green darken-1" text @click="onDelete">
        Agree
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["dialog", "recipeToDelete"])
  },
  methods: {
    ...mapActions(["deleteRecipe", "setDialog"]),
    onDelete() {
      this.deleteRecipe(this.recipeToDelete);
      this.closeDialog();
    },

    closeDialog() {
      this.setDialog({ isActive: false, mode: "" });
    }
  }
};
</script>

<style></style>
