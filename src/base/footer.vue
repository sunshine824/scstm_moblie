<template>
  <div class="footer-con">
    <!--底部导航-->
    <ul class="guide-box">
      <li style="background: url('../static/images/bg1.jpg') no-repeat">
        <router-link to="/strategy">交通攻略</router-link>
      </li>
      <li style="background: url('../static/images/bg2.jpg') no-repeat">
        <router-link to="/coupe_volunteer">志愿者招募</router-link>
      </li>
      <li style="background: url('../static/images/bg3.jpg') no-repeat">
        <router-link to="/survey">关于科技馆</router-link>
      </li>
    </ul>
    <div class="footer">
      <div class="footer-con">
        <div class="contact">
          <div class="contact-phone">
            <p>
              服务热线：
              <span>{{footer.end_phone.phone_service}}</span>
            </p>
            <p>
              团队预约：
              <span>{{footer.end_phone.phone_team}}</span>
            </p>
            <p>
              美科新咨询电话：
              <span>{{footer.end_phone.phone_consulting}}</span>
            </p>
            <p>
              投诉热线：
              <span>{{footer.end_phone.phone_complaints}}</span>
            </p>
          </div>
          <div class="ewm">
            <img :src="footer.wx"/>
            <p class="ewm-txt">关注公众号</p>
          </div>
        </div>
        <ul class="tolink">
          <router-link
            tag="li"
            :to="item.href"
            v-for="(item,index) in links"
            :key="index">
            {{item.title}}
          </router-link>
        </ul>
        <div class="count">
          <p>浏览人数</p>
          <span v-for="(item,index) in counts" :key="index">
        {{item}}
      </span>
        </div>
      </div>
      <div class="copyright">
        蜀ICP备：060202226号&nbsp;&nbsp;&nbsp;&nbsp;技术支持：<a style="color: #fff" href="http://www.pthola.cn/" target="_blank">成都匹体科技有限公司</a>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      footer: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        links: [
          {
            title: '服务协议',
            href: '/'
          },
          {
            title: '游客服务',
            href: '/'
          },
          {
            title: '新闻公告',
            href: '/notice'
          },
          {
            title: '反馈建议',
            href: '/'
          }
        ],
      }
    },
    computed: {
      /**
       * 浏览人数
       * @returns {Array}
       */
      counts() {
        const numArr = []
        const num = this.footer.number.toString()
        for (let i = 0; i < num.length; i++) {
          numArr.push(num.substr(i, 1))
        }
        return numArr
      }
    },
  }
</script>
<style lang="less" scoped>
  .footer-con {
    background: #f8f8f8;
    .guide-box {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding: 0 .3rem .4rem .3rem;
      li {
        width: 31.5%;
        height: 1.7rem;
        line-height: 1.7rem;
        text-align: center;
        background: #2d2d2d;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        background-size: cover !important;
        a {
          color: #fff;
          font-size: .48rem;
        }
      }
    }
  }

  .footer {
    .footer-con {
      background: #2b3341;
      padding: .5rem .3rem;
      .contact {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        .contact-phone {
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          p {
            font-size: .42rem;
            color: #fff;
            margin-bottom: .2rem;
            span {
              color: #5f7483;
            }
          }
        }
        .ewm {
          width: 2.3rem;
          img {
            width: 100%;
          }
          .ewm-txt {
            text-align: center;
            color: #5f7483;
            font-size: .4rem;
            margin-top: .1rem;
          }
        }
      }
      .tolink {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        border-bottom: 1px solid #404754;
        li {
          color: #5f7483;
          font-size: .42rem;
          padding-top: 1rem;
          padding-bottom: .6rem;
        }
      }
      .count {
        text-align: center;
        font-size: .4rem;
        padding-top: .4rem;
        p {
          display: inline-block;
          margin-right: 10px;
          color: #5f7483;
        }
        span {
          font-size: .36rem;
          width: 25px;
          height: 25px;
          display: inline-block;
          text-align: center;
          line-height: 25px;
          background-color: #3f475a;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          margin-right: 5px;
          color: #fff;
        }
      }
    }
    .copyright {
      width: 100%;
      text-align: center;
      height: .8rem;
      line-height: .8rem;
      background: #151c29;
      color: #fff;
      font-size: .3rem;
    }
  }
</style>
