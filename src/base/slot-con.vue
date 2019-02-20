<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    }
  }
</script>
<style scoped lang="less">
  .container {
    min-height: calc(~"100vh - 2.2rem");
    background: #f2f2f4;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    margin-top: 2.2rem;
  }
</style>
