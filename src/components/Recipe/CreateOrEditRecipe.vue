<template>
  <v-row justify="center">
    <v-dialog v-model="getDialog" persistent max-width="600px">
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-title v-if="createOrEdit === 'create'">
            <span class="headline">Create recipe</span>
          </v-card-title>
          <v-card-title v-else>
            <span class="headline">Update recipe</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-file-input
                    v-if="createOrEdit === 'create'"
                    :rules="rules.image"
                    :error-messages="error || unexpected"
                    :show-size="true"
                    color="#f48982"
                    accept="image/*"
                    placeholder="Pick an recipe image*"
                    prepend-icon="mdi-camera"
                    @change="onFilePicked"
                    label="Recipe Image"
                    required
                  ></v-file-input>

                  <v-file-input
                    v-else
                    :error-messages="error"
                    :rules="recipe.image ? editRules.image : []"
                    :show-size="true"
                    color="#f48982"
                    accept="image/*"
                    placeholder="Update an recipe image"
                    prepend-icon="mdi-camera"
                    @change="onFilePicked"
                    label="Recipe Image"
                  ></v-file-input>
                </v-col>
                <img :src="recipe.imageUrl" height="150" />
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
            <v-btn
              v-if="createOrEdit === 'create'"
              text
              color="green"
              @click="addNewRecipe"
              >CREATE</v-btn
            >
            <v-btn
              v-else
              text
              color="green"
              @click="pushUpdate"
              :disabled="isChange"
            >
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
    recipe: [], // this will be either 'create' / 'editRecipe'
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
        v => !!v || "Image is required!",
        v => !v || v.size < 2000000 || "Avatar size should be less than 2 MB!",
        v => !v || !v.type || v.type.match("image.*") || "Images only!"
      ]
    },
    editRules: {
      image: [
        v => !v || v.size < 2000000 || "Avatar size should be less than 2 MB!",
        v => !v || v.type.match("image.*") || "Images only!"
      ]
    },
    unexpected: ""
  }),
  watch: {
    getDialog: function() {
      if (this.createOrEdit === "edit") {
        // Make a deep copy from Vuex
        // Then set it euqal in our data for reactivity
        this.recipe = JSON.parse(JSON.stringify(this.editRecipe));
      } else {
        // In case there is no recipe to edit, it means we are in 'create'
        const formDefault = {
          image: null,
          imageUrl: "https://via.placeholder.com/150",
          url: "",
          label: "",
          ingredients: [
            {
              value: ""
            }
          ],
          vegetarian: false,
          numOfPeople: "",
          likes: 0
        };
        this.recipe = formDefault;
      }
    }
  },
  computed: {
    ...mapGetters([
      "loading",
      "recipes",
      "editRecipe",
      "dialog",
      "user",
      "loggedIn"
    ]),
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
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      if (this.recipe.url !== "") {
        return pattern.test(this.recipe.url) ? "" : "Enter a valid URL!";
      } else {
        return "";
      }
    },

    getDialog: {
      get() {
        return this.dialog;
      },

      set(newVal) {
        if (!newVal) {
          this.closeModalRecipe();
        }
        this.$refs.form.resetValidation();
        return this.dialog;
      }
    },

    error() {
      return !this.recipe.imageUrl && !this.recipe.image
        ? "Image is required!"
        : "";
    },

    createOrEdit() {
      return this.editRecipe.length === 0 ? "create" : "edit";
    }
  },
  methods: {
    ...mapActions([
      "pushNewRecipe",
      "updateRecipe", // Within recipes [state mutation]
      "updateEditRecipe", // This is the recipe that will be edited/if no recipe given then it's count as 'create recipe'
      "setDialog",
      "setError"
    ]),
    closeModalRecipe() {
      this.setDialog(false);
      this.updateEditRecipe([]);
      this.$refs.form.resetValidation();
    },
    addNewRecipe() {
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
      this.recipe.date = date;
      this.recipe.creatorId = this.user.id;
      const formValid = this.$refs.form.validate();
      if (formValid) {
        if (this.recipe.imageUrl && this.recipe.image) {
          this.pushNewRecipe(this.recipe);
          this.closeModalRecipe();
        } else {
          this.unexpected = "Something is not right!";
          this.setError({ message: "Try to repload your image" });
          setTimeout(() => {
            this.unexpected = "";
          }, 1500);
        }
      }
    },
    pushUpdate() {
      const formValid = this.$refs.form.validate();
      if (formValid) {
        if (this.recipe.imageUrl || this.recipe.image) {
          this.updateRecipe(this.recipe);
          this.closeModalRecipe();
        }
      }
    },
    onFilePicked(file) {
      if (file) {
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
          alert("Images only!");
          return "";
        }
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
