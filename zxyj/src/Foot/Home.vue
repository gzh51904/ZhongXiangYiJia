<template>
  <div class="content">
    <!-- 轮播图 -->
    <div class="header">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="itemImg in banner" :key="itemImg.image">
          <img :src="itemImg.image" class="header-img" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 四宫格 -->
    <div class="fourIcon">
      <ul class="fourIcon-item">
        <li v-for="itemFont in fourIcon" class="fourIcon-item-list" :key="itemFont.label">
          <img :src="itemFont.icon" />
          <p>{{itemFont.label}}</p>
        </li>
      </ul>
    </div>
    <!-- banner图 -->
    <div class="home-brand">
      <div v-for="(item, index) in brand" :key="index" @click="gotoBrand(item.target)">
        <div class="brand">
          <img :src="item.image" alt />
        </div>
      </div>
    </div>
    <!-- 抢购专区 -->
    <div class="buying" v-bind:style="{backgroundImage:'url(' + buyings.image + ')'}">
      <div class="buying-left" v-for="(buyingsclick,idx) in buying" :key="idx"></div>
    </div>
    <!-- 冰点 -->
    <div class="ice">
      <div v-for="(item, index) in ice" :key="index" class="ice-item">
        <div class="ice-banner">
          <img :src="item.image" alt />
        </div>
        <div class="ice-box">
          <div
            class="ice-img"
            v-for="(item) in ices[index]"
            :key="item.id"
            v-bind:style="{backgroundImage:'url(' + item.image + ')'}"
          >
            <div class="ice-click" ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 秒杀 -->
    <div class="secondKill">
      <div class="secondKill-top">
        <div class="secondKill-title">
          <ul>
            <li>
              <img src="../img/icon.png" alt />
            </li>
            <li>超级秒杀</li>
            <li style=" font-weight: 600; font-size: .4rem">·</li>
            <li>距结束</li>
            <li></li>
          </ul>
        </div>
        <div class="secondKill-more">
          <span>查看更多</span>
          <div>
            <img src="../img/moreIcon.png" alt />
          </div>
        </div>
      </div>
      <div class="secondKill-bottom">
        <div class="secondKill-box">
          <div class="flex">
            <dl
              v-for="(item, index) in secondKill.secondKillProducts"
              :key="index"
              class="secondKill-item"
              @click="gotoitem(item.skuId,item.productId)"
            >
              <dd class="secondKill-image">
                <img :src="item.thumbUrl" alt />
              </dd>
              <dt class="secondKill-msg">
                <div>
                  <h3>{{item.skuName}}</h3>
                </div>
                <div>
                  <p>{{(item.retailPrice/100).toFixed(2)}}</p>
                  <p>
                    <del>{{(item.marketPrice/100).toFixed(2)}}</del>
                  </p>
                </div>
              </dt>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <!-- 品牌循环 -->
    <div class="goodsbrand">
      <div>
        <div v-for="item in goodsbrandimg" :key="item.data.target" class="goodsbrand-img">
          <div class="goodsbrand-top">
            <img :src="item.data.image" />
          </div>
          <div class="goodsbrand-middle">
            <div class="goodsbrand-middle-hot">热卖推荐</div>
            <div class="goodsbrand-middle-more">
              <p>更多</p>
              <div style="float:right">
                <img src="../img/icon-back-black.png" alt />
              </div>
            </div>
          </div>
          <div class="goodsMAX">
            <div class="flex">
              <div class="goodsbrand-goods" v-for="(item, index) in item.goods" :key="index">
                <div class="secondKill-box">
                  <div>
                    <dl class="secondKill-item" @click="gotoitem(item.skuId,item.productId)">
                      <dd class="secondKill-image">
                        <img v-lazy="item.thumbUrl" alt />
                      </dd>
                      <dt class="secondKill-msg">
                        <div>
                          <h3>{{item.skuName}}</h3>
                        </div>
                        <div>
                          <p>{{item.retailPrice}}</p>
                          <p>
                            <del>{{item.marketPrice}}</del>
                          </p>
                        </div>
                      </dt>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 礼包盒子 -->
    <div class="pack">
      <img src="../img/suspend-sv3.gif" alt />
    </div>
    <div class="copy">
      <p>没有更多了哦</p>
      <a href="http://www.beian.miit.gov.cn/">粤ICP备18116952号</a>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import "../css/Home.css";
import { Swipe, SwipeItem, Lazyload, Popup } from "mint-ui";
Vue.component(
  Swipe.name,
  Swipe,
  Popup.name,
  Popup,
  SwipeItem.name,
  SwipeItem,
  Lazyload
);

export default {
  data() {
    return {
      banner: [],
      fourIcon: [],
      brand: [],
      buying: [],
      buyings: [],
      ice: [],
      ices: [],
      secondKill: [],
      goodsbrand: [],
      goodsbrandimg: []
    };
  },

  async created() {
    // 发起请求
    var { data } = await this.$axios.get(
      "http://18.139.229.218:3000/goodslist"
    );

    // 数据赋值
    let itemlist = data.data[0].itemList[0];

    let goodsbrand = [];

    let url = [];

    let hotgood = [];
    itemlist.map(item => {
      // 筛选热卖推荐的商品
      if (item.title == "热卖推荐") {
        return goodsbrand.push(item);
      }
      // 推荐热卖推荐商品的图片
      if (item.height == "290") {
        return this.goodsbrandimg.push(item);
      }
      // 轮播图
      if (item.type == "carousel") {
        this.banner.push(item.data);
        return (this.banner = this.banner[0]);
      }
      // 四宫格
      if (item.type == "links") {
        this.fourIcon.push(item.data);
        return (this.fourIcon = this.fourIcon[0]);
      }
      // 品牌特区
      if (item.type == "banner" && item.height == "266") {
        return this.brand.push(item.data);
      }
      if ((item.type = "customImg")) {
        return hotgood.push(item.data);
      }
    });
    this.buying = hotgood[0];
    this.buyings = this.buying[0];
    this.ice.push(hotgood[1], hotgood[3]);
    this.ices.push(hotgood[2], hotgood[4]);

    // 把品牌所有的产品id遍历出来
    goodsbrand.map(item => {
      return url.push(item.data);
    });

    url.map(async (item, idx) => {
      // 发起ajax请求对应品牌的商品
      let {
        data: { data }
      } = await this.$axios.get(
        `https://api.zxyjsc.com/flyapi/product/skulist?skuIds=${item}&version=1.0&terminal=3`
      );
      // 合并老旧对象
      Object.assign(this.goodsbrandimg[idx], { goods: data });
    });

    // 秒杀商品
    var {
      data: { data }
    } = await this.$axios.get(
      "https://api.zxyjsc.com/flyapi/secondKill/getIndexSecondKill?version=1.0&terminal=3"
    );
    this.secondKill.push(data);
    this.secondKill = this.secondKill[0];
  },
  methods: {
    // // 四宫格点击
    // gotoFour(target) {
    //   this.$router.push({ name: "Uplibao", params: { target } });
    // },
    // 官方品牌点击
    gotoBrand(target) {
      this.$router.push({ name: "Brand", params: { target } });
    },
    // 点击产品
    gotoitem(skuId, productId) {
      this.$router.push({ name: "Gooditem", params: { skuId, productId } });
    }
  }
};
</script>
<style scoped>
</style>