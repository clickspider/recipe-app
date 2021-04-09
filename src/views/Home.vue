<template>
  <section class="text-center">
    <v-alert border="top" color="#f48982" dark dismissible>
      Welcome to the Recipe App! <br />
      Please login/register to have access to all the features!
    </v-alert>
    <recipes class="home-recipes-view" />
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

<style lang="scss">
.home-recipes-view {
  margin: 60px 0;
}
</style>
