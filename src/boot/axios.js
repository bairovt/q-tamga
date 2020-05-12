import Vue from 'vue';
import axios from 'axios';
import { Dialog } from 'quasar';

import Store from '../store';
import router from '../router';

const axiosInst = axios.create({
  baseURL: process.env.API_URL,
  timeout: process.env.NODE_ENV === 'development' ? 60000 : 10000 // todo: error dialog when canceled by timeout
});

axiosInst.interceptors.request.use(
  function(config) {
    const authToken = window.localStorage.getItem('authToken'); // token or null
    if (authToken) config.headers.Authorization = 'Bearer ' + authToken;
    Store.commit('setLoading', true);
    return config;
  },

  function(error) {
    Store.commit('setLoading', false);
    let status = -1,
      message = error.message;

    if (!error.request) {
      message = 'Something happened in setting up the request: ' + error;
    }
    Store.commit('setError', {
      status,
      message: message || 'something wrong happened with request'
    });
    Dialog.create({
      title: `Error ${status}`,
      message,
      ok: false
    });
    return Promise.reject(error);
  }
);

axiosInst.interceptors.response.use(
  function(response) {
    Store.commit('setLoading', false);
    return response;
  },

  function(error) {
    // The request was made, but the server responded with a status code that falls out of the range of 2xx
    Store.commit('setLoading', false);
    let status = error.status || 0,
      message = error.message || 'No response received';

    if (error.response) {
      status = error.response.status;
      message =
        (error.response.data && error.response.data.message) ||
        'No message in response';
      if (
        status === 401 && // e.g. when jwt was changed
        router.history.current.path !== '/login'
      ) {
        Store.dispatch('logOut');
      }
    }
    Store.commit('setError', {
      status,
      message
    });
    Dialog.create({
      title: `Error ${status}`,
      message,
      ok: false,
      dark: true
    });
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axiosInst;
