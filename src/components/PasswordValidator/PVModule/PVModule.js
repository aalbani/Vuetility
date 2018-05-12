const state = {
  mainPass: '',
  e1: false,
  reTyped: '',
  e2: false,
  password: 'Password'
}
const getters = {
  isInitial (state) {
    return state.currentStatus === STATUS_INITIAL
  }
}
const actions = {
  reset({
    commit
  }) {
    commit('setCurrentStatus', STATUS_INITIAL)
    commit('setUploadedFiles', [])
    commit('setUploadError', null)
  },
  save({
    commit,
    dispatch
  }, formData) {
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
  filesChange({
    commit,
    dispatch
  }, dataArray) {
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
  setCurrentStatus(state, payload) {
    state.currentStatus = payload
  },
  setUploadedFiles(state, payload) {
    state.uploadedFiles = payload
  },
  setUploadError(state, payload) {
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

