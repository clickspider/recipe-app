<template>
  <v-row justify="center">
    <v-snackbar v-model="snackbar" fixed top right color="success">
      <span v-if="editRecipe.length === 0">Recipe created successfuly!</span>
      <span v-else>Recipe updated successfuly!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="form" v-model="form.valid" lazy-validation>
        <v-card>
          <v-card-title v-if="editRecipe.length === 0">
            <span class="headline">Create recipe</span>
          </v-card-title>
          <v-card-title v-else>
            <span class="headline">Update recipe</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="Image url*"
                    :rules="rules.url"
                    required
                    color="#017c72"
                    v-model="recipeEdit.image"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="Instructions url*"
                    :rules="rules.url"
                    required
                    color="#017c72"
                    v-model="recipeEdit.url"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Headline*"
                    :rules="rules.label"
                    required
                    color="#017c72"
                    v-model="recipeEdit.label"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  v-for="(ingredient, index) in recipeEdit.ingredients"
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
                    @click="recipeEdit.ingredients.push({ value: '' })"
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
                    v-if="recipeEdit.ingredients.length > 1"
                    @click="recipeEdit.ingredients.splice(index, 1)"
                  >
                    <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
                  <v-text-field
                    label="Ingredients*"
                    required
                    v-model="ingredient.value"
                    :rules="rules.ingredients"
                    relative
                    color="#017c72"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['1-2', '3-6', '7-10', '11+']"
                    v-model="recipeEdit.numOfPeople"
                    :rules="rules.numOfPeople"
                    color="#017c72"
                    label="Number of diners*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-checkbox
                    v-model="recipeEdit.vegetarian"
                    label="Vegetarian?"
                    color="#017c72"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeModalRecipe" color="error">Cancel</v-btn>
            <v-btn
              v-if="editRecipe.length === 0"
              text
              color="#017c72"
              @click="addNewRecipe"
              >CREATE</v-btn
            >
            <v-btn v-else text color="#017c72" @click="pushUpdate(recipeEdit)">
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "CreateRecipe",
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
    rules: {
      url: [v => !!v || "Url is required"],
      label: [v => !!v || "Headline is required"],
      ingredients: [v => !!v || "Ingredient is required"],
      numOfPeople: [v => !!v || "This feild is required"],
      vegetarian: [v => !!v || "This feild is required"]
    },
    recipeEdit: [],
    snackbar: false
  }),
  watch: {
    dialog: function() {
      const findIndex = this.favRecipes.findIndex(
        item => item === this.editRecipe
      );
      // Check if editRecipe from Vuex given/found
      if (findIndex !== -1) {
        // Make a deep copy from Vuex
        const recipe = JSON.parse(JSON.stringify(this.favRecipes[findIndex]));
        // Then set it euqal in our data for reactivity
        this.recipeEdit = recipe;
      } else {
        // In case there is no index found, it means we are in 'create'
        this.recipeEdit = this.form;
      }
    }
  },
  computed: {
    ...mapGetters(["loading", "favRecipes", "editRecipe", "dialog"])
  },
  methods: {
    ...mapActions([
      "pushNewRecipe",
      "updateRecipe", // Within favRecipes [state mutation]
      "updateEditRecipe", // This is the recipe that will be edited/if no recipe given then it's count as 'create recipe'
      "updateDialog"
    ]),
    closeModalRecipe() {
      this.updateDialog(false);
      this.$refs.form.resetValidation();
      this.updateEditRecipe([]);
    },
    addNewRecipe() {
      const {
        image,
        url,
        label,
        ingredients,
        vegetarian,
        numOfPeople
      } = this.form;
      const newDate = new Date();
      const date =
        ("00" + newDate.getDate()).slice(-2) +
        "/" +
        ("00" + (newDate.getMonth() + 1)).slice(-2) +
        "/" +
        newDate.getFullYear() +
        " " +
        ("00" + newDate.getHours()).slice(-2) +
        ":" +
        ("00" + newDate.getMinutes()).slice(-2) +
        ":" +
        ("00" + newDate.getSeconds()).slice(-2);
      const recipe = {
        image,
        url,
        label,
        ingredients,
        date,
        vegetarian,
        numOfPeople
      };
      const formValid = this.$refs.form.validate();
      if (formValid) {
        this.snackbar = true;
        this.pushNewRecipe(recipe);
        this.closeModalRecipe();
        this.clear();
      }
    },
    pushUpdate(updatedRecipe) {
      const formValid = this.$refs.form.validate();
      if (formValid) {
        this.snackbar = true;
        this.updateRecipe(updatedRecipe);
        setTimeout(() => {
          this.snackbar = false;
          this.closeModalRecipe();
        }, 1000);
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
    }
  }
};
</script>

<style lang="scss">
.right-2 {
  right: 55px !important;
}
</style>
