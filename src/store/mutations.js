import * as types from './mutation-types'

const mutations = {
  [types.SET_SIDE_STATE](state, flag) {
    state.isSide = flag
  }
}

export default mutations
