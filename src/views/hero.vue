<template>
  <div class="hero displayflex">
    <div v-for="(item,index) in hero"
         :key="index"
         style="padding:5px">
      <img :src="`//game.gtimg.cn/images/lol/act/img/champion/${item.alias}.png`"
           alt=""
           style="width:50px">
      <div>{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hero: []
    }
  },
  mounted () {
    this.gethero()
  },
  methods: {
    gethero () {
      this.$ajax({
        method: 'get',
        url: 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?v=23',
        params: {},
        cr: (res) => {
          this.hero = res.hero
        }
      })
    }
  }
}
</script>
<style scoped>
.displayflex {
  width: 800px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
</style>
