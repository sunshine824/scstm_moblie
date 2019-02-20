<template>
  <div class="order-box">
    <div class="book-box" v-if="!token">
      <p class="sub-title">
        <span class="splt"></span>
        活动预约
      </p>
      <p class="s-tit">预约活动场次前，请先确保已成功预定科技馆门票</p>
      <no-data title="请先登录"></no-data>
    </div>

    <div class="book-box" v-if="token && details.state===2">
      <p class="sub-title">
        <span class="splt"></span>
        活动预约
      </p>
      <p class="s-tit">预约活动场次前，请先确保已成功预定科技馆门票</p>
      <no-data title="暂未开启在线预约"></no-data>
    </div>

    <div class="book-box" v-if="token && details.state===1">
      <p class="sub-title">
        <span class="splt"></span>
        活动预约
      </p>
      <p class="s-tit">预约活动场次前，请先确保已成功预定科技馆门票</p>
      <div class="book">
        <div class="item-group">
          <label class="lab">日期选择：</label>
          <DatePicker type="date"
                      :value="nowData"
                      placeholder="请选择查询日期"
                      @on-change="handleDate"
                      style="width: 5rem">
          </DatePicker>
        </div>
        <div class="item-group">
          <label class="lab">选择场次：</label>
          <ul class="numbers">
            <li
              :class="{active:current===index}"
              :style="{cursor:item.is_stop==1?'pointer':'not-allowed'}"
              @click="item.is_stop===1 ? toggle(index,item.id) : ''"
              v-for="(item,index) in numbers"
              :key="index">
              {{item.sess}}（{{item.determine}}/{{item.qualified}}）
            </li>
          </ul>
          <p class="no-session" v-if="!numbers.length">暂无场次</p>
        </div>
        <div class="item-group">
          <label class="lab">添加人数：</label>
          <ul class="people">
            <li v-for="(item,index) in number" v-if="item.status">
              <div class="form-box">
                <p>
                  <label class="s-lab">预约姓名：</label>
                  <input type="text" required v-model.trim="item.name" class="inp"/>
                </p>
                <p>
                  <label class="s-lab">预约年龄：</label>
                  <input type="number" min="1" max="200" required v-model.trim="item.age" class="inp"/>
                </p>
                <p>
                  <label class="s-lab">身份证号：</label>
                  <input type="text" required v-model.trim="item.card" class="inp"/>
                </p>
              </div>
              <div class="icon-minus" @click="minusNumbers(index)">
                <Icon v-if="index!==0" type="ios-minus"></Icon>
              </div>
            </li>
          </ul>
          <p class="add" @click="addNumbers()">
            <Icon type="ios-plus-empty"></Icon>
            添加人数（￥{{details.money}} / 人）
          </p>
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
        <p class="book-btn" @click="bookSumbit()">立即预约</p>
      </div>
    </div>
  </div>
</template>

<script>
  import NoData from '@/base/no-data'
  import {getNumbers, bookSumbit} from '@/public/js/fetch'
  import {Icon, DatePicker} from 'iview'
  import moment from 'moment'

  export default {
    name: "order-box",
    components: {
      NoData,
      Icon,
      DatePicker
    },
    props: {
      details: {
        type: Object,
        default: {}
      },
      typeVal: {
        default: 1
      }
    },
    data(){
      return{
        date: '',
        numbers: '',   //场次
        current: -1,
        reser_id: '',  //场次id
        number: [
          {
            name: '',
            age: '',
            card: '',
            status: 1,
            index: 1
          }
        ],
        token: '',
        nowData: moment().format('YYYY-MM-DD')
      }
    },
    created(){
      this.handleDate(moment().format('YYYY-MM-DD'))
      this._token()
    },
    methods:{
      _token() {
        this.token = this.$cookie.get('token')
      },
      toggle(index, id) {
        this.current = index
        this.reser_id = id
      },
      /**
       * 日期
       * @param date
       */
      handleDate(date) {
        this.date = parseInt(moment(date).format('X')) + 12 * 60 * 60
        this.current = -1
        this.reser_id = ''
        this._getNumbers()
      },
      /**
       * 获取场次
       */
      _getNumbers() {
        const result = getNumbers(
          this.date,
          this.$route.params.id,
          this.typeVal
        )
        result.then(res => {
          this.numbers = res.data
        }).catch(err => {
          if (err.response.status === 401) {
            this.token = ''
          }
        })
      },
      /**
       * 删除
       */
      minusNumbers(index) {
        this.number[index].status = 0
      },
      /**
       * 添加人数
       */
      addNumbers() {
        if (!this.verifyOrderItem()) {
          return
        }
        this.number.push(
          {
            name: '',
            age: '',
            card: '',
            status: 1,
            index: 1
          }
        )
      },
      /**
       * 立即预约
       */
      bookSumbit() {
        const details = []
        if (!this.verifyOrderItem()) {
          return
        }
        for (let k in this.number) {
          if (this.number[k].status) {
            details.push(
              {
                age: this.number[k].age,
                name: this.number[k].name,
                card: this.number[k].card
              }
            )
          }
        }

        this._bookSumbit(details)
      },
      _bookSumbit(details) {
        const result = bookSumbit(
          this.reser_id,
          details
        )
        result.then(res => {
          if (res.status === 0) {
            this.$Message.success('预约成功！');
            this._getNumbers()
            this.number = [
              {
                name: '',
                age: '',
                card:'',
                status: 1,
                index: 1
              }
            ]
            this.reser_id = ''
            this.current = -1
          } else {
            this.$Message.error({
              duration: 4,
              content: `第${res.data+1}条数据，${res.interpret}`
            });
          }
        }).catch(err => {
          console.log(err.response)
        })
      },
      //查找最后一个状态值为1
      findLastNumber(){
        let length = this.number.length
        let item
        for (let i = length - 1; i >= 0; i--) {
          if(this.number[i].status){
            item = this.number[i]
            return item
          }
        }
      },
      //验证预约格式
      verifyOrderItem() {
        let item = this.findLastNumber()
        if (!this.reser_id) {
          this.$Message.error({
            duration: 4,
            content: '请选择场次'
          });
          return false
        } else if (!item.name) {
          this.$Message.error({
            duration: 4,
            content: '姓名不能为空'
          });
          return false
        } else if (!item.age) {
          this.$Message.error({
            duration: 4,
            content: '年龄不能为空'
          });
        } else if (item.age > 200) {
          this.$Message.error({
            duration: 4,
            content: '年龄不能超过200'
          });
          return false
        } else if (!item.card) {
          this.$Message.error({
            duration: 4,
            content: '身份证号不能为空'
          });
          return false
        } else if (!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(item.card)) {
          this.$Message.error({
            duration: 4,
            content: '身份证格式有误'
          });
          return false
        }
        return true
      }
    }
  }
</script>

<style lang="less">
  .book-box {
    margin-top: .5rem;
    .sub-title {
      padding-top: .4rem;
      padding-bottom: .4rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      flex-direction: row;
      font-size: .45rem;
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
    .s-tit {
      font-size: .36rem;
      color: #333;
    }
    .book {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      .item-group {
        margin-top: .5rem;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        .lab {
          font-size: .4rem;
          color: #333;
          margin-bottom: .3rem;
        }
        .numbers {
          display: flex;
          display: -webkit-flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: space-between;
          li {
            padding: .2rem .15rem;
            background: #ececec;
            color: #999999;
            font-size: .4rem;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            margin-bottom: .15rem;
            letter-spacing: -1px;
            &.active {
              background-image: linear-gradient(90deg,
              #00b3f7 0%,
              #00b2f7 0%,
              #00b1f6 0%,
              #21bef8 0%,
              #41cbfa 0%,
              #38a6f4 100%),
              linear-gradient(
                #f5f5f5,
                #f5f5f5);
              color: #fff;
            }
          }
        }
        .no-session {
          font-size: .5rem;
          color: #d2d2d2;
        }
        .people {
          display: flex;
          flex-flow: column;
          li {
            display: flex;
            display: -webkit-flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            margin-bottom: .3rem;
            .form-box {
              display: flex;
              display: -webkit-flex;
              flex-direction: column;
              align-items: center;
              background: #ececec;
              padding: .2rem .3rem;
              -webkit-border-radius: 2px;
              -moz-border-radius: 2px;
              border-radius: 2px;
              width: 100%;
              margin-right: .2rem;
              p {
                display: flex;
                display: -webkit-flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: .2rem;
                width: 100%;
                .s-lab {
                  font-size: .4rem;
                  color: #333;
                }
                .inp {
                  width: 2.6rem;
                  height: .8rem;
                  font-size: .4rem;
                  line-height: .8rem;
                  text-align: center;
                  background: #fff;
                  flex: 1;
                }
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
            .icon-minus {
              font-size: .8rem;
              color: #999;
              width: 30px;
            }
          }
        }
        .add {
          background: #ececec;
          padding: .2rem .3rem;
          font-size: .4rem;
          display: table;
          margin-top: .3rem;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          text-align: center;
          .icon-add {
            font-size: .5rem;
            display: inline-block;
            vertical-align: middle;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            margin-left: .1rem;
          }
        }
      }
      .notice {
        margin-top: .4rem;
        font-size: .36rem;
        color: #9b9b9b;
        p {
          margin-bottom: .2rem;
        }
        span {
          color: #ff1010;
        }
      }
      .book-btn {
        padding: .2rem .4rem;
        font-size: .4rem;
        color: #fff;
        background-image: linear-gradient(90deg,
        #00b3f7 0%,
        #00b2f7 0%,
        #00b1f6 0%,
        #21bef8 0%,
        #41cbfa 0%,
        #38a6f4 100%),
        linear-gradient(
          #f5f5f5,
          #f5f5f5);
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        margin-top: .4rem;
        display: table;
        text-align: center;
      }
    }
  }
</style>
