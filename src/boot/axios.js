import Vue from 'vue'
import axios from 'axios'

import Store from '../store'

const axiosInst = axios.create({
  baseURL: process.env.API_URL,
  timeout: process.env.NODE_ENV === 'development' ? 60000 : 10000 // todo: error dialog when canceled by timeout
});

axiosInst.interceptors.request.use(
  function (config) {
    const authToken = window.localStorage.getItem('authToken'); // token or null
    if (authToken) config.headers.Authorization = 'Bearer ' + authToken;
    Store.commit('setLoading', true)
    return config;
  },
  function (error) {
    Store.commit('setLoading', false);
    let message;
    if (!error.request) {
      // Something happened in setting up the request that triggered an Error (when cancel too)
      message = 'Something happened in setting up the request: ' + error;
    }
    Store.commit('setError', {
      status: -1,
      message: message || error.message || 'something wrong happened with request'
    });
    return Promise.reject(error);
  }
);

axiosInst.interceptors.response.use(
  function (response) {
    Store.commit('setLoading', false);
    return response;
  },
  function (error) {
    // The request was made, but the server responded with a status code that falls out of the range of 2xx
    Store.commit('setLoading', false)
    if (error.response) {
      const status = error.response.status
      if (
        status === 401 // when jwt changed etc
        // router.history.current.path !== '/login'
      ) {
        Store.dispatch('logOut')
      } else {
        Store.commit('setError', {
          status,
          message: error.response.data.message
        })
      }
    } else {
      Store.commit('setError', {
        status: 0,
        message: error.message || 'something wrong happened'
      });
    }
    return Promise.reject(error);
  });

Vue.prototype.$axios = axiosInst;
