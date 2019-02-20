import Vue from 'vue'
import Router from 'vue-router'

const SignIn = () => import('@/components/SignIn')
const SignUp = () => import('@/components/SignUp')
const Forget = () => import('@/components/Forget')

const Home = () => import('@/components/Home')

const Survey = () => import('@/components/exhibit/survey')
const Guide = () => import('@/components/exhibit/guide')
const GuideDetail = () => import('@/components/exhibit/guide_detail')
const Round = () => import('@/components/exhibit/round')
const Theater = () => import('@/components/exhibit/theater')
const TheaterDetail = () => import('@/components/exhibit/theater_detail')
const Succinct = () => import('@/components/exhibit/succinct')
const SuccinctType = () => import('@/components/exhibit/succinct_type')
const SuccinctDetail = () => import('@/components/exhibit/succinct_detail')

const PatchList = () => import('@/components/patch_exhibit/patch_list')
const PatchDetail = () => import('@/components/patch_exhibit/patch_detail')
const Flow_science = () => import('@/components/patch_exhibit/flow_science')
const Flow_detail = () => import('@/components/patch_exhibit/flow_detail')

const Edu = () => import('@/components/edu/all_course')
const EduDetail = () => import('@/components/edu/edu_detail')

const Mkx = () => import('@/components/mkx/all_school')
const mkxDetail = () => import('@/components/mkx/mkx_detail')

const Strategy = () => import('@/components/visit_serve/strategy')
const Act_calendar = () => import('@/components/visit_serve/act_calendar')
const SE = () => import('@/components/visit_serve/SE')
const Consult = () => import('@/components/visit_serve/consult')
const Notice = () => import('@/components/visit_serve/notice')
const Detail = () => import('@/components/visit_serve/detail')

const UserCenter = () => import('@/components/user/user_center')
const Setting = () => import('@/components/user/setting')
const Manage = () => import('@/components/user/manage')
const MyBook = () => import('@/components/user/my_book')

const CoupeVolunteer = () => import('@/components/volunteer/Coupe_volunteer')
const ExpertVolunteer = () => import('@/components/volunteer/Expert_volunteer')

const Answer = () => import('@/components/questions/answer')
const Question = () => import('@/components/questions/question')

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/signIn',
      component: SignIn,
      name: '登录',
      meta: ['登录']
    },
    {
      path: '/signUp',
      component: SignUp,
      name: '注册',
      meta: ['注册']
    },
    {
      path: '/forget',
      component: Forget,
      name: '忘记密码',
      meta: ['忘记密码']
    },
    {
      path: '/',
      component: Home,
      name: '首页',
      meta: ['首页']
    },
    {
      path: '/survey',
      name: '展馆概况',
      component: Survey,
      meta: ['常设展览', '展馆概况'],
    },
    {
      path: '/guide',
      name: '楼层导览',
      component: Guide,
      meta: ['常设展览', '楼层导览'],
    },
    {
      path: '/guide/:id',
      name: '导览详情',
      component: GuideDetail,
      meta: ['常设展览', '楼层导览']
    },
    {
      path: '/round',
      name: '全景环游',
      component: Round,
      meta: ['常设展览', '全景环游'],
    },
    {
      path: '/theater',
      name: '影院剧场',
      component: Theater,
      meta: ['常设展览', '影院剧场'],
    },
    {
      path: '/theater/:id',
      name: '详情',
      component: TheaterDetail,
      meta: ['常设展览', '影院剧场'],
    },
    {
      path: '/succinct',
      name: '展品精粹',
      component: Succinct,
      meta: ['常设展览', '展品精粹'],
    },
    {
      path: '/succinct/:id',
      name: '展品精粹',
      component: SuccinctType,
      meta: ['常设展览', '展品精粹'],
    },
    {
      path: '/succinct_detail/:id',
      name: '展品精粹详情',
      component: SuccinctDetail,
      meta: ['常设展览', '展品精粹'],
    },
    {
      path: '/patch_info',
      name: '临时展览',
      component: PatchList,
      meta: ['临展信息', '临时展览'],
    },
    {
      path: '/patch_info/:id',
      name: '临展详情',
      component: PatchDetail,
      meta: ['临展信息', '临时展览'],
    },
    {
      path: '/flow_science',
      component: Flow_science,
      name: '流动科技馆',
      meta: ['临展信息', '流动科技馆'],
    },
    {
      path: '/flow_science/:id',
      component: Flow_detail,
      name: '流动详情',
      meta: ['临展信息', '流动科技馆'],
    },
    {
      path: '/edu',
      name: '全部课程',
      component: Edu,
      meta: ['教育活动', '全部课程']
    },
    {
      path: '/edu/:id',
      name: '教育课程详情',
      component: EduDetail,
      meta: ['教育活动', '全部课程']
    },
    {
      path: '/mkx',
      name: '学院课程',
      component: Mkx,
      meta: ['美科新未来学院', '学院课程']
    },
    {
      path: '/mkx/:id',
      name: '学院课程详情',
      component: mkxDetail,
      meta: ['美科新未来学院', '学院课程']
    },
    {
      path: '/strategy',
      name: '参观攻略',
      component: Strategy,
      meta: ['参观服务', '参观攻略'],
    },
    {
      path: '/act_calendar',
      name: '活动日历',
      component: Act_calendar,
      meta: ['参观服务', '活动日历'],
    },
    {
      path: '/SE',
      name: 'SE餐厅',
      component: SE,
      meta: ['参观服务', 'SE餐厅'],
    },
    {
      path: '/consult',
      name: '参观咨询',
      component: Consult,
      meta: ['参观服务', '参观咨询'],
    },
    {
      path: '/notice',
      name: '新闻公告',
      component: Notice,
      meta: ['参观服务', '新闻公告'],
    },
    {
      path: '/notice/:type/:id',
      name: '新闻公告详情',
      component: Detail,
      meta: ['参观服务', '新闻公告']
    },
    {
      path: '/user_center',
      name: '用户中心',
      component: UserCenter,
      meta: ['用户中心', '用户列表']
    },
    {
      path: '/setting',
      name: '个人设置',
      component: Setting,
      meta: ['个人设置']
    },
    {
      path: '/manage',
      name: '账号管理',
      component: Manage,
      meta: ['账号管理']
    },
    {
      path: '/mybook',
      name: '我的预约',
      component: MyBook,
      meta: ['我的预约']
    },
    {
      path: '/coupe_volunteer',
      name: '科普志愿者',
      component: CoupeVolunteer,
      meta: ['科普志愿者', '科普志愿者']
    },
    {
      path: '/expert_volunteer',
      name: '专家志愿者',
      component: ExpertVolunteer,
      meta: ['专家志愿者', '专家志愿者']
    },
    {
      path: '/answer',
      name: '问答列表',
      component: Answer,
      meta: ['咨询问答', '问答列表']
    },
    {
      path: '/question',
      name: '我要提问',
      component: Question,
      meta: ['咨询问答', '我要提问']
    }
  ]
})
