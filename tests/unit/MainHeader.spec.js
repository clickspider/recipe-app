import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import MainHeader from "../../src/components/App/MainHeader.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const router = new VueRouter();

describe("MainHeader.vue", () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      isLoggedIn: () => false,
      isLoading: () => false,
      drawer: () => false
    };

    store = new Vuex.Store({
      getters
    });
  });

  it("If lodaer data changed expect a router.go() to be called", () => {
    const wrapper = shallowMount(MainHeader, {
      localVue,
      data: () => ({ loader: null }),
      store,
      router,
      stubs: [
        "v-btn",
        "v-img",
        "v-spacer",
        "router-link",
        "v-app-bar-nav-icon",
        "v-app-bar"
      ]
    });
    // if loader data is changed
    wrapper.setData({ loader: true });

    // expect trigger router.go()
    const spy = spyOn(wrapper.vm.$router, "go");
    expect(spy).toHaveBeenCalled();
  });
});
