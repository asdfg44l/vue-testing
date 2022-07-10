import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首頁',
      description: '這是首頁'
    }
  },
  {
    path: '/pairSearch',
    name: 'PairSearch',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "PairSearch" */ '../views/PairSearch.vue'),
    meta: {
      title: '幫你配對',
      description: '配對網站,幫你找到最完美的另一半'
    }
  },
  {
    path: '/cryptoTest',
    name: 'CryptoTest',
    component: () => import(/* webpackChunkName: "CryptoTest" */ '../views/CryptoTest.vue'),
    meta: {
      title: '加密',
      description: "資料加密與壓縮測試",
      redirect: 'Home'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  if(to.meta.description) {
    const headList = [... document.head.children]
    let description = headList.find(item => {
      return item.localName === 'meta' && item.name === 'description'
    })

    description.content = to.meta.description
  }

  // if(to.meta.redirect) {
  //   next({ name: to.meta.redirect })
  // }

  next()
})

export default router
