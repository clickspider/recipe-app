<template>
  <v-card
    class="mx-auto my-12"
    color="#F9F5F3"
    style="cursor: pointer; position: relative;"
    max-width="374"
    :loading="loading"
    :disabled="loading"
    @dblclick="onDoubleTap(recipe, $event)"
  >
    <!-- Add it the framework way, class: isActive -->

    <v-img
      v-if="loggedIn"
      src="https://svgshare.com/i/JtP.svg"
      large
      class="heart-icon"
    ></v-img>

    <v-img height="250" :src="recipe.imageUrl"></v-img>

    <v-row align="center" class="mx-0">
      <v-card-title class="title">
        <span :class="userIsCreator ? 'title__overflow' : ''">
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
      <v-icon color="red" v-if="!loggedIn">mdi-heart</v-icon>
      <span class="ml-1">{{ recipe.likes }} Likes</span>
    </v-row>

    <v-card-text>
      <p class="grey--text mt-5">Created on {{ recipe.date }}</p>

      <div class="my-4 subtitle-1">
        <v-row align="center" class="mx-0">
          <v-icon v-if="recipe.vegetarian" color="green" class="mr-2">
            mdi-leaf</v-icon
          >
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
      "error",
      "setDeleteRecipe"
    ]),
    openModalRecipe(recipe) {
      this.setDialog({ isActive: true, mode: "edit" });
      this.updateEditRecipe(recipe);
    },

    onDoubleTap(recipe, event) {
      if (!this.loggedIn) {
        return this.error({
          message: "You must login before trying to do any actions!",
          type: "error"
        });
      } else if (!this.loading) {
        const card = event.currentTarget;
        const heart = card.querySelector(".heart-icon");

        heart.classList.add("animate-like");

        setTimeout(() => {
          heart.classList.remove("animate-like");
        }, 800);

        if (!this.isLiked) {
          this.likeRecipe(recipe);
          this.addLikeCount(recipe);
        }
      }
    },

    onLike(recipe) {
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
