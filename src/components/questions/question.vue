<template>
  <slot-con>
    <div class="question">
      <tab-bar :data="tabBar" :index="1"></tab-bar>
      <div class="form-box" v-if="isLogin">
        <Select size="large" v-model="type_id">
          <Option
            v-for="(item,index) in typeList"
            :key="index"
            v-model="item.id">
            {{item.type}}
          </Option>
        </Select>
        <div class="form-group">
          <textarea v-model="content.value" placeholder="填写内容：" @input="verifyTextarea()" rows="5" cols="15"></textarea>
          <label class="error"
                 :class="content.error ? 'is-visible' : ''">
            {{content.error}}
          </label>
        </div>
        <div class="form-group clearfix">
          <div class="form_item">
            <input placeholder="验证码" type="text" v-model="imgCode.value" @input="verifyCode()" name="code"
                   class="code-input"/>
            <label class="error"
                   :class="imgCode.error ? 'is-visible' : ''">
              {{imgCode.error}}
            </label>
          </div>
          <div class="code-img">
            <img :src="imgCaptcha" @click="getImgCode()"/>
          </div>
        </div>
        <div class="form-group" style="margin-top: .4rem">
          <p class="input-btn" @click="handleSubmit()">提交</p>
        </div>
      </div>
      <no-data title="请先登录" v-if="!isLogin"></no-data>
    </div>
    <m-footer :footer="footer ? footer : {}"></m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import TabBar from '@/base/tabBar'
  import {submitMessage, messageCode, messageType, getUserInfo} from '@/public/js/fetch'
  import noData from '@/base/no-data'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      mFooter,
      TabBar,
      noData
    },
    data() {
      return {
        tabBar: [
          {title: '问答列表', to: '/answer'},
          {title: '我要提问', to: '/question'}
        ],
        typeList: '',
        type_id: 1,
        content: {
          value: '',
          error: '',
          isVerify: false
        }, //文本框内容
        imgCode: {
          value: '',
          error: '',
          isVerify: false
        },
        imgCaptcha: messageCode(this.$cookie.get('phone')),
        isLogin: false,
      }
    },
    created() {
      this._messageType()
      this._getUserInfo()
      this.token()
    },
    methods: {
      token() {
        if (this.$cookie.get('token')) {
          this.isLogin = true
        }
      },
      _getUserInfo() {
        const result = getUserInfo()
        result.then(res => {
          this.isLogin = true
        }).catch(err => {
          if (err.response.status === 401) {
            this.isLogin = false
          }
        })
      },
      getImgCode() {
        this.imgCaptcha = messageCode(this.$cookie.get('phone'))
      },
      /**
       * 提交表单数据
       */
      handleSubmit() {
        this.verifyCode()
        this.verifyTextarea()
        if (
          this.content.isVerify && this.imgCode.isVerify
        ) {
          this._submitMessage()
        }
      },
      _submitMessage() {
        const result = submitMessage(
          this.imgCode.value,
          this.content.value,
          this.type_id
        )
        result.then(res => {
          if (res.status === 0) {
            this.imgCode.value = ''
            this.content.value = ''
            this.getImgCode()
            this.$Message.success({
              top: 100,
              content: '您的信息提交成功！',
              duration: 4
            })
          } else {
            this.imgCode.error = res.interpret.code
          }
        }).catch(err => {
          console.log(err.response)
        })
      },
      _messageType() {
        const result = messageType()
        result.then(res => {
          this.typeList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 验证文本输入框
       */
      verifyTextarea() {
        if (this.content.value === null || this.content.value === '' || this.content.value === undefined) {
          this.content.error = '请输入文本内容'
          this.content.isVerify = false
        } else {
          this.content.error = ''
          this.content.isVerify = true
        }
      },
      /**
       * 验证图片验证码
       */
      verifyCode() {
        if (this.imgCode.value === null || this.imgCode.value === '' || this.imgCode.value === undefined) {
          this.imgCode.error = '请填写图片验证码'
          this.imgCode.isVerify = false
        } else {
          this.imgCode.error = ''
          this.imgCode.isVerify = true
        }
      },
    }
  }
</script>
<style lang="less">
  .question {
    padding: .3rem .3rem .5rem .3rem;
    .m-type {
      li {
        width: 47%;
      }
    }
    .form-box {
      margin-top: .3rem;
      .form-group {
        position: relative;
        width: 100%;
        margin-top: .3rem;
        textarea {
          border: 1px solid #dddee1;
          outline: 0;
          width: 100%;
          color: #495060;
          border-radius: 4px;
          padding: .2rem 8px;
          font-size: 14px;
          &:focus {
            border-color: #57a3f3;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
            -webkit-transition: all .3s ease-in-out;
            transition: all .3s ease-in-out;
          }
        }
        .form_item {
          float: left;
          width: 60%;
          position: relative;
          input {
            -webkit-transition: all .3s ease-in-out;
            transition: all .3s ease-in-out;
            background: #fff;
            box-shadow: none;
            color: #495060;
            font-size: 14px;
            width: 100%;
            padding: .2rem 8px;
            border: 1px solid #dddee1;
            border-radius: 4px;
            height: 38px;
            &:focus {
              border-color: #57a3f3;
              outline: 0;
              box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
              -webkit-transition: all .3s ease-in-out;
              transition: all .3s ease-in-out;
            }
          }
        }
        .code-img {
          float: right;
          height: 38px;
          border-radius: 4px;
          overflow: hidden;
          img {
            height: 100%;
          }
        }

        label.error.is-visible {
          visibility: visible;
          opacity: 1;
          right: 0;
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
          border-radius: 2px;
          margin-top: .3rem;
          letter-spacing: 3px;
          background: rgb(52, 152, 233);
          color: #fff;
        }
      }
    }
  }
</style>
