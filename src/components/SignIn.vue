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
      <input type="password"
             v-model="password.value"
             name="password"
             autocomplete="new-password"
             @input="verifyPasswd()"
             placeholder="请输入密码"/>
      <img src="../assets/pass2.png"/>
      <label class="error"
             :class="password.error ? 'is-visible' : ''">
        {{password.error}}
      </label>
    </div>
    <div class="form-group">
      <button type="button" class="input-btn" :class="{active:isSubmit}" @click="handleSubmit()">登录</button>
    </div>
    <div class="other">
      <p>没有账户&nbsp;&nbsp;
        <router-link to="/signUp">立即注册</router-link>
      </p>
      <router-link to="forget">忘记密码？</router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {signIn} from '@/public/js/fetch'

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
        this.isSubmit = this.password.isVerify && this.phone.isVerify
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
        this.isSubmit = this.password.isVerify && this.phone.isVerify
      },
      /**
       * 触发验证
       */
      handleForm() {
        this.verifyPhone()
        this.verifyPasswd()
      },
      /**
       * 提交表单数据
       */
      handleSubmit() {
        this.handleForm()
        if (
          this.phone.isVerify && this.password.isVerify
        ) {
          this.handleFormAjax()
        }
      },
      /**
       * 提交数据
       */
      handleFormAjax() {
        const result = signIn(
          this.phone.value,
          this.password.value
        )

        result.then(res => {
          if (res.status === 0) {
            this.$cookie.set('token',res.data)
            this.$cookie.set('phone',this.phone.value)
            if(this.$route.query.callback){
              this.$router.push({
                path:this.$route.query.callback
              })
            }else {
              this.$router.push('/user_center')
            }
          } else {
            const obj = res.interpret
            this[Object.keys(obj)[0]].error = res.interpret[Object.keys(obj)[0]]
          }
        }).catch(err => {
          console.log(err.response)
        })
      },
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
    }
    .other {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
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
