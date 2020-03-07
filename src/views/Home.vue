<template>
  <recipes />
</template>

<script>
import Recipes from "@/components/Recipes.vue";

export default {
  name: "home",
  props: ["loading"],
  inject: ["theme"],
  components: {
    Recipes
  }
};
</script>
