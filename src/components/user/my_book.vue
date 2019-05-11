<template>
  <slot-con>
    <div class="mybook-con">
      <back title="我的预约"></back>
      <div class="mybook">
        <tab-bar :data="navBar" @handleClick="handleType"></tab-bar>
        <div class="order-list" v-if="reserList.status===0 && reserList.data.data.length">
          <div class="order-item" :key="index" v-for="(item,index) in reserList.data.data">
            <div class="info">
              <router-link :to="[item.type, item.activity_id] | filterLink" class="title">
                <span class="txt">{{item.type}}——{{item.title}}</span>
                <Icon style="font-size: .45rem; margin-left: 5px" type="ios-arrow-forward"/>
              </router-link>
              <p class="status" v-if="item.status!==1">{{statusObj[item.status]}}</p>
              <p class="status" v-if="item.status===1">{{item.overdue_time | countTime}}</p>
            </div>
            <div class="act-info">
              <div class="act-img">
                <img :src="item.img">
              </div>
              <div class="act-txt">
                <p>
                  <span>订单编号：</span>
                  <span class="light-txt">{{item.order}}</span>
                </p>
                <p>
                  <span>下单日期：</span>
                  <span class="light-txt">{{item.addtime | formatDate}}</span>
                </p>
                <p>
                  <span>开始时间：</span>
                  <span class="light-txt">{{item.sesstime}}&nbsp;&nbsp;{{item.sess}}</span>
                </p>
                <p>
                  <span>参观人员：</span>
                  <span class="light-txt">{{item.name_user}}</span>
                </p>
              </div>
            </div>
            <p class="act-status">
              活动状态&nbsp;
              <span class="notice">(请根据活动时间安排行程)：</span>
              &nbsp;
              <span>{{item.is_end}}</span>
            </p>
            <p class="act-status"></p>
            <p class="money">
              <span style="color: #ff8000;">{{ticketObj[item.drawer]}}</span>
              &nbsp;&nbsp;
              共{{item.name_user.split(',').length}}位预约人 &nbsp;&nbsp; 合计：
              <span>{{item.money}}</span>
            </p>
            <div class="btns">
              <Button
                v-if="item.status===1 || item.status===2"
                @click="reserCancel(item)"
                class="btn ivu-btn-warning"
              >取消预约</Button>
              <Button v-if="item.status===1" @click="_orderPay(item, 1)" class="btn">
                <img src="/static/images/wxchat.png">
                <span>微信支付</span>
              </Button>
              <Button v-if="item.status===1 && !is_wexin" @click="_orderPay(item, 2)" class="btn">
                <img src="/static/images/alipay.png">
                <span>支付宝支付</span>
              </Button>
              <Button
                type="error"
                style="backgroundColor:#ed3f14; borderColor:#ed3f14; color:#fff"
                v-if="item.status>4 && item.status!=7"
                class="btn"
                @click="deleteOrder(item)"
              >删除订单</Button>
              <Button
                class="btn"
                v-if="item.status===2 && item.drawer===3"
                @click="renderQrcode(item)"
              >生成订单二维码</Button>
            </div>
          </div>
          <Spin size="large" fix v-if="loading"></Spin>
          <pagination
            v-if="reserList.data.total"
            :total="reserList.data.total"
            :page="page"
            @handleChange="handlePage"
          ></pagination>
        </div>
        <no-data title="暂无预约数据" v-if="reserList.status===2 || !reserList.data.data.length"></no-data>
      </div>
    </div>
    <dialog-con :options="options" ref="dialog" @confirm="confirm"></dialog-con>

    <Qrcode :qr_value="qr_value" ref="qrcode"/>
  </slot-con>
</template>
<script type="text/ecmascript-6">
import slotCon from "@/base/slot-con";
import NoData from "@/base/no-data";
import { is_wexin, mobile_mold } from "@/public/js/utils";
import { Icon, Button, Spin } from "iview";
import { homeUrl } from "@/public/js/config";
import * as Apis from "@/public/js/fetch";
import Back from "@/base/back";
import TabBar from "@/base/tabBar";
import moment from "moment";
import Pagination from "@/base/pagination";
import DialogCon from "@/base/dialog_con";
import Qrcode from "@/base/qrcode";

let timer = null;

export default {
  components: {
    slotCon,
    NoData,
    Icon,
    Back,
    TabBar,
    Pagination,
    DialogCon,
    Qrcode
  },
  data() {
    return {
      reserList: "",
      type: 1,
      status: 1,
      page: 1,
      statusObj: {
        1: "未支付",
        2: "已支付",
        3: "已使用",
        4: "取消退款中",
        5: "已取消退款",
        6: "超时未支付",
        7: "已删除"
      },
      ticketObj: {
        1: "未出票",
        2: "出票中",
        3: "出票成功",
        4: "出票失败",
        5: "已退票"
      },
      navBar: [
        { title: "未付款", id: 1 },
        { title: "已付款", id: 2 },
        { title: "回收站", id: 7 },
        { title: "全部订单", id: "" }
      ],
      options: {
        okText: "确认",
        cancelText: "取消",
        icon: "information-circled",
        title: "",
        content: "",
        showClose: true
      },
      is_wexin: is_wexin(),
      loading: false,
      qr_value: ""
    };
  },
  created() {
    if (this.$route.query.callback) {
      setTimeout(() => {
        this._Reserlists();
      }, 3000);
    } else {
      this._Reserlists();
    }
  },
  methods: {
    handleType(id) {
      this.status = id;
      this.page = 1;
      this._Reserlists();
    },
    //删除订单
    deleteOrder(item) {
      this.loading = true;
      const result = Apis.deleteOrder({ id: item.id });
      result
        .then(res => {
          this.loading = false;
          if (res.status === 0) {
            this.$Message.success("取消预约成功！");
            this._Reserlists();
          } else {
            this.showDialog({
              type: "",
              title: "温馨提示",
              content: res.interpret,
              showClose: false
            });
          }
        })
        .catch(err => {
          this.$Message.error("删除订单失败！");
          this.loading = false;
        });
    },
    handlePage(page) {
      this.page = page;
      this._Reserlists();
    },
    //生成二维码
    renderQrcode(item) {
      this.qr_value = item.order;
      this.$refs.qrcode.show();
    },

    //查询预约列表
    _Reserlists() {
      this.loading = true;
      const result = Apis.Reserlists({
        number: 6,
        status: this.status,
        page: this.page
      });
      result
        .then(res => {
          this.loading = false;
          this.reserList = res;
          clearInterval(timer);
          timer = setInterval(() => {
            this.reserList.status === 0 &&
              this.reserList.data.data.map((item, index) => {
                let diff = item.overdue_time;
                diff--;
                if (diff < 0 && item.status === 1) {
                  clearInterval(timer);
                  this.reserList.data.data.splice(index, 1);
                } else {
                  item.overdue_time = diff;
                }
              });
          }, 1000);
        })
        .catch(err => {
          this.loading = false;
        });
    },

    //调用支付
    _orderPay(item, id) {
      if (!is_wexin()) {
        this.otherPay(item, id);
      } else {
        this.wexinPay(item, id);
      }
    },

    //普通浏览器支付
    otherPay(item, id) {
      this.loading = true;
      let result = Apis.orderPay({
        order: item.order,
        choose: 1,
        pay_channel: id,
        browser: mobile_mold(),
        return_url: homeUrl + "/mybook?callback=succPay"
      });
      result
        .then(res => {
          this.loading = false;
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
          this.loading = false;
          console.log(err);
        });
    },

    //微信公众号支付
    wexinPay(item, id) {
      this.loading = true;
      const result = Apis.wxOrderPay({
        order: item.order,
        pay_channel: id,
        return_url: homeUrl + "/mybook?callback=succPay",
        openid: 123
      });
      result
        .then(res => {
          this.loading = false;
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
          this.loading = false;
          console.log(err);
        });
    },

    //取消预约
    reserCancel(item) {
      this.loading = true;
      let result = Apis.reserCancel({
        id: item.id,
        order: item.order
      });
      result
        .then(res => {
          this.loading = false;
          if (res.status === 0) {
            this.$Message.success("取消预约成功！");
            this._Reserlists();
          } else if (res.status === 2) {
            this.showDialog({
              type: "",
              title: "温馨提示",
              content: res.interpret,
              showClose: false
            });
          } else {
            this.showDialog({
              type: "",
              title: "温馨提示",
              content: "取消预约失败，请稍后重试！",
              showClose: false
            });
          }
        })
        .catch(err => {
          this.$Message.error("取消预约失败！");
          this.loading = false;
        });
    },

    confirm() {
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
  },
  filters: {
    filterLink([type, id]) {
      return (
        (type == "教育活动"
          ? "/edu/"
          : type == "美科新"
          ? "/mkx/"
          : type == "4D影院"
          ? "/theater/"
          : "") + id
      );
    },
    formatDate(date) {
      return moment(date * 1000).format("YYYY-MM-DD");
    },
    countTime(diff) {
      if (diff > 0) {
        var dd = Math.floor(diff / 60 / 60 / 24);
        var hh = Math.floor((diff / 60 / 60) % 24);
        var mm = Math.floor((diff / 60) % 60);
        var ss = Math.floor(diff % 60);
        var str =
          (String(hh).length === 1 ? `0${hh}` : hh) +
          ":" +
          (String(mm).length === 1 ? `0${mm}` : mm) +
          ":" +
          (String(ss).length === 1 ? `0${ss}` : ss);
        return str;
      }
    }
  }
};
</script>
<style lang="less">
.mybook {
  padding: 0.3rem;
  .order-list {
    display: flex;
    display: -webkit-flex;
    flex-flow: column nowrap;
    position: relative;
    .order-item {
      display: flex;
      display: -webkit-flex;
      flex-flow: column nowrap;
      margin-bottom: 0.3rem;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      padding: 0.3rem;
      &:first-child {
        margin-top: 0.2rem;
      }
      .info {
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        .title {
          display: flex;
          display: -webkit-flex;
          flex-flow: row nowrap;
          align-items: center;
          font-size: 0.42rem;
          color: #888;
          max-width: 74%;
          .txt {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            color: #333;
            font-size: 0.4rem;
          }
        }
        .status {
          font-size: 0.4rem;
          color: #ff8000;
        }
      }
      .act-info {
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        background: #fff;
        padding-top: 0.4rem;
        .act-img {
          width: 2.7rem;
          overflow: hidden;
          img {
            border-radius: 6px;
            width: 100%;
          }
        }
        .act-txt {
          margin-left: 0.4rem;
          p {
            margin-bottom: 0.1rem;
            color: #a8a8a8;
            font-size: 0.38rem;
            .light-txt {
              color: #a8a8a8;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .act-status {
        text-align: right;
        color: #a8a8a8;
        font-size: 0.38rem;
        margin-top: 0.5rem;
        .notice {
          color: #a8a8a8;
        }
        span {
          color: #ff8000;
        }
      }
      .money {
        text-align: right;
        font-size: 0.38rem;
        color: #a8a8a8;
        margin-top: 0.4rem;
        span {
          color: #666;
          font-size: 0.4rem;
        }
      }
      .btns {
        display: flex;
        flex-flow: row nowrap;
        margin-top: 0.5rem;
        justify-content: flex-end;
        .btn {
          margin-left: 0.2rem;
          display: inline-block;
          font-size: 0.37rem;
          color: #666;
          padding: 0.15rem 0.23rem;
          border: 1px solid #dedede;
          border-radius: 6px;
          background-color: #fff;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          outline: none;
          position: relative;
          -webkit-transition: border-color ease-in-out 0.15s,
            color ease-in-out 0.15s, background ease-in-out 0.15s,
            -webkit-box-shadow ease-in-out 0.15s;
          transition: border-color ease-in-out 0.15s, color ease-in-out 0.15s,
            background ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
          transition: border-color ease-in-out 0.15s,
            box-shadow ease-in-out 0.15s, color ease-in-out 0.15s,
            background ease-in-out 0.15s;
          transition: border-color ease-in-out 0.15s,
            box-shadow ease-in-out 0.15s, color ease-in-out 0.15s,
            background ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
          img {
            width: 20px;
          }
          &:first-child {
            margin-left: 0;
          }
        }
        .ivu-btn-warning {
          color: #fff;
          background-color: #f90;
          border-color: #f90;
        }
      }
    }
  }
}
</style>
