<template>
  <!-- <div> -->
  <!-- <h1>Welcome to ABN-Recipe</h1>
    <p>Do you have an account? <router-link to="/login">Login</router-link></p>
    <p>You are new? <router-link to="/signup">Signup</router-link></p> -->

  <recipes />
  <!-- </div> -->
</template>

<script>
import Recipes from "@/components/Recipe/Recipes.vue";
export default {
  name: "home",
  inject: ["theme"],
  components: {
    Recipes
  }
};
</script>
