import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import login from '../views/login.vue'
import contentexamine from '../views/examine/contentexamine.vue'
import comment from '../views/examine/comment.vue'

import useruser from '../views/user/useruser.vue'
import useradmin from '../views/user/useradmin.vue'
import carousel from '../views/management/carousel.vue'
import managementlable from '../views/management/managementlable.vue'
import numbering from '../views/numbering/numbering.vue'
import myself from '../views/myself/myself.vue'
import fankui from '../views/kefu/fankui.vue'
import jubao from '../views/kefu/jubao.vue'
import shensu from '../views/kefu/shensu.vue'
Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: login, meta: { ispublic: true } },
    {
        path: '/',
        name: 'main',
        component: main,
        children: [
            { path: '', name: 'myself', component: myself },
            { path: 'myself', name: 'myself', component: myself },
            {
                path: 'contentexamine',
                name: 'contentexamine',
                component: contentexamine
            },
            { path: 'comment', name: 'comment', component: comment },
            { path: 'useruser', name: 'useruser', component: useruser },
            { path: 'useradmin', name: 'useradmin', component: useradmin },
            {
                path: 'managementlable',
                name: 'managementlable',
                component: managementlable
            },
            { path: 'carousel', name: 'carousel', component: carousel },
            { path: 'fankui', name: 'fankui', component: fankui },
            { path: 'jubao', name: 'jubao', component: jubao },
            { path: 'shensu', name: 'shensu', component: shensu }
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, Form, next) => {
    if (!to.meta.ispublic && !localStorage.admin_jwt_token) {
        return next('/login')
    }
    next()
})
export default router