<template>
  <div class="group-box">
    <div class="n-title">
      <span>{{title}}</span>
      <router-link :to="moreUrl" class="more">
        <img src="../../assets/more.png"/>
      </router-link>
    </div>
    <ul class="list" :style="{background:'url('+bg+') no-repeat'}">
      <li v-for="(item,index) in data" :key="index">
        <router-link :to="moreUrl+'/'+item.id">
          {{item.title}}
        </router-link>
        <span class="time">{{item.introduce}}</span>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: []
      },
      moreUrl: {
        type: String,
        default: ''
      },
      detailUrl: {
        type: String,
        default: ''
      },
      bg: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .group-box {
    margin-top: .4rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    .n-title {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: .3rem;
      span {
        font-size: .6rem;
        color: #333;
      }
      .tab-btn {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        font-size: .52rem;
        align-items: flex-end;
        h2 {
          margin-right: .4rem;
          cursor: pointer;
          color: #999999;
          &:hover {
            color: #333333;
          }
          &.active {
            color: #333333;
            font-size: .6rem;
          }
        }
      }
      .more {
        width: .6rem;
        img {
          width: 100%;
        }
      }
    }
    .list {
      background-size: cover !important;
      padding: .2rem .5rem;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      li {
        border-bottom: 1px dashed rgba(255, 255, 255, .5);
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        a {
          color: rgba(255, 255, 255, 1);
          font-size: .45rem;
          padding-bottom: .15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-top: .3rem;
        }
        span {
          font-size: .4rem;
          color: rgba(255, 255, 255, 0.8);
          padding-bottom: .3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
