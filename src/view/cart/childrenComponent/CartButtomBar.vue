<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
          class="check-button"
          :is-checked="isSelectAll"
          @click.native="checkClick"></check-button>
      <span>All</span>
    </div>
    <div class="count">
      Total ¥:{{totalPrice}}
    </div>
    <div class="calc">Num:{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data(){
    return{
      check: false
    }
  },
  methods: {
    checkClick(){
      if (this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.isChecked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.isChecked = true)
      }
      // this.$toast.methods.isShow
    }
  },
  computed: {
    totalPrice(){
      return   this.$store.state.cartList.filter(item=> item.isChecked
      ).reduce((previousValue,item)=>{
        return previousValue + item.count * item.price
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.isChecked).reduce((previousValue,item)=>{
        return previousValue + item.count
      },0)
    },
    isSelectAll(){
      if (this.cartLength === 0) {
        return false
      }else {
        return !(this.$store.state.cartList.filter(item => !item.isChecked).length)
      }
      // return !(this.$store.state.cartList.filter(item => !item.isChecked).length)
      // return !this.cartList.find(item => !item.isChecked)
      // let isChecked = false;
      // for (let item of this.cartList){
      //   if (!item.isChecked){
      //     isChecked = false
      //     return isChecked
      //   }
      // }

    }
  },
}
</script>

<style scoped>
.bottom-bar{
  background-color: #dbe5ec;
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.check-content{
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-left: 10px;
  width: 60px;
}
.count{
  color: #ff5777;
  padding-left: 50px;
  flex: 1;
  font-size: 18px;
}
.calc{
  width: 90px;
  color: white;
  text-align: center;
  background-color: #ff8198;
  font-size: 18px;
}
</style>
