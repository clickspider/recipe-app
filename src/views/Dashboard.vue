<template>
  <section class="text-center">
    <v-alert border="top" color="#f48982" dark dismissible>
      <p class="mb-0" v-if="!isLoggedIn">
        Welcome to the Recipe App! <br />
        Please login/register to have access to all the features!
      </p>
      <p class="mb-0" v-else>
        Welcome to the Recipe App!
      </p>
    </v-alert>
    <recipes class="home-recipes-view" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Recipes from "@/components/Recipe/Recipes.vue";
export default {
  name: "Home",
  inject: ["theme"],
  components: {
    Recipes
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>

<style lang="scss">
.home-recipes-view {
  margin: 60px 0;
}
</style>
