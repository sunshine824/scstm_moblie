<template>
  <div class="order-box">
    <div class="book-box" v-if="!token">
      <p class="sub-title">
        <span class="splt"></span>
        活动预约
      </p>
      <p class="s-tit">{{noticeTxt}}</p>
      <no-data title="请先登录"></no-data>
    </div>

    <div class="book-box" v-if="token && details.state===2">
      <p class="sub-title">
        <span class="splt"></span>
        活动预约
      </p>
      <p class="s-tit">{{noticeTxt}}</p>
      <no-data title="暂未开启在线预约"></no-data>
    </div>

    <div class="book-box" v-if="token && details.state===1">
      <p class="sub-title">
        <span class="splt"></span>
        活动预约
      </p>
      <p class="s-tit">{{noticeTxt}}</p>
      <div class="book">
        <div class="item-group">
          <label class="lab">日期选择：</label>
          <!--<DatePicker type="date"-->
          <!--:value="nowData"-->
          <!--placeholder="请选择查询日期"-->
          <!--@on-change="handleDate"-->
          <!--style="width: 5rem">-->
          <!--</DatePicker>-->
          <Select size="large" style="width: 5rem" @on-change="handleDate" placeholder="请选择场次日期">
            <Option v-for="(item,index) in dateList" v-if="index < 7"  :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="item-group">
          <label class="lab">选择场次：</label>
          <ul class="numbers">
            <li
              :class="{active:current===index}"
              :style="{cursor:item.is_stop==1?'pointer':'not-allowed'}"
              @click="item.is_stop===1 ? toggle(index,item.id) : ''"
              v-for="(item,index) in numbers"
              :key="index"
            >{{item.sess}}（{{item.determine}}/{{item.qualified}}）</li>
          </ul>
          <p class="no-session" v-if="!numbers.length">暂无场次</p>
        </div>
        <div class="item-group">
          <label class="lab">活动参与人（最多三位）：</label>
          <Form ref="formValidate" :model="formValidate">
            <div
              class="item"
              v-for="(item,index) in formValidate.items"
              v-if="item.status"
              :key="index"
            >
              <FormItem>
                <div class="form-group">
                  <FormItem
                    :prop="'items.' + index + '.name'"
                    label="参观姓名"
                    :rules="ruleValidate.name"
                  >
                    <Input size="large" v-model.trim="item.name" placeholder="请输入参观人姓名"/>
                  </FormItem>
                  <FormItem
                    :prop="'items.' + index + '.age'"
                    label="参观年龄"
                    :rules="ruleValidate.age"
                  >
                    <Input size="large" v-model.trim="item.age" placeholder="请输入参观人年龄"/>
                  </FormItem>
                  <FormItem
                    :prop="'items.' + index + '.card'"
                    label="身份证号"
                    :rules="ruleValidate.card"
                  >
                    <Input size="large" v-model.trim="item.card" placeholder="请输入参观人身份证号"/>
                  </FormItem>
                </div>
                <div class="icon-minus" @click="minusNumbers(index)">
                  <Icon v-if="index!==0" type="ios-minus"></Icon>
                </div>
              </FormItem>
            </div>
          </Form>
          <p class="add" @click="addNumbers()">
            <Icon type="ios-plus-empty"></Icon>
            活动参与人（￥{{details.money}} / 人）
          </p>
        </div>
        <div class="item-group" v-if="details.money !== '0.00'">
          <label class="lab">选择支付方式：</label>
          <ul class="pays clearfix">
            <li :class="payCurrent == 0 && 'active'" @click="togglePay(0,1)">
              <p class="pay">
                <img src="/static/images/wxchat.png">
                <span>微信支付</span>
              </p>
            </li>
            <li :class="payCurrent == 1 && 'active'" v-if="!is_wexin" @click="togglePay(1,2)">
              <p class="pay">
                <img src="/static/images/alipay.png">
                <span>支付宝支付</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="notice">
          <p>
            <span>*</span>
            1.请准确填写预约人年龄信息，并确认与该活动要求年龄
            是否符合
          </p>
          <p>
            <span>*</span>
            2.本活动将于活动开始前半小时停止预约
          </p>
        </div>
        <Button
          :loading="isDisable"
          class="book-btn"
          @click="handleSubmit('formValidate')"
          style="display: inline-block; vertical-align: middle"
        >立即预约</Button>
        <!--<p class="book-btn" @click="handleSubmit('formValidate')">立即预约</p>-->
      </div>
    </div>
    <dialog-con :options="options" ref="dialog" @confirm="confirm"></dialog-con>
  </div>
</template>

<script>
import NoData from "@/base/no-data";
import { is_wexin, mobile_mold } from "@/public/js/utils";
import * as Apis from "@/public/js/fetch";
import { Icon, DatePicker, Select, Button } from "iview";
import moment from "moment";
import DialogCon from "@/base/dialog_con";
import { homeUrl } from "@/public/js/config";

export default {
  name: "order-box",
  components: {
    NoData,
    Icon,
    DatePicker,
    DialogCon
  },
  props: {
    details: {
      type: Object,
      default: {}
    },
    typeVal: {
      default: 1
    },
    noticeTxt:{
      default:'除电影预约，预约活动场次前，请先确保已成功预定科技馆门票',
      type:String
    }
  },
  data() {
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入参观人年龄"));
      } else if (!/^[0-9]*$/.test(value)) {
        return callback(new Error("请输入1~200内的数字"));
      } else if (value > 200 || value <= 0) {
        return callback(new Error("请输入1~200内的数字"));
      } else {
        callback();
      }
    };
    return {
      inputIndex: 1,
      date: "",
      numbers: "", //场次
      current: -1,
      reser_id: "", //场次id
      token: "",
      dateList: [],
      payCurrent: -1,
      pay_channel: 0,
      nowData: moment().format("YYYY-MM-DD"),
      formValidate: {
        items: [
          {
            name: "",
            age: "",
            card: "",
            index: 1,
            status: 1
          }
        ]
      },
      ruleValidate: {
        name: [
          { required: true, message: "请输入参观人姓名", trigger: "blur" }
        ],
        age: [{ required: true, validator: validateAge, trigger: "blur" }],
        card: [
          { required: true, message: "请输入参观人身份证号", trigger: "blur" },
          {
            pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
            message: "请输入有效身份证号"
          }
        ]
      },
      options: {
        okText: "确认",
        cancelText: "取消",
        icon: "information-circled",
        title: "",
        content: "",
        showClose: true
      },
      pays: [
        {
          img: "/static/images/wxchat.png",
          title: "微信支付",
          tooltip: "微信支付",
          id: 1
        },
        {
          img: "/static/images/alipay.png",
          title: "支付宝支付",
          tooltip: "支付宝支付",
          id: 2
        }
      ],
      isDisable: false,
      is_wexin: is_wexin()
    };
  },
  created() {
    this._token();
    this.getOrderList();
  },
  methods: {
    _token() {
      this.token = this.$cookie.get("token");
    },
    toggle(index, id) {
      this.current = index;
      this.reser_id = id;
    },

    togglePay(index, id) {
      this.payCurrent = index;
      this.pay_channel = id;
    },
    /**
     * 日期
     * @param date
     */
    handleDate(date) {
      this.date = parseInt(moment(date).format("X")) + 12 * 60 * 60;
      this.current = -1;
      this.reser_id = "";
      this._getNumbers();
    },

    /**
     * 获取场次日期
     */
    getOrderList() {
      const result = Apis.getSessaList({
        activity_id: this.$route.params.id,
        type: this.typeVal
      });
      result
        .then(res => {
          if (res.status === 0) {
            res.data.forEach(item => {
              this.dateList.push({
                value: moment.unix(item.sesstime).format("YYYY-MM-DD")
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * 获取场次
     */
    _getNumbers() {
      const result = Apis.getNumbers(
        this.date,
        this.$route.params.id,
        this.typeVal
      );
      result
        .then(res => {
          this.numbers = res.data;
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.token = "";
          }
        });
    },
    /**
     * 删除
     */
    minusNumbers(index) {
      this.formValidate.items[index].status = 0;
    },
    /**
     * 添加人数
     */
    addNumbers() {
      this.inputIndex++;
      let arr = this.formValidate.items.filter(item => item.status);
      if (arr.length < 3) {
        this.formValidate.items.push({
          name: "",
          age: "",
          card: "",
          status: 1,
          index: this.inputIndex
        });
      } else {
        this.showDialog({
          type: "",
          title: "温馨提示",
          content: "最多只能添加三位活动参与人",
          showClose: false
        });
      }
    },
    /**
     * 立即预约
     */
    handleSubmit(name) {
      if (!this.verifyOrderItem()) return;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isDisable = true;
          this._handleSubmit();
        }
      });
    },
    _handleSubmit() {
      let details = [];
      let items = this.formValidate.items;
      for (let k in items) {
        if (items[k].status) {
          details.push({
            age: items[k].age,
            name: items[k].name,
            card: items[k].card
          });
        }
      }
      this._bookSumbit(details);
    },

    _bookSumbit(details) {
      const result = Apis.bookSumbit(this.reser_id, details);
      result
        .then(res => {
          this.isDisable = false;
          if (res.status === 0) {
            this.order = res.data.order;
            //是否需要付款
            this.details.money === "0.00" ? this.paySucc() : this.orderPay();
          } else {
            if (res.status === 2) {
              if (res.data[0]) {
                this.showDialog({
                  type: "",
                  title: "温馨提示",
                  content: `第${res.data + 1}条数据，${res.interpret}`,
                  showClose: false
                });
                return;
              } else {
                this.type = "";
                this.showDialog({
                  type: "",
                  title: "温馨提示",
                  content: res.interpret
                    ? res.interpret
                    : "您的网络有问题，请重试！",
                  showClose: false
                });
                return;
              }
            } else if (res.status === 3) {
              this.showDialog({
                type: "href",
                title: "温馨提示",
                content: res.interpret,
                showClose: true
              });
            }
          }
        })
        .catch(err => {
          this.isDisable = false;
          this.showDialog({
            type: "",
            title: "温馨提示",
            content: "您的网络有问题，请重试！",
            showClose: false
          });
        });
    },

    //调用支付
    orderPay() {
      if (!this.is_wexin) {
        this.otherPay();
      } else {
        this.wexinPay();
      }
    },

    //普通浏览器支付
    otherPay() {
      let result = Apis.orderPay({
        order: this.order,
        choose: 1,
        pay_channel: this.pay_channel,
        browser: mobile_mold(),
        return_url: homeUrl + "/mybook?callback=succPay"
      });
      result
        .then(res => {
          if (res.status === 0) {
            window.location.href = res.data.data;
          } else {
            this.showDialog({
              type: "",
              title: "温馨提示",
              content: "调用支付失败，请稍后重试！",
              showClose: false
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //微信公众号支付
    wexinPay() {
      const result = Apis.wxOrderPay({
        order: this.order,
        pay_channel: this.pay_channel,
        return_url: homeUrl + "/mybook?callback=succPay",
        openid: 123
      });
      result
        .then(res => {
          if (res.status === 0) {
            window.location.href = res.data.data;
          } else {
            this.showDialog({
              type: "",
              title: "温馨提示",
              content: "调用支付失败，请稍后重试！",
              showClose: false
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    paySucc() {
      this.showDialog({
        type: "",
        title: "温馨提示",
        icon: "ios-checkmark",
        iconColor: "#19be6b",
        content: "恭喜您，预约成功！",
        showClose: false
      });
      this._getNumbers();
      this.formValidate = {
        items: [
          {
            name: "",
            age: "",
            card: "",
            index: 1,
            status: 1
          }
        ]
      };
      this.reser_id = "";
      this.current = -1;
    },

    //验证预约格式
    verifyOrderItem() {
      if (!this.date) {
        this.showDialog({
          type: "",
          title: "温馨提示",
          content: "请选择场次日期",
          showClose: false
        });
        return false;
      } else if (!this.reser_id) {
        this.showDialog({
          type: "",
          title: "温馨提示",
          content: "请选择场次后进行预约",
          showClose: false
        });
        return false;
      } else if (!this.pay_channel && this.details.money !== "0.00") {
        this.showDialog({
          type: "",
          title: "温馨提示",
          content: "请选择支付方式",
          showClose: false
        });
        return false;
      }
      return true;
    },
    confirm() {
      if (this.type === "href") {
        this.$router.push({
          path: "/setting",
          query: { callback: this.$route.fullPath }
        });
      }
      this.$refs.dialog.hide();
    },
    showDialog(options) {
      this.type = options.type;
      this.options = {
        okText: options.okText || "确认",
        cancelText: options.cancelText || "取消",
        icon: options.icon || "information-circled",
        iconColor: options.iconColor,
        title: options.title,
        content: options.content,
        showClose: options.showClose
      };
      this.$refs.dialog.show();
    }
  }
};
</script>

<style lang="less">
.book-box {
  margin-top: 0.5rem;
  .sub-title {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    flex-direction: row;
    font-size: 0.45rem;
    color: #333;
    .splt {
      width: 3px;
      height: 0.7rem;
      background-image: linear-gradient(
          90deg,
          #00b3f7 0%,
          #00b2f7 0%,
          #00b1f6 0%,
          #079fe1 100%
        ),
        linear-gradient(#228aff, #228aff);
      background-blend-mode: normal, normal;
      border-radius: 2px;
      margin-right: 0.2rem;
    }
  }
  .s-tit {
    font-size: 0.36rem;
    color: #333;
  }
  .book {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    .form-group {
      flex: 1;
      margin-right: 10px;
    }
    .item {
      border-bottom: 1px solid #f6f6f6;
      padding: 10px 0 26px 0;
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        border-bottom: none;
      }
      .ivu-form-item {
        margin-bottom: 0;
      }
    }
    .ivu-form-item-content {
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .ivu-form-item-required {
        margin-bottom: 26px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .icon-minus {
      font-size: 0.8rem;
      color: #999;
      width: 30px;
    }
    .item-group {
      margin-top: 0.5rem;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      .lab {
        font-size: 0.4rem;
        color: #333;
        margin-bottom: 0.5rem;
      }
      .numbers {
        display: flex;
        display: -webkit-flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: flex-start;
        li {
          padding: 0.2rem 0.15rem;
          background: #ececec;
          color: #999999;
          font-size: 0.4rem;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          margin-bottom: 0.15rem;
          letter-spacing: -1px;
          margin-right: 5px;
          &.active {
            background-image: linear-gradient(
                90deg,
                #00b3f7 0%,
                #00b2f7 0%,
                #00b1f6 0%,
                #21bef8 0%,
                #41cbfa 0%,
                #38a6f4 100%
              ),
              linear-gradient(#f5f5f5, #f5f5f5);
            color: #fff;
          }
        }
      }
      .pays {
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        li {
          margin-right: 0.4rem;
          p {
            background: #fff;
            padding: 0.2rem 0.4rem;
            border: 1px solid #dcdee2;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            img {
              width: 0.8rem;
            }
            span {
              font-size: 0.4rem;
              margin-left: 0.2rem;
            }
            &:hover {
              background: rgba(228, 225, 225, 0.9);
              color: #fff;
            }
          }
          &.active {
            p {
              background: rgba(228, 225, 225, 0.9);
              color: #fff;
            }
          }
        }
      }
      .no-session {
        font-size: 0.5rem;
        color: #d2d2d2;
      }
      .add {
        background: #ececec;
        padding: 0.2rem 0.3rem;
        font-size: 0.4rem;
        display: table;
        margin-top: 0.3rem;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        text-align: center;
        width: 100%;
        .icon-add {
          font-size: 0.5rem;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          margin-left: 0.1rem;
        }
      }
    }
    .notice {
      margin-top: 0.4rem;
      font-size: 0.36rem;
      color: #9b9b9b;
      p {
        margin-bottom: 0.2rem;
      }
      span {
        color: #ff1010;
      }
    }
    .book-btn {
      padding: 0.2rem 0.4rem;
      font-size: 0.4rem;
      color: #fff;
      background-image: linear-gradient(
          90deg,
          #00b3f7 0%,
          #00b2f7 0%,
          #00b1f6 0%,
          #21bef8 0%,
          #41cbfa 0%,
          #38a6f4 100%
        ),
        linear-gradient(#f5f5f5, #f5f5f5);
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      margin-top: 0.4rem;
      display: table;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
