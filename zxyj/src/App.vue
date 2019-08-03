<template>
  <div id="app">
      <!-- <header v-show="showed">
      <input type="text"   @click="gotoSearch" class="header-search" placeholder="想要买点什么" ref="header" />
      <div class="header-msg">
        <i class="iconfont icon-xiaoxi"></i>
        <p>消息</p>
      </div>
    </header> -->
    <main class="main">
      <router-view></router-view>
    </main>
    <footer v-show="footshow">
      <ul class="item">
        <a
          v-for="item in pages"
          :key="item.name"
          class="item-btn"
          @click="goto(item,item.path)"
          :class="{toggle:toggle==item.path}"
        >
          <mt-badge
            type="error"
            size="small"
            v-if="item.name=='Cart'"
            class="badge"
            v-show="len>0"
            v-bind="Cartcount"
            v-model="len"
          >{{len}}</mt-badge>
          <router-link :to="item.path">
            <li>
              <i class="iconfont" :class=" item.font"></i>
              <p class="footer-item-font-size">{{item.title}}</p>
            </li>
          </router-link>
        </a>
      </ul>
    </footer>
  </div>
</template>
<script>
import Vue from "vue";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import App from "./App.vue";
import css from "./font/iconfont.css";
import rem from "./rem/rem.js";
import { Badge } from "mint-ui";
import { mapState } from "vuex";

Vue.use(MintUI);
Vue.component(Badge.name, Badge);
export default {
  name: "app",
  data() {
    return {
      myData: [],
      v1: "",
      pages: [
        {
          title: "首页",
          path: "/home",
          name: "Home",
          font: "icon-shouye"
        },
        {
          title: "分类",
          path: "/classify",
          name: "Classify",
          font: "icon-ziyuan"
        },
        {
          title: "购物车",
          path: "/cart",
          name: "Cart",
          font: "icon-gouwuche"
        },
        {
          title: "我的",
          path: "/mine",
          name: "Mine",
          font: "icon-wode"
        }
      ],
      // showed: false,
      footshow: true,
      len: "",
      toggle: "/home"
    };
  },
  computed: {
    ...mapState({
      cartlist(state) {
        return state.cart.Cart_goodslist;
      }
    }),
    Cartcount() {
      this.len = 0;
      this.cartlist.forEach(item => {
        this.len += item.qty;
      });
    }
  },
  methods: {
    // isShow() {
    //   let path = this.$router.history.current.path;
    //   this.showed = path == "/home" || path == "/classify" ? true : false;
    // },
    goto(item, itemName) {
      this.toggle = itemName;
    },
    // gotoSearch() {
    //   this.$router.push("/search")
    //   this.isShow();
    // }
  },
  created() {
    /* 刷新后，如果是cart或是mine页面，搜索框都会是隐藏 */
    // this.isShow();
    localStorage.setItem("User", "lxw");
    /* 判断有商品是否，显示购物车数量 */
    let token = localStorage.getItem("User");

    // 刷新后保持高亮
    let hash = window.location.pathname;
    this.toggle = hash;
  },
  components: {
    App
  }
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

/* 头部 */
/* header {
  width: 100%;
  position: fixed;
  z-index: 666;
  padding: 7px 0;
  background: white;
  z-index: 9999;
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
} */

/* 内容区 */
.main {
  flex: 1;
  overflow: auto;
  width: 100%;
  background: #efeff4;
}

/* 底部四件套 */
footer {
  height: 1.5rem;
}

.item {
  width: 100%;
  display: flex;
}

.item .item-btn {
  height: 1.146667rem;
  display: flex;
  justify-content: center;
  width: 25%;
  padding-top: 0.133333rem;
  box-sizing: border-box;
  position: relative;
  text-align: center;
}

.item .badge {
  border-radius: 50%;
  font-size: 0.16rem;
  text-align: center;
  line-height: 0.266667rem;
  position: absolute;
  right: 30%;
  top: 0rem;
}

.item .item-btn .iconfont {
  font-size: 0.506667rem;
  color: #101010;
}

.item .item-btn .active-title {
  width: 100%;
  height: 100%;
  text-align: center;
}

.item .item-btn .footer-item-font-size {
  color: #7c7e86;
  font-size: 0.24rem;
}

.item .toggle .iconfont {
  color: red;
}
</style>