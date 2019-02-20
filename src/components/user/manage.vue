<template>
  <slot-con>
    <back title="账号管理"></back>
    <div class="manage">
      <div class="form-box">
        <div class="form-group">
          <input type="password"
                 name="phone"
                 v-model="password1.value"
                 @input="verifyOldPass"
                 placeholder="请输入旧密码"/>
          <span class="txt">旧密码：</span>
          <label class="error"
                 :class="password1.error ? 'is-visible' : ''">
            {{password1.error}}
          </label>
        </div>
        <div class="form-group">
          <input type="password"
                 name="phone"
                 @input="verifyNewPass"
                 v-model="password2.value"
                 placeholder="请输入新密码"/>
          <span class="txt">新密码：</span>
          <label class="error"
                 :class="password2.error ? 'is-visible' : ''">
            {{password2.error}}
          </label>
        </div>
        <div class="form-group">
          <input type="password"
                 name="phone"
                 @input="verifyPasswdCheck"
                 v-model="passwdCheck.value"
                 placeholder="请确认密码"/>
          <span class="txt">确认密码：</span>
          <label class="error"
                 :class="passwdCheck.error ? 'is-visible' : ''">
            {{passwdCheck.error}}
          </label>
        </div>
      </div>
      <p class="submit" @click="_editPasswd()">{{load ? '加载中...' : '确认'}}</p>
    </div>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import {editPasswd} from '@/public/js/fetch'
  import {Icon} from 'iview'
  import Back from '@/base/back'

  export default {
    components: {
      slotCon,
      Icon,
      Back
    },
    data() {
      return {
        load: false,
        password1: {
          value: '',
          error: '',
          isVerify: false
        },
        password2: {
          value: '',
          error: '',
          isVerify: false
        },
        passwdCheck: {
          value: '',
          error: '',
          isVerify: false
        },
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      /**
       * 确认密码验证
       */
      verifyPasswdCheck() {
        if (this.passwdCheck.value === '') {
          this.passwdCheck.error = '请确认密码'
          this.passwdCheck.isVerify = false
        } else if (this.password2.value !== this.passwdCheck.value) {
          this.passwdCheck.error = '两次密码不一致'
          this.passwdCheck.isVerify = false
        } else {
          this.passwdCheck.error = ''
          this.passwdCheck.isVerify = true
        }
      },
      /**
       * 旧密码不能为空
       */
      verifyOldPass() {
        if (this.password1.value === '') {
          this.password1.error = '请输入旧密码'
          this.password1.isVerify = false
        } else {
          this.password1.error = ''
          this.password1.isVerify = true
        }
      },
      /**
       * 新密码不能为空
       */
      verifyNewPass() {
        if (this.password2.value === '') {
          this.password2.error = '请输入新密码'
          this.password2.isVerify = false
        } else if (this.password2.value.length < 6) {
          this.password2.error = '至少6位密码'
          this.password2.isVerify = false
        }  else {
          this.password2.error = ''
          this.password2.isVerify = true
        }
      },
      /**
       * 提交数据
       * @private
       */
      _editPasswd() {
        this.verifyOldPass()
        this.verifyNewPass()
        this.verifyPasswdCheck()

        if (!this.password1.isVerify || !this.password2.isVerify || !this.passwdCheck.isVerify) {
          return
        }
        this.load = true

        const result = editPasswd(
          this.password1.value,
          this.password2.value,
        )
        result.then(res => {
          if (res.status === 2) {
            const obj = res.interpret
            this[Object.keys(obj)[0]].error = res.interpret[Object.keys(obj)[0]]
          } else {
            this.$cookie.delete('token')
            this.$router.push('/signIn')
          }
          this.load = false
        }).catch(err => {
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less">
  .manage {
    padding: .3rem;
    .title {
      padding-top: .4rem;
      padding-bottom: .4rem;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      font-size: .42rem;
      color: #666;
      align-items: center;
      .icon{
        font-size: .7rem;
        margin-right: .3rem;
      }
    }
    .form-box {
      background: #fff;
      padding: .3rem;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      overflow: hidden;
      margin-top: .3rem;
      .form-group {
        position: relative;
        margin-bottom: .5rem;
        width: 100%;
        input {
          border-bottom: 1px solid #e5e5e5;
          -webkit-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out;
          background: #fff;
          box-shadow: none;
          color: #666;
          font-size: .4rem;
          width: 100%;
          padding: .2rem .4rem .2rem 2.6rem;
          text-align: left;
          &:focus {
            border-bottom: 1px solid #22A0DD;
            -webkit-transition: all .3s ease-in-out;
            transition: all .3s ease-in-out;
          }
        }
        & > .txt {
          position: absolute;
          top: .22rem;
          left: 3px;
          width: 2.2rem;
          font-size: .4rem;
        }
        label.error.is-visible {
          visibility: visible;
          opacity: 1;
          right: 6px;
          -ms-filter: "alpha(Opacity=100)";
          -webkit-transform: translate(0, 0);
          -ms-transform: translate(0, 0);
          transform: translate(0, 0);
          -webkit-transition: .3s ease-out;
          transition: .3s ease-out;
        }
        label.error {
          position: absolute;
          top: 11px;
          right: -60px;
          padding: 0 8px;
          opacity: 0;
          color: #c33;
          cursor: text;
          -webkit-transform: translate(20px, 0);
          -ms-transform: translate(20px, 0);
          transform: translate(20px, 0);
          -webkit-transition: .25s ease-out;
          transition: .25s ease-out;
        }
        .input-btn {
          width: 100%;
          height: 1rem;
          text-align: center;
          line-height: 1rem;
          font-size: .4rem;
          color: #bfbfbf;
          background-color: #e5e5e5;
          border-radius: 2px;
          margin-top: .3rem;
          letter-spacing: 3px;
          &.active {
            background: rgb(52, 152, 233);
            color: #fff;
          }
        }
        &:last-child {
          margin-bottom: .2rem;
        }
      }
    }
    .submit {
      width: 100%;
      padding: .25rem;
      font-size: .42rem;
      text-align: center;
      margin-top: .6rem;
      background-image: linear-gradient(135deg, #00d0fb, #00acf6);
      color: #fff;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      overflow: hidden;
    }
  }
</style>
