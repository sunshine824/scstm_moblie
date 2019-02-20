<template>
  <ul class="public-list clearfix">
    <li v-for="(item,index) in data" :key="index">
      <router-link :to="'/'+href+'/'+item.id" class="list-item">
        <div class="cover-img">
          <img :src="item.img"/>
        </div>
        <div class="item-info">
          <h2>{{item.title}}</h2>
          <p class="address">
            <Icon type="ios-location-outline" class="location"></Icon>
            {{item.address}}
          </p>
          <p class="m-time">
            <Icon type="ios-timer-outline" class="time"></Icon>
            {{item.time}}
          </p>
          <p class="intr" v-html="item.introduce"></p>

          <p class="words" v-if="item.courseclass">
            <span v-for="(item,index) in item.courseclass" :key="index">
              {{item}}
            </span>
          </p>
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
        default: ''
      },
      href: {
        type: String,
        default: ''
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
  .public-list {
    li {
      background: #fff;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      -webkit-box-shadow: 0 3px 36px 0 #EDEDED;
      box-shadow: 0 3px 36px 0 #EDEDED;
      overflow: hidden;
      margin-bottom: .4rem;
      a{
        text-decoration: none;
      }
      .list-item {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        overflow: hidden;
        .cover-img {
          width: 100%;
          height: 5.5rem;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .item-info {
          padding: .3rem;
          h2 {
            font-size: .45rem;
            color: #333;
            margin-bottom: .3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .address {
            color: #28bbff;
            font-size: .4rem;
            margin-bottom: .25rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            text-align: justify;
          }
          .words {
            margin-top: .3rem;
            display: flex;
            display: -webkit-flex;
            flex-flow: row wrap;
            span {
              font-size: .4rem;
              color: #999999;
              padding: .1rem .25rem;
              margin-right: .3rem;
              background: #ececec;
              margin-bottom: .3rem;
              -webkit-border-radius: 2px;
              -moz-border-radius: 2px;
              border-radius: 2px;
            }
          }
        }
      }
    }
  }
</style>
