<template>
  <div class="content">
    <!-- 轮播图 -->
    <div class="header">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="itemImg in banner">
          <img :src="itemImg.urlImg" class="header-img" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 四宫格 -->
    <div class="fourGongGe">
      <ul class="fourGongGe-item">
        <li v-for="itemFont in fourGongGe" class="fourGongGe-item-list">
          <img :src="itemFont.icon" />
          <p>{{itemFont.label}}</p>
        </li>
      </ul>
    </div>
    <!-- 品牌特区 -->
    <div class="brand">
      <img :src="brand.img" alt />
    </div>
    <!-- 抢购专区 -->
    <div class="buying" v-bind:style="{backgroundImage:'url(' + buying.image + ')'}">
      <div class="buying-left"></div>
      <div class="buying-right"></div>
    </div>
    <!-- 冰点价爆款 -->
    <div class="hotbuy">
      <div class="hotbuy-banner" v-bind:style="{backgroundImage:'url(' + hotbuy.banner + ')'}"></div>
      <div class="hotbuy-item" v-bind:style="{backgroundImage:'url(' + hotbuy.image + ')'}">
        <div class="hotbuy-item-left"></div>
        <div class="hotbuy-item-right"></div>
      </div>
    </div>
    <!-- 爆品推荐 -->
    <div class="hotbrand">
      <div class="hotbrand-banner" v-bind:style="{backgroundImage:'url(' + hotbrand.banner + ')'}"></div>
      <div class="hotbrand-item" v-bind:style="{backgroundImage:'url(' + hotbrand.image + ')'}">
        <div class="hotbrand-item-list hotbrand-item-top-left"></div>
        <div class="hotbrand-item-list hotbrand-item-top-right"></div>
        <div class="hotbrand-item-list hotbrand-item-bottom-left"></div>
        <div class="hotbrand-item-list hotbrand-item-bottom-right"></div>
      </div>
    </div>
    <!-- 商品秒杀 -->
    <div class="miaosha">
      <div class="miaosha-time"></div>
      <div class="miaosha-goods">
        <ul class="miaosha-goods-item">
          <li class="miaosha-goods-item-list"></li>
        </ul>
      </div>
    </div>
    <!-- 品牌专区 -->
    <div class="goodlist" v-for="goodsimgs in goodsimg" :key="goodsimgs.image">
      <div class="goodlist-img" v-bind:style="{backgroundImage:'url(' + goodsimgs.image + ')'}"></div>
      <div class="goodlist-item">
        <div class="goodlist-top">
          <p class="tuijian">热卖推荐</p>
          <p class="gengduo">更多</p>
        </div>
        <div class="goodlist-flex">
          <div class="goodlist-shop" v-for="goodslist in 20">
            <div>
              <img
                style="width:1.333333rem "
                src="http://img.zxyjsc.com/G1/M00/0C/84/rBLh9lrq7RSARc1dAASHZKcTK4Q491.jpg"
              />
            </div>
            <div>
              <p class="title">蚂蚁肉书友敬意等等</p>
              <p class="price">￥39.00</p>
              <p class="old-price">
                <del>￥239.00</del>
              </p>
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
      banner: [{ urlImg: "" }, { urlImg: "" }, { urlImg: "" }, { urlImg: "" }],
      fourGongGe: [
        {
          label: "",
          icon: ""
        },
        {
          label: "",
          icon: ""
        },
        {
          label: "",
          icon: ""
        },
        {
          label: "",
          icon: ""
        }
      ],
      brand: {
        img: ""
      },
      buying: [
        {
          img: ""
        }
      ],
      hotbuy: [{ banner: "", image: "" }],
      hotbrand: [{ banner: "", image: "" }],
      goodsimg: [],
      goodslist: []
    };
  },
  async created() {
    // 发起请求
    let { data } = await this.$axios(
      "https://api.zxyjsc.com/flyapi/pageConfig/getIndexConfig?pageId=home&version=1.0&terminal=3"
    );

    // 轮播图遍历
    for (var i = 0; i < data.data.length; i++) {
      if (data.data[i].type == "carousel") {
        var bannerItem = data.data[i].data;
        // console.log(bannerItem);
        for (var j = 0; j < bannerItem.length; j++) {
          this.banner[j].urlImg = bannerItem[j].image;
        }
      }
    }

    // 四宫格
    for (var i = 0; i < data.data.length; i++) {
      if (data.data[i].type == "links") {
        var bannerItem = data.data[i].data;
        for (var j = 0; j < bannerItem.length; j++) {
          this.fourGongGe[j].label = bannerItem[j].label;
          this.fourGongGe[j].icon = bannerItem[j].icon;
        }
      }
    }

    // 品牌img
    this.brand.img = data.data[2].data.image;

    // 抢购img
    for (var i = 0; i < data.data[3].data.length; i++) {
      this.buying.image = data.data[3].data[i].image;
    }

    // 冰点爆款
    this.hotbuy.banner = data.data[4].data.image;
    this.hotbuy.image = data.data[5].data[0].image;

    // 爆款推荐
    this.hotbrand.banner = data.data[6].data.image;
    this.hotbrand.image = data.data[7].data[0].image;

    // 商品秒杀

    // 重复商品图
    let goodimg = data.data.slice(9);

    for (var i = 0; i < goodimg.length; i++) {
      if (goodimg[i].type == "banner") {
        var bannerItem = goodimg[i].data;
        this.goodsimg.push(bannerItem);
      }
    }

    for (var i = 0; i < goodimg.length; i++) {
      if (goodimg[i].title == "热卖推荐") {
        // var bannerItem = goodimg[i];
        // console.log(bannerItem);
        let goodlistImg = await this.$axios.get(
          "https://api.zxyjsc.com/flyapi/product/skulist?skuIds=" +
            goodimg[i].data +
            "&version=1.0&terminal=3"
        );
        // console.log(goodlistImg);
      }
    }
  },
  methods: {}
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
  font-size: 0.293333rem;
  color: #da053b;
  line-height: 0.293333rem;
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
.buying .buying-right {
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
  height: 9.266667rem;
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

.goodlist .goodlist-flex {
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
