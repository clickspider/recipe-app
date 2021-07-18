<template>
  <section>
    <create-button />
    <div
      class="grid-card-container grid-card-container__skeleton"
      v-if="isLoading && !recipes.length"
    >
      <v-skeleton-loader
        v-for="(cards, index) in 9"
        :key="index"
        type="card"
        :elevation="10"
      />
    </div>

    <div v-else class="d-none d-lg-grid grid-card-container">
      <recipe-card
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        :loading="isLoading"
      />
    </div>

    <recycle-scroller
      v-if="!isLoading && recipes.length"
      class="d-lg-none grid-card-container"
      page-mode
      :items="recipes"
      :item-size="700"
    >
      <template v-slot="{ item }">
        <recipe-card :key="item.id" :recipe="item" />
      </template>
    </recycle-scroller>
  </section>
</template>

<script>
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { mapGetters } from "vuex";
import RecipeCard from "./Cards/RecipeCard.vue";
import CreateButton from "./Buttons/CreateButton.vue";

export default {
  name: "Recipes",
  components: {
    RecipeCard,
    CreateButton
  },
  computed: {
    ...mapGetters(["recipes", "isLoading", "loggedIn"])
  }
};
</script>

<style lang="scss">
.scroller {
  height: 100%;
}
.display-none {
  display: none;
}

.active {
  display: inline-block !important;
}

.grid-card-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 350px);
  gap: 50px;
  max-width: 1150px;
  margin: 0 auto;
  text-align: left;

  &__skeleton {
    row-gap: 50px;
  }
}
</style>
