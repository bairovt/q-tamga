import Vue from "vue";
import Vuex from "vuex";
import jwtDecode from "jwt-decode";
import router from "../router";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export default function(/* { ssrContext } */) {
const Store = new Vuex.Store({
  modules: {
    // example
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,

  state: {
    user: null,
    loading: false
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    autoLogin({
      commit
    }) {
      const authToken = window.localStorage.getItem("authToken");
      if (authToken) {
        commit("setUser", jwtDecode(authToken)); // todo: разлогинивание конкретного юзера с сервера
      } else {
        router.push("/login");
      }
    },
    logOut({
      commit
    }) {
      commit("setUser", null);
      window.localStorage.removeItem("authToken");
      router.push("/login");
    }
  }
});

export default Store;

//   return Store;
// }
