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
        <Input v-model="formRight.skuName" type="text"></Input>
      </FormItem>
      <FormItem label="商品价格" prop="retailPrice">
        <Input v-model="formRight.retailPrice" type="text"></Input>
      </FormItem>
      <FormItem label="商品ID" prop="productId">
        <Input v-model="formRight.productId" disabled  type="text"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" style="margin-left: 8px" @click="changlist('formRight')">修改</Button>
        <Button style="margin-left: 8px">取消</Button>
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
        productId: ""
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
    changlist(name) {
      //  this.$refs[name].validate((valid) => {
      //             if (valid) {
      //                 this.$Message.success('成功!');
      //             } else {
      //                 this.$Message.error('失败!');
      //             }
      //         })
      // console.log("this",this);

      let formRight = this.formRight;
      //   this.$store.state.cart.ChangeCart.push(formRight)
      console.log(formRight.productId);

      this.$axios
        .patch("http://3.112.200.192:1904/update", {
          productId: formRight.productId,
          skuName: formRight.skuName,
          retailPrice: formRight.retailPrice
        })
        .then(({ data }) => {
          if (data.code == 1000) {
            alert("修改成功");
            this.$router.push({ name: "Goodlist" });
          } else {
            alert("修改失败");
          }
        });
    }
  },
  created() {
    let additem = this.$route.params;
    // console.log("item", additem);
    this.formRight.skuName = additem.data3.skuName;
    this.formRight.retailPrice = additem.data3.retailPrice;
    this.formRight.productId = additem.data3.productId;
  }
};
</script>