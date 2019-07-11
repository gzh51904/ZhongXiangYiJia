<template>
  <div id="app">
    <header v-show="dishide">
      <mt-search cancel-text="取消" placeholder="搜索" class="header-search"></mt-search>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer v-show="dishide">
      <ul class="item">
        <a v-for="item in pages" :key="item.name" class="item-btn" @click="goto(item)">
          <mt-badge
            type="error"
            size="small"
            v-if="item.name=='Cart'"
            class="badge"
            v-show="logined"
          >3</mt-badge>
          <router-link :to="item.path" class="active-title">
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
      dishide: true
    };
  },
  components: {
    App
  },
  //进行判断当fullpath为home或者分类的时候。让底部栏和搜索框隐藏，否则显示
  watch: {
    $route(val) {
      if (val.fullPath == "/home" || val.fullPath == "/classify") {
        this.dishide = true;
      } else {
        this.dishide = false;
      }
      console.log(val);
    }
  },
  methods: {
    goto(item) {
      /* 点击的页面是cart或是mine页面，搜索框都会是隐藏 */
      this.showed = item.path == "/cart" || item.path == "/mine" ? true : false;
      console.log(item.path);

      /* 测试，设置假的User用户 */
      localStorage.setItem("User", "LXW");
    }
  },
  created() {
    /* 刷新后，如果是cart或是mine页面，搜索框都会是隐藏 */
    // this.showed =
    //   this.$router.history.current.path == "/cart" ||
    //   this.$router.history.current.path == "/mine" ||
    //   this.$router.history.current.path == "/login"
    //     ? true
    //     : false;
    /* 判断登录是否，登录显示购物车数量 */
    let token = localStorage.getItem("User");
    this.logined = token ? true : false;
  }
};
</script>

<style scope>
a {
  text-decoration: none;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.badge {
  /*   width: .266667rem;
  height:.266667rem; */
  border-radius: 50%;
  font-size: 0.16rem;
  text-align: center;
  line-height: 0.266667rem;
  position: absolute;
  right: 0.4rem;
  top: 0rem;
}
.mint-searchbar {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgb(167, 82, 82);
  border-radius: 2px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 28px;
  padding: 3px 6px;
  height: 100%;
}
ul li {
  list-style: none;
}

#app {
  height: 100%;
  /* width: 100%; */
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
.mint-searchbar {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: white;
  border-radius: 2px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 28px;
  padding: 3px 6px;
  height: 100%;
}

/* 内容区 */
main {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
</style>