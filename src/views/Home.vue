<template>
  <section class="home-recipes-viee text-center">
    <v-alert border="top" color="#f48982" dark dismissible>
      Welcome to the Recipe App! <br />
      Please login/register to have access to all the features!
    </v-alert>
    <recipes />
  </section>
</template>

<script>
import Recipes from "@/components/Recipe/Recipes.vue";
export default {
  name: "Home",
  inject: ["theme"],
  components: {
    Recipes
  }
};
</script>
