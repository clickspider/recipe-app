<template>
  <v-container>
    <v-layout row>
      <v-flex xs11 sm6 offset-sm3 class="mx-auto mt-10">
        <v-card class="elevation-12">
          <v-toolbar color="#017c72" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form ref="form" @submit.prevent="onLogin">
                <v-layout row>
                  <v-flex xs12>
                    <app-alert
                      @dismissed="onDismissed"
                      :text="error.message"
                      v-if="error"
                    ></app-alert>
                    <v-text-field
                      color="#017c72"
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
                      color="#017c72"
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
                    color="#ffd200"
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
        v => !!v || "User Name is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      password: "",
      passRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    ...mapGetters(["loading", "error", "loggedIn"])
  },
  methods: {
    ...mapActions(["signUserIn", "clearError"]),
    onLogin() {
      const validate = this.$refs.form.validate();
      validate && this.email !== "" && this.password !== ""
        ? this.signUserIn({ email: this.email, password: this.password })
        : false;
    },
    onDismissed() {
      this.clearError();
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
