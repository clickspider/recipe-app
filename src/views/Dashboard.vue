<template>
  <section class="home-recipes-view">
    <h1 class="text-center my-5 display-2">
      Welcome back!
    </h1>
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
