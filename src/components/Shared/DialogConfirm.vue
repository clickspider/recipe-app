<template>
  <v-dialog v-model="dialogConfirm" max-width="290">
    <v-card>
      <v-card-title class="headline"
        >Are you sure you want to delete this recipe?</v-card-title
      >

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="error" text @click="setDialogConfirm(false)">
          Disagree
        </v-btn>

        <v-btn color="green darken-1" text @click="onDelete">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["dialogConfirm", "recipeToDelete"])
  },
  methods: {
    ...mapActions(["deleteRecipe", "setDialogConfirm"]),

    onDelete() {
      this.deleteRecipe(this.recipeToDelete);
      this.setDialogConfirm(false);
    }
  }
};
</script>

<style></style>
