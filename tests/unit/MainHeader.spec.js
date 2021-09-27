import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import MainHeader from "../../src/components/App/MainHeader.vue";

const localVue = createLocalVue();
const router = new VueRouter();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("MainHeader.vue", () => {
  let store, getters, wrapper;

  beforeEach(() => {
    getters = {
      isLoggedIn: () => true,
      isLoading: () => false,
      drawer: () => false
    };

    store = new Vuex.Store({
      getters
    });

    wrapper = shallowMount(MainHeader, {
      localVue,
      router,
      store,
      stubs: [
        "v-btn",
        "v-img",
        "v-spacer",
        "router-link",
        "v-app-bar-nav-icon",
        "v-app-bar"
      ],
      data: () => ({
        loader: null
      })
    });
  });

  it("If user is loggedIn and button reload was clicked expect a router.go() to be called", async () => {
    // if loader data is changed
    await wrapper.find("#btn-reload").trigger("click");

    // expect trigger router.go()
    const spy = spyOn(wrapper.vm.$router, "go");
    expect(spy).toHaveBeenCalled();
  });
});
