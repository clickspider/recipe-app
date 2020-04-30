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

        <v-btn color="green darken-1" text @click="onDelete(recipe)">
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
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(["deleteRecipe", "setDialogConfirm"]),

    onDelete(recipe) {
      this.deleteRecipe(recipe);
      this.setDialogConfirm(false);
    }
  },
  computed: {
    ...mapGetters(["dialogConfirm"])
  }
};
</script>

<style></style>
