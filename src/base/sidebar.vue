<template>
  <div class="sidebar">
    <div class="user-box">
      <img :src="userImg"/>
      <i class="icon" @click="close">
        <img src="../assets/close.png"/>
      </i>
    </div>
    <div class="menu-box">
      <div class="content-wrapper">
        <ul class="navs" style="margin-bottom: 100px">
          <li
            @click="item.subItems ? showToggle(item) : close()"
            v-for="(item,index) in navs"
            :key="index"
            :class="pathname===item.title ? 'active' : ''">
            <router-link
              :to="item.path ? item.path : ''">
              <span class="icon" :class="item.className"></span>
              <p>{{item.title}}</p>
            </router-link>
            <p class="drop" v-if="item.subItems && !item.isShow">
              <img src="../assets/drop.png"/>
            </p>
            <p class="drop" v-if="item.subItems && item.isShow">
              <img src="../assets/xia.png"/>
            </p>
            <ul v-show="item.isShow" class="sub-item">
              <li @click="subToggle(item)"
                  v-for="(subItem,index) in item.subItems"
                  :class="subName===subItem.title ? 'active' : ''"
                  :key="index">
                <router-link :to="subItem.path">
                  {{subItem.title}}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapActions} from 'vuex'

  export default {
    components: {
    },
    props: {
      userImg: {
        type: String,
        default: '../static/images/userImg.png'
      },
      pathname: {
        type: String,
        default: ''
      },
      subName: {
        type: String,
        default: ""
      }
    },
    data() {
      const _this = this
      return {
        navs: [
          {
            className: 'home',
            path: '/',
            title: '首页',
          },
          {
            className: 'exhibit',
            title: '常设展览',
            isShow: false,
            subItems: [
              {
                path: '/survey',
                title: '展馆概况'
              },
              {
                path: '/guide',
                title: '楼层导览'
              },
              {
                path: '/round',
                title: '全景环游'
              },
              {
                path: '/theater',
                title: '影院剧场'
              },
              {
                path: '/succinct',
                title: '展品精粹'
              }
            ]
          },
          {
            className: 'patch',
            title: '临展信息',
            isShow: false,
            subItems: [
              {
                path: '/patch_info',
                title: '临时展览'
              },
              {
                path: '/flow_science',
                title: '流动科技馆'
              }
            ]
          },
          {
            className: 'edu',
            title: '教育活动',
            isShow: false,
            subItems: [
              {
                path: '/edu',
                title: '全部课程'
              }
            ]
          },
          {
            className: 'mkx',
            title: '美科新未来学院',
            isShow: false,
            subItems: [
              {
                path: '/mkx',
                title: '学院课程'
              }
            ]
          },
          {
            className: 'visit',
            title: '参观服务',
            isShow: false,
            subItems: [
              {
                path: '/strategy',
                title: '参观攻略'
              },
              {
                path: '/act_calendar',
                title: '活动日历'
              },
              {
                path: '/SE',
                title: 'SE餐厅'
              },
              {
                path: '/consult',
                title: '参观咨询'
              },
              {
                path: '/notice',
                title: '新闻公告'
              }
            ]
          },
          {
            className:'answer',
            path:'/answer',
            title:'咨询问答'
          }
        ],
        currentName: _this.pathname
      }
    },
    created() {
      for (var key in this.navs) {
        if (this.navs[key].title === this.pathname) {
          this.navs[key].isShow = true
        }
      }
    },
    methods: {
      ...mapActions([
        'set_side_state'
      ]),
      close() {
        this.set_side_state(false)
      },
      showToggle(item) {
        this.currentName = ''
        if (!item.isShow) {
          for (var key in this.navs) {
            this.navs[key].isShow = false
          }
        }
        item.isShow = !item.isShow
      },
      subToggle(item) {
        this.close()
      }
    },
  }
</script>
<style lang="less">
  .sidebar {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 30%;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 1);
    .user-box {
      width: 100%;
      height: 3rem;
      display: flex;
      display: -webkit-flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      margin-bottom: .4rem;
      position: relative;
      background: aliceblue;
      img {
        width: 4.3rem;
      }
      .user-phone {
        font-size: .4rem;
        color: #fff;
        margin-top: .2rem;
      }
      .icon {
        position: absolute;
        top: 10px;
        left: 10px;
        color: #fff;
        img {
          width: .6rem;
        }
      }
    }
    .menu-box {
      height: calc(~'100vh - 3.4rem');
      .content-wrapper {
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      ul {
        li {
          border-bottom: 1px solid #e5e5e5;
          position: relative;
          .drop {
            position: absolute;
            right: .3rem;
            width: .4rem;
            top: .42rem;
            img {
              width: 100%;
            }
          }
          & > a {
            display: flex;
            flex-flow: row;
            align-items: center;
            padding-top: .2rem;
            padding-bottom: .2rem;
            text-decoration: none;
            padding-left: .2rem;
            color: #666;
          }
          .icon {
            width: 1.1rem;
            height: 1.1rem;
            display: inline-block;
            background-size: cover !important;
            &.home {
              background: url("../assets/icon_home.png") no-repeat;
            }
            &.exhibit {
              background: url("../assets/icon_exhibit.png") no-repeat;
            }
            &.patch {
              background: url("../assets/icon_patch.png") no-repeat;
            }
            &.edu {
              background: url("../assets/icon_edu.png") no-repeat;
            }
            &.mkx {
              background: url("../assets/icon_mkx.png") no-repeat;
            }
            &.visit {
              background: url("../assets/icon_serve.png") no-repeat;
            }
            &.answer{
              background: url("../assets/answer.png") no-repeat;
            }
          }
          p {
            font-size: .42rem;
          }
          &.active {
            & > a {
              color: #4db6f7;
              text-decoration: none;
            }
          }
          &:last-child {
            border-bottom: none;
          }
          .sub-item {
            li {
              border-bottom: none;
              line-height: .8rem;
              font-size: .4rem;
              padding-left: 1.6rem;
              &.active {
                background: #eee;
              }
              &:last-child {
                a {
                  margin-bottom: .2rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
