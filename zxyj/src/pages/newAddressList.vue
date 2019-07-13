<template>
  <div id="address">
    <header id="newaddress_header">
      <img @click="to_pay"
        src="https://www.zxyj.com/static/images/icon-back-black.png"
        alt
        class="newaddress-to-pay"
      />
      <h2 class="title" v-show="click">管理地址</h2>
      <div class="searchBox" style="width: 65%; display: flex;">
        <input type="text" placeholder="请输入姓名/电话/地址" v-show="!click" />
      </div>
      <div class="header-right">
        <div @click="clickTosearch">
          <span v-show="click">
            <img
              src="https://www.zxyj.com/static/images/addressSearch.png"
              alt
              class="newaddress-to-search"
            />
          </span>
          <span v-show="!click">搜索</span>
        </div>
      </div>
      <div class="labelBox" style="height: 50px;" v-show="!click">
        <i class="line" style="height: 1px; width: 100%;"></i>
        <ul style="width: 265px;">
          <li v-for="(item,idx) in list" :key="idx" @click="select(idx)" >{{item.name}}</li>
        </ul>
      </div>
    </header>
    <footer>添加地址</footer>
  </div>
</template>
<script>
import Vue from "vue";
export default {
    
  data() {
    return {
        Newlist:{},
      list: [{ id:0,name: "家" }, { id:1,name: "代理" }, { id:2,name: "公司" }],
      click: true,
  
    };
  },
  methods: {
    clickTosearch() {
      this.click = false;
    },
    select(idx) {
      console.log(idx);
      
    },to_pay(){/* 返回上一级 */
      this.$router.back(-1);
   
    }
  },created(){
     
  }
};
</script>
<style scope>
#newaddress_header {
  width: 100%;
  line-height: 0.6rem;
  overflow: hidden;
  background: #ffffff;
  position: fixed;
  z-index: 1000;
  top: 0;
}

#newaddress_header .title {
  text-align: center;
}
.newaddress-to-pay {
  position: relative;
  float: left;
  width: 0.293333rem;
  height: 0.333333rem;
  left: 0.133333rem;
  top: 30%;
}
.newaddress-to-search {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 5%;
}
.header-right {
  position: absolute;
  top: 0.266667rem;
  right: 0.266667rem;
  float: right;
}
h2 {
  font-size: 0.48rem;
  line-height: 45px;
}
#address footer {
  width: 100%;
  height: 1.173333rem;
  background: #f8246f;
  position: fixed;
  bottom: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
  font-size: 0.373333rem;
  z-index: 1;
}
.searchBox {
  height: 78%;
  position: relative;
  top: 10%;
  border-radius: 0.533333rem;
  background: #f2f2f2;
  -ms-flex-item-align: center;
  align-self: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  margin: auto;
}
.searchBox > input {
  font-size: 14px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
}

.searchBox > input {
  width: 82%;
  height: 80%;
  border: 0;
  outline: none;
  background: none;
}
.labelBox {
  width: 100%;
  height: auto;
  background: #fff;
  position: fixed;
  overflow: hidden;
  overflow-x: auto;
  display: -ms-flexbox;
  display: flex;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
  top: 1.2rem;
}
.line {
  width: 100%;
  background: #d2d2d2;
  position: absolute;
  top: 0;
}
.labelBox > ul {
  height: 0.8rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
}
.labelBox > ul > li {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 0.373333rem;
  background: #f2f2f2;
  width: 2rem;
  height: 0.8rem;
  margin-left: 0.266667rem;
  font-size: 0.32rem;
}
</style>