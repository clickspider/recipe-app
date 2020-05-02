<template>
  <div>
    <v-list-item v-for="item in items" :to="item.url" :key="item.title">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      requeird: true
    }
  }
};
</script>
