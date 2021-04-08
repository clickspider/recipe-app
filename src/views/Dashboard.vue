<template>
  <section>
    <v-alert class="text-center" border="top" color="#f48982" dark dismissible>
      Welcome to the Recipe App!
    </v-alert>
    <recipes class="home-recipes-view" />
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

<style lang="scss">
.home-recipes-view {
  margin-top: 60px;
}
</style>
