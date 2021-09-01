import Vue from 'vue'
import Vuex from 'vuex'
//安装插件
Vue.use(Vuex)

// 创建对象
const store = new Vuex.Store({
        state: {
            user: JSON.parse(sessionStorage.getItem('user')), //个人信息
            date: null
        },
        mutations: {
            // 存储登录的个人信息
            saveinfo(state, payload) {
                state.user = payload.user
                console.log("个人信息存储成功")
                console.log(state.user)
            },
            savedate(state, payload) {
                state.date = payload.dates
            }
        },
        actions: {},
        getters: {},
        modules: {}
    })
    // 导出store共享
export default store