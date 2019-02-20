<template>
  <ul class="road-way">
    <li v-for="(item,index) in data" :key="index">
      <p class="title">
        <span class="splt"></span>
        {{item.people}}
      </p>
      <div class="road-img">
        <img :src="item.line"/>
      </div>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .road-way{
    .title {
      padding-top: .4rem;
      padding-bottom: .4rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      flex-direction: row;
      font-size: .48rem;
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
    .road-img{
      width: 100%;
      img{
        width: 100%;
      }
    }
  }
</style>
