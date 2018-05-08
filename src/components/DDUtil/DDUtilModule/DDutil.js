import { upload } from './file-upload.fake.service'
import { wait } from './utils'

const state = {
  STATUS_INITIAL: 0,
  STATUS_SAVING: 1,
  STATUS_SUCCESS: 2,
  STATUS_FAILED: 3,
  uploadedFiles: [],
  uploadError: null,
  currentStatus: null,
  uploadFieldName: 'photos'
}
const mutations = {
  setUploadedFiles (state, payload) {
    state.uploadedFiles = payload
  },
  setUploadError (state, payload) {
    state.uploadError = payload
  },
  setCurrentStatus (state, payload) {
    state.currentStatus = payload
  },
  setUploadFieldName (state, payload) {
    state.uploadFieldName = payload
  }

}
const actions = {
  reset ({commit, getters}) {
    // reset form to initial state
    commit('setCurrentStatus', getters.STATUS_INITIAL)
    commit('setUploadedFiles', [])
    commit('setUploadError', null)
  },
  save ({commit, getters}, formData) {
    commit('setCurrentStatus', getters.STATUS_SAVING)
    upload(formData)
    .then(wait(1500))
    .then(data => {
      commit('setUploadedFiles', [].concat(data))
      commit('setCurrentStatus', getters.STATUS_SUCCESS)
    })
    .catch(err => {
      commit('setUploadedError', err.response)
      commit('setCurrentStatus', getters.STATUS_FAILED)
    })
  },
  filesChange ({commit, getters, dispatch}, fieldName, fileList) {
    const formData = new FormData()
    if (!fileList.length) { return }
    Array
    .from(Array(fileList.length).keys())
    .map(index => {
      formData.append(fieldName, fileList[index], fileList[index].name)
    })
    dispatch('save()', formData)
  },
  isInitial ({getters}) {
    return getters.currentStatus === getters.STATUS_INITIAL
  },
  isSaving ({getters}) {
    return getters.currentStatus === getters.STATUS_SAVING
  },
  isSuccess ({getters}) {
    return getters.currentStatus === getters.STATUS_SUCCESS
  },
  isFailed ({getters}) {
    return getters.currentStatus === getters.STATUS_FAILED
  }

}
const getters = {

  STATUS_INITIAL (state) {
    return state.STATUS_INITIAL
  },
  STATUS_SAVING (state) {
    return state.STATUS_SAVING
  },
  STATUS_SUCCESS (state) {
    return state.STATUS_SUCCESS
  },
  STATUS_FAILED (state) {
    return state.STATUS_FAILED
  },
  uploadedFiles (state) {
    return state.uploadedFiles
  },
  uploadError (state) {
    return state.uploadError
  },
  currentStatus (state) {
    return state.currentStatus
  },
  uploadFieldName (state) {
    return state.uploadFieldName
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters

}
