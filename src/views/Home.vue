<template>
  <div>
    <create-recipe :loading="loading" />
    <Recipes :loading="loading" />
  </div>
</template>

<script>
import Recipes from "@/components/Recipes.vue";
import CreateRecipe from "@/components/CreateRecipe.vue";

export default {
  name: "home",
  props: ["loading"],
  inject: ["theme"],
  components: {
    Recipes,
    CreateRecipe
  }
};
</script>
