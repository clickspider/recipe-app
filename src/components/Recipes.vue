<template>
  <section>
    <create-recipe />
    <v-btn
      class="mx-2"
      large
      fixed
      bottom
      right
      fab
      dark
      color="#017c72"
      @click="openModalRecipe()"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <h1 class="text-center my-5 display-2">
      Welcome back {{ userProfile.firstname }}!
    </h1>
    <h1 class="text-center my-5">Here is your favorite recipes</h1>

    <v-card
      v-for="(recipe, index) in favRecipes"
      :key="index"
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <v-img height="250" :src="recipe.image"></v-img>

      <v-row align="center" class="mx-0">
        <v-card-title class="title">
          <span class="title__overflow">{{ recipe.label }}</span>
        </v-card-title>

        <v-btn
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
          fab
          outlined
          small
          color="error"
          @click="deleteRecipe(index)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
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
            :inactive="true"
          >
            {{ ingredient.value }}
          </v-list-item>
        </v-list-item-group>
      </v-card-text>

      <v-card-actions>
        <v-btn color="#ffd200" text :href="recipe.url">
          instructions
        </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CreateRecipe from "@/components/CreateRecipe.vue";

export default {
  name: "Recipes",
  props: ["loading"],
  components: {
    CreateRecipe
  },
  data: () => ({}),
  computed: {
    ...mapGetters([
      "favRecipes",
      "userProfile",
      "editRecipe",
      "dialog",
      "createRecipe"
    ])
  },
  methods: {
    ...mapActions([
      "getData",
      "retrieveProfile",
      "updateEditRecipe",
      "updateCreateRecipe",
      "updateDialog",
      "deleteRecipe"
    ]),
    openModalRecipe(recipe = []) {
      this.updateDialog(true);
      if (recipe.length === 0) {
        this.updateCreateRecipe(true);
      } else {
        this.updateEditRecipe(recipe);
      }
    }
  },
  created() {
    this.retrieveProfile();
  }
};
</script>

<style lang="scss">
.title {
  max-width: 250px;
  &__overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.recipe-card {
  text-align: center;

  width: 400px;
  margin-top: 30px;
}

.display-none {
  display: none;
}

.active {
  display: inline-block !important;
}
</style>
