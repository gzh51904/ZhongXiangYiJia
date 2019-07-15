<template>
  <div class="personal">
    <div class="personal-header">
      <div class="btn-back" @click="goback"></div>
      <span>个人信息</span>
    </div>
    <p>完善个人资料有优惠活动会为你优先推荐哦</p>
    <div class="head-pos">
      头像
      <img :src="this.headPos" />
      <!-- <form action="server/03-form-upload.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="fileName" />
        <input type="submit" value="上传" />
      </form>-->
      <!-- <form enctype="multipart/form-data" name="fileName">
        <input type="file" name="fileName" />
        <button @click="upload">上传</button>
         <button value="上传" @click="upload" /> 
      </form>-->
      <form name="item-form" ref="posform">
        <input type="file" name="fileName" />
      </form>
      <button style="z-index:1;" @click="upload">上传</button>
    </div>
    <ul>
      <li>
        昵称
        <span>未设置 ></span>
      </li>
      <li>
        用户ID
        <span>21402650656</span>
      </li>
      <li>
        会员等级
        <span>SV1</span>
      </li>
      <li>
        boss
        <span>雪儿 ></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headPos: "user-login-portrait.png",
      formname: "item-form"
    };
  },
  methods: {
    upload() {
      let data = new FormData(this.$refs.posform);
      this.$axios.post("http://localhost:1904/upload/avatar", {
        data: "data"
      });
    },
    // 退回我的页面
    goback() {
      this.$router.replace({ name: "Mine" });
    }
  },
  created() {
    this.headPos = require("../assets/img/" + this.headPos);
  }
};
</script>
<style scoped>
.personal {
  height: 100%;
  font-size: 0.426667rem;
}
/* personal-header  */
.personal-header {
  text-align: center;
  line-height: 1.28rem;
  height: 1.28rem;
  position: relative;
  background: #ffffff;
}
.personal-header .btn-back {
  position: absolute;
  width: 1.173333rem;
  height: 1.173333rem;
  background: url(../assets/img/icon-back-black.png) no-repeat;
  background-size: 0.4rem 0.466667rem;
  background-position: center center;
}
.personal-header span {
  font-size: 0.426667rem;
}
/* p  */
.personal p {
  height: 1.146667rem;
  line-height: 1.146667rem;
  background: #fd84af;
  color: #fff;
  padding-left: 0.506667rem;
  font-size: 0.373333rem;
}
/* head-pos */
.personal .head-pos {
  width: 10rem;
  height: 2.186667rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
}
.personal .head-pos img {
  width: 1.653333rem;
  height: 1.653333rem;
}

/* ul */
.personal ul {
  padding: 0 0.4rem;
  margin-top: 0.266667rem;
  background: #ffffff;
}
.personal ul li {
  height: 1.2rem;
  border-bottom: 0.013333rem solid #e6e3e3;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.personal ul li span {
  color: #999;
}
</style>


