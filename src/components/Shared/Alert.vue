<template>
  <v-alert
    v-if="alert.type"
    class="alert"
    transition="scroll-y-transition"
    max-width="300px"
    :type="alert.type"
    prominent
    dismissible
    @input="onClose"
    :value="true"
  >
    {{ alert.message }}
  </v-alert>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["alert"]),
  },
  watch: {
    alert: {
      handler(newVal) {
        if (!newVal.message && !newVal.type) return;
        return setTimeout(() => {
          this.clearAlert();
        }, 6000);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["clearAlert"]),
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>

<style lang="scss">
.alert {
  position: fixed;
  z-index: 999;
  right: 0;
  margin-top: 20px;
}
</style>
