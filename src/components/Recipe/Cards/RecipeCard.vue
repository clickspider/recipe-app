<template>
  <v-card
    class="mx-auto my-12"
    color="#F9F5F3"
    style="cursor: pointer; position: relative;"
    max-width="374"
    :loading="loading"
    :disabled="loading"
    @dblclick="onLike(recipe)"
  >
    <v-img
      v-if="loggedIn"
      src="https://svgshare.com/i/JtP.svg"
      large
      class="heart-icon"
      :class="{ 'animate-like': heartActive }"
    ></v-img>

    <v-img height="250" :alt="recipe.label" :src="recipe.imageUrl" />

    <v-row align="center" class="mx-0">
      <v-card-title class="title">
        <span :class="{ title__overflow: userIsCreator }">
          {{ recipe.label }}
        </span>
      </v-card-title>

      <v-btn
        v-if="userIsCreator"
        fab
        outlined
        small
        color="success"
        @click="openModalRecipe(recipe)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        v-if="userIsCreator"
        fab
        outlined
        small
        color="error"
        @click="onDelete(recipe)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn
        icon
        large
        color="red"
        v-if="loggedIn && !isLiked"
        @click="onLike(recipe)"
      >
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn
        icon
        large
        color="red"
        @click="onDislike(recipe)"
        v-if="loggedIn && isLiked"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon large color="red" v-if="!loggedIn" @click="onLike(recipe)">
        <v-icon color="red">mdi-heart</v-icon>
      </v-btn>
      <span class="ml-1">{{ recipe.likes }} Likes</span>
    </v-row>

    <v-card-text>
      <p class="grey--text mt-5">Created on {{ recipe.date }}</p>

      <div class="my-4 subtitle-1">
        <v-row align="center" class="mx-0">
          <v-icon v-if="recipe.vegetarian" color="green" class="mr-2">
            mdi-leaf
          </v-icon>
          <v-icon v-else>mdi-leaf-off</v-icon>

          <v-icon class="ml-3 mr-2">mdi-account-group</v-icon>
          <span>{{ recipe.numOfPeople }}</span>
        </v-row>
      </div>

      <v-list color="transparent">
        <v-list-group color="none">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Ingredients List</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(ingredient, i) in recipe.ingredients" :key="i">
            {{ ingredient.value }}
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-btn
        class="btn-primary"
        text
        target="_blank"
        rel="noopener"
        :href="formatedUrl"
      >
        instructions
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      heartActive: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["loading", "loggedIn", "user"]),
    userIsCreator() {
      if (!this.loggedIn) {
        return false;
      }
      return this.user.id === this.recipe.creatorId;
    },

    isLiked() {
      if (!this.loggedIn) {
        return false;
      }
      const index = this.user.favRecipes.findIndex(
        recipe => recipe.id === this.recipe.id
      );
      return index !== -1 ? true : false;
    },

    formatedUrl() {
      const url = this.recipe.url;
      const isHttps = url.includes("https");
      const isHttp = url.includes("http");
      if (isHttps || isHttp) return url;
      return `https://${url}`;
    }
  },

  methods: {
    ...mapActions([
      "setDialog",
      "updateEditRecipe",
      "likeRecipe",
      "dislikeRecipe",
      "addLikeCount",
      "dislikeCount",
      "setError",
      "setDeleteRecipe"
    ]),
    openModalRecipe(recipe) {
      this.setDialog({ isActive: true, mode: "edit" });
      this.updateEditRecipe(recipe);
    },

    onLike(recipe) {
      this.heartAnimation();
      if (!this.loggedIn) {
        return this.setError({
          message: "You must login before trying to do any actions!",
          type: "error"
        });
      }
      if (!this.isLiked && !this.loading) {
        this.likeRecipe(recipe);
        this.addLikeCount(recipe);
      }
    },

    onDislike(recipe) {
      if (this.isLiked && !this.loading) {
        this.dislikeRecipe(recipe);
        this.dislikeCount(recipe);
      }
    },

    onDelete(recipe) {
      this.setDialog({ isActive: true, mode: "deleteRecipe" });
      this.setDeleteRecipe(recipe);
    },

    heartAnimation() {
      this.heartActive = true;

      setTimeout(() => {
        this.heartActive = false;
      }, 800);
    }
  }
};
</script>

<style lang="scss">
.heart-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 19px 38px rgba(0, 0, 0, 0.5));
  transform-origin: center center;
  width: 0;
}

/* Tap animation */
.animate-like {
  animation: 2s animateLike ease-in-out forwards;
}
@keyframes animateLike {
  0% {
    width: 0;
  }
  5% {
    width: 180px;
  }
  10% {
    width: 150px;
  }
  20%,
  35% {
    width: 160px;
  }
  40%,
  100% {
    width: 0;
  }
}
</style>
