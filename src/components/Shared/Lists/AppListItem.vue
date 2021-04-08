<template>
  <v-list-item :to="item.url">
    <v-list-item-icon>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>
        {{ item.title }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      requeird: true,
      default: () => {}
    }
  }
};
</script>
