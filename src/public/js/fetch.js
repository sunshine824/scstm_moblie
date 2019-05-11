import { post } from './post'
import { serveUrl } from './config'

/**
 * 获取logo
 * @returns {*}
 * @constructor
 */
export function getLogo() {
  const result = post('api/logo', {})
  return result
}

/**
 * 获取首页数据
 * @returns {*}
 */
export function getIndexData() {
  const result = post('api/index', {})
  return result
}

/**
 * 获取尾部数据
 * @returns {*}
 */
export function getFootData() {
  const result = post('api/thetail', {})
  return result
}

/**
 * 获取教育活动面向人群列表
 * @returns {*}
 */
export function getEduCrowdList() {
  const result = post('api/listscourseclasp', {})
  return result
}

/**
 * 获取教育活动活动类型
 * @returns {*}
 */
export function getEduType() {
  const result = post('api/listscourseclash', {})
  return result
}

/**
 * 获取教育活动列表
 * @returns {*}
 */
export function educationlists(page = 1,
  clas_h = [],
  clas_p = [],
  floor = [],
  state = '') {
  const result = post('api/educationlists', {
    page: page,
    clas_h: clas_h,
    clas_p: clas_p,
    floor: floor,
    state: state
  })
  return result
}

/**
 * 获取教育活动详情
 * @param id
 * @returns {*}
 */
export function educationDetail(id) {
  const result = post('api/educationdeta', {
    id: id
  })
  return result
}

/**
 * 获取美科新面向人群列表
 * @returns {*}
 */
export function getMkxCrowdList() {
  const result = post('api/listfutureclasp', {})
  return result
}

/**
 * 获取美科新精选学院列表
 * @returns {*}
 */
export function getMkxBestSchoolList() {
  const result = post('api/listfutureclash', {})
  return result
}

/**
 * 获取美科新内容形式列表
 * @returns {*}
 */
export function getMkxContentList() {
  const result = post('api/listfutureclasc', {})
  return result
}

/**
 * 获取美科新未来学院列表
 * @param page     页码
 * @param clas_p   面向人群
 * @param clas_h   精选学院
 * @param clas_c   内容形式
 * @returns {*}
 */
export function getFutureList(page = 1,
  clas_p = [],
  clas_h = [],
  clas_c = []) {
  const result = post('api/futurelists', {
    page: page,
    clas_p: clas_p,
    clas_h: clas_h,
    clas_c: clas_c
  })

  return result

}

/**
 * 获取美科新未来学院详情
 * @param id
 * @returns {*}
 */
export function getFutureDetail(id) {
  const result = post('api/futuredeta', {
    id: id
  })
  return result
}

/**
 * 获取参观路线
 * @returns {*}
 */
export function getRoadWay() {
  const result = post('api/visitphone', {})
  return result
}

/**
 * 获取参观咨询内容
 * @returns {*}
 */
export function getVisitContent() {
  const result = post('api/consulcontent', {})
  return result
}

/**
 * 获取新闻公告列表
 * @param page  页码
 * @param type  1新闻2公告
 * @returns {*}
 */
export function getNewsInfo(page = 1,
  type = 1) {
  const result = post('api/informlists', {
    page: page,
    type: type
  })
  return result
}

/**
 * 获取新闻公告详情
 * @param id
 * @returns {*}
 */
export function getNewsDetail(id) {
  const result = post('api/informdetails', {
    id: id
  })
  return result
}

/**
 * 获取购票链接
 * @returns {*}
 */
export function getTicketHref() {
  const result = post('api/ticket', {})
  return result
}

/**
 * 获取临时展览列表
 * @param page   页码
 * @param type   1正在展览，2即将展览，3展览回顾
 * @returns {*}
 */
export function getPatchList(page = 1,
  type = 1) {
  const result = post('api/showlists', {
    page: page,
    type: type
  })
  return result
}

/**
 * 获取临展详情
 * @param id
 * @returns {*}
 */
export function getPatchDetail(id) {
  const result = post('api/showdeta', {
    id: id
  })
  return result
}

/**
 * 获取流动科技馆分类
 * @returns {*}
 */
export function getFlowType() {
  const result = post('api/flowclass', {})
  return result
}

/**
 * 获取流动科技馆列表
 * @param page  页码
 * @param clas  分类id
 * @returns {*}
 */
export function getFlowList(page = 1,
  clas = 1) {
  const result = post('api/flowlists', {
    page: page,
    clas: clas
  })
  return result
}

/**
 * 获取流动科技馆详情
 * @param id
 * @returns {*}
 */
export function getFlowDetail(id) {
  const result = post('api/flowdeta', {
    id: id
  })
  return result
}

/**
 * 获取影院剧场列表
 * @param type   1正在上映，2即将上映，3往期回顾
 * @param page   页码
 * @returns {*}
 */
export function getMovieList(type = 1,
  page = 1) {
  const result = post('api/cinemalists', {
    type: type,
    page: page
  })
  return result
}

/**
 * 获取影院剧场详情
 * @param id
 * @returns {*}
 */
export function getMovieDetail(id) {
  const result = post('api/cinemadeta', {
    id: id
  })
  return result
}

/**
 * 获取楼层名称列表
 * @returns {*}
 */
export function getFloorType() {
  const result = post('api/floors', {})
  return result
}

/**
 * 获取楼层导览列表
 * @param page
 * @param floor_id
 * @returns {*}
 */
export function getFloorList(page = 1,
  floor_id = 1) {
  const result = post('api/floorlists', {
    page: page,
    floor_id: floor_id
  })
  return result
}

/**
 * 获取楼层详情
 * @param id
 * @returns {*}
 */
export function getFloorDetail(id) {
  const result = post('api/floordeta', {
    id: id
  })
  return result
}

/**
 * 获取藏品精粹
 * @returns {*}
 */
export function getCollectType() {
  const result = post('api/collectionclass', {})
  return result
}

/**
 * 获取藏品精粹列表
 * @param page  页码
 * @param clas  分类id
 * @returns {*}
 */
export function getCollectList(page = 1,
  clas = 1) {
  const result = post('api/collectionlists', {
    page: page,
    clas: clas
  })
  return result
}

/**
 * 获取藏品精粹详情
 * @param id
 * @returns {*}
 */
export function getCollectDetail(id) {
  const result = post('api/collectiondeta', {
    id: id
  })
  return result
}

/**
 * 获取日历列表
 * @param page   页码
 * @param type   分类
 * @param time   时间戳
 * @returns {*}
 */
export function getCalendarList(page = 1,
  type = 1,
  time) {
  const result = post('api/Calendarlists', {
    page: page,
    type: type,
    time: time
  })
  return result
}

/**
 * 用户登录
 * @param phone      用户手机号
 * @param password   用户密码
 * @returns {*}
 * @constructor
 */
export function signIn(phone,
  password) {
  const result = post('api/login', {
    phone: phone,
    password: password
  })
  return result
}

/**
 * 获取短信验证码
 * @param code
 * @param phone
 * @returns {*}
 */
export function getPhoneCode(code,
  phone) {
  const result = post('api/wer_add', {
    code: code,
    phone: phone
  })
  return result
}

/**
 * 获取图片验证码
 * @param phone
 * @returns {string}
 */
export function getImgCode(phone) {
  const result = serveUrl + '/api/captcha/' + phone + '/' + Date.parse(new Date());
  return result
}

/**
 * 注册
 * @param phone_code  短信验证码
 * @param phone       手机号
 * @param password    密码
 * @returns {*}
 */
export function signUp(phone_code,
  phone,
  password,
  card) {
  const result = post('api/registr', {
    phone_code: phone_code,
    phone: phone,
    password: password,
    card: card
  })
  return result
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserInfo() {
  const result = post('api/user', {})
  return result
}

/**
 * 退出
 * @returns {*}
 */
export function layout() {
  const result = post('api/out', {})
  return result
}

/**
 * 找回密码
 * @param phone_code
 * @param password
 * @param phone
 * @returns {*}
 */
export function forget(phone_code,
  password,
  phone,
  card) {
  const result = post('api/looking', {
    phone_code: phone_code,
    password: password,
    phone: phone,
    card: card
  })
  return result
}

/**
 * 编辑用户信息
 * @param name       用户姓名
 * @param nickname   昵称
 * @param email      邮箱
 * @param school     学院
 * @param born       出生日期
 * @param img        头像
 * @param card       身份证
 * @returns {*}
 */
export function editUserInfo(name,
  nickname,
  email,
  school,
  born,
  card) {
  const result = post('api/eduser', {
    name: name,
    nickname: nickname,
    email: email,
    school: school,
    born: born,
    card: card
  })
  return result
}

/**
 * 修改密码
 * @param password1  原始密码
 * @param password2  新密码
 * @returns {*}
 */
export function editPasswd(password1,
  password2) {
  const result = post('api/editpwd', {
    password1: password1,
    password2: password2
  })
  return result
}

/**
 * 获取留言验证码
 * @param phone
 * @returns {string}
 */
export function messageCode(phone) {
  const result = serveUrl + '/api/language/' + phone + '/' + Date.parse(new Date());
  return result
}

/**
 * 提交留言
 * @param code     图片验证码
 * @param content  留言内容
 * @param type_id  留言分类
 * @returns {*}
 */
export function submitMessage(code,
  content,
  type_id) {
  const result = post('api/lang_add', {
    code: code,
    content: content,
    type_id: type_id
  })
  return result
}

/**
 * 获取留言列表
 * @param page     页码
 * @param search   查询内容
 * @param type_id  查询分类id
 * @returns {*}
 */
export function messageList(page,
  search,
  type_id) {
  const result = post('api/langlists', {
    page: page,
    search: search,
    type_id: type_id
  })
  return result
}

/**
 * 获取留言分类
 * @returns {*}
 */
export function messageType() {
  const result = post('api/Langtype', {})
  return result
}

/**
 * 获取场次列表
 * @returns {*}
 */
export function getNumbers(sesstime, activity_id, typeVal) {
  const result = post('api/sess', {
    sesstime: sesstime,
    activity_id: activity_id,
    type: typeVal
  })
  return result
}

/**
 * 场次预约
 * @param reser_id
 * @param details
 * @returns {*}
 */
export function bookSumbit(reser_id, details) {
  const result = post('api/reser', {
    reser_id: reser_id,
    details: details
  })
  return result
}

/**
 * 我的预约列表
 * @param type
 * @returns {*}
 * @constructor
 */
export function Reserlists(params) {
  const result = post('api/reserlists', params)
  return result
}

/**
 * 科普志愿者须知
 * @returns {*}
 */
export function scienceNotice() {
  const result = post('api/inst_science', {})
  return result
}

/**
 * 科普志愿者数据提交
 * @param params
 * @returns {*}
 */
export function scienceForm(params) {
  const result = post('api/add_science', params)
  return result
}

/**
 * 专家志愿者须知
 * @returns {*}
 */
export function expertNotice() {
  const result = post('api/inst_experts', {})
  return result
}

/**
 * 专家志愿者数据提交
 * @param params
 * @returns {*}
 */
export function expertForm(params) {
  const result = post('api/add_experts', params)
  return result
}

/**
 * 购票链接
 * @returns {*}
 */
export function getTicketUrl() {
  const result = post('api/ticket', {})
  return result
}

/**
 * 获取场次日期
 * @param params
 * @returns {*}
 */
export function getSessaList(params) {
  const result = post('api/sessa', params)
  return result
}

/**
 * 查询是否支付成功
 * @param params
 */
export function userQueryPay(params) {
  const result = post('api/user_query_pay', params)
  return result
}

/**
 * 调用支付
 * @param params
 * @returns {*}
 */
export function orderPay(params) {
  const result = post('api/order_pay', params)
  return result
}

/**
 * 取消预约
 * @param params
 * @returns {*}
 */
export function reserCancel(params) {
  const result = post('api/resercancel', params)
  return result
}

/**
 * 微信公众号支付
 * @param params
 * @returns {*}
 */
export function wxOrderPay(params) {
  const result = post('api/wx_order_pay', params)
  return result
}

/**
 * 删除订单
 * @param {*} params
 */
export function deleteOrder(params) {
  const result = post('api/reserdete', params)
  return result
}