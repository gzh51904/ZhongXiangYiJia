# zxyj
###上线网址
+ http://3.112.200.192:1905/


### github地址
 + git@github.com:gzh51904/ZhongXiangYiJia.git

### 项目名称
+ 众享亿家
+ 项目官网：https://www.zxyj.com/main/home

### 负责模块说明
```
组长：詹逸敏
成员：蔡显文、梁先文、简丽琼
```
蔡显文：首页模块、爬取数据存数据库、详情页
```
梁先文：购物车功能、后台订单页面、订单地址、修复详情页bug
```
简丽琼：登陆注册页面、token实现、我的、后台接口
```
詹逸敏：列表详情模块、分类商品列表、后台页面及跳转
```

+ 问题：
    - 1、搜索框时有时无
    - 2、购物车刷新就消失，购物车还没有关联数据库
    - 3、时间问题，数据库就存了部分商品
### 项目目录
```
│  App.vue
│  main.js
│  
├─assets
│  └─img
│          consumption.png
│          coupon.png
│          fightGroups.png
│          follow.png
│          HotSaleList.png
│          icon-back-black.png
│          icon-order-comment.png
│          icon-order-dispatched.png
│          icon-order-paid.png
│          icon-order-service.png
│          icon-order-unpay.png
│          loginTopBac.png
│          msg.png
│          myPageBackground.png
│          seckill.png
│          setting.png
│          sGradeIcon1.png
│          signtow.png
│          team.png
│          user-login-box.png
│          user-login-pass.png
│          user-login-phone.png
│          user-login-portrait.png
│          user-reg-compass.png
│          user-reg-verCode.png
│          
├─config
│      index.js
│      
├─font
│      demo.css
│      demo_index.html
│      iconfont.css
│      iconfont.eot
│      iconfont.js
│      iconfont.svg
│      iconfont.ttf
│      iconfont.woff
│      iconfont.woff2
│      
├─Foot
│      Cart.vue
│      Classify.vue
│      Home.vue
│      Mine.vue
│      
├─Home
│      Brand.vue
│      Uplibao.vue
│      
├─img
│      icon-back-black.png
│      
├─js
├─pages
│      AddEdit.vue
│      Fydess.vue
│      Fylist.vue
│      Gooditem.vue
│      login.vue
│      newAddressList.vue
│      pay.vue
│      personal.vue
│      product.vue
│      
├─rem
│      rem.js
│      
├─router
│      index.js
│      
└─vuex
    │  actions.js
    │  getters.js
    │  index.js
    │  mutations.js
    │  
    └─modules
            cart.js
            common.js
            
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
