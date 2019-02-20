<template>
  <ul class="theater-list">
    <li class="item" v-for="(item,index) in data" :key="index">
      <router-link :to="'/theater/'+item.id">
        <p class="poster">
          <img :src="item.img"/>
        </p>
        <div class="item-info">
          <h2 class="item-title">
            {{item.title}}
            <span class="mold">{{item.type}}</span>
          </h2>
          <p class="address">
            <Icon type="ios-location-outline" class="location"></Icon>
            {{item.address}}
          </p>
          <p class="m-time">
            <Icon type="ios-timer-outline" class="time"></Icon>
            {{item.length}}
          </p>
          <p class="intr">
            {{item.introduce}}
          </p>
          <!--<p class="btn-book">立即预定</p>-->
        </div>
      </router-link>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  import {Icon} from 'iview'

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components: {
      Icon,
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .theater-list {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    .item {
      a{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        overflow: hidden;
        -webkit-box-shadow: 0 3px 36px 0 #EDEDED;
        box-shadow: 0 3px 36px 0 #EDEDED;
        border-radius: 2px;
        background: #fff;
        margin-bottom: .5rem;
        height: 6rem;
      }
      .poster {
        width: 50%;
        img {
          width: 100%;
        }
      }
      .item-info {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        padding: .3rem .3rem .3rem .4rem;
        width: 50%;
        .item-title {
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
            width: .3rem;
            font-size: .5rem;
            font-weight: bold;
            margin-right: .1rem;
          }
        }
        .m-time {
          color: #5e6d84;
          font-size: .4rem;
          margin-bottom: .25rem;
          .time {
            width: .3rem;
            font-size: .5rem;
            font-weight: bold;
            margin-right: .1rem;
          }
        }
        .intr {
          text-align: justify;
          font-size: .4rem;
          color: #9a9a9a;
          margin-bottom: .2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
        .btn-book {
          background-image: linear-gradient(90deg,
          #00d1fb 0%,
          #1dd4e6 0%,
          #39d7d0 0%,
          #079fe1 100%),
          linear-gradient(
            #ffffff,
            #ffffff);
          color: #fff;
          text-align: center;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          font-size: .4rem;
          padding: .22rem 0;
        }
      }
    }
  }
</style>
