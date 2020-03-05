<template>
  <section v-if="!loading">
    <h1 class="text-center my-5 display-2">
      Welcome back {{ userProfile.firstname }}!
    </h1>
    <h1 class="text-center my-5">Here Is Your Random Jokes List</h1>
    <div class="my-2 text-center">
      <v-btn depressed large color="primary" to="/fav"
        >To Favorite Jokes List</v-btn
      >
    </div>
    <v-card class="mx-auto jokes-card" color="#1f1e32">
      <v-container>
        <v-row dense>
          <v-alert type="info" class="mx-auto" v-show="favJokes.length <= 3">
            You have {{ favJokes.length }} liked jokes on your list.
          </v-alert>

          <v-alert
            type="warning"
            class="mx-auto"
            v-show="favJokes.length >= 4 && favJokes.length <= 9"
            center
          >
            Your Favorite Jokes list is almost full:
            {{ favJokes.length }}/{{ maxItemsInList }}
          </v-alert>

          <v-alert type="error" class="mx-auto" v-show="favJokes.length === 10">
            Your Favorite Jokes list is full!
            {{ favJokes.length }}/{{ maxItemsInList }}
          </v-alert>
          <v-col v-for="(joke, i) in jokes" :key="joke.id" cols="12">
            <v-card color="#0cc" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div style="width: 100%;">
                  <v-card-title
                    class="headline"
                    v-text="`Joke Number ${i + 1}`"
                  ></v-card-title>

                  <v-card-subtitle
                    v-text="joke.joke"
                    class="text-left"
                  ></v-card-subtitle>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      icon
                      @click="checkLikeJoke(joke)"
                      v-show="!joke.isLiked"
                    >
                      <v-icon>mdi-heart-outline</v-icon>
                    </v-btn>

                    <v-btn icon @click="unLikeJoke(joke)" v-show="joke.isLiked">
                      <v-icon dark>mdi-heart</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Jokes",
  props: ["loading"],
  data: () => ({}),
  computed: {
    ...mapGetters(["jokes", "favJokes", "maxItemsInList", "userProfile"])
  },
  methods: {
    ...mapActions(["likeJoke", "unLikeJoke", "removeAllFav", "getData"]),
    checkLikeJoke(joke) {
      const MAX = this.maxItemsInList - 1;
      if (this.favJokes.length <= MAX) this.likeJoke(joke);
    }
  }
};
</script>

<style lang="scss">
.card-title {
  background: radial-gradient(black, #00000014);
  color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.jokes-card {
  text-align: center;

  width: 400px;
  margin-top: 30px;
}

.display-none {
  display: none;
}

.active {
  display: inline-block !important;
}
</style>
