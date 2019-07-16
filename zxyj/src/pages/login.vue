<template>
  <div class="login">
    <div class="login-header">
      <div class="btn-back" v-show="showed"></div>
      <div class="btn-back" v-show="!showed" @click="changeFrom"></div>
      <span>{{title}}</span>
    </div>
    <div class="header">
      <div class="login-logo"></div>
      <span>Welcome</span>
    </div>
    <!-- 登录 -->
    <transition name="slide-fade">
      <div class="user-login-box" v-show="showed">
        <ul>
          <li>
            <i class="phone-icon"></i>
            <input type="text" placeholder="请输入手机号" v-model="userform.username" />
          </li>
          <li>
            <i class="password-icon"></i>
            <input type="password" placeholder="请输入密码" v-model="userform.password" />
          </li>
          <li class="last">
            <div class="no-login">
              <i></i>
              7天免登录
            </div>
            <div>忘记密码？</div>
          </li>
          <!-- <span class="fail-notice">用户名或密码错误</span> -->
          <button @click="submitFormLogin">登录</button>
        </ul>
        <div class="user-login-btn">
          <span class="reg-btn" @click="changeFrom">立即注册</span>
          |
          <span class="login-btn">免密登录</span>
        </div>
      </div>
    </transition>
    <!-- 注册 -->
    <transition name="slide-fade">
      <div class="user-reg-box" v-show="!showed">
        <ul>
          <li>
            <i class="phone-icon"></i>
            <input type="text" placeholder="请输入手机号" v-model="userform.username" />
          </li>
          <li>
            <i class="authcode-icon"></i>
            <input type="text" placeholder="验证码" v-model="userform.authCode" />
            <button class="auth-code" @click="getCode">{{yanText}}</button>
          </li>
          <li>
            <i class="password-icon"></i>
            <input type="text" placeholder="密码" v-model="userform.password" />
          </li>
          <li>
            <i class="checkpass-icon"></i>
            <input type="text" placeholder="确认密码" v-model="userform.checkPass" />
          </li>
          <p>{{notice}}</p>
          <button @click="submitFormReg">注册</button>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userform: {
        username: "",
        password: "",
        checkPass: "",
        authCode: ""
      },
      showed: true,
      title: "登录",
      fousState: false,
      notice: "密码请输入以字母开头，长度6-16之间，只能包含字母、数字和下划线",
      yanZhenm: "",
      yanText: "获取验证码",
      check: {
        phonecheck: false,
        yanZhenmcheck: false,
        passwordcheck: false
      }
    };
  },
  methods: {
    // 登录
    submitFormLogin() {
      let { username, password } = this.userform;
      this.$axios
        .post("http://3.112.200.192:1904/login", {
          username,
          password
        })
        .then(({ data }) => {
          if (data.code == 250) {
            alert("用户名或密码错误！");
          } else if (data.code === 1000) {
            // 保存登录信息
            localStorage.setItem("Authorization", data.data);
            localStorage.setItem("Username", username);
            // 获取目标路径
            let targetPath = this.$route.query.redirectTo;
            // console.log("目标路径：", targetPath);
            this.$router.replace(targetPath ? targetPath : "/home");
          }
        });
    },

    // 获取验证码
    getCode() {
      let yanZhen = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M"
      ];
      let len = yanZhen.length;
      let num1 = yanZhen[parseInt(Math.random() * len)];
      let num2 = yanZhen[parseInt(Math.random() * len)];
      let num3 = yanZhen[parseInt(Math.random() * len)];
      let num4 = yanZhen[parseInt(Math.random() * len)];
      this.yanZhenm = num1 + num2 + num3 + num4;
      // 手机格式是否正确
      // 正则
      let phoneReg = /^1[3-9]\d{9}$/;
      if (phoneReg.test(this.userform.username)) {
        // 发起请求，检查该用户是否已存在
        this.$axios
          .get("http://3.112.200.192:1904/reg/check", {
            params: {
              username: this.userform.username
            }
          })
          .then(({ data }) => {
            if (data.code == 250) {
              this.phonecheck = true;
              this.yanText = `区分大小写：${this.yanZhenm}`;
              this.notice =
                "密码请输入以字母开头，长度6-16之间，只能包含字母、数字和下划线";
            } else if (data.code === 1000) {
              this.notice = "该用户已存在";
            }
          });
      } else {
        this.notice = "手机格式不正确,请输入正确的手机号获取验证码";
      }
    },

    // 注册
    submitFormReg() {
      // 正则
      let passwordReg = new RegExp("^[a-zA-Z]\\w{4,14}$");

      let { username, password, checkPass, authCode } = this.userform;
      let { yanZhenmcheck, passwordcheck } = this.check;

      // 验证码是否正确
      if (authCode == this.yanZhenm) {
        yanZhenmcheck = true;
      }

      //密码格式是否正确并且次密码是否一致
      if (passwordReg.test(password)) {
        if (checkPass == password) {
          passwordcheck = true;
        }
      }
      // 三者都为ture才能发起请求
      if (yanZhenmcheck && this.phonecheck && passwordcheck) {
        this.$axios
          .post("http://3.112.200.192:1904/reg", { username, password })
          .then(({ data }) => {
            if (data.code == 1000) {
              // this.$router.replace({ name: "Login" });
              this.showed = !this.showed;
              this.notice = "注册成功";
              this.yanZhenm = "";
            }
          });
      } else if (passwordReg.test(password) && !passwordcheck) {
        this.notice = "两次密码输入不一致";
      } else if (!yanZhenmcheck) {
        this.notice = "验证码错误";
      } else if (!passwordReg.test(password)) {
        this.notice =
          "密码格式错误!!!请输入以字母开头，长度6-16之间，只能包含字母、数字和下划线";
      }
    },

    // 切换注册登录界面
    changeFrom() {
      this.showed = !this.showed;
      this.showed ? (this.title = "登录") : (this.title = "注册");
    }
  }
};
</script>
<style scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.btn-back {
  position: absolute;
  width: 1.173333rem;
  height: 1.173333rem;
  background: url(../assets/img/icon-back-black.png) no-repeat;
  background-size: 0.4rem 0.466667rem;
  background-position: center center;
}
ul i {
  width: 0.4rem;
  height: 0.64rem;
  margin: 0 0 0.096rem 0.32rem;
}
.phone-icon {
  background: url(../assets/img/user-login-phone.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.password-icon {
  background: url(../assets/img/user-login-pass.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.authcode-icon {
  background: url(../assets/img/user-reg-verCode.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.checkpass-icon {
  background: url(../assets/img/user-reg-compass.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
/* --------------------------------------------------------------------- */

.login {
  height: 100%;
  background: #ffffff;
}
/* login-header  */
.login-header {
  text-align: center;
  line-height: 1.28rem;
  height: 1.28rem;
  position: relative;
}
.login-header span {
  font-size: 0.426667rem;
}

/* header */
.header {
  height: 6.2rem;
  background: url(../assets/img/loginTopBac.png);
  background-size: contain;
  background-repeat: no-repeat;
  /* margin-top: 0.066667rem; */
  position: relative;
}
.header .login-logo {
  width: 2.986667rem;
  height: 2.986667rem;
  background: url(../assets/img/user-login-portrait.png);
  background-size: contain;
  position: absolute;
  top: 3.733333rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.header span {
  font-size: 0.426667rem;
  font-weight: 9.333333rem;
  position: absolute;
  top: 6.666667rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
/* user-login-box  -----------------------------------------------------*/
.user-login-box {
  height: 10rem;
  background: url(../assets/img/user-login-box.png);
  background-size: 100%, 100%;
  background-repeat: no-repeat;
  margin-top: -1.466667rem;
  position: relative;
}
.user-login-box ul {
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 6.72rem;
  height: 5.566667rem;
  position: absolute;
  margin-top: 3rem;
  left: 50%;
  transform: translateX(-50%);
}
.user-login-box ul li {
  height: 1.173333rem;
  display: flex;
  margin-top: 0.32rem;
  align-items: flex-end;
  border-bottom: 0.013333rem solid #acacac;
}

.user-login-box ul input {
  margin-left: 0.96rem;
  width: 4.693333rem;
  height: 0.693333rem;
  border: none;
  margin-bottom: 0.096rem;
  font-size: 0.426667rem;
}
.user-login-box ul input::-webkit-input-placeholder {
  font-size: 0.4rem;
}
.user-login-box ul > .fail-notice {
  position: absolute;
  bottom: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.133333rem;
  font-size: 0.32rem;
  color: #ef3077;
}
.user-login-box ul > button {
  position: absolute;
  bottom: -0.133333rem;
  border: none;
  color: #ffffff;
  font-size: 0.373333rem;
  width: 6.4rem;
  height: 1.28rem;
  border-radius: 0.64rem;
  background: linear-gradient(90deg, #f22b96, #d264f7);
  box-shadow: 1px 4px 8px rgba(243, 42, 105, 0.57);
}
.user-login-box ul .last {
  border: none;
  font-size: 0.373333rem;
  color: #acacac;
  justify-content: space-between;
  align-items: flex-start;
}
.user-login-box ul .last .no-login {
  display: flex;
}
.user-login-box ul .last .no-login i {
  width: 0.54rem;
  height: 0.54rem;
  border: 1px solid;
  border-radius: 50%;
  margin: 0 0.133333rem 0.096rem 0.24rem;
}
.user-login-box .user-login-btn {
  position: absolute;
  bottom: -0.133333rem;
  color: #acacac;
  font-size: 0.426667rem;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
}
.user-login-box .user-login-btn span {
  padding: 2px 10px;
}

/* user-reg-box ---------------------------------------------------*/
.user-reg-box {
  height: 11.733333rem;
  background: url(../assets/img/user-login-box.png);
  background-size: 100% 11.733333rem;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: -1.466667rem;
  position: relative;
}
.user-reg-box ul {
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 6.72rem;
  height: 8rem;
  position: absolute;
  margin-top: 2.666667rem;
  left: 50%;
  transform: translateX(-50%);
}
.user-reg-box ul li {
  border-bottom: 1px solid #acacac;
  height: 1.173333rem;
  display: flex;
  margin-top: 0.32rem;
  align-items: flex-end;
}
.user-reg-box ul li .auth-code {
  outline: none;
  border-radius: 2rem;
  border: 0.026667rem solid #ef3077;
  color: #ef3077;
  position: absolute;
  top: 25%;
  right: 2%;
  background: #fff;
  padding: 0.192rem 0.32rem;
}
.user-reg-box ul p {
  margin-top: 0.133333rem;
  font-size: 0.32rem;
  color: #ef3077;
}

.user-reg-box ul input {
  margin-left: 0.96rem;
  width: 4.693333rem;
  height: 0.693333rem;
  border: none;
  margin-bottom: 0.096rem;
  font-size: 0.426667rem;
}
.user-reg-box ul input::-webkit-input-placeholder {
  font-size: 0.4rem;
}

.user-reg-box ul > button {
  position: absolute;
  bottom: -0.466667rem;
  border: none;
  color: #ffffff;
  font-size: 0.373333rem;
  width: 6.4rem;
  height: 1.28rem;
  border-radius: 0.64rem;
  background: linear-gradient(90deg, #f22b96, #d264f7);
  box-shadow: 1px 4px 8px rgba(243, 42, 105, 0.57);
}
</style>

