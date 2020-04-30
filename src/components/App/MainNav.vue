<template>
  <v-navigation-drawer v-model="getDrawer" fixed left temporary color="#F9F5F3">
    <v-list nav dense>
      <v-list-item-group
        v-model="group"
        active-class="text--accent-4"
        v-if="loggedIn"
      >
        <v-list-item
          v-for="item in itemsUserIn"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group v-model="group" active-class="text--accent-4" v-else>
        <v-list-item
          v-for="item in itemsUserOut"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      group: null,
      itemsUserIn: [
        { title: "Dashboard", icon: "mdi-view-dashboard", url: "/dashboard" }
      ],
      itemsUserOut: [
        { title: "Home", icon: "mdi-home", url: "/home" },
        { title: "Login", icon: "mdi-login", url: "/login" },
        { title: "Signup", icon: "mdi-account-plus-outline", url: "/signup" }
      ]
    };
  },

  computed: {
    ...mapGetters(["loggedIn", "drawer"]),
    getDrawer: {
      get() {
        return this.drawer;
      },
      set(newVal) {
        newVal !== this.drawer ? this.setDrawer(newVal) : newVal;
        return newVal;
      }
    }
  },

  methods: {
    ...mapActions(["setDrawer"])
  },

  watch: {
    group() {
      this.setDrawer(false);
    }
  }
};
</script>
