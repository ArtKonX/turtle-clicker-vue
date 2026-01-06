import { createRouter, createWebHistory } from 'vue-router'
import TurtleClickerPage from '../pages-components/TurtleClickerPage.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: TurtleClickerPage
        }
    ]
})

router.beforeEach((to, _, next) => {
    if (to.path === '/') {
        next()
    } else {
        next('/')
    }
})

export default router