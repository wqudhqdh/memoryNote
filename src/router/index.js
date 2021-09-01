import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
    // 路由懒加载
const Home = () =>
    import ('views/Home.vue')
const Add = () =>
    import ('views/Add.vue')
const Profile = () =>
    import ('views/profile.vue')
const Modify = () =>
    import ('views/modify.vue')
const router = new Router({
        routes: [{
                path: '/',
                name: 'Home',
                component: Home
            }, {
                path: '/add',
                name: "Add",
                component: Add
            }, {
                path: '/profile',
                name: "Profile",
                component: Profile
            }, {
                path: '/modify',
                name: 'modify',
                component: Modify
            }

        ],
        mode: 'history'
    })
    // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/profile') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) {
        return next('/profile');
    }
    next()
})
export default router