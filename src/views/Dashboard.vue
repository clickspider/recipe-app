<template>
  <section class="home-recipes-view">
    <v-alert class="text-center" border="top" color="#f48982" dark dismissible>
      Welcome to the Recipe App!
    </v-alert>
    <recipes />
  </section>
</template>

<script>
import Recipes from "@/components/Recipe/Recipes.vue";

export default {
  components: {
    Recipes
  }
};
</script>
