<template>
<div class="recommend">
  <div v-for="item in recommends">
    <a :href="item.link" class="recommenditem">
      <img :src="item.image">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px 0;
  border-bottom: 8px solid #eee;
}

.recommenditem{
  flex: 1;
}

.recommenditem img{
  width: 80%;
  margin-bottom: 10px;
}

</style>