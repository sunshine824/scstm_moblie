<template>
  <div class="vo-form clearfix">
    <p class="title">
      <span class="splt"></span>
      填写个人信息
    </p>
    <div class="form-con clearfix" v-if="isLogin">
      <div class="upload clearfix">
        <label class="lab"><span>*</span>照片：</label>
        <div class="img-box">
          <div class="img">
            <img :src="formValidate.img ? formValidate.img : defaultImg"/>
          </div>
          <input type="file" accept="image/jpeg,image/jpg,image/png" @change="upImg"/>
          <p class="btn-head">{{formValidate.img ? '修改头像' : '上传头像'}}</p>
          <p style="display: none;" :class="{err:imgerr}">请上传头像</p>
        </div>
        <p class="notice"><span>*</span> 请上传本人真实照片</p>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="form-box">
        <FormItem prop="name" label="姓名：">
          <Input size="large" v-model="formValidate.name" placeholder="请输入您的姓名"></Input>
        </FormItem>
        <FormItem label="性别：" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio size="large" label="1">男</Radio>
            <Radio size="large" label="2">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="出生年月：" prop="born">
          <DatePicker size="large" type="date" placeholder="请选择日期" v-model="formValidate.born"></DatePicker>
        </FormItem>
        <FormItem label="学历：" prop="degree">
          <Select size="large" v-model="formValidate.degree" placeholder="请选择您的学历">
            <Option value="4">大专</Option>
            <Option value="1">本科</Option>
            <Option value="2">硕士</Option>
            <Option value="3">博士</Option>
          </Select>
        </FormItem>
        <FormItem label="专业/特长" prop="specialty">
          <Input v-model="formValidate.specialty" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                 placeholder="请填写内容"></Input>
        </FormItem>
        <FormItem prop="card" label="身份证号码：">
          <Input size="large" v-model="formValidate.card" placeholder="请输入您的身份证号码"></Input>
        </FormItem>
        <FormItem prop="phone" label="联系电话：">
          <Input size="large" v-model="formValidate.phone" placeholder="请输入您的手机号"></Input>
        </FormItem>
        <FormItem prop="wx" label="微信号：">
          <Input size="large" v-model="formValidate.wx" placeholder="请输入您的微信号："></Input>
        </FormItem>
        <FormItem prop="unit" label="工作单位：">
          <Input size="large" v-model="formValidate.unit" placeholder="请填写工作单位："></Input>
        </FormItem>
        <FormItem label="志愿者服务经历：" prop="experience">
          <Input v-model="formValidate.experience" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                 placeholder="请填写经历"></Input>
        </FormItem>
        <p class="sumbitBtn" @click="handleSubmit('formValidate')">提交申请表</p>
      </Form>
    </div>
    <no-data v-if="!isLogin" title="请先登录"></no-data>
  </div>
</template>
<script type="text/ecmascript-6">
  import noData from '@/base/no-data'
  import moment from 'moment'

  export default {
    props: {
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    components: {
      noData
    },
    data() {
      return {
        defaultImg: '../static/images/loading.png',
        imgerr: false,
        formValidate: {
          img: '',
          name: '',
          gender: '',
          born: '',
          degree: '',
          specialty: '',
          card: '',
          phone: '',
          wx: '',
          experience: '',
          unit: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          born: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
          ],
          degree: [
            {required: true, message: '请选择您的学历', trigger: 'change'}
          ],
          specialty: [
            {required: true, message: '请填写内容', trigger: 'blur'}
          ],
          card: [
            {required: true, message: '请填写您的身份证号码', trigger: 'blur'},
            {
              required: true,
              pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              message: '请填写有效身份证号'
            }
          ],
          phone: [
            {required: true, message: '请填写您的手机号', trigger: 'blur'},
            {required: true, message: '请填写正确手机号', pattern: /^1[0-9]{10}$/}
          ],
          wx: [
            {required: true, message: '请填写您的微信号', trigger: 'blur'}
          ],
          experience: [
            {required: true, message: '请填写您的经历', trigger: 'blur'}
          ],
          unit: [
            {required: true, message: '请填写工作单位', trigger: 'blur'}
          ],
        }
      }
    },
    created(){
      window.scroll(0,0)
    },
    methods: {
      upImg(e) {
        var _this = this
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          var dataURL = reader.result
          _this.formValidate.img = dataURL
          _this.imgerr = false
        }
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (!this.formValidate.img) {
            this.imgerr = true
            return
          }
          if (valid) {
            this.formValidate.born = moment(this.formValidate.born).format('X')
            this.$emit('next', this.formValidate)
            this.formValidate.born = ''
          }
        })
      },
    }
  }
</script>
<style lang="less">
  .vo-form {
    .title {
      padding-top: .4rem;
      padding-bottom: .4rem;
      padding-left: .3rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      flex-direction: row;
      font-size: .48rem;
      color: #333;
      .splt {
        width: 3px;
        height: .7rem;
        background-image: linear-gradient(90deg,
        #00b3f7 0%,
        #00b2f7 0%,
        #00b1f6 0%,
        #079fe1 100%),
        linear-gradient(
          #228aff,
          #228aff);
        background-blend-mode: normal,
        normal;
        border-radius: 2px;
        margin-right: .2rem;
      }
    }
    .form-con {
      width: 100%;
      margin: auto;
      margin-top: .4rem;
      .lab {
        width: 2.5rem;
        float: left;
        margin-top: 5px;
        font-size: .42rem;
        color: #333;
        text-align: right;
        margin-right: .2rem;
        span {
          color: #ed3f14;
          padding-right: 5px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .upload {
        margin-bottom: 30px;
        .img-box {
          border: 1px solid #dddee1;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          float: left;
          width: 4rem;
          height: 5.5rem;
          position: relative;
          .img {
            width: 100%;
            height: 4.65rem;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          input {
            position: absolute;
            width: 100%;
            height: .8rem;
            bottom: 0;
            opacity: 0;
            z-index: 4;
          }
          .btn-head {
            width: 100%;
            position: absolute;
            height: .8rem;
            background: rgba(0, 0, 0, 0.6);
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            font-size: .4rem;
            color: #fff;
            line-height: .8rem;
            bottom: 0;
            z-index: 2;
            text-align: center;
          }
          .err {
            position: absolute;
            color: #ed3f14;
            font-size: 14px;
            display: block !important;
            bottom: -.6rem;
          }
        }
        .notice {
          font-size: .38rem;
          text-align: center;
          margin-top: .4rem;
          span {
            color: #ff1010;
            margin-top: 10px;
            margin-left: 10px;
          }
        }
      }

      .form-box {
        width: 100%;
        .ivu-form-item {
          width: 100%;
          display: flex;
          display: -webkit-flex;
          flex-flow: row nowrap;
          align-items: center;
          margin-bottom: 30px;
          .ivu-form-item-label {
            width: 2.5rem;
            font-size: .42rem;
            color: #333;
            text-align: right;
            margin-right: .2rem;
            padding: 0;
            line-height: .6rem;
          }
          .ivu-form-item-content {
            float: left;
            flex: 1;
            .ivu-form-item-error-tip {
              font-size: 14px;
            }
            .other {
              border-bottom: 1px solid #999;
            }
            .start-date, .end-date {
              float: left;
              width: 45%;
              .ivu-form-item-content {
                width: 100%;
              }
            }
            .txt {
              width: 10%;
              float: left;
              font-size: 16px;
              color: #333;
              text-align: center;
            }
            .ivu-date-picker {
              width: 100%;
            }
          }
        }
        .sumbitBtn {
          cursor: pointer;
          display: table;
          margin: auto;
          padding: .2rem .4rem;
          font-size: .42rem;
          color: #fff;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          background-image: linear-gradient(90deg,
          #00b1f6 0%,
          #21bef8 0%,
          #41cbfa 0%,
          #21cefb 0%,
          #00d0fb 0%,
          #00acf6 100%),
          linear-gradient(
            #ffffff,
            #ffffff);
          margin-top: 1rem;
          overflow: hidden;
        }
      }
    }
  }
</style>
