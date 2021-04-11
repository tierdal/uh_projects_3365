import session from '../utilities/session'
import axios from '../utilities/axios'
import lumberjack from '../utilities/lumberjack'
import config from '../config'
import router from '../router'
import Swal from 'sweetalert2'
/* eslint-disable no-param-reassign */

export default {
  state: {
    auth: session.getAuth(),
    user: session.getUser(),
  },
  getters: {
    isAuthenticated(state) {
      //if (state.auth === null){
        //console.log('state.auth = null')
        //return false
      //}
      return state.auth !== null && typeof state.auth !== 'undefined'
    },
    auth(state) {
      return state.auth
    },
    user(state) {
      return state.user
    },
  },
  mutations: {
    setAuthentication(state, obj) {
      if (obj) {
        state.auth = obj.token
        state.user = obj.login
        session.setAuthentication(obj)
      } else {
        state.auth = null
        state.user = null
        session.clear()
      }
    },
  },
  actions: {
    logout(context) {
      lumberjack.logAudit(1, 2, '')
      setTimeout(() => {
        context.commit('setAuthentication')
        router.push('/auth/login')//.catch(e => {})
      }, 500)
    },
    login(context, obj) {
      return axios
        .post(`${config.api}/auth/login`, obj)
        .then(res => {
          context.commit('setAuthentication', res.data)
          lumberjack.logAudit(1, 1, '')
        })
        .catch(() => {
          Swal.fire({
            title: 'Invalid credentials!',
            text: 'Please try again!',
            icon: 'error'
          })
        })
    },
    register(context, obj) {
      return axios
        .post(`${config.api}/auth/register`, obj)
        .then(() => {
          Swal.fire(
            'Done!',
            'The user has been created.',
            'success'
          )
          router.push('/useradmin')
        })
        .catch(() => {
          Swal.fire({
            title: 'Oops!',
            text: 'Something is wrong, Please try again!',
            icon: 'error'
          })
        })
    },
    updateLogin(context, obj) {
      return axios
        .post(`${config.api}/auth/user`, obj)
        .then(() => {
          Swal.fire({
            title: 'Account updated',
            text: 'Please login!',
            icon: 'success'
          })
        })
        .catch(() => {
          Swal.fire({
            title: 'Invalid data!',
            text: 'Please try again!',
            icon: 'error'
          })
        })
    },
  },
}
