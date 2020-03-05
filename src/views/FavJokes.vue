<template>
  <LikedJokes :loading="loading" />
</template>

<script>
import LikedJokes from "@/components/LikedJokes.vue";

export default {
  name: "home",
  props: ["loading"],
  inject: ["theme"],
  components: {
    LikedJokes
  }
};
</script>
