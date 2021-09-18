<template>
  <v-navigation-drawer v-model="getDrawer" fixed left temporary color="#F9F5F3">
    <v-list nav dense>
      <v-list-item-group v-if="isLoggedIn" active-class="text--accent-4">
        <app-list-item
          v-for="isLoggedInItem in loggedInListItems"
          :key="isLoggedInItem.title"
          :item="isLoggedInItem"
        />
      </v-list-item-group>

      <v-list-item-group v-else active-class="text--accent-4">
        <app-list-item
          v-for="loggedOutItem in loggedOutListItems"
          :key="loggedOutItem.title"
          :item="loggedOutItem"
        />
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
      loggedInListItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard", url: "/dashboard" }
      ],
      loggedOutListItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard", url: "/dashboard" },
        { title: "Login", icon: "mdi-login", url: "/login" },
        { title: "Signup", icon: "mdi-account-plus-outline", url: "/signup" }
      ]
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "drawer"]),
    getDrawer: {
      get() {
        return this.drawer;
      },
      set(newVal) {
        if (newVal !== this.drawer) {
          this.setDrawer(newVal);
        }
        return newVal;
      }
    }
  },

  methods: {
    ...mapActions(["setDrawer"])
  }
};
</script>
