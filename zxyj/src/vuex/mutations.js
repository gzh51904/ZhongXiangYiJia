// import cartMutations from './cartMutations';

export default {
    // 添加商品
    add(state,goods){
        // state:就是state
        // payload:触发add方法时传入的参数
        state.cart.goodslist.unshift(goods);
    }
    // ...cartMutations,
}