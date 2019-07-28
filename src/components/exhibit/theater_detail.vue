<template>
  <sub-page>
    <div class="theater-detail">
      <back-top title="剧场详情" backColor="#fff"></back-top>
      <div class="movie-con">
        <div class="movie-img">
          <img :src="details.img"/>
        </div>
        <div class="movie-info">
          <p class="title">
            {{details.title}}
            <span class="mold">{{details.type}}</span>
          </p>
          <p class="address">
            <Icon type="ios-location-outline" class="location"></Icon>
            {{details.address}}
          </p>
          <p class="m-time">
            <Icon type="ios-timer-outline" class="time"></Icon>
            {{details.time}}
          </p>
          <p class="intr" v-html="details.introduce"></p>
        </div>

        <order-box :details="details ? details : {}" typeVal="2" :noticeTxt="noticeTxt"></order-box>

        <div class="clips">
          <p class="sub-title">
            <span class="splt"></span>
            片花/剧照
          </p>
          <div class="clips-img">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item,index) in details.cinema_img" :key="index">
                <img :src="item"/>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </sub-page>
</template>
<script type="text/ecmascript-6">
  import subPage from '@/base/sub-page'
  import {getMovieDetail} from '@/public/js/fetch'
  import BackTop from '@/base/back'
  import {Icon} from 'iview'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import OrderBox from '@/base/order-box'
  import 'swiper/dist/css/swiper.css'

  export default {
    components: {
      subPage,
      BackTop,
      Icon,
      swiper,
      swiperSlide,
      OrderBox
    },
    data() {
      return {
        noticeTxt:'1、一人一券，儿童也需购票，6岁以下儿童观影需家长陪同。身高1.2米以下儿童、孕妇及心脏病、高血压患者不宜观看此类影片。<br/> 2、影片预约成功后，凭身份证前往南广场票务服务领取入馆参观券。入馆后在一楼南厅服务台兑换4D电影票。<br/> 3、取完参观券后4D电影票不可退换。<br/> 4、开场前30分钟停止预约，取消预约场次，须提前24小时提出申请。<br/> 5、如遇机器故障无法正常观影，可在开场后30分钟内前往一楼序厅办理退、换票手续。',
        details: '',
        swiperOption: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 10,
          navigation: {
            nextEl: '.next',
            prevEl: '.prev'
          }
        },
      }
    },
    created() {
      this._getMovieDetail()
    },
    methods: {
      _getMovieDetail() {
        const result = getMovieDetail(this.$route.params.id)
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
  .theater-detail {
    .movie-con {
      padding: .3rem;
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
        .intr {
          font-size: .4rem;
          color: #9a9a9a;
          overflow: hidden;
          -webkit-box-orient: vertical;
          text-align: justify;
          line-height: .6rem;
        }
      }
      .clips {
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
        .clips-img {
          width: 100%;
          overflow: hidden;
          .swiper-slide {
            text-align: center;
            img {
              width: 100%;
              -webkit-border-radius: 2px;
              -moz-border-radius: 2px;
              border-radius: 2px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
