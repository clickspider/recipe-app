<template>
  <v-card
    color="#F9F5F3"
    style="cursor: pointer; position: relative;"
    :loading="isLoading || isCardLoading"
    :disabled="isLoading || isCardLoading"
    @dblclick="onLike(recipe)"
  >
    <v-img
      v-if="isLoggedIn"
      src="https://www.freeiconspng.com/thumbs/heart-icon/heart-icon-14.png"
      large
      class="heart-icon"
      :class="{ 'animate-like': heartActive }"
    />

    <v-img height="250" :alt="recipe.label" :src="recipe.imageUrl" />

    <v-row align="center" class="mx-0">
      <v-card-title class="recipe-title">
        <span :title="recipe.label" class="recipe-title__overflow">
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
        v-if="isLoggedIn && !isLiked"
        @click="onLike(recipe)"
      >
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn
        icon
        large
        color="red"
        @click="onDislike(recipe)"
        v-if="isLoggedIn && isLiked"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon large color="red" v-if="!isLoggedIn" @click="onLike(recipe)">
        <v-icon color="red">mdi-heart</v-icon>
      </v-btn>
      <span class="mx-1">{{ recipe.likes }} Likes</span>
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
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      heartActive: false,
      isCardLoading: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["isLoading", "isLoggedIn", "user"]),
    userIsCreator() {
      if (!this.isLoggedIn) {
        return false;
      }
      return this.user.id === this.recipe.creatorId;
    },

    isLiked() {
      if (!this.isLoggedIn) {
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

    async onLike(recipe) {
      this.heartActive = true;
      if (!this.isLoggedIn) {
        return this.setError({
          message: "You must login before trying to do any actions!",
          type: "error"
        });
      }
      if (!this.isLiked && !this.isLoading && !this.isCardLoading) {
        this.isCardLoading = true;
        try {
          await this.likeRecipe(recipe);
          await this.addLikeCount(recipe);
          this.isCardLoading = false;
        } catch (e) {
          this.isCardLoading = false;
        }
      }
    },

    async onDislike(recipe) {
      this.heartActive = false;
      if (this.isLiked && !this.isLoading && !this.isCardLoading) {
        this.isCardLoading = true;
        try {
          await this.dislikeRecipe(recipe);
          await this.dislikeCount(recipe);
          this.isCardLoading = false;
        } catch (e) {
          this.isCardLoading = false;
        }
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
.recipe-title {
  line-height: 4rem !important;
  max-width: 245px;
  padding-left: 10px;
  &__overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

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
