import vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
// home
import index from '../views/home/index.vue'
import feedback from '../views/home/feedback.vue'
import about from '../views/home/about.vue'
import contact from '../views/home/contact.vue'
import useradmin from '../views/admin/useradmin.vue';
import configuration from '../views/admin/configuration.vue';
import userEdit from "../views/admin/users/userEdit.vue";
import ticketList from "../views/helpdesk/tickets/ticketList.vue";
import ticketEdit from "../views/helpdesk/tickets/ticketEdit.vue";
import ticketView from "../views/helpdesk/tickets/ticketView.vue";
// error
import notFound from '../views/error/notFound.vue'
// account
import register from '../views/account/register.vue'
import login from '../views/account/login.vue'
import account from '../views/account/index.vue'
import session from '../utilities/session'
import faqMain from "../views/helpdesk/faq.vue";
import faqadmin from "../views/management/faq/faqadmin.vue";
import faqEdit from "../views/management/faq/faqEdit.vue";
import locationadmin from "../views/management/locations/locationadmin.vue";
import locationEdit from "../views/management/locations/locationEdit.vue";
import locationList from "../views/management/locations/locationList.vue";

vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  root: '/',
  routes: [
    {
      path: '/',
      redirect: '/auth/login',
    },
    {
      path: '/home',
      component: index,
      meta: {
        //isOpen: true,
      },
    },
    {
      path: '/about',
      component: about,
      meta: {
        //isOpen: true,
      },
    },
    {
      path: '/faq',
      component: faqMain,
      meta: {
        //isOpen: true,
      },
    },
    {
      path: '/feedback',
      component: feedback,
      meta: {
        //isOpen: true,
        isAdmin: true
      },
    },
    {
      path: '/manage/faq',
      component: faqadmin,
      props: true,
      meta: {
        //isOpen: true,
        isAdmin: true
      },
    },
    {
      path: '/manage/faq/edit',
      name: '/manage/faq/edit',
      component: faqEdit,
      props: true,
      meta: {
        //isOpen: true,
        isAdmin: true
      },
    },
    {
      path: '/locationList',
      component: locationList,
      meta: {
        //isOpen: true,
      },
    },
    {
      path: '/manage/locations',
      component: locationadmin,
      props: true,
      meta: {
        //isOpen: true,
        isAdmin: true
      },
    },
    {
      path: '/manage/locations/edit',
      name: '/manage/locations/edit',
      component: locationEdit,
      props: true,
      meta: {
        //isOpen: true,
        isAdmin: true
      },
    },
    {
      path: '/useradmin',
      component: useradmin,
      meta: {
        //isOpen: true,
        isAdmin: true
      },
    },
    {
      path: '/useradmin/edit',
      name: '/useradmin/edit',
      component: userEdit,
      props: true,
      meta: {
        //isOpen: true,
        isAdmin: true
      },
    },
    {
      path: '/tickets',
      component: ticketList,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    {
      path: '/tickets/view',
      name: '/tickets/view',
      component: ticketView,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    {
      path: '/tickets/edit',
      name: '/tickets/edit',
      component: ticketEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    {
      path: '/configuration',
      component: configuration,
      meta: {
        //isOpen: true,
        isAdmin: true
      },
    },
    /*{
      path: '/auth/register',
      component: register,
      meta: {
        skipIfAuthorized: true,
        isOpen: true,
      },
    },*/
    {
      path: '/auth/login',
      component: login,
      meta: {
        isOpen: true,
        skipIfAuthorized: true,
      },
    },
    {
      path: '/auth/logout',
    },
    {
      path: '/account',
      component: account,
    },
    {
      path: '*',
      component: notFound,
      meta: {
        isOpen: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (to.path === '/auth/logout') {
      store.dispatch('logout')
    } else if (to.matched.some(record => record.meta.skipIfAuthorized)) {
      next({
        path: '/home',
      })
    } else {
      //put auth code here
      const role = session.getUser().roleId
      if (role !== 1 && to.matched.some(record => record.meta.isAdmin)){
        //non-admin gets blocked
        next({
          path: '/notFound',
        })
      } else {
        next()
      }

    }
  } else {
    if ((to.path === '/auth/login')) {
      next()
    } else if (to.matched.some(record => record.meta.isOpen)) {
      next()
    } else {
      next({
        path: '/auth/login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  }
})

export default router
