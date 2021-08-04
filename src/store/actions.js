export default  {
  addCart({state,commit},payload){
   return new Promise((resolve , reject) => {
     let oldProduct = null
     for(let item of state.cartList){
       if (item.iid == payload.iid){
         oldProduct = item;
       }
     }
     if(oldProduct){
       commit('addCounter',oldProduct)
        resolve('Success to add the Cart')
     }else{
       payload.count = 1
       commit('addToCart',payload)
       resolve('Select Product number + 1')
     }
   })
  }
}