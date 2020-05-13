<template>
  <card-loader v-if="loading && recipes.length === 0" />
  <section v-else>
    <create-button />
    <v-row dense>
      <v-col
        v-for="recipe in recipes"
        :key="recipe.id"
        md="4"
        class="align-start"
      >
        <recipe-card :recipe="recipe" :loading="loading" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import RecipeCard from "./Cards/RecipeCard.vue";
import CreateButton from "./Buttons/CreateButton.vue";

export default {
  name: "Recipes",
  components: {
    RecipeCard,
    CreateButton
  },
  computed: {
    ...mapGetters(["recipes", "loading", "loggedIn"])
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
