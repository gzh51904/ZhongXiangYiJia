<template>
  <div id="app">
    <header v-show="showed">
      <mt-search cancel-text="取消" placeholder="搜索" class="header-search"></mt-search>
    </header>
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
      showed: false,
      footshow: true,
      len: "",
      toggle: ""
    };
  },
  computed: {
    ...mapState({
      cartlist(state) {
        return state.cart.Cart_goodslist;
      }
    }),
    Cartcount() {
      /* this.len = this.cartlist.length; */
      this.len = 0;
      this.cartlist.forEach(item => {
        this.len += item.qty;
      });
    }
  },
  methods: {
    goto(item, itemName) {
      this.toggle = itemName;
      console.log(this.toggle);

      // console.log("path", item.path);
      console.log(itemName);
    }
  },
  created() {
    /* 刷新后，如果是cart或是mine页面，搜索框都会是隐藏 */
    this.showed =
      this.$router.history.current.path == "/cart" ||
      this.$router.history.current.path == "/mine" ||
      this.$router.history.current.path == "/pay" ||
      this.$router.history.current.path == "/login"
        ? true
        : false;

    // localStorage.setItem("User", "lxw");
    /* 判断有商品是否，显示购物车数量 */
    let token = localStorage.getItem("User");

    // 刷新后保持高亮
    let hash = window.location.hash.slice(1);
    this.toggle = hash;
  },

  components: {
    App
  },
  watch: {
    // $route: function(newVal) {
    //   //里面有路由的信息，根据路由信息做相关处理
    //   let hash = window.location.hash.slice(1);
    //   // 监听当前的路由信息
    //   if (newVal.fullPath == "/cart" || "/mine") {
    //     this.showed = false;
    //   }
    // }
  }
};
</script>

<style scope>
/* -------------- */
a {
  text-decoration: none;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
}

#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

/* 头部 */
header {
  height: 1.066667rem;
}
header .header-search {
  height: 100%;
}
/* 内容区 */
.main {
  flex: 1;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  background: #efeff4;
}

/* 底部四件套 */
footer {
  height: 1.146667rem;
}
.item .item-btn {
  height: 1.146667rem;
  display: flex;
  justify-content: center;
  width: 25%;
  padding-top: 0.133333rem;
  box-sizing: border-box;
  position: relative;
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
}
.badge {
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