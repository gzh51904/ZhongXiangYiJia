<template>
  <div class="content">
    <!-- 轮播图 -->
    <div class="header">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="itemImg in banner">
          <img :src="itemImg.image" class="header-img" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 四宫格 -->
    <div class="fourGongGe">
      <ul class="fourGongGe-item">
        <li
          v-for="itemFont in fourGongGe"
          class="fourGongGe-item-list"
          @click="gotoFour(itemFont.target)"
        >
          <img :src="itemFont.icon" />
          <p>{{itemFont.label}}</p>
        </li>
      </ul>
    </div>
    <!-- 品牌特区 -->
    <div class="brand" @click="gotoBrand(brand.target)">
      <img :src="brand.image" />
    </div>
    <!-- 抢购专区 -->
    <div class="buying" v-bind:style="{backgroundImage:'url(' + buying.image + ')'}">
      <div class="buying-left" v-for="buyingsclick in buyings"></div>
    </div>
    <!-- 冰点价爆款 -->
    <div class="hotbuy">
      <div class="hotbuy-banner" v-bind:style="{backgroundImage:'url(' + hotbuy.image + ')'}"></div>
      <div class="hotbuy-item" v-bind:style="{backgroundImage:'url(' + hotbuysImg.image + ')'}">
        <div class="hotbuy-item-left" v-for="hotbuysclick in hotbuys"></div>
      </div>
    </div>
    <!-- 爆品推荐 -->
    <div class="hotbrand">
      <div class="hotbrand-banner" v-bind:style="{backgroundImage:'url(' + hotbrand.image + ')'}"></div>
      <div class="hotbrand-item" v-bind:style="{backgroundImage:'url(' + hotbrandImg.image + ')'}">
        <div class="hotbrand-item-list hotbrand-item-top-left" v-for="hotbrandsclick in hotbrands"></div>
      </div>
    </div>
    <!-- 商品秒杀 -->
    <div class="miaosha">
      <div class="miaosha-time"></div>
      <div class="miaosha-goods">
        <div class="miaosha-flex">
          <div class="miaosha-box" v-for="second in secondKill[0].secondKillProducts">
            <div class="miaosha-img">
              <img :src="second.thumbUrl" />
            </div>
            <div class="miaosha-title">
              <h3 class="miaosha-name">{{second.skuName}}</h3>
              <p class="miaosha-pirce">￥{{(second.retailPrice/100).toFixed(2)}}</p>
              <p class="miaosha-old-pirce">
                <del>￥{{(second.marketPrice/100).toFixed(2)}}</del>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 品牌专区 -->
    <div class="goodlist" v-for="(goodsimgs,idx) in goodsimg" :key="goodsimgs.image">
      <div class="goodlist-img" v-bind:style="{backgroundImage:'url(' + goodsimgs.image + ')'}"></div>
      <div class="goodlist-top">
        <p class="tuijian">热卖推荐</p>
        <p class="gengduo">更多</p>
      </div>
      <div class="goodlist-item">
        <div class="goodlist-repeat">
          <div class="goodlist-flex">
            <div class="goodlist-shop" v-for="goodslistItem in goodslist1[idx]">
              <div>
                <img style="width:1.333333rem " :src="goodslistItem.thumbUrl" />
              </div>
              <div>
                <p class="title">{{goodslistItem.skuName}}</p>
                <p class="price">￥{{(goodslistItem.retailPrice/100).toFixed(2)}}</p>
                <p class="old-price">
                  <del>￥{{(goodslistItem.marketPrice/100).toFixed(2)}}}</del>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
// 轮播图插件
import { Swipe, SwipeItem } from "mint-ui";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  data() {
    return {
      banner: [],
      fourGongGe: [],
      brand: [],
      buying: [],
      buyings: [],
      hotbuy: [],
      hotbuysImg: [],
      hotbuys: [],
      hotbrand: [],
      hotbrandImg: [],
      hotbrands: [],
      goodsimg: [],
      goodslist1: [],
      secondKill: []
    };
  },

  async created() {
    // 发起请求
    let { data } = await this.$axios(
      "https://api.zxyjsc.com/flyapi/pageConfig/getIndexConfig?pageId=home&version=1.0&terminal=3"
    );
    // 数据
    let itemlist = data.data;

    // 秒杀商品

    let secondKill = await this.$axios(
      "https://api.zxyjsc.com/flyapi/secondKill/getIndexSecondKill?version=1.0&terminal=3"
    );
    this.secondKill.push(secondKill.data.data);

    // console.log(this.secondKill);

    // console.log(itemlist);

    // 请求遍历，里面的数据有
    /*  event:"native"
        image:"http://img.zxyjsc.com/G1/M00/03/71/rBLh9l0j7ZWAPWkMAAK3qUckxz4523.jpg" 
        target:"custom?pageId=9aa4b76272404c3397a32f8dc8c9d287" */
    itemlist.map((item, idx) => {
      // 轮播图
      if (item.type == "carousel") {
        this.banner.push(item.data);
        return (this.banner = this.banner[0]);
      }
      // 四宫格
      if (item.type == "links") {
        this.fourGongGe.push(item.data);
        return (this.fourGongGe = this.fourGongGe[0]);
      }
      // 品牌特区
      if (item.type == "banner" && item.height == "266") {
        this.brand.push(item.data);
        return (this.brand = this.brand[0]);
      }
      // 抢购专区
      if (item.type == "customImg" && item.height == "239") {
        this.buying.push(item.data);
        this.buyings = this.buying[0];
        return (this.buying = this.buying[0][0]);
      }
      // 冰点爆款
      if ((item.type = "customImg" && item.height == "105")) {
        this.hotbuy.push(item.data);
        return (this.hotbuy = this.hotbuy[0]);
      }
      // 冰点爆款下的图片
      if ((item.type = "customImg" && item.height == "271")) {
        this.hotbuys.push(item.data);
        this.hotbuysImg.push(item.data[0]);
        this.hotbuysImg = this.hotbuysImg[0];
        return (this.hotbuys = this.hotbuys[0]);
      }
      // 爆品推荐
      if ((item.type = "customImg" && item.height == "96")) {
        this.hotbrand.push(item.data);
        return (this.hotbrand = this.hotbrand[0]);
      }
      // 爆品推荐图片
      if ((item.type = "customImg" && item.height == "648")) {
        this.hotbrands.push(item.data);
        this.hotbrandImg.push(item.data[0]);
        this.hotbrandImg = this.hotbrandImg[0];
        return (this.hotbrands = this.hotbrands[0]);
      }
      // 品牌特区
      if ((item.type = "banner" && item.height == "290")) {
        return this.goodsimg.push(item.data);
      }
      // 热卖推荐
      if (item.title == "热卖推荐") {
        let goodslistImg = item.data;
        this.$axios
          .get(
            "https://api.zxyjsc.com/flyapi/product/skulist?skuIds=" +
              goodslistImg +
              "&version=1.0&terminal=3"
          )
          .then(res => {
            return this.goodslist1.push(res.data.data);
          });
      }
    });
  },
  methods: {
    // 四宫格点击
    gotoFour(target) {
      this.$router.push({ name: "Uplibao", params: { target } });
    },
     // 官方品牌点击
    gotoBrand(target){
        this.$router.push({ name: "Brand", params: { target } });
    }
  }
};
</script>
<style scoped>
.content {
  height: 100%;
  width: 100%;
}
.header {
  width: 100%;
  height: 6.666667rem;
}

.header .header-img {
  width: 100%;
  height: 6.666667rem;
  width: 100%;
}
.fourGongGe {
  font-size: 0.32rem;
  color: #da053b;
  line-height: 0.32rem;
}

.fourGongGe .fourGongGe-item {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 2.32rem;
}

.fourGongGe .fourGongGe-item-list {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fourGongGe .fourGongGe-item-list img {
  width: 1.093333rem;
}
.fourGongGe .fourGongGe-item-list p {
  margin-top: 0.12rem;
}
.brand {
  width: 100%;
  height: 3.413333rem;
  margin-bottom: 0.066667rem;
}
.brand img {
  width: 100%;
}
.buying {
  background-size: 100%;
  background-repeat: no-repeat;
  height: 3.066667rem;
  width: 100%;
  display: inline-flex;
}
.buying .buying-left {
  height: 100%;
  width: 50%;
}
.hotbuy {
  height: 4.506667rem;
}
.hotbuy .hotbuy-banner {
  background-size: 100%;
  height: 1.2rem;
}
.hotbuy .hotbuy-item {
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 0.266667rem;
  height: 3.573333rem;
  width: 100%;

  display: inline-flex;
}
.hotbuy .hotbuy-item-left {
  height: 100%;
  width: 50%;
}
.hotbuy .hotbuy-item-right {
  height: 100%;
  width: 50%;
}
.hotbrand .hotbrand-banner {
  margin-top: 0.56rem;
  background-size: 100%;
  height: 1.2rem;
  background-repeat: no-repeat;
}
.hotbrand .hotbrand-item {
  height: 8.64rem;
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.hotbrand .hotbrand-item .hotbrand-item-list {
  height: 50%;
  width: 50%;
}
.miaosha {
  height: 5.546667rem;
  margin-bottom: 0.426667rem;
}
.miaosha .miaosha-flex {
  box-sizing: border-box;
  padding-left: 0.133333rem;
  display: flex;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
}
.miaosha .miaosha-time {
  height: 1.28rem;
  background: pink;
}
.miaosha .miaosha-goods {
  width: 100%;
  text-align: center;
  height: 4.613333rem;
  /* background: red; */
}
.miaosha .miaosha-img img {
  width: 2.373333rem;
}
.miaosha .miaosha-box {
  margin: 0.346667rem;
}
.miaosha .miaosha-name {
  line-height: 0.293333rem;
  font-size: 0.293333rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 2.373333rem;
  overflow: hidden;
  margin-bottom: 0.506667rem;
}
.miaosha .miaosha-pirce {
  font-size: 0.293333rem;
  color: #f50a5a;
}
.miaosha .miaosha-old-pirce {
  font-size: 0.213333rem;
  color: #969594;
}
.goodlist {
}
.goodlist .goodlist-img {
  width: 100%;
  height: 3.866667rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
.goodlist .goodlist-top {
  margin-top: 0.293333rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.293333rem 0 0.373333rem;
  margin-bottom: 0.56rem;
}
.goodlist .goodlist-top .tuijian {
  font-size: 0.373333rem;
}
.goodlist .goodlist-top .gengduo {
  color: #928f8d;
  font-size: 0.293333rem;
}
.goodlist .goodlist-top .gengduo::after {
  content: ">";
  font-size: 0.4rem;
  font-weight: 600;
  line-height: 0.4rem;
}
.goodlist .goodlist-item {
  margin-bottom: 0.426667rem;
}
.goodlist .goodlist-flex {
  height: 3.333333rem;
  box-sizing: border-box;
  padding-left: 0.133333rem;
  display: flex;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
}
.goodlist .goodlist-flex .goodlist-shop {
  width: 2.293333rem;
  margin-right: 0.386667rem;
  text-align: center;
}
.goodlist .goodlist-flex .goodlist-shop .title {
  line-height: 0.293333rem;
  font-size: 0.293333rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  margin-bottom: 0.506667rem;
}
.goodlist .goodlist-flex .goodlist-shop .price {
  line-height: 0.293333rem;
  font-size: 0.293333rem;
  color: #f40046;
  margin-bottom: 12px;
}
.goodlist .goodlist-flex .goodlist-shop .old-price {
  color: #7e8691;
  font-size: 0.213333rem;
  line-height: 0.213333rem;
}
</style>
