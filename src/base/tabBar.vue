<template>
  <ul class="m-type">
    <li v-for="(item,index) in data"
        :key="index"
        @click="handleClick(index,item.id)"
        :class="{active:index===current}">
      <a v-if="item.href" :href="item.href">
        {{item.title}}
      </a>
      <router-link :to="item.to" v-else-if="item.to">
        {{item.title}}
      </router-link>
      <p v-else>
        {{item.title}}
      </p>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        current: this.index
      }
    },
    methods: {
      handleClick(index, id) {
        this.current = index
        this.$emit('handleClick', id)
      }
    }
  }
</script>
<style lang="less">
  .m-type {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-flow: row wrap;
    li {
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      background: #ececec;
      color: #999999;
      border-radius: 2px;
      font-size: .42rem;
      margin-bottom: .3rem;
      padding: 0 .3rem;
      min-width: 2.5rem;
      /*&:nth-of-type(3n) {
        margin-right: 0;
      }*/
      &.active {
        background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
        background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
        background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
        background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
        background-image: linear-gradient(135deg, #00d0fb, #00acf6);
        color: #fff;
        a {
          color: #fff;
        }
      }
      a {
        color: #999999;
        display: block;
      }
    }
  }
</style>
