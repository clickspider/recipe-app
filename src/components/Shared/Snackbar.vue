<template>
  <v-snackbar v-model="snackbar.isActive">
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="onAction">
        {{ snackbar.actionText }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["snackbar"])
  },
  methods: {
    onAction() {
      this.$emit("snackbarAction");
    }
  }
};
</script>

<style></style>
