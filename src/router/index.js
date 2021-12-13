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
    component: () => import(/* webpackChunkName: "about" */ '../views/PairSearch.vue'),
    meta: {
      title: '關於'
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

  next()
})

export default router
