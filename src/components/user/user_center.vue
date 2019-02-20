<template>
  <slot-con>
    <div class="user">
      <div class="top-head">
        <div class="user-head">
          <p class="headImg">
            <img :src="userInfo.img"/>
          </p>
          <p class="user-phone">{{userInfo.phone}}</p>
        </div>
      </div>
      <ul class="user-list">
        <li>
          <router-link to="/setting">
            <p class="l">
              <Icon type="ios-gear-outline" class="icon"></Icon>
              <span>个人设置</span>
            </p>
            <p class="r">
              <Icon type="ios-arrow-right" class="icon"></Icon>
            </p>
          </router-link>
        </li>
        <li>
          <router-link to="/manage">
            <p class="l">
              <Icon type="ios-people-outline" class="icon"></Icon>
              <span>账号管理</span>
            </p>
            <p class="r">
              <Icon type="ios-arrow-right" class="icon"></Icon>
            </p>
          </router-link>
        </li>
        <li>
          <router-link to="/mybook">
            <p class="l">
              <Icon type="ios-clock-outline" class="icon"></Icon>
              <span>我的预约</span>
            </p>
            <p class="r">
              <Icon type="ios-arrow-right" class="icon"></Icon>
            </p>
          </router-link>
        </li>
      </ul>
      <p class="layout" @click="_layOut()">退出登录</p>
    </div>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import {getUserInfo, layout} from '@/public/js/fetch'
  import {Icon} from 'iview'

  export default {
    components: {
      slotCon,
      Icon
    },
    data() {
      return {
        userInfo: ''
      }
    },
    created() {
      this._getUserInfo()
    },
    methods: {
      _getUserInfo() {
        const result = getUserInfo()
        result.then(res => {
          this.userInfo = res.data
        }).catch(err => {
          if (err.response.status === 401) {
            this.$router.push('/signIn')
          }
        })
      },
      _layOut() {
        const result = layout()
        result.then(res => {
          this.$cookie.delete('token')
          this.$cookie.delete('phone')
          this.$router.push('/')
        }).catch(err => {
          this.$cookie.delete('token')
          this.$router.push('/')
        })
      }
    }
  }
</script>
<style lang="less">
  .user {
    padding: .3rem;
    .top-head {
      width: 100%;
      height: 4.8rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      overflow: hidden;
      border: 1px solid #e5e5e5;
      .user-head {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: center;
        .headImg {
          width: 2.8rem;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .user-phone {
          font-size: .45rem;
          color: #333;
          margin-top: .2rem;
        }
      }
    }
    .user-list {
      margin-top: .3rem;
      li {
        background: #fff;
        padding: .25rem .3rem;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        font-size: .4rem;
        border: 1px solid #e5e5e5;
        overflow: hidden;
        margin-bottom: .3rem;
        a {
          text-decoration: none;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          align-items: center;
          color: #333;
          .l {
            display: flex;
            display: -webkit-flex;
            flex-direction: row;
            align-items: center;
            .icon {
              font-size: .65rem;
              margin-right: .4rem;
            }
            span {
              font-size: .4rem;
            }
          }
          .r {
            .icon {
              font-size: .6rem;
            }
          }
        }
      }
    }
    .layout {
      font-size: .43rem;
      padding: .3rem .3rem;
      background: #fff;
      border: 1px solid #e5e5e5;
      overflow: hidden;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      width: 100%;
      text-align: center;
      margin-top: .5rem;
    }
  }
</style>
