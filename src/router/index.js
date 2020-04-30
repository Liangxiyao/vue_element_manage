import Vue from 'vue';
import Router from 'vue-router';
import storage from '@/utils/storage';

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: () => import('../components/common/Home.vue'),
      children: [
        {
          path: '/index',
          component: () => import('../components/page/Index.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/prize',
          component: () => import('../components/page/Prize.vue'),
          meta: { title: '活动列表' },
        },
        {
          path: '/addPrize',
          name: 'addPrize',
          component: () => import('../components/page/AddPrize.vue'),
          meta: { title: '添加活动', showBackBtn: true },
        },
        {
          path: '/extraAward',
          component: () => import('../components/page/ExtraAward.vue'),
          meta: { title: '特殊奖项列表' }
        },
        {
          path: '/setExtraAward',
          component: () => import('../components/page/SetExtraAward.vue'),
          meta: { title: '新建奖品', showBackBtn: true  }
        },
        {
          path: '/extraRecordList',
          component: () => import('../components/page/ExtraRecordList.vue'),
          meta: { title: '特殊奖项抽中名单', showBackBtn: true  }
        },
        {
          path: '/rewardRecord',
          component: () => import('../components/page/RewardRecord.vue'),
          meta: { title: '抽奖记录' }
        },
        {
          path: '/users',
          component: () => import('../components/page/Users.vue'),
          meta: { title: '人员管理' }
        },
        {
          path: '/useRecord',
          component: () => import('../components/page/UseRecord.vue'),
          meta: { title: '操作记录', showBackBtn: true  },
        },
        {
          path: '/404',
          component: () => import('../components/page/404.vue'),
          meta: { title: '404' }
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../components/page/Login.vue'),
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let users = storage.get('users')
  if (to.path != '/login') {
    //判断该路由是否需要登录权限
    if (users && users.token) {
      next()
    }
    else {
      next('/login')
    }
  }
  else {
    next()
  }
})

export default router