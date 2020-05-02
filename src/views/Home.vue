<template>
  <section class="recipes-view">
    <section class="section-welcome" v-if="!loggedIn">
      <!-- <h1>Welcome to ABN-Recipe</h1>
      <p>Do you have an account? <router-link to="/login">Login</router-link></p>
      <p>You are new? <router-link to="/signup">Signup</router-link></p> -->
    </section>

    <section class="section-welcome-back" v-else>
      <h1 class="text-center my-5 display-2">
        Welcome back!
      </h1>
    </section>

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
