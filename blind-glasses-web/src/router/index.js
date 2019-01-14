import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/user',
                    component: resolve => require(['../components/page/UserTable.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/RoleTable.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/customer',
                    component: resolve => require(['../components/page/CustomerTable.vue'], resolve),
                    meta: { title: '客服管理' }
                },
                {
                    path: '/blind',
                    component: resolve => require(['../components/page/BlindTable.vue'], resolve),
                    meta: { title: '视障用户管理' }
                },
                {
                    path: '/relatives',
                    component: resolve => require(['../components/page/RelativesTable.vue'], resolve),
                    meta: { title: '亲属管理' }
                },
                {
                    path: '/volunteer',
                    component: resolve => require(['../components/page/VolunteerTable.vue'], resolve),
                    meta: { title: '志愿者管理' }
                },
                {
                    path: '/blindhelp',
                    component: resolve => require(['../components/page/BlindHelp.vue'], resolve),
                    meta: { title: '客服協助' }
                },
                {
                    path: '/testWebsocket',
                    component: resolve => require(['../components/page/TestWebsocket.vue'], resolve),
                    meta: { title: '测试websocket' }
                },
                {
                    path: '/online',
                    component: resolve => require(['../components/page/Online.vue'], resolve),
                    meta: { title: '在线统计' }
                },
                {
                    path: '/message',
                    component: resolve => require(['../components/page/Message.vue'], resolve),
                    meta: { title: '协助记录' }
                },
                {
                    path: '/blindCount',
                    component: resolve => require(['../components/page/BlindCount.vue'], resolve),
                    meta: { title: '视障用户协助统计' }
                },
                {
                    path: '/customerCount',
                    component: resolve => require(['../components/page/CustomerCount.vue'], resolve),
                    meta: { title: '协助总览' }
                },
                {
                    path: '/customerMessage',
                    component: resolve => require(['../components/page/CustomerMessage.vue'], resolve),
                    meta: { title: '协助记录' }
                },
                {
                    path: '/relativesAndVolunteerHelpCount',
                    component: resolve => require(['../components/page/RelativesAndVolunteerHelpCount.vue'], resolve),
                    meta: { title: '亲属志愿者协助时段统计' }
                },
                {
                    path: '/customerHelpCount',
                    component: resolve => require(['../components/page/CustomerHelpCount.vue'], resolve),
                    meta: { title: '客服协助时段统计' }
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
