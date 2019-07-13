
export default {
    state: {
        Cart_goodslist: []
    },
   
    mutations: {
        // 添加商品
        add(state, goods) {
            // state:就是state
            // payload:触发add方法时传入的参数
            state.Cart_goodslist.push(goods);
        },

        // 删除商品
        remove(state, stuId) {
            state.Cart_goodslist = state.Cart_goodslist.filter(item => item.stuId != stuId);
        },

        // 修改数量
        changeQty(state, { stuId, qty }) {
            state.Cart_goodslist.forEach(item => {
                if (item.stuId == stuId) {
                    item.qty = qty
                }
            })
        },
    

        
    }
}