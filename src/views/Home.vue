<template>
  <jokes :loading="loading" />
</template>

<script>
import Jokes from "@/components/Jokes.vue";

export default {
  name: "home",
  props: ["loading"],
  inject: ["theme"],
  components: {
    Jokes
  }
};
</script>
