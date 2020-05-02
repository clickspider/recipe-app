<template>
  <v-container>
    <v-layout row>
      <v-flex xs11 sm6 offset-sm3 class="mx-auto mt-10">
        <v-card class="elevation-12">
          <v-toolbar class="color-primary" flat>
            <v-toolbar-title>Sign up</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form ref="form" @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      color="#f48982"
                      prepend-icon="mdi-account"
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules="[emptyField]"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      color="#f48982"
                      prepend-icon="mdi-lock"
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      :rules="[emptyField]"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      color="#f48982"
                      prepend-icon="mdi-lock"
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-card-actions>
                  <v-spacer />

                  <v-btn
                    type="submit"
                    class="btn-primary"
                    :disabled="loading"
                    :loading="loading"
                  >
                    Register <v-icon>mdi-login</v-icon>
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-reload</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    ...mapGetters(["user", "loading", "loggedIn"]),
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
    emptyField() {
      return this.password === "" &&
        this.email === "" &&
        this.confirmPassword === ""
        ? "This field is required"
        : true;
    }
  },
  methods: {
    ...mapActions(["signUserUp", "clearAlert"]),
    onSignup() {
      const validate = this.$refs.form.validate();
      const { email, password } = this;
      if (!validate && !this.email && !this.password) return;
      this.signUserUp({ email, password });
    }
  }
};
</script>

<style></style>
