import Vue from 'vue';
import Router from 'vue-router';
//import storage from '@/utils/storage';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    // {
    //   path: '/a',
    //   component: () => import('../components/page/a.vue'),
    //   meta: { title: 'time' }
    // },
    {
      path: '/',
      component: () => import('../components/common/Home.vue'),
      meta: { title: '' },
      children: [
        {
          path: '/time',
          component: () => import('../components/page/time.vue'),
          meta: { title: 'time' }
        },
        {
          path: '/index',
          component: () => import('../components/page/Index.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/prize',

          component: () => import('../components/page/Prize.vue'),
          meta: { title: '奖项设置' },
        },
        {
          path: '/addPrize',
          name: 'addPrize',
          component: () => import('../components/page/AddPrize.vue'),
          meta: { title: '奖项设置' },
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
          meta: { title: '操作记录' },
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

// router.beforeEach((to, from, next) => {
//   let token = storage.get('token')
//   if (to.path != '/login' && !token) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router