<template>
  <div class="base-info">
    <div class="info-title">{{baseInfo.title}}</div>
    <div class="info-price">
      <span class="n-price">{{baseInfo.price}}</span>
      <span class="o-price">{{baseInfo.oldPrice}}</span>
      <span class="discount" v-if="baseInfo.discountDesc">{{baseInfo.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{baseInfo.columns && baseInfo.columns[0]}}</span>
      <span>{{baseInfo.columns && baseInfo.columns[1]}}</span>
      <span>{{baseInfo.services && baseInfo.services[ baseInfo.services.length-1].name}}</span>
    </div>
    <div class="info-service" v-if="baseInfo.services">
            <span class="info-service-item" v-for="index in baseInfo.services.length-1" :key="index">
                <img :src="baseInfo.services[index].icon" alt="icon">
                <span>{{baseInfo.services[index-1].name}}</span>
            </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props:{
    baseInfo: {
      type: Object,
      default(){
        return {};
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  width: 100%;
  padding: 10px 10px 20px;
  border-bottom: solid 4px rgba(100, 100, 100, .1);
}
.info-title {
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
}
.info-price {
  margin-top: 8px;
}
.info-price .n-price{
  color: var(--color-high-text);
  font-size: 20px;
  margin-right: 8px;
}
.info-price .o-price {
  color: var(--color-text);
  text-decoration: line-through;
  font-size: 12px;
  margin-right: 4px;
}
.info-price .discount {
  background: var(--color-tint);
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  position: relative;
  top: -8px;
}
.info-other {
  margin-top: 12px;
  font-size: 14px;
  display: flex;
  color: var(--color-text);
  padding-bottom: 8px;
  justify-content: space-between;
  border-bottom: solid 2px rgba(100, 100, 100, .1);
}
.info-service {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.info-service img {
  width: 12px;
  height: 12px;
}

.discount{
  margin-top: 10px;
}
</style>
<!--<template>-->
<!--  <div v-if="Object.keys(goods).length !== 0" class="base-info">-->
<!--    <div class="info-title">{{goods.title}}</div>-->
<!--    <div class="info-price">-->
<!--      <span class="n-price">{{goods.newPrice}}</span>-->
<!--      <span class="o-price">{{goods.oldPrice}}</span>-->
<!--      <span class="discount">{{goods.discount}}</span>-->
<!--    </div>-->
<!--    <div class="info-other">-->
<!--      <span>{{goods.columns[0]}}</span>-->
<!--      <span>{{goods.columns[1]}}</span>-->
<!--      <span>{{goods.services[goods.services.length-1].name}}</span>-->
<!--    </div>-->
<!--    <div class="info-service">-->
<!--      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">-->
<!--        <img :src="goods.services[index-1].icon">-->
<!--        <span>{{goods.services[index-1].name}}</span>-->
<!--      </span>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "DetailBaseInfo",-->
<!--  props: {-->
<!--    goods: {-->
<!--      type: Object-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.base-info {-->
<!--  margin-top: 15px;-->
<!--  padding: 0 8px;-->
<!--  color: #999;-->
<!--  border-bottom: 5px solid #f2f5f8;-->
<!--}-->
<!--.info-title {-->
<!--  color: #222-->
<!--}-->
<!--.info-price {-->
<!--  margin-top: 10px;-->
<!--}-->
<!--.info-price .n-price {-->
<!--  font-size: 24px;-->
<!--  color: var(&#45;&#45;color-high-text);-->
<!--}-->
<!--.info-price .o-price {-->
<!--  font-size: 13px;-->
<!--  margin-left: 5px;-->
<!--  text-decoration: line-through;-->
<!--}-->
<!--.info-price .discount {-->
<!--  font-size: 12px;-->
<!--  padding: 2px 5px;-->
<!--  color: #fff;-->
<!--  background-color: var(&#45;&#45;color-high-text);-->
<!--  border-radius: 8px;-->
<!--  margin-left: 5px;-->
<!--  /*让元素上浮一些: 使用相对定位即可*/-->
<!--  position: relative;-->
<!--  top: -8px;-->
<!--}-->
<!--.info-other {-->
<!--  margin-top: 15px;-->
<!--  line-height: 30px;-->
<!--  display: flex;-->
<!--  font-size: 13px;-->
<!--  border-bottom: 1px solid rgba(100,100,100,.1);-->
<!--  justify-content: space-between;-->
<!--}-->
<!--.info-service {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  line-height: 60px;-->
<!--}-->
<!--.info-service-item img {-->
<!--  width: 14px;-->
<!--  height: 14px;-->
<!--  position: relative;-->
<!--  top: 2px;-->
<!--}-->
<!--.info-service-item span {-->
<!--  font-size: 13px;-->
<!--  color: #333;-->
<!--}-->
<!--</style>-->