<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <div>
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">11111</div>
            <div class="layout-nav">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>Item 1
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>Item 2
              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>Item 3
              </MenuItem>
              <MenuItem name="4">
                <Icon type="ios-paper"></Icon>Item 4
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Layout :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
            <Layout>
              <Sider hide-trigger :style="{background: '#fff'}">
                <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                  <Submenu name="1">
                    <template slot="title">
                      <Icon type="ios-navigate"></Icon>商品管理
                    </template>
                    <MenuItem name="1-1" @click.native.stop="goto()">主页商品</MenuItem>
                    <MenuItem name="1-2" @click.native.stop="goto1()">分类商品</MenuItem>
                    <MenuItem name="1-3" @click.native.stop="goto2()">分类子商品</MenuItem>
                    <MenuItem name="1-4" @click.native.stop="goto3()">添加商品</MenuItem>
                    <MenuItem name="1-5" @click.native.stop="goto4()">修改商品</MenuItem>
                  </Submenu>
                  <Submenu name="2">
                    <template slot="title">
                      <Icon type="ios-keypad"></Icon>订单管理
                    </template>
                    <MenuItem name="2-1">已完成订单</MenuItem>
                    <MenuItem name="2-2">待完成订单</MenuItem>
                  </Submenu>
                  <Submenu name="3">
                    <template slot="title">
                      <Icon type="ios-analytics"></Icon>用户管理
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
                  </Submenu>
                </Menu>
              </Sider>
              <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                <router-view></router-view>
              </Content>
            </Layout>
          </Content>
        </Layout>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goto() {
      console.log("123213");

      this.$router.push("/goodlist");
    },
    goto1() {
      console.log("222");

      this.$router.push("/fenleilist");
    },
    goto2() {
      console.log("3333");

      this.$router.push("/fenchild");
    },
    goto3() {
      this.$router.push("/changelist");
    },
    goto4() {
      this.$router.push("/addlist");
    }
  }
};
</script>
<style>
.layout .layout-logo {
  background: url("../img/logo.gif") center no-repeat;
  background-size: contain;
  width: 250px;
  height: 53px;
  top: 3px;
}
</style>
