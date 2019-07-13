<template >
  <div>
    <div>接口数据</div>
    <div>
      <img :src="listImg[0]" class="img" />
      <div>{{info.skuName}}</div>
    </div>
    <div class="all-btn">
      <div class="btn btn-add-to-cart" @click="addToCart">加入购物车</div>
      <div class="btn btn-buy" @click="ToBuy">立即购买</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import rem from "../rem/rem.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      info: {},
      listImg: []
    };
  },
  methods: {
    /* 加入购物车 */
    addToCart() {
      let { commit, state } = this.$store;
      let { goodslist } = state.cart;
      let { skuId } = this.info;
      // 判断当前商品是否已经存在购物车中
      // 存在：数量+1
      // 不存在：添加（数量为1）
      let current = goodslist.filter(item => item.skuId== skuId)[0];

      console.log("current", current);
      console.log("INFO", this.info);
      console.log("goodlist", goodslist);
      console.log("state.cart:",state.cart);
     

      if (current) {
        commit("changeQty", {skuId: this.info.skuId,qty: current.qty + 1 });
      } else {
        commit("add", {qty: 1, ...this.info });
      }
    },
    /* 立即购买*/
    ToBuy() {}
  },
  async created() {
    /* 获取传入id */
    let { skuId } = this.$route.params;

    let { data } = await this.$axios.get(
      "https://api.zxyjsc.com/flyapi/product/skuDetail?skuId=" +
        skuId +
        "&version=2.0&terminal=3"
    );

    this.info = data.data;
    this.listImg = data.data.images;
    
  }
};
</script>
<style scope>
.img {
  width: 100%;
  height: 100%;
}
.btn {
  float: left;
  width: 2.666667rem;
  text-align: center;
  color: #fff;
  font-size: 0.426667rem;
  line-height: 1.333333rem;
}
.all-btn {
  float: right;
  width: 5.333333rem;
}

.btn-add-to-cart {
  background: linear-gradient(#ff9300, #ff7800);
}
.btn-buy {
  background: #f51861;
}
</style>

