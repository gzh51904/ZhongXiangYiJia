
export default {
    state: {
        ChangeCart: [ {
            name: 'John Brown',
            price: 18,
            id: 'New York No. 1 Lake Park',
            date: '2016-10-03'
           
        },]
    },
   
    mutations: {
        // 添加商品
        add(state, goods) {
            // state:就是state
            // payload:触发add方法时传入的参数
            state.ChangeCart.push(goods);
        },

        // 删除商品
        remove(state, stuId) {
            state.ChangeCart = state.ChangeCart.filter(item => item.stuId != stuId);
        },

        // 修改数量
        // changeQty(state, { stuId, qty }) {
        //     state.ChangeCart.forEach(item => {
        //         if (item.stuId == stuId) {
        //             item.qty = qty
        //         }
        //     })
        // },
    

        
    }
}