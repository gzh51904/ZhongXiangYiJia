<template>
  <div>
    <Form
      :model="formRight"
      label-position="right"
      :label-width="80"
      ref="formValidate"
      :rules="ruleValidate"
    >
      <FormItem label="商品名字" prop="skuName">
        <Input v-model="formRight.skuName" type="text" />
      </FormItem>
      <FormItem label="商品价格" prop="retailPrice">
        <Input v-model="formRight.retailPrice" type="text" />
      </FormItem>
      <FormItem label="商品ID" prop="productId">
        <Input v-model="formRight.productId" type="text" />
      </FormItem>
          <FormItem label="商品图片" prop="thumbUrl">
        <Input v-model="formRight.thumbUrl" type="text" />
      </FormItem>
      <FormItem>
        <Button type="primary">修改</Button>
        <Button style="margin-left: 8px">取消</Button>
        <Button type="primary" style="margin-left: 8px" @click="addgood(formRight)">添加</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formRight: {
        skuName: "",
        retailPrice: "",
        productId: "",
        thumbUrl:""
      },
      ruleValidate: {
        skuName: [
          { required: true, message: "请填写商品名字", trigger: "blur" }
        ],
        retailPrice: [
          { required: true, message: "请填写商品价格", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "请填写商品ID", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addgood(formRight) {
      // let validatePass = (rule, value, callback) => {
      //   if (value === "") {
      //     callback(new Error("Please enter your password"));
      //   } else {
      //     if (this.formCustom.passwdCheck !== "") {
      //       // 对第二个密码框单独验证
      //       this.$refs.formCustom.validateField("passwdCheck");
      //     }
      //     callback();
      //   }
      // };
      //   let formRight = this.formRight;
      //   this.$store.state.cart.ChangeCart.push(formRight);
      //   this.$router.push({ name: "Goodlist" });

      let { skuName, retailPrice, productId,thumbUrl } = formRight;
      //   先检查该商品是否已经存在;
      this.$axios
        .get("http://3.112.200.192:1904/goodslist/check", {
          params: { productId }
        })
        .then(({ data }) => {
          if (data.code == 1000) {
            alert("该商品已经存在");
          } else {
            //  该商品不存在，则发起post请求添加商品
            this.$axios
              .post("http://3.112.200.192:1904/goodslist", {
                skuName,
                retailPrice,
                productId,
                thumbUrl
              })
              .then(({ data }) => {
                if (data.code == 1000) {
                  alert("添加成功");
                  this.$router.push("/goodlist")
                } else {
                  alert("添加失败");
                }
              });
          }
        });
    }
  }
};
</script>