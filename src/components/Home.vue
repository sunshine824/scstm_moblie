<template>
  <slot-con>
    <div class="home-con">
      <!--顶部swiper-->
      <swiper :banners="homeData.banner"></swiper>
      <div class="i_main">
        <!--网站导航-->
        <ul class="guide clearfix">
          <li v-for="(item,index) in gudies" :key="index" :style="{background:'url('+item.bg+')'}">
            <a :href="item.href">
              <div class="bg">
                <img :src="item.rotateBg"/>
              </div>
              <div class="cont">
                <h3>{{item.title}}</h3>
              </div>
            </a>
          </li>
        </ul>
        <!--开馆闭馆时间-->
        <div class="time-box">
          <div class="time-guide">
            <p class="time-item">
              <span class="time">{{homeData.time.time_sta}}</span>
              <span class="txt">开馆时间</span>
            </p>
            <p class="and">~</p>
            <p class="time-item">
              <span class="time">{{homeData.time.time_end}}</span>
              <span class="txt">闭馆时间</span>
            </p>
          </div>
        </div>
        <!--公告新闻-->
        <div class="group-box">
          <div class="n-title">
            <div class="tab-btn">
              <h2 v-for="(item,index) in tabs"
                  :key="index"
                  :class="{active:current===index}"
                  @click="toggle(index)">
                {{item}}
              </h2>
            </div>
            <router-link to="/notice" class="more">
              <img src="../assets/more.png"/>
            </router-link>
          </div>
          <ul class="list" v-if="current===1" style="background: url('../static/images/mkx_bg.png') no-repeat">
            <li v-for="(item,index) in homeData.inform" :key="index">
              <router-link :to="'/notice/notice/'+item.id">
                {{item.title}}
              </router-link>
              <span class="time">{{item.addtime}}</span>
            </li>
          </ul>
          <ul class="list" v-if="current===0" style="background: url('../static/images/mkx_bg.png') no-repeat">
            <li v-for="(item,index) in homeData.news" :key="index">
              <router-link :to="'/notice/news/'+item.id">
                {{item.title}}
              </router-link>
              <span class="time">{{item.addtime}}</span>
            </li>
          </ul>
        </div>
        <!--美科新学院-->
        <guide-item title="美科新学院" moreUrl="mkx" :bg="mkx_bg" :data="homeData.future"></guide-item>
        <!--教育活动-->
        <guide-item title="教育活动" moreUrl="edu" :bg="edu_bg" :data="homeData.education"></guide-item>
      </div>
    </div>
    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import mFooter from '@/base/footer'
  import GuideItem from '@/base/home/group-item'
  import {getIndexData} from '@/public/js/fetch'
  import Swiper from '@/base/home/swiper'
  import {getFooterMixin} from '@/public/js/mixin'
  import vueSeamLess from 'vue-seamless-scroll'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      GuideItem,
      mFooter,
      Swiper,
      vueSeamLess
    },
    data() {
      return {
        tabs: ['新闻', '公告'],
        current: 0,
        mkx_bg: '../static/images/mkx_bg.jpg',
        edu_bg: '../static/images/edu_bg.jpg',
        homeData: '',
        gudies: [
          {
            bg: '../static/images/guide_bg1.png',
            rotateBg: '../static/images/guide_item1.png',
            href: 'http://ticketwx.scstm.com/Default.aspx',
            title: '在线预约',
            intr: '贴心的票务服务，让您省时省力更省心'
          },
          {
            bg: '../static/images/guide_bg2.png',
            rotateBg: '../static/images/guide_item2.png',
            href: '/strategy',
            title: '参观服务',
            intr: '从科技馆开始，感受宇宙魅力'
          },
          {
            bg: '../static/images/guide_bg3.png',
            rotateBg: '../static/images/guide_item3.png',
            href: '/guide',
            title: '场馆导览',
            intr: '随时随地，为您提供身临其境的游览体验'
          },
        ],
      }
    },
    created() {
      this._getIndexData()
    },
    computed:{
      optionLeft() {
        return {
          direction: 2,
          limitMoveNum: 1
        }
      }
    },
    methods: {
      _getIndexData() {
        const result = getIndexData()
        result.then(res => {
          this.homeData = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      toggle(index) {
        this.current = index
      }
    }
  }
</script>
<style lang="less" scoped>
  .i_main {
    padding: .4rem .3rem;
    .guide {
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      li {
        width: 33.3%;
        height: 4.5rem;
        position: relative;
        background-size: cover !important;
        overflow: hidden;
        a{
          text-decoration: none;
        }
        .bg {
          position: absolute;
          width: 3rem;
          top: 1rem;
          img {
            width: 100%;
            height: 100%;
            animation: swinging 30s linear 0s infinite;
          }
        }
        .cont {
          color: #fff;
          position: relative;
          z-index: 2;
          text-align: center;
          h3 {
            font-size: .5rem;
            line-height: 1.2;
            color: #fff;
            margin-top: .45rem;
          }
        }
      }
    }
    .time-box{
      background: url("../assets/notice_bg.png") no-repeat;
      background-size: cover;
    }
    .time-guide {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;
      margin-top: .4rem;
      padding: 0 .5rem;
      .time-item {
        background: rgba(255, 255, 255, .3);
        border: 1px solid #fff;
        padding: .2rem .7rem;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        .time {
          font-size: .8rem;
          font-weight: bold;
          display: block;
        }
        .txt {
          font-size: .4rem;
        }
      }
      .and {
        color: #fff;
        font-size: 1.2rem;
      }
    }
    .notice-info{
      background: rgba(255, 255, 255, .3);
      border: 1px solid #fff;
      padding: .2rem .7rem;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      width: 100%;
      display: inline-block;
      vertical-align: middle;
      box-sizing: border-box;
      .seamless-warp2{
        overflow: hidden;;
        height: 40px;
        width: 100%;
        line-height: 40px;
      }
      .item{
        width: 2rem;
        li{
          float: left;
          margin-right: 2px;
          font-size: .4rem;
        }
      }
    }
  }

  @-moz-keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.1) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.1) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }

  @-o-keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.1) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.1) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }

  @-webkit-keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.1) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.1) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }

  @-ms-keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.1) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.1) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }

  @keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.1) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.1) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }
</style>
