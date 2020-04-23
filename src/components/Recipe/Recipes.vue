<template>
  <main>
    <main-loader v-if="loading && recipes.length === 0" />
    <section v-else>
      <create-or-edit-recipe />
      <modal-button v-if="loggedIn" />
      <h1 class="text-center my-5 display-2" v-if="loggedIn">
        Welcome back {{ userProfile.firstname }}!
      </h1>
      <recipe-card
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        :loading="loading"
      />
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CreateOrEditRecipe from "./CreateOrEditRecipe.vue";
import RecipeCard from "./RecipeCard.vue";
import MainLoader from "@/components/App/MainLoader.vue";
import ModalButton from "./ModalButton.vue";

export default {
  name: "Recipes",
  components: {
    CreateOrEditRecipe,
    RecipeCard,
    ModalButton,
    MainLoader
  },
  computed: {
    ...mapGetters([
      "recipes",
      "userProfile",
      "editRecipe",
      "dialog",
      "loading",
      "loggedIn"
    ])
  },
  methods: {
    ...mapActions([
      "getData",
      "retrieveProfile",
      "updateEditRecipe", // This is the recipe that will be edited/if no recipe given then it's count as 'create recipe'
      "updateDialog",
      "deleteRecipe"
    ])
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
