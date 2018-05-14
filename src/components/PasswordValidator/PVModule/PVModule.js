/* eslint no-extra-boolean-cast: 0 */

const state = {
  mainPass: '',
  reTyped: '',
  progress: 0
}
const getters = {
  progress (state) {
    return state.progress
  },
  color (state) {
    return ['error', 'warning', 'success', 'info'][Math.floor(state.progress / 33)]
  },
  PassStrength (state) {
    return ['very weak', 'weak', 'normal', 'strong'][Math.floor(state.progress / 33)]
  },
  mainPass (state) {
    return state.mainPass
  },
  reTyped (state) {
    return state.reTyped
  },
  mainPassLength (state) {
    return state.mainPass.length > 7
  },
  mainPassExist (state) {
    return !!state.mainPass
  },
  reTypeExist (state) {
    return !!state.reTyped
  },
  passMatch (state) {
    return state.reTyped === state.mainPass
  }
}

const mutations = {
  mainPass (state, payload) {
    state.mainPass = payload
  },
  reTyped (state, payload) {
    state.reTyped = payload
  },
  progress (state, payload) {
    state.progress = payload
  }

}
const actions = {
  progressCounter ({commit, getters}) {
    let password = getters.mainPass
    let count = 0
    if (!password) {
      count = 0
    }
    if (!!password.match(/[0-9]/g)) {
      count += 25
    }
    if (!!password.match(/[a-z]/g)) {
      count += 25
    }
    if (!!password.match(/[A-Z]/g)) {
      count += 25
    }
    if (!!password.match(/[\W]/g)) {
      count += 25
    }
    commit('progress', count)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions

}
