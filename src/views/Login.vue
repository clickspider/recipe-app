<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" :loading="true">
            <v-card class="elevation-12">
              <v-toolbar color="#017c72" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-alert type="success" v-if="success">
                    You have logged in successfully!
                  </v-alert>
                  <v-alert type="error" v-if="error">
                    You have entered an invalid username or password
                  </v-alert>
                  <v-alert
                    type="info"
                    id="info-custom"
                    v-if="!error && !success"
                  >
                    Username: admin <br />
                    Password: admin
                  </v-alert>
                  <v-text-field
                    label="Login"
                    name="login"
                    v-model="username"
                    color="#017c72"
                    :rules="nameRules"
                    prepend-icon="mdi-account"
                    type="text"
                    @keydown.enter="validateLogin"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    :rules="passRules"
                    color="#017c72"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    @keydown.enter="validateLogin"
                    :type="show ? 'text' : 'password'"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="isOffline || loader"
                  color="#ffd200"
                  :loading="loader"
                  class="mr-5 mr-sm-5"
                  type="submit"
                  @click="validateLogin"
                >
                  Login <v-icon>mdi-login</v-icon>
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>mdi-reload</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => {
    return {
      valid: true,
      loader: false,
      show: false,
      success: false,
      error: false,
      username: "",
      nameRules: [v => !!v || "User Name is required"],
      password: "",
      passRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length <= 32) || "Password must be less than 32 characters",
        v =>
          !/^(?:(\w)\1+)+$/.test(v) ||
          "Passwords must contain at least two non-overlapping pairs of letters"
      ]
    };
  },
  methods: {
    ...mapActions(["retrieveToken"]),
    async login() {
      const { username, password } = this;
      try {
        await this.retrieveToken({ username, password });
        this.loader = false;
        this.error = false;
        this.success = true;
        this.$router.push({ name: "FavJokes" });
      } catch (err) {
        setTimeout(() => {
          this.loader = false;
          this.error = err;
        }, 1000);
      }
    },

    validateLogin() {
      if (
        this.$refs.form.validate() &&
        this.username !== "" &&
        this.password !== ""
      ) {
        this.loader = true;
        this.login();
      }
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
