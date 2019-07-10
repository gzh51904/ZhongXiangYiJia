<template>
  <div>
    <header id="header" ref="header">
      <h2 class="title">购物车</h2>
    </header>
    <div class="no-data">
      <img src="https://www.zxyj.com/static/images/no-data-cart.png" class="no-data-icon" />
      <div class="no-data-text">购物车还是空的，去挑选几件宝贝吧</div>

      <div class="no-data-btn active" @click="gotoHome">去逛逛</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import rem from "../rem/rem.js";

export default {
  data() {
    return {};
  },
  created() {
    console.log("path", this.$router.history.current.path);
  },
  methods: {
    gotoHome() {
      console.log("path", this.$router.history.current.path);
      let targetPath = this.$route.query.redirectTo;
      this.$router.replace(targetPath ? targetPath : "/home");
    }
  }
};
</script>
<style scope>
#header {
  line-height: 0.6rem;
  text-align: center;
  background: #ffffff;
}
h2 {
  font-size: 0.266667rem;
  line-height: 45px;
}
.no-data {
  text-align: center;
  margin-top: 1.333333rem;
}
.no-data img {
  width: 1.333333rem;
  height: 1.333333rem;
  margin: auto;
  display: block;
}
.no-data .no-data-text {
  font-size: 0.186667rem;
  color: #999;
}
.no-data .no-data-btn {
  margin-top: 0.266667rem;
  width: 1.6rem;
  height: 0.533333rem;
  line-height: 0.533333rem;
  font-size: 0.213333rem;
  background: #f51861;
  color: #fff;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 0.333333rem;
}
</style>
