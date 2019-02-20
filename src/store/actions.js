import * as types from './mutation-types'

/**
 * 修改侧边栏状态
 * @param commit
 * @param flag
 */
export const set_side_state = ({commit}, flag) => {
  commit(types.SET_SIDE_STATE, flag)
}
