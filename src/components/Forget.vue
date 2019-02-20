<template>
  <div class="sign">
    <div class="form-group">
      <input type="text"
             v-model="phone.value"
             name="phone"
             @input="verifyPhone()"
             placeholder="请输入手机号"/>
      <img src="../assets/user2.png"/>
      <label class="error"
             :class="phone.error ? 'is-visible' : ''">
        {{phone.error}}
      </label>
    </div>
    <div class="form-group">
      <input type="text"
             v-model="password.value"
             name="password"
             @input="verifyPasswd()"
             autocomplete="new-password"
             placeholder="请输入密码"/>
      <img src="../assets/pass2.png"/>
      <label class="error"
             :class="password.error ? 'is-visible' : ''">
        {{password.error}}
      </label>
    </div>
    <div class="form-group">
      <input type="password"
             v-model="passwdCheck.value"
             placeholder="确认密码"
             class="passwdCheck"
             @input="verifyPasswdCheck()"
             name="passwdCheck"
             autocomplete="new-password"/>
      <img src="../assets/pass2.png"/>
      <label class="error"
             :class="passwdCheck.error ? 'is-visible' : ''">
        {{passwdCheck.error}}
      </label>
    </div>
    <div class="form-group">
      <input type="text"
             v-model="card.value"
             placeholder="请输入身份证号"
             class="card"
             @input="verifyCard()"
             name="card"
             autocomplete="new-password"/>
      <img src="../assets/card.png"/>
      <label class="error"
             :class="card.error ? 'is-visible' : ''">
        {{card.error}}
      </label>
    </div>
    <div class="form-group clearfix">
      <div class="lyz-left">
        <input type="text"
               placeholder="图片验证码"
               maxlength="4"
               class="captcha"
               @input="verifyImgCode()"
               v-model="imgCode.value"
               autocomplete="new-password"/>
        <label class="error"
               :class="imgCode.error ? 'is-visible' : ''">
          {{imgCode.error}}
        </label>
      </div>
      <div class="lyz-right" @click="_getImgCode()">
        <p v-if="!isShowImg" class="btn">获取图片验证码</p>
        <img v-if="isShowImg" :src="imgCaptcha"/>
      </div>
    </div>
    <div class="form-group clearfix">
      <div class="lyz-left">
        <input type="text"
               placeholder="手机验证码"
               class="tmsg"
               name="tmsg"
               @input="verifyPhoneCode()"
               v-model="phone_code.value"
               autocomplete="new-password"/>
        <label class="error"
               :class="phone_code.error ? 'is-visible' : ''">
          {{phone_code.error}}
        </label>
      </div>
      <div class="lyz-right">
        <p v-if="!isCount" class="btn" @click="sendPhoneCode()">发送验证码</p>
        <p v-if="isCount" class="btn disabled">{{count}} s</p>
      </div>
    </div>
    <div class="form-group">
      <button type="button" class="input-btn" :class="{active:isSubmit}" @click="handleSubmit()">确认</button>
    </div>
    <div class="other">
      <p>已有账户&nbsp;&nbsp;
        <router-link to="/signIn">立即登录</router-link>
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {forget, getImgCode, getPhoneCode} from '@/public/js/fetch'

  export default {
    data() {
      return {
        phone: {
          value: '',
          error: '',
          isVerify: false
        },
        password: {
          value: '',
          error: '',
          isVerify: false
        },
        passwdCheck: {
          value: '',
          error: '',
          isVerify: false
        },
        imgCode: {
          value: '',
          error: '',
          isVerify: false
        },
        phone_code: {
          value: '',
          error: '',
          isVerify: false
        },
        card: {
          value: '',
          error: '',
          isVerify: false
        },
        isShowImg: false,
        imgCaptcha: '',
        count: 120,
        isCount: false,
        isSubmit: false
      }
    },
    methods: {
      /**
       * 手机号验证
       */
      verifyPhone() {
        if (this.phone.value === null || this.phone.value === '' || this.phone.value === undefined) {
          this.phone.error = '请输入手机号'
          this.phone.isVerify = false
        } else if (!/^1[0-9]{10}$/.test(this.phone.value)) {
          this.phone.error = '请输入正确手机号'
          this.phone.isVerify = false
        } else {
          this.phone.error = ''
          this.phone.isVerify = true
        }
        this.isSubmit = this.phone.isVerify
          && this.password.isVerify
          && this.passwdCheck.isVerify
          && this.imgCode.isVerify
          && this.phone_code.isVerify
          && this.card.isVerify
      },
      /**
       * 密码验证
       */
      verifyPasswd() {
        if (this.password.value === null || this.password.value === '' || this.password.value === undefined) {
          this.password.error = '请输入密码'
          this.password.isVerify = false
        } else if (this.password.value.length < 6) {
          this.password.error = '至少6位密码'
          this.password.isVerify = false
        } else {
          this.password.error = ''
          this.password.isVerify = true
        }
        this.isSubmit = this.phone.isVerify
          && this.password.isVerify
          && this.passwdCheck.isVerify
          && this.imgCode.isVerify
          && this.phone_code.isVerify
          && this.card.isVerify
      },
      /**
       * 确认密码验证
       */
      verifyPasswdCheck() {
        if (this.passwdCheck.value === '') {
          this.passwdCheck.error = '请确认密码'
          this.passwdCheck.isVerify = false
        } else if (this.password.value !== this.passwdCheck.value) {
          this.passwdCheck.error = '两次密码不一致'
          this.passwdCheck.isVerify = false
        } else {
          this.passwdCheck.error = ''
          this.passwdCheck.isVerify = true
        }
        this.isSubmit = this.phone.isVerify
          && this.password.isVerify
          && this.passwdCheck.isVerify
          && this.imgCode.isVerify
          && this.phone_code.isVerify
          && this.card.isVerify
      },
      /**
       * 图片验证码验证
       */
      verifyImgCode() {
        if (this.imgCode.value === '') {
          this.imgCode.error = '请输入图片验证码'
          this.imgCode.isVerify = false
        } else {
          this.imgCode.error = ''
          this.imgCode.isVerify = true
        }
        this.isSubmit = this.phone.isVerify
          && this.password.isVerify
          && this.passwdCheck.isVerify
          && this.imgCode.isVerify
          && this.phone_code.isVerify
          && this.card.isVerify
      },
      /**
       * 身份证验证
       */
      verifyCard() {
        const reg = /(^[0-9]*$)/
        if (this.card.value === '') {
          this.card.error = '请输入身份证号'
          this.card.isVerify = false
        } else if (!reg.test(this.card.value)) {
          this.card.error = '请输入有效身份证号'
          this.card.isVerify = false
        } else {
          this.card.error = ''
          this.card.isVerify = true
        }
        this.isSubmit = this.phone.isVerify
          && this.password.isVerify
          && this.passwdCheck.isVerify
          && this.imgCode.isVerify
          && this.phone_code.isVerify
          && this.card.isVerify
      },
      /**
       * 手机验证码验证
       */
      verifyPhoneCode() {
        if (this.phone_code.value === '') {
          this.phone_code.error = '请输入手机验证码'
          this.phone_code.isVerify = false
        } else {
          this.phone_code.error = ''
          this.phone_code.isVerify = true
        }
        this.isSubmit = this.phone.isVerify
          && this.password.isVerify
          && this.passwdCheck.isVerify
          && this.imgCode.isVerify
          && this.phone_code.isVerify
          && this.card.isVerify
      },
      /**
       * 触发验证
       */
      handleForm() {
        this.verifyPhone()
        this.verifyPasswd()
        this.verifyPasswdCheck()
        this.verifyImgCode()
        this.verifyPhoneCode()
        this.verifyCard()
      },
      /**
       * 提交表单数据
       */
      handleSubmit() {
        this.handleForm()
        if (
          this.phone.isVerify && this.password.isVerify && this.passwdCheck.isVerify && this.imgCode.isVerify && this.phone_code.isVerify
        ) {
          this.handleFormAjax()
        }
      },
      /**
       * 提交数据
       */
      handleFormAjax() {
        const result = forget(
          this.phone_code.value,
          this.password.value,
          this.phone.value,
          this.card.value
        )

        result.then(res => {
          if (res.status === 0) {
            this.$router.push('/signIn')
          } else {
            const obj = res.interpret
            this[Object.keys(obj)[0]].error = res.interpret[Object.keys(obj)[0]]
          }
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 获取图片验证码
       */
      _getImgCode() {
        this.verifyPhone()
        if (this.phone.isVerify) {
          this.isShowImg = true
          this.imgCaptcha = getImgCode(this.phone.value)
        }
      },
      /**
       * 发送手机验证码
       */
      sendPhoneCode() {
        this.imgCodeAjax()
      },
      /**
       * 倒数
       */
      countDown() {
        if (this.isCount) {
          this.timer = setInterval(() => {
            var countNum = this.count
            countNum -= 1;
            if (countNum < 1) {
              this.isCount = false
              countNum = 120
              clearInterval(this.timer)
            }
            this.count = countNum
          }, 1000)
        }
      },
      /**
       * 验证图片验证码
       */
      imgCodeAjax() {
        const result = getPhoneCode(
          this.imgCode.value,
          this.phone.value
        )
        result.then(res => {
          if (res.status === 0) {
            this.isCount = true
            this.countDown()
          } else {
            this.imgCode.error = res.interpret
          }
        }).catch(err => {
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .sign {
    width: 8.5rem;
    margin: 0 auto;
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
        width: 8.5rem;
        padding: .2rem .4rem .2rem 1rem;
        &:focus {
          border-bottom: 1px solid #22A0DD;
          -webkit-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out;
        }
      }
      & > img {
        position: absolute;
        top: 3px;
        left: 3px;
        width: .8rem;
      }
      label.error.is-visible {
        visibility: visible;
        opacity: 1;
        right: -11px;
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
      .lyz-left {
        float: left;
        width: 58%;
        position: relative;
        input {
          width: 100%;
          padding: .2rem .4rem .2rem .2rem;
        }
      }
      .lyz-right {
        float: right;
        width: 38%;
        height: 1rem;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          height: 1rem;
          cursor: pointer;
        }
        .btn {
          background-color: #3c97ee;
          background-image: -webkit-gradient(linear, left top, right top, from(#00d0fb), to(#00acf6));
          background-image: linear-gradient(90deg, #00d0fb, #00acf6);
          color: #fff;
          font-size: 14px;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          &.disabled {
            background: gray;
          }
        }
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
          background-color: #3c97ee;
          background-image: -webkit-gradient(linear, left top, right top, from(#00d0fb), to(#00acf6));
          background-image: linear-gradient(90deg, #00d0fb, #00acf6);
          color: #fff;
        }
      }
    }
    .other {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #bfbfbf;
      margin-top: .3rem;
      a {
        color: #32a6df;
      }
    }
  }
</style>
