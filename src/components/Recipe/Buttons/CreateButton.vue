<template>
  <v-btn
    class="mx-2 btn-primary"
    large
    fixed
    bottom
    right
    fab
    dark
    @click="onClick"
  >
    <v-icon dark>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["loggedIn"])
  },
  methods: {
    ...mapActions(["setDialog", "error"]),
    onClick() {
      if (!this.loggedIn)
        return this.error({
          message: "You must login before trying to do any actions!",
          type: "error"
        });
      this.setDialog({ isActive: true, mode: "create" });
    }
  }
};
</script>

<style></style>
