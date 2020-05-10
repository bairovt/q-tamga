import Vue from 'vue';
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';
import router from '../router';

import { packTypes, measureUnits } from '../../src/consts';

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
    loading: false,
    error: null,
    packTypes,
    measureUnits
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload; // boolean
    },
    setError(state, appError) {
      const defaultErrorMsgs = {
        500: 'Ошибка сервера',
        404: 'Не найдено',
        403: 'Запрещено',
        401: 'Ошибка авторизации',
        400: 'bad request'
      };
      state.error = appError;
      if (!state.error.message) {
        Vue.set(state.error, 'message', defaultErrorMsgs[appError.status]);
      }
      // when 401 there is no need to open error dialog due to alert is already shown
      if (appError.status !== 401) Vue.set(state.error, 'dialog', true);
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    autoLogin({ commit }) {
      const authToken = window.localStorage.getItem('authToken');
      if (authToken) {
        commit('setUser', jwtDecode(authToken)); // todo: разлогинивание конкретного юзера с сервера
      } else {
        router.push('/login');
      }
    },
    logOut({ commit }) {
      commit('setUser', null);
      window.localStorage.removeItem('authToken');
      router.push('/login');
    }
  }
});

export default Store;

//   return Store;
// }
