<template>
  <section v-if="!loading">
    <h1 class="text-center my-5 display-2">
      Welcome back {{ userProfile.firstname }}!
    </h1>
    <h1 class="text-center my-5">Here Is Your Favorite Liked List</h1>
    <div class="my-2 text-center">
      <v-btn depressed large color="#0cc" to="/">To Random Jokes List</v-btn>
    </div>
    <v-card max-width="400" class="mx-auto jokes-card" color="#1f1e32">
      <v-container>
        <v-row dense>
          <v-alert type="error" class="mx-auto" v-show="favJokes.length === 10">
            Your Favorite Jokes list is full!
            {{ favJokes.length }}/{{ maxItemsInList }}
          </v-alert>

          <v-alert type="info" class="mx-auto" v-show="favJokes.length < 10">
            You have {{ favJokes.length }} liked jokes on your list.
          </v-alert>

          <div class="mb-2 mx-auto" v-if="favJokes.length">
            <v-btn depressed small color="error" @click="removeAllFav">
              UnLike all jokes</v-btn
            >
          </div>
          <v-col v-for="(joke, i) in favJokes" :key="i" cols="12">
            <v-card color="primary" dark>
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
                    <v-btn icon @click="unLikeJoke(joke)">
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
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["favJokes", "maxItemsInList", "userProfile"])
  },
  methods: {
    ...mapActions(["unLikeJoke", "removeAllFav", "retrieveProfile"])
  },
  created() {
    this.retrieveProfile();
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
