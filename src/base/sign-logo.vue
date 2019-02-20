<template>
  <div class="sign-logo">
    <router-link to="/">
      <img :src="logo"/>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      logo: {
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
  .sign-logo {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    height: 3.5rem;
    img {
      width: 4.5rem;
    }
  }
</style>
