<template>
  <v-row justify="center">
    <v-snackbar v-model="snackbar" fixed top right color="success">
      <span>Recipe added successfuly!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
        <v-btn
          class="mx-2"
          large
          fixed
          bottom
          right
          fab
          dark
          color="#017c72"
          v-on="on"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-form ref="form" v-model="form.valid" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="headline">Create new recipe</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="Image url*"
                    :rules="rules.url"
                    required
                    v-model="form.image"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="Instructions url*"
                    :rules="rules.url"
                    required
                    v-model="form.url"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Headline*"
                    :rules="rules.label"
                    required
                    v-model="form.label"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  v-for="(ingredient, index) in form.ingredients"
                  :key="index"
                >
                  <v-btn
                    class="mx-2"
                    right
                    x-small
                    absolute
                    fab
                    dark
                    color="#017c72"
                    @click="form.ingredients.push({ value: '' })"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>

                  <v-btn
                    class="mx-2 right-2"
                    right
                    x-small
                    absolute
                    fab
                    dark
                    color="red"
                    v-if="form.ingredients.length > 1"
                    @click="form.ingredients.splice(index, 1)"
                  >
                    <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
                  <v-text-field
                    label="Ingredients*"
                    required
                    class="myInput"
                    v-model="ingredient.value"
                    :rules="rules.ingredients"
                    relative
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['1-2', '3-6', '7-10', '11+']"
                    v-model="form.numOfPeople"
                    :rules="rules.numOfPeople"
                    label="Number of diners*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-checkbox
                    v-model="form.vegetarian"
                    label="Vegetarian?"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addNewRecipe">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
// import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "CreateRecipe",
  props: ["loading"],
  data: () => ({
    form: {
      valid: true,
      image: "",
      url: "",
      label: "",
      ingredients: [
        {
          value: ""
        }
      ],
      vegetarian: null,
      numOfPeople: ""
    },
    dialog: false,
    rules: {
      url: [v => !!v || "Url is required"],
      label: [v => !!v || "Headline is required"],
      ingredients: [v => !!v || "Ingredient is required"],
      numOfPeople: [v => !!v || "This feild is required"],
      vegetarian: [v => !!v || "This feild is required"]
    },
    snackbar: false
  }),
  computed: {},
  methods: {
    ...mapActions(["pushRecipe"]),
    addNewRecipe() {
      // eslint-disable-next-line no-debugger
      // debugger;
      const {
        image,
        url,
        label,
        ingredients,
        vegetarian,
        numOfPeople
      } = this.form;
      const recipe = {
        image,
        url,
        label,
        ingredients,
        vegetarian,
        numOfPeople
      };
      // this.pushRecipe(recipe);
      const formValid = this.$refs.form.validate();
      if (formValid) {
        this.pushRecipe(recipe);
        this.snackbar = true;
        this.dialog = false;
        this.clear();
      }
    },
    clear() {
      this.form = {
        valid: true,
        image: "",
        url: "",
        label: "",
        ingredients: [
          {
            value: ""
          }
        ],
        vegetarian: null,
        numOfPeople: ""
      };

      this.$refs.form.resetValidation();
    }
  },
  created() {}
};
</script>

<style lang="scss">
.right-2 {
  right: 55px !important;
}
</style>
