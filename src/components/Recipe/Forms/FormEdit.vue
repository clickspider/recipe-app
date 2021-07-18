<template>
  <v-form ref="form" lazy-validation>
    <v-card>
      <v-card-title>
        <span class="headline">Edit recipe</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-file-input
                :rules="rules.image"
                :show-size="true"
                color="#f48982"
                accept="image/*"
                placeholder="Edit an recipe image"
                prepend-icon="mdi-camera"
                @change="onFilePicked"
                label="Recipe Image"
              ></v-file-input>
            </v-col>

            <img :src="recipe.imageUrl" :rules="rules.imageUrl" height="150" />

            <v-col cols="12" sm="6" md="12">
              <v-text-field
                label="Instructions url*"
                :rules="rules.url"
                :error-messages="validURL"
                prepend-icon="mdi-link"
                required
                color="#f48982"
                v-model="recipe.url"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Headline*"
                :rules="rules.label"
                prepend-icon="mdi-page-layout-header"
                required
                color="#f48982"
                v-model="recipe.label"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
            >
              <v-btn
                class="mx-2"
                right
                x-small
                absolute
                fab
                dark
                color="green"
                @click="recipe.ingredients.push({ value: '' })"
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
                v-if="recipe.ingredients.length > 1"
                @click="recipe.ingredients.splice(index, 1)"
              >
                <v-icon dark>mdi-minus</v-icon>
              </v-btn>
              <v-text-field
                label="Ingredients*"
                prepend-icon="mdi-page-layout-body"
                required
                v-model="ingredient.value"
                :rules="rules.ingredients"
                relative
                color="#f48982"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['1-2', '3-6', '7-10', '11+']"
                v-model="recipe.numOfPeople"
                prepend-icon="mdi-account-group"
                :rules="rules.numOfPeople"
                color="#f48982"
                label="Number of diners*"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-checkbox
                v-model="recipe.vegetarian"
                :prepend-icon="leaf"
                label="Vegetarian?"
                color="green"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeModalRecipe" color="error">Cancel</v-btn>
        <v-btn text color="green" @click="pushUpdate" :disabled="isChange">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditForm",
  data: () => ({
    recipe: null,
    rules: {
      url: [v => !!v || "Url is required"],
      label: [
        v => !!v || "Headline is required",
        v => !v || v.length >= 3 || "Minimum length is 3 characters"
      ],
      ingredients: [
        v => !!v || "Ingredient is required",
        v => !v || v.length >= 3 || "Minimum length is 3 characters"
      ],
      numOfPeople: [v => !!v || "This feild is required"],
      vegetarian: [v => !!v || "This feild is required"],
      image: [
        v => !v || v.size < 2000000 || "Avatar size should be less than 2 MB!",
        v => !v || v.type.match("image.*") || "Images only!"
      ],
      imageUrl: [v => !!v || "You reuqire to have a valid image!"]
    },
    unexpected: ""
  }),
  created() {
    // Make a deep copy from Vuex
    // Then set it euqal in our data for reactivity
    this.recipe = JSON.parse(JSON.stringify(this.editRecipe));
  },
  computed: {
    ...mapGetters(["editRecipe"]),

    leaf() {
      return this.recipe.vegetarian ? "mdi-leaf" : "mdi-leaf-off";
    },

    isChange() {
      return JSON.stringify(this.editRecipe) === JSON.stringify(this.recipe);
    },

    validURL() {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
      );
      if (!this.recipe.url) return;
      return pattern.test(this.recipe.url) ? "" : "Enter a valid URL!";
    }
  },
  methods: {
    ...mapActions([
      "updateRecipe",
      "updateEditRecipe",
      "setDialog",
      "clearDialog"
    ]),
    closeModalRecipe() {
      this.clearDialog();
      this.updateEditRecipe([]);
      this.$refs.form.resetValidation();
    },
    pushUpdate() {
      const formValid = this.$refs.form.validate();
      if (!formValid) return;
      if (this.recipe.imageUrl || this.recipe.image) {
        this.updateRecipe(this.recipe);
        this.closeModalRecipe();
      }
    },
    onFilePicked(file) {
      if (!file) return;
      if (file.type.match("image.*")) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.recipe.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(file);
        this.recipe.image = file;
      } else {
        this.recipe.imageUrl = "";
        this.recipe.image = 0;
        return alert("Images only!");
      }
    }
  }
};
</script>

<style lang="scss">
.right-2 {
  right: 55px !important;
}
</style>
