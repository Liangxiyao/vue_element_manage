<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="onRoutes"
             :collapse="collapse"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <template v-for="(item,index) in items">
        <el-menu-item :index="item.path"
                      :key="index">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          path: 'index',
          title: '系统首页'
        },
        {
          icon: 'el-icon-s-tools',
          path: 'prize',
          title: '活动列表'
        },
        {
          icon: 'el-icon-s-ticket',
          path: 'extraAward',
          title: '特殊奖项'
        },
        {
          icon: 'el-icon-s-order',
          path: 'rewardRecord',
          title: '抽奖记录'
        },
        {
          icon: 'el-icon-s-custom',
          path: 'users',
          title: '人员管理'
        },
      ]
    };
  },
  computed: {
    onRoutes() {
      if (this.$route.path.replace('/', '') == 'addprize') {
        return 'prize';
      } else if (this.$route.path.replace('/', '') == 'useRecord') {
        return 'users'
      } else if (this.$route.path.replace('/', '') == 'setExtraAward' || this.$route.path.replace('/', '') == 'extraRecordList') {
        return 'extraAward'
      } else {
        return this.$route.path.replace('/', '');
      }
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  },
  methods: {
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 150px;
}
.sidebar > ul {
  height: 100%;
}
</style>
