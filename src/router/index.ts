import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Frame",
      component: () => import("@/views/Home/Home.vue")
    }
  ]
})

export default router
