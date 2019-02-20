<template>
  <ul class="guide-list">
    <li v-for="(item,index) in data" :key="index">
      <div class="item-img">
        <img :src="item.img"/>
        <div class="mask" v-if="item.is_c===1">
          <p class="mask-txt">
            <router-link :to="'/guide/'+item.id">查看详情</router-link>
          </p>
        </div>
      </div>
      <p class="txt">{{item.name}}</p>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .guide-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    li {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      width: 48%;
      background: #fff;
      margin-bottom: .4rem;
      box-shadow: 0 3px 36px 0 #ededed;
      .item-img {
        width: 100%;
        position: relative;
        img {
          width: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, .4);
          z-index: 100;
          transition: opacity .6s ease 0s;
          cursor: default;
          .mask-txt {
            width: 100%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            a {
              width: 2.6rem;
              height: .9rem;
              line-height: .9rem;
              text-align: center;
              color: #fff;
              background-image: linear-gradient(135deg, #00d0fb, #00acf6);
              border-radius: 2px;
              font-size: .4rem;
              text-decoration: none;
            }
          }
        }
      }
      .txt {
        width: 100%;
        height: 1rem;
        font-size: .4rem;
        color: #333;
        text-align: center;
        line-height: 1rem;
      }
    }
  }
</style>
