import * as firebase from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log(new User(user.uid), 'new User(user.uid)')
        console.log(user.uid, ' <--- user uid')
        console.log(user, ' <--- user')
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }

      // .then(user => {
      //   // uid
      //   console.log(new User(user.uid), 'new User(user.uid)')
      //   commit('setUser', new User(user.uid))
      //   commit('setLoading', false)
      // })
      // .catch(error => {
      //   commit('setLoading', false)
      //   commit('setError', error.message)
      // })
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(new User(user.uid), 'new User(user.uid)')
        console.log(user.uid, ' <--- user uid')
        console.log(user, ' <--- user')
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}