<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box"
         :class="{'content-collapse':collapse}">
      <page-header :title="title"
                   :refreshBtn="true"
                   :gobackBtn="true"></page-header>
      <div class="content">
        <transition name="move"
                    mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import pageHeader from './PageHeader.vue';
import bus from './bus';
export default {
  data() {
    return {
      title:[],
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar,
    pageHeader
  },
  created() {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
  }
};
</script>
