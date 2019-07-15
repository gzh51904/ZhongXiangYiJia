<template>
  <div id="addedit">
    <header id="addedit_header">
      <img
        @click="to_back"
        src="https://www.zxyj.com/static/images/icon-back-black.png"
        alt
        class="addedit-to-back"
      />
      <h2 class="title">新增地址</h2>
    </header>
    <main>
      <div class="Intelligence" style="margin-top: 50px;">
        <ul>
          <li>智能填写地址</li>
          <li>
            <bdo>
              <span>粘贴整段地址，自动识别！</span>
              <span>格式：众大大，18888888888，广东省广州市白云区某某街道某某大厦503号</span>
              <textarea></textarea>
            </bdo>
          </li>
          <li>
            <button class="determine">确定</button>
            <button class="empty emptyNoActive">清空</button>
          </li>
        </ul>
      </div>

      <div class="message" style="margin-top: 5px;">
        <!---->
        <ol>
          <li>
            <bdi>
              <input type="text" placeholder="收货人姓名" />
            </bdi>
          </li>
          <li>
            <bdi>
              <input type="tel" placeholder="手机号码" maxlength="11" />
            </bdi>
          </li>
          <li>
            <bdi>
              <bdo type="text" style="color: rgb(102, 102, 102);">选择省市区</bdo>
              <i class="address"></i>
            </bdi>
          </li>
          <li>
            <textarea placeholder="详细地址:如道路，门牌号，小区，楼栋号，单元室等"></textarea>
          </li>
        </ol>
      </div>

      <div class="chooseLabel">
        <bdo>
          <span>选择标签</span>
          <ul>
            <li v-for="(item,idx ) in Checklist" :key="idx">
              <span
                @click="checklist(item,idx)"
                :class="check_idx==idx ? 'check_active' : ''"
              >{{item.name}}</span>
            </li>

            <li class="addLabel"></li>
          </ul>
        </bdo>
      </div>

      <div class="default">
        <span>设为默认地址</span>
        <i-switch />
      </div>

      <footer class="addedit_footer">
        <button>确定</button>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Checklist: [{ name: "家" }, { name: "代理" }, { name: "公司" }],
      check_idx: -1
    };
  },
  methods: {
    to_back() {
      this.$router.back(-1);
    },
    checklist(item, idx) {
      this.check_idx = idx;
    }
  }
};
</script>
<style>
.SWitch {
  width: 100px;
}
#addedit_header {
  width: 100%;
  line-height: 0.6rem;
  overflow: hidden;
  background: #ffffff;
  position: fixed;
  z-index: 1000;
  top: 0;
}

#addedit_header .title {
  text-align: center;
}
.addedit-to-back {
  position: relative;
  float: left;
  width: 0.293333rem;
  height: 0.333333rem;
  left: 0.133333rem;
  top: 30%;
}
/* 智能写地址 */
.Intelligence {
  width: 100%;
  height: 200px;
  background: #fff;
  transition: 0.8s;
}
.Intelligence > ul {
  width: 90%;
  height: auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: 0 auto;
}
.Intelligence > ul > li:first-child {
  height: 1.066667rem;
  font-size: 0.373333rem;
  -ms-flex-align: center;
  align-items: center;
}
.Intelligence > ul > li {
  width: 100%;
  display: -ms-flexbox;
  display: flex;
}
.Intelligence > ul > li:nth-child(2) > bdo {
  width: 100%;
  height: 100%;
  border-radius: 0.213333rem;
  background: #f2f2f2;
  font-size: 0.373333rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
}
.Intelligence > ul > li:nth-child(2) > bdo > span {
  width: 90%;
  color: #999;
  font-size: 0.32rem;
  margin: 0.266667rem 0.266667rem 0 5%;
}
.Intelligence > ul > li:last-child .determine {
  background: #f22b69;
  color: #fff;
}
.Intelligence > ul > li:last-child > button {
  width: 2.266667rem;
  height: 0.933333rem;
  border: 0;
  outline: none;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
  border-radius: 0.16rem;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 0.373333rem;
  text-align: center;
}
.Intelligence > ul > li:last-child {
  height: 1.6rem;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}
.Intelligence > ul > li:nth-child(2) > bdo > textarea {
  width: 90%;
  height: 80%;
  position: absolute;
  border: none;
  outline: none;
  background: none;
  font-size: 0.373333rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
textarea {
  resize: none;
}
/* 写个人信息 */
.message {
  width: 100%;
  height: auto;
  position: relative;
  background: #fff;
}
.message > ol {
  width: 100%;
  height: auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
}
.message > ol > li:not(:last-child) {
  border-bottom: 0.5px solid #d2d2d2;
}
.message > ol > li {
  width: 100%;
  height: 1.386667rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
}
.message > ol > li > bdi {
  width: 92%;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.message > ol > li > bdi > input {
  -ms-flex: 1;
  flex: 1;
  height: 90%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
  outline: none;
  border: 0;
  font-size: 0.373333rem;
  background: none;
  -ms-flex-align: center;
  align-items: center;
}
.message > ol > li:last-child > textarea {
  width: 92%;
  height: 80%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
  border: 0;
  outline: none;
  font-size: 0.373333rem;
  color: #333;
}
.chooseLabel {
  width: 100%;
  height: auto;
  position: relative;
  background: #fff;
  margin-top: 0.133333rem;
}
.chooseLabel > bdo {
  width: 90%;
  height: auto;
  display: -ms-flexbox;
  display: flex;
  margin: 0 auto;
}
.chooseLabel > bdo > span {
  width: 25%;
  height: 85%;
  font-size: 0.373333rem;
  line-height: 1.3rem;
}
.chooseLabel > bdo > ul {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
}
.chooseLabel > bdo > ul > li {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 0.266667rem;
  position: relative;
  margin-left: 0.266667rem;
}
.chooseLabel > bdo > ul > li > span {
  padding: 0.133333rem 0.266667rem;
  border-radius: 0.533333rem;
  border: 0.013333rem solid #999;
  color: #666;
  font-size: 0.373333rem;
}
.check_active {
  border-radius: 0.533333rem;
  background: #f22b69;
  color: #ffffff !important;
}
.chooseLabel > bdo .addLabel {
  position: relative;
  width: 1.333333rem;
  height: 0.8rem;
  border-radius: 0.533333rem;
  border: 0.013333rem solid #999;
}
.chooseLabel > bdo .addLabel:after,
.chooseLabel > bdo .addLabel:before {
  content: "";
  position: absolute;
  background: #333;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.chooseLabel > bdo .addLabel:after {
  width: 0.026667rem;
  height: 50%;
}
.chooseLabel > bdo .addLabel:before {
  width: 30%;
  height: 0.026667rem;
}
.message > ol > li > bdi > .address {
  background: url(https://www.zxyj.com/static/images/addArrow.png) no-repeat 50%;
  background-size: contain;
}
.message > ol > li > bdi > i {
  width: 0.48rem;
  height: 0.48rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
}
/* 默认地址 */
.default {
  width: 100%;
  margin-top: 0.133333rem;
  height: 1.333333rem;
  background: #fff;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 5%;
}
.default > span {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
  font-size: 0.373333rem;
  color: #2c2b2b;
}

.default > span {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: center;
  align-self: center;
}
.addedit_footer {
  width: 100%;
  height: 1.333333rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0.266667rem 0;
}
.addedit_footer > button {
  width: 90%;
  height: 1.333333rem;
  background: #f22b69;
  border: 0;
  outline: none;
  border-radius: 0.8rem;
  color: #fff;
  font-size: 0.373333rem;
  text-align: center;
}
</style>
