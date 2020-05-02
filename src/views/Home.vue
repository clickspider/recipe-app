<template>
  <section class="home-recipes-view">
    <p class="section-welcome">
      <!-- <h1>Welcome to ABN-Recipe</h1>
      <p>Do you have an account? <router-link to="/login">Login</router-link></p>
      <p>You are new? <router-link to="/signup">Signup</router-link></p> -->
    </p>

    <recipes />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Recipes from "@/components/Recipe/Recipes.vue";
export default {
  name: "home",
  inject: ["theme"],
  components: {
    Recipes
  },
  computed: {
    ...mapGetters(["loggedIn"])
  }
};
</script>
