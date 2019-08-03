<template>
  <header>
    <input type="text" @click="gotoSearch" class="header-search" placeholder="想要买点什么" ref="header" />
    <div class="header-msg">
      <i class="iconfont icon-xiaoxi"></i>
      <p>消息</p>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotoSearch() {
      this.$router.push("/search");
      this.isShow();
    }
  }
};
</script>
<style scoped>
/* 头部 */
header {
  width: 100%;
  position: fixed;
  z-index: 666;
  padding: 7px 0;
  background: white;
  z-index: 99999;
}

header .header-search {
  height: 0.8rem;
  border: none;
  padding: 0.093333rem 0.093333rem 0.093333rem 0.666667rem;
  color: #d2d2d2;
  border-radius: 0.4rem;
  width: 85%;
  background-color: rgb(242, 242, 242);
  font-size: 0.293333rem;
  margin-left: 0.4rem;
}

header::before {
  font-family: "iconfont" !important;
  font-size: 26px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\e61c";
  position: fixed;
  left: 0.466667rem;
  line-height: 0.8rem;
}

header .header-msg {
  top: 0;
  right: 0.266667rem;
  position: fixed;
  color: #fff;
  text-align: center;
}
</style>
