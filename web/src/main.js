import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/blue-skin5152.css'
import './assets/css/bootstrap5152.css'
import './assets/css/green-skin5152.css'
import './assets/css/main5152.css'
import './assets/css/red-skin5152.css'
import './assets/css/responsive5152.css'
import './plugins/element.js'
import ElementUI from 'element-ui'
import './assets/css/ali.css'

//ecahrs
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'

Vue.component('chart', ECharts)
    //vuex
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)
    //导入时间插件
import moment from 'moment'
//在main.js 页面里添加自定义指令//
Vue.directive('title', {
        //单个修改标题
        inserted: function(el, binding) {
            const { value } = binding
            if (el.dataset.title) {
                // 方式1，可以给标签的data-title的属性赋值
                document.title = el.dataset.title
            } else if (value) {
                // 方式2，指令传参
                if (typeof value === 'string') {
                    document.title = value
                } else if (typeof value === 'object' && value && value.title) {
                    document.title = value.title
                }
            }
        },
        update(el, binding, vnode, oldVnode) {
            const { value } = binding
            if (el.dataset.title) {
                document.title = el.dataset.title
            } else if (value) {
                // 方式2，指令传参
                if (typeof value === 'string') {
                    document.title = value
                } else if (typeof value === 'object' && value && value.title) {
                    document.title = value.title
                }
            }
        }
    })
    //定义全局时间过滤器
Vue.filter('dataFormat', function(datastr, pattern = 'YYYY-MM-DD HH:mm') {
    return moment(datastr).format(pattern)
})
Vue.config.productionTip = false
    // aiox需要的包

import axios from 'axios'
// axios.defaults.withCredentials = true
//aciox基础url
axios.defaults.baseURL = 'http://127.0.0.1:3000'

//将axios写成vue的原型属性
Vue.prototype.$axios = axios
    //为post请求设置默认请求头
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded; charset=UTF-8'
    //vue2中使用axios，我们请求的参数仍为json类型，是并没有序列化的。我们需要使用querystring解决该问题
import qs from 'qs'
Vue.prototype.qs = qs

// 添加一个请求拦截器
// http request 拦截器
axios.interceptors.request.use(
    config => {
        let luffy_jwt_token = window.localStorage.getItem('luffy_jwt_token')
            // console.log(luffy_jwt_token)
        config.headers.Authorization = `Bearer ${luffy_jwt_token}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 添加一个响应拦截器
axios.interceptors.response.use(
    function(response) {
        if (response.data && response.data.code) {
            if (parseInt(response.data.code) === 401) {
                //未登录
                ElementUI.Notification({
                    title: '警告',
                    message: '登录过期请重新登录',
                    type: 'warning'
                })
                store.dispatch('user/close') //登录弹窗
                store.dispatch('user/deleteuserinfo') //清楚用户信息
                    // routerIndex.push('/login');
            }
            if (parseInt(response.data.code) === -1) {
                ElementUI.Notification({
                    title: '警告',
                    message: '请求失败',
                    type: 'warning'
                })
            }
        }
        return response
    },
    function(error) {
        ElementUI.Notification({
            title: '警告',
            message: '服务器连接失败',
            type: 'warning'
        })
        return Promise.reject(error)
    }
)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')