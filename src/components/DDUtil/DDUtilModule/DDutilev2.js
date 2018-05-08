  import { upload } from './file-upload.fake.service' // fake service
  // import { upload } from './file-upload.service';   // real service
  import { wait } from './utils'

  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3

  const state = {
    uploadedFiles: [],
    uploadError: null,
    currentStatus: null,
    uploadFieldName: 'photos'
  }
  const getters = {
    isInitial (state) {
      return state.currentStatus === STATUS_INITIAL
    },
    isSaving (state) {
      return state.currentStatus === STATUS_SAVING
    },
    isSuccess (state) {
      return state.currentStatus === STATUS_SUCCESS
    },
    isFailed (state) {
      return state.currentStatus === STATUS_FAILED
    },
    uploadFieldName (state) {
      return state.uploadFieldName
    },
    uploadedFiles (state) {
      return state.uploadedFiles
    }
  }
  const actions = {
    reset ({commit}) {
      commit('setCurrentStatus', STATUS_INITIAL)
      commit('setUploadedFiles', [])
      commit('setUploadError', null)
    },
    save ({commit, dispatch}, formData) {
      commit('setCurrentStatus', STATUS_SAVING)

      upload(formData)
      .then(wait(1500))
      .then(data => {
        commit('setUploadedFiles', [].concat(data))
        commit('setCurrentStatus', STATUS_SUCCESS)
      })
      .catch(err => {
        commit('setUploadError', err.response)
        commit('setCurrentStatus', STATUS_FAILED)
      })
    },
    filesChange ({ commit, dispatch }, dataArray) {
      let fileList = dataArray[0].fileList
      let fieldName = dataArray[0].name
      console.log(fileList, fieldName)
      const formData = new FormData()
      if (!fileList.length) {
        return
      }
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })
      dispatch('save', formData)
    }
  }
  const mutations = {
    setCurrentStatus (state, payload) {
      state.currentStatus = payload
    },
    setUploadedFiles (state, payload) {
      state.uploadedFiles = payload
    },
    setUploadError (state, payload) {
      state.uploadError = payload
    }
  }

  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters

  }
