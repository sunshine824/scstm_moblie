<template>
  <slot-con>
    <back title="个人设置"></back>
    <div class="setting">
      <div class="notice-msg">
        <span class="required">*</span>
        <p>请科友完成个人信息，方便参与丰富多彩的活动</p>
      </div>
      <div class="form-box">
        <div class="form-group">
          <input type="text"
                 name="phone"
                 v-model="nickname"
                 placeholder="请输入用户昵称"/>
          <span class="txt">用户昵称：</span>
        </div>
        <div class="form-group">
          <input type="text"
                 name="phone"
                 @input="verifyName"
                 v-model="name.value"
                 :style="{borderBottom:name.error ? '1px solid #ed3f14' : ''}"
                 placeholder="请输入真实姓名"/>
          <span class="txt">真实姓名：</span>
          <span class="required">*</span>
          <label class="error"
                 :class="name.error ? 'is-visible' : ''">
            {{name.error}}
          </label>
        </div>
        <div class="form-group">
          <input type="text"
                 name="phone"
                 @input="verifyEmail"
                 v-model="email.value"
                 :style="{borderBottom:email.error ? '1px solid #ed3f14' : ''}"
                 placeholder="如：xxxx@qq.com"/>
          <span class="txt">联系邮箱：</span>
          <label class="error"
                 :class="email.error ? 'is-visible' : ''">
            {{email.error}}
          </label>
        </div>
        <div class="form-group">
          <input type="text"
                 name="phone"
                 v-model="school"
                 placeholder="请输入学校"/>
          <span class="txt">毕业学校：</span>
        </div>
        <div class="form-group">
          <input type="text"
                 name="phone"
                 v-model="born"
                 placeholder="如：2018/02/09"/>
          <span class="txt">出生日期：</span>
        </div>
        <div class="form-group">
          <input type="text"
                 name="phone"
                 @input="verifyCard"
                 v-model="card.value"
                 :style="{borderBottom:card.error ? '1px solid #ed3f14' : ''}"
                 placeholder="请输入身份证号"/>
          <span class="txt">身份证号：</span>
          <span class="required">*</span>
          <label class="error"
                 :class="card.error ? 'is-visible' : ''">
            {{card.error}}
          </label>
        </div>
      </div>
      <p class="notice">
        重要提示：请认真正确填写您的身份证号码，这将影响您的取票和预约
      </p>
      <p class="submit" @click="_editUserInfo()">{{load ? '加载中...' : '确认'}}</p>
    </div>
    <dialog-con ref="dialog" :options="options" @confirm="confirm"></dialog-con>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import Back from '@/base/back'
  import {Icon} from 'iview'
  import {getUserInfo, editUserInfo} from '@/public/js/fetch'
  import DialogCon from '@/base/dialog_con'

  export default {
    components: {
      slotCon,
      Icon,
      Back,
      DialogCon
    },
    data() {
      return {
        nickname: '',
        name: {
          value: '',
          error: '',
          isVerify: false
        },
        email: {
          value: '',
          error: '',
          isVerify: true
        },
        school: '',
        born: '',
        card: {
          value: '',
          error: '',
          isVerify: false
        },
        img: '',
        load: false,
        options: {}
      }
    },
    created() {
      this._getUserInfo()
    },
    methods: {
      back() {
        this.$router.back()
      },
      /**
       * 验证邮箱
       */
      verifyEmail() {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        if (this.email.value === '') {
          this.email.error = ''
          this.email.isVerify = true
        } else if (!reg.test(this.email.value)) {
          this.email.error = '请输入正确的邮箱格式'
          this.email.isVerify = false
        } else {
          this.email.error = ''
          this.email.isVerify = true
        }
      },
      /**
       * 验证姓名
       */
      verifyName() {
        if (this.name.value === '') {
          this.name.error = '请输入真实姓名'
          this.name.isVerify = false
        } else {
          this.name.error = ''
          this.name.isVerify = true
        }
      },
      /**
       * 验证身份证
       */
      verifyCard() {
        const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
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
      },
      isRequiredAll() {
        this.verifyName()
        this.verifyCard()
      },
      _getUserInfo() {
        const result = getUserInfo()
        result.then(res => {
          if ((!res.data.name || !res.data.card) && !this.$route.query.callback) {
            this.options = {
              title: '温馨提示',
              content: '请完善用户信息',
              showClose: false,
              icon: 'information-circled'
            }
            this.$refs.dialog.show()
          }
          this.born = res.data.born
          this.card.value = res.data.card
          this.email.value = res.data.email
          this.img = res.data.img
          this.name.value = res.data.name
          this.nickname = res.data.nickname
          this.school = res.data.school
        }).catch(err => {
          if (err.response.status === 401) {
            this.$router.push('/signIn')
          }
        })
      },
      _editUserInfo() {
        this.isRequiredAll()
        if ((this.email.value && !this.email.isVerify)) return
        if (this.name.isVerify && this.card.isVerify) {
          this.load = true
          const result = editUserInfo(
            this.name.value,
            this.nickname,
            this.email.value,
            this.school,
            this.born,
            this.card.value
          )
          result.then(res => {
            this.load = false
            if (this.$route.query.callback) {
              this.$router.push({
                path: this.$route.query.callback
              })
            }
          }).catch(err => {
            console.log(err.response)
          })
        }
      },
      confirm() {
        this.$refs.dialog.hide()
      }
    }
  }
</script>
<style lang="less">
  .setting {
    padding: .3rem .3rem .5rem .3rem;
    .notice-msg{
      display: flex;
      display: -webkit-flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: center;
      span{
        font-size: .4rem;
        color: #ed3f14;
      }
      p{
        font-size: .4rem;
        margin-left: 5px;
      }
    }
    .title {
      padding-top: .4rem;
      padding-bottom: .4rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      flex-direction: row;
      font-size: .42rem;
      color: #666;
      .icon {
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
        .required {
          position: absolute;
          top: .23rem;
          left: 0;
          font-size: .4rem;
          color: #ed3f14;
        }
        input {
          border-bottom: 1px solid #e5e5e5;
          -webkit-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out;
          background: #fff;
          box-shadow: none;
          color: #333;
          font-size: .4rem;
          width: 100%;
          padding: .2rem .4rem .2rem 2.6rem;
          text-align: right;
          &:focus {
            border-bottom: 1px solid #22A0DD;
            -webkit-transition: all .3s ease-in-out;
            transition: all .3s ease-in-out;
          }
        }
        & > .txt {
          position: absolute;
          top: .22rem;
          left: 11px;
          width: 2.5rem;
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
          top: -11px;
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
    .notice {
      font-size: .35rem;
      color: #666;
      padding: .3rem;
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
