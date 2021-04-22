import vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
// home
import index from '../views/home/index.vue'
import useradmin from '../views/admin/useradmin.vue';
import configuration from '../views/admin/configuration.vue';
import userEdit from "../views/admin/users/userEdit.vue";
import ticketList from "../views/helpdesk/tickets/ticketList.vue";
import ticketEdit from "../views/helpdesk/tickets/ticketEdit.vue";
import ticketView from "../views/helpdesk/tickets/ticketView.vue";

import incidentList from "../views/helpdesk/incidents/incidentList.vue";
import incidentEdit from "../views/helpdesk/incidents/incidentEdit.vue";
import incidentView from "../views/helpdesk/incidents/incidentView.vue";

// error
import notFound from '../views/error/notFound.vue'
// account
import login from '../views/account/login.vue'
import account from '../views/account/index.vue'
import session from '../utilities/session'
import faqMain from "../views/helpdesk/faq.vue";
import faqadmin from "../views/management/faq/faqadmin.vue";
import faqEdit from "../views/management/faq/faqEdit.vue";
import locationadmin from "../views/management/locations/locationadmin.vue";
import locationEdit from "../views/management/locations/locationEdit.vue";
import vendoradmin from "../views/management/vendors/vendoradmin.vue";
import vendorEdit from "../views/management/vendors/vendorEdit.vue";
import contractadmin from "../views/management/contracts/contractadmin.vue";
import contractEdit from "../views/management/contracts/contractEdit.vue";
import softwareAssetsadmin from "../views/management/softwareassets/softwareAssetsadmin.vue";
import softwareAssetsEdit from "../views/management/softwareassets/softwareAssetsEdit.vue";
import licenseKeysadmin from "../views/management/licensekeys/licenseKeysadmin.vue";
import licenseKeysEdit from "../views/management/licensekeys/licenseKeysEdit.vue";
import assetadmin from "../views/management/hardwareassets/assetadmin.vue";
import assetEdit from "../views/management/hardwareassets/assetEdit.vue";
import reportCenter from "../views/reports/reportCenter.vue";
import hwAssetsReport from "../views/reports/customReports/hwAssetsReport.vue";
import swAssetsReport from "../views/reports/customReports/swAssetsReport.vue";
import ticketsReport from "../views/reports/customReports/ticketsReport.vue";
import usersReport from "../views/reports/customReports/usersReport.vue";

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
      path: '/faq',
      component: faqMain,
      meta: {
        //isOpen: true,
      },
    },
    {
      path: '/manage/faq',
      component: faqadmin,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/faq/edit',
      name: '/manage/faq/edit',
      component: faqEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/locations',
      component: locationadmin,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/locations/edit',
      name: '/manage/locations/edit',
      component: locationEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
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
      path: '/reports',
      component: reportCenter,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isManager: true,
        isIT: true
      },
    },
    {
      path: '/reports/hwassetsreport',
      component: hwAssetsReport,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isManager: true,
        isIT: true
      },
    },
    {
      path: '/reports/swassetsreport',
      component: swAssetsReport,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isManager: true,
        isIT: true
      },
    },
    {
      path: '/reports/ticketsreport',
      component: ticketsReport,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isManager: true,
        isIT: true
      },
    },
    {
      path: '/reports/usersreport',
      component: usersReport,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isManager: true,
        isIT: true
      },
    },
    {
      path: '/helpdesk/tickets',
      component: ticketList,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    {
      path: '/helpdesk/tickets/view',
      name: '/helpdesk/tickets/view',
      component: ticketView,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    {
      path: '/helpdesk/tickets/edit',
      name: '/helpdesk/tickets/edit',
      component: ticketEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    { //incidents
      path: '/helpdesk/incidents',
      component: incidentList,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    {
      path: '/helpdesk/incidents/view',
      name: '/helpdesk/incidents/view',
      component: incidentView,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    {
      path: '/helpdesk/incidents/edit',
      name: '/helpdesk/incidents/edit',
      component: incidentEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
      },
    },
    {
      path: '/manage/vendors',
      component: vendoradmin,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/vendors/edit',
      name: '/manage/vendors/edit',
      component: vendorEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/contracts',
      component: contractadmin,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/contracts/edit',
      name: '/manage/contracts/edit',
      component: contractEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/softwareassets',
      component: softwareAssetsadmin,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/softwareassets/edit',
      name: '/manage/softwareassets/edit',
      component: softwareAssetsEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/licensekeys',
      component: licenseKeysadmin,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/licensekeys/edit',
      name: '/manage/licensekeys/edit',
      component: licenseKeysEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/hardwareassets',
      component: assetadmin,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
      },
    },
    {
      path: '/manage/hardwareassets/edit',
      name: '/manage/hardwareassets/edit',
      component: assetEdit,
      props: true,
      meta: {
        //isOpen: true,
        //isAdmin: true
        isIT: true
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
      const dept = session.getUser().departmentId
      /*if ((role !== 1) && (to.matched.some(record => record.meta.isAdmin) || to.matched.some(record => record.meta.isManager) || to.matched.some(record => record.meta.isIT))){
        //non-admin gets blocked
        next({
          path: '/notFound',
        })
      } else {*/
      switch (role) {
        case 1:
          //console.log('im admin')
          next()
          break
        case 2:
          switch (dept) {
            case 1:
              if (to.matched.some(record => (record.meta.Admin) || (record.meta.isManager))){
                if (to.matched.some(record => (record.meta.isIT))) {
                  next()
                } else {
                  next({
                    path: '/notFound',
                  })
                }
              } else {
                //console.log('it, let me out')
                next()
              }
              break
            case 2:
              if (to.matched.some(record => (record.meta.Admin) || (record.meta.isIT))){
                if (to.matched.some(record => (record.meta.isManager))) {
                  next()
                } else {
                  next({
                    path: '/notFound',
                  })
                }
              } else {
                next()
              }
              break
            default:
              if (to.matched.some(record => (record.meta.Admin) || (record.meta.isManager) || (record.meta.isAdmin))){
                //console.log('regular user, dont let me out')
                next({
                  path: '/notFound',
                })
              } else {
                //console.log('regular user, let me out')
                next()
              }
              break
          }
          break
        default:
          break
        }
      //}
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
