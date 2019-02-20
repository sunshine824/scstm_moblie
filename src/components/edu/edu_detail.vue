<template>
  <sub-page>
    <div class="edu-detail">
      <back-top title="教育课程详情" backColor="#fff"></back-top>
      <div class="edu-con">
        <div class="movie-img">
          <img :src="details.img"/>
        </div>
        <div class="movie-info">
          <p class="title">
            {{details.title}}
          </p>
          <p class="address">
            <Icon type="ios-location-outline" class="location"></Icon>
            {{details.address}}
          </p>
          <p class="m-time">
            <Icon type="ios-timer-outline" class="time"></Icon>
            {{details.time}}
          </p>
          <p class="classes">
            <span v-for="(item,index) in details.courseclass" :key="index">{{item}}</span>
          </p>
          <p class="intr" v-html="details.introduce"></p>
        </div>

        <order-box :details="details ? details : {}" typeVal="3"></order-box>

        <div class="edu-txt">
          <p class="sub-title">
            <span class="splt"></span>
            活动内容
          </p>
          <div class="content" v-html="details.content"></div>
        </div>
      </div>
    </div>
  </sub-page>
</template>
<script type="text/ecmascript-6">
  import subPage from '@/base/sub-page'
  import {educationDetail} from '@/public/js/fetch'
  import BackTop from '@/base/back'
  import {Icon} from 'iview'
  import OrderBox from '@/base/order-box'

  export default {
    components: {
      subPage,
      BackTop,
      Icon,
      OrderBox
    },
    data() {
      return {
        details: '',
      }
    },
    created() {
      this._educationDetail()
    },
    methods: {
      _educationDetail() {
        const result = educationDetail(this.$route.params.id)
        result.then(res => {
          this.details = res.data
        }).catch(err => {
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less">
  .edu-detail {
    .edu-con {
      padding: .3rem .3rem .5rem .3rem;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      .movie-img {
        width: 100%;
        img {
          width: 100%;
        }
      }
      .movie-info {
        margin-top: .3rem;
        .title {
          font-size: .45rem;
          color: #333;
          margin-bottom: .25rem;
          a {
            color: #333;
          }
          .mold {
            font-size: .38rem;
            background-image: -webkit-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -moz-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -o-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -ms-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            padding: 0 .2rem;
            display: inline-block;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            vertical-align: middle;
            text-align: center;
            color: #fff;
            margin-left: .15rem;
          }
        }
        .address {
          color: #28bbff;
          font-size: .4rem;
          margin-bottom: .25rem;
          .location {
            width: .45rem;
            font-size: .5rem;
            font-weight: bold;
            margin-right: .1rem;
            text-align: center;
          }
        }
        .m-time {
          color: #5e6d84;
          font-size: .4rem;
          margin-bottom: .25rem;
          .time {
            width: .45rem;
            font-size: .5rem;
            font-weight: bold;
            margin-right: .1rem;
            text-align: center;
          }
        }
        .classes {
          display: flex;
          display: -webkit-flex;
          flex-flow: row wrap;
          align-items: center;
          span {
            font-size: .38rem;
            background-image: linear-gradient(-131deg,#0097e3 -16%, #3bd9d0);
            padding: .1rem .2rem;
            margin-right: .3rem;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            text-align: center;
            color: #fff;
            margin-bottom: .3rem;
          }
        }
        .intr {
          font-size: .4rem;
          color: #9a9a9a;
          overflow: hidden;
          -webkit-box-orient: vertical;
          text-align: justify;
          line-height: .6rem;
        }
      }
      .edu-txt {
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
        .content{

        }
      }
    }
  }
</style>
