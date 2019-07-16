<template>
  <div>
        <Input search enter-button placeholder="请输入要搜索的商品" v-model="value" />
    <div style="margin: 10px">
      显示边框
      <i-switch v-model="showBorder" style="margin-right: 5px"></i-switch>显示斑马纹
      <i-switch v-model="showStripe" style="margin-right: 5px"></i-switch>显示索引
      <i-switch v-model="showIndex" style="margin-right: 5px"></i-switch>显示多选框
      <i-switch v-model="showCheckbox" style="margin-right: 5px"></i-switch>显示表头
      <i-switch v-model="showHeader" style="margin-right: 5px"></i-switch>表格滚动
      <i-switch v-model="fixedHeader" style="margin-right: 5px"></i-switch>
      <br />
      <br />表格尺寸
      <Radio-group v-model="tableSize" type="button">
        <Radio label="large">大</Radio>
        <Radio label="default">中（默认）</Radio>
        <Radio label="small">小</Radio>
      </Radio-group>
    </div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :height="fixedHeader ? 250 : ''"
      :size="tableSize"
      :data="search(tableData3)"
      :columns="tableColumns3"
    >
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">视图</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="change(index)">修改</Button>
        <Button type="error" size="small" @click="remove(index,row)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tableData3: [
        // {
        //   skuName: "John Brown",
        //   retailPrice: 18,
        //   productId: "New York No. 1 Lake Park",
        //   yuan: 20
        //   // date: '2016-10-03'
        // },
        // {
        //   skuName: "Jim Green",
        //   retailPrice: 24,
        //   productId: "London No. 1 Lake Park"
        //   // date: '2016-10-01'
        // },
        // {
        //   skuName: "Joe Black",
        //   retailPrice: 30,
        //   productId: "Sydney No. 1 Lake Park"
        //   // date: '2016-10-02'
        // }
        // {
        //     name: 'Jon Snow',
        //     age: 26,
        //     address: 'Ottawa No. 2 Lake Park',
        //     date: '2016-10-04'
        // },
        // {
        //     name: 'John Brown',
        //     age: 18,
        //     address: 'New York No. 1 Lake Park',
        //     date: '2016-10-03'
        // },
        // {
        //     name: 'Jim Green',
        //     age: 24,
        //     address: 'London No. 1 Lake Park',
        //     date: '2016-10-01'
        // },
        // {
        //     name: 'Joe Black',
        //     age: 30,
        //     address: 'Sydney No. 1 Lake Park',
        //     date: '2016-10-02'
        // },
        // {
        //     name: 'Jon Snow',
        //     age: 26,
        //     address: 'Ottawa No. 2 Lake Park',
        //     date: '2016-10-04'
        // }
      ],
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      fixedHeader: false,
      tableSize: "default",
      value:""
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "详细信息",
        content: `商品名：${this.tableData3[index].skuName}<br>价格：${((this.tableData3[index].retailPrice)/100).toFixed(2)}元<br>创建日期${this.tableData3[index].createDate}<br>商品图:  <img style="width:100px" src="${this.tableData3[index].thumbUrl}" alt=""> `
             });
    },

    // 删除商品
    remove(index, row) {
      this.tableData3.splice(index, 1);

      this.$axios
        .delete("http://3.112.200.192:1904/update/delete", {
          params: { productId: row.productId }
        })
        .then(({ data }) => {
          if (data.code == 1000) {
            console.log("删除成功");
          }
          console.log("----", this.tableData3);
        });
    },
    change(index) {
      console.log("xxx", index);
      console.log("item", this.tableData3[index]);
      let data3 = this.tableData3[index];
      // this.$router.push("/addlist")
      this.$router.push({ name: "Addlist", params: { data3 } });
      console.log(this.$route);
    }, // input搜索框显示相应的内容
    search(index) {
      // index是传入的数据，然后用ES6的includes筛选出来
     return index.filter(item=>{
       if(item.skuName.includes(this.value)){
         return item
       }
     })
    }
  },
  computed: {
    tableColumns3() {
      let columns = [];
      if (this.showCheckbox) {
        columns.push({
          type: "selection",
          width: 60,
          align: "center"
        });
      }
      if (this.showIndex) {
        columns.push({
          type: "index",
          width: 60,
          align: "center"
        });
      }
      columns.push({
        title: "Date",
        key: "date",
        sortable: true
      });
      columns.push({
        title: "商品名字",
        key: "skuName"
      });
      columns.push({
        title: "商品价格",
        key: "retailPrice",
        sortable: true,
        filters: [
          {
            label: "Greater than 25",
            value: 1
          },
          {
            label: "Less than 25",
            value: 2
          }
        ],
        filterMultiple: false,
        filterMethod(value, row) {
          if (value === 1) {
            return row.price > 25;
          } else if (value === 2) {
            return row.price < 25;
          }
        }
      });
      columns.push({
        title: "商品ID",
        key: "productId",
        filters: [
          {
            label: "New York",
            value: "New York"
          },
          {
            label: "London",
            value: "London"
          },
          {
            label: "Sydney",
            value: "Sydney"
          }
        ],
        filterMethod(value, row) {
          return row.id.indexOf(value) > -1;
        }
      });
      columns.push({
        title: "Action",
        slot: "action",
        width: 200,
        align: "center"
      });
      return columns;
    }
  },
  created() {
    // let data=this.$route.params.formRight;
    // console.log("data",data);
    // // let child=data.formRight
    // this.tableData3.push(data)
    // console.log("da",this.tableData3);

    console.log("store", this.$store.state.cart.ChangeCart);
    // let data = this.$store.state.cart.ChangeCart;
    // let itemlist=data.map(item=>{
    //     return item
    // })

    // 获取所有商品
    this.$axios.get("http://3.112.200.192:1904/goodslist").then(({ data }) => {
      if (data.code == 1000) {
        // console.log(data.data);
        let data1 = data.data;
        for (var i = 0; i < data1.length; i++) {
          this.tableData3.push(data1[i]);
        }
      }
    });

    // console.log("item",itemlist);

    //    this.tableData3.push(itemlist)
  }
};
</script>