<template>
  <v-card>
    <v-card-title>
      Are you sure you want to delete "{{ recipeToDelete.label }}"?
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="error" text @click="onCancel">
        Disagree
      </v-btn>

      <v-btn color="green darken-1" text @click="onDelete">
        Agree
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["recipeToDelete"])
  },
  methods: {
    ...mapActions([
      "deleteRecipe",
      "setDialog",
      "clearDialog",
      "setDeleteRecipe"
    ]),
    onDelete() {
      this.deleteRecipe(this.recipeToDelete);
      this.clearDialog();
    },
    onCancel() {
      this.setDeleteRecipe([]);
      this.clearDialog();
    }
  }
};
</script>

<style></style>
