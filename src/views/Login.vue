<template>
  <v-app>
    <v-content>
      <login-form />
    </v-content>
  </v-app>
</template>

<script>
import LoginForm from "@/components/User/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>
