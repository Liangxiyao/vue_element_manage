<template>
  <div class="page-header">
    <div class="title">{{$route.meta.title}}</div>
    <el-button type="info"
               plain
               v-show="$route.meta.showBackBtn"
               @click="goBack">返回</el-button>
  </div>
</template>
<script>

export default {
  methods: {
    goBack() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped>
.page-header {
  position: relative;
  padding: 10px 20px;
  overflow: hidden;
  background: #fff;
  -webkit-box-shadow: 0 5px 10px #ddd;
  box-shadow: 0 5px 10px #ddd;
}
.page-header:before {
  content: "";
  position: absolute;
  top: 15px;
  left: 10px;
  bottom: 15px;
  width: 8px;
  background-color: #fd9136;
}
.title {
  float: left;
  margin-left: 10px;
  line-height: 36px;
  font-size: 16px;
  font-weight: 600;
  vertical-align: middle;
}
.el-button {
  float: right;
  width: 100px;
  font-size: 14px;
  margin-left: 20px;
}
</style>
