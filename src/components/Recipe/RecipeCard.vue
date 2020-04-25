<template>
  <v-card class="mx-auto my-12" max-width="374" :loading="loading">
    <v-img height="250" :src="recipe.imageUrl"></v-img>

    <v-row align="center" class="mx-0">
      <v-card-title class="title">
        <span class="title__overflow">{{ recipe.label }}</span>
      </v-card-title>

      <v-btn
        v-if="userIsCreator"
        class="ma-2"
        fab
        outlined
        small
        color="success"
        @click="openModalRecipe(recipe)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        v-if="userIsCreator"
        fab
        outlined
        small
        color="error"
        @click="deleteRecipe(recipe)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <!-- Liking System: Need to work on -->

      <!-- <v-btn icon v-if="loggedIn && !isLiked" @click="likeRecipe(recipe)">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn icon @click="dislikeRecipe(recipe)" v-if="loggedIn && isLiked">
        <v-icon dark>mdi-heart</v-icon>
      </v-btn> -->
    </v-row>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <p class="grey--text mt-5">Created on {{ recipe.date }}</p>

      <div class="my-4 subtitle-1">
        <v-row align="center" class="mx-0">
          <v-icon v-if="recipe.vegetarian" color="green" class="mr-2">
            mdi-leaf</v-icon
          >
          <v-icon v-else>mdi-leaf-off</v-icon>

          <v-icon class="ml-3 mr-2">mdi-account-group</v-icon>
          <span>{{ recipe.numOfPeople }}</span>
        </v-row>
      </div>

      <v-list-item-group>
        <v-list-item
          v-for="(ingredient, i) in recipe.ingredients"
          :key="i"
          color="green"
        >
          {{ ingredient.value }}
        </v-list-item>
      </v-list-item-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="#ffd200"
        text
        target="_blank"
        rel="noopener"
        :href="'//' + recipe.url"
      >
        instructions
      </v-btn>
    </v-card-actions>
  </v-card>
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

  computed: {
    ...mapGetters(["loading", "loggedIn", "user"]),
    userIsCreator() {
      if (!this.loggedIn) {
        return false;
      }
      return this.user.id === this.recipe.creatorId;
    },

    isLiked() {
      if (!this.loggedIn) {
        return false;
      }
      const index = this.user.favRecipes.findIndex(
        recipe => recipe.id === this.recipe.id
      );
      return index !== -1 ? true : false;
    }
  },

  methods: {
    ...mapActions([
      "setDialog",
      "updateEditRecipe",
      "deleteRecipe",
      "dislikeRecipe",
      "likeRecipe"
    ]),
    openModalRecipe(recipe) {
      this.setDialog(true);
      this.updateEditRecipe(recipe);
    }
  }
};
</script>

<style></style>
