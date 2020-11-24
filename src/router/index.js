import Vue from 'vue'
import VueRouter from 'vue-router'



import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
// import Navba from '@/components/pages/Navbar'
// import Sidebar from '@/components/pages/Sidebar'
import Products from '@/components/pages/Products'
import CustomerOrder from '@/components/pages/CustomerOrders'

//自訂一分頁元件
Vue.use(VueRouter)

export default new VueRouter({
    // mode: 'history',
    // linkActiveClass: 'abc',
    routes: [
        {
            path: '*',
            redirect: 'login'
        },

        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            // meta: { requiresAuth: true },
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true },
                },
            ]
        },
        {
            path: '/',
            name: 'CustomerDashboard',
            component: Dashboard,
            children: [
              {
                path: 'customer_order',
                name: 'CustomerOrder',
                component: CustomerOrder,
              },
            ],
          },
    ]
})


