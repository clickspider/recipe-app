<template>
  <v-container>
    <v-layout row>
      <v-flex xs11 sm6 offset-sm3 class="mx-auto mt-10">
        <v-card class="elevation-12">
          <v-toolbar class="color-primary" flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form ref="form" @submit.prevent="onLogin">
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
                      :rules="emailRules"
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
                      :rules="passRules"
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
                    login <v-icon>mdi-login</v-icon>
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
  data: () => {
    return {
      show: false,
      email: "",
      emailRules: [
        v => !!v || "Email is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      password: "",
      passRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    ...mapGetters(["loading", "alert", "loggedIn"])
  },
  methods: {
    ...mapActions(["signUserIn", "clearAlert"]),
    onLogin() {
      const isFormVaild = this.$refs.form.validate();
      const { email, password } = this;
      if (isFormVaild) {
        return this.signUserIn({ email, password });
      }
      return false;
    },
    onDismissed() {
      this.clearAlert();
    }
  }
};
</script>

<style lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

#info-custom {
  background-color: #017c72 !important;
}
</style>
