
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

        // 修改数量
        changeQty(state, { skuId, qty }) {
            state.Cart_goodslist.forEach(item => {
                if (item.skuId == skuId) {
                    item.qty = qty;    
                }
            })
        },
    

        
    }
}