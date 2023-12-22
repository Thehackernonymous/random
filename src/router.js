import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AddEmployee from './components/Pages/AddEmployee.vue'; 
import AddTask from './components/Pages/AddTasks.vue';
import RecordPage from './components/Pages/RecordPage.vue';
import AboutUs from './components/Pages/AboutUs.vue';
import LoginForm from './components/Pages/LoginForm.vue'
import HomeView from './components/HomeView.vue';
import AboutView from './components/Pages/AboutView.vue';
import SignUp from './components/Pages/SignUp.vue';
import EmployeePage from './components/Pages/EmployeePage.vue'
import EmployeeHome from './components/EmployeeHome.vue';
import EmployeeAbout from './components/Pages/EmployeeAbout.vue';
import EmployeeRecord from './components/Pages/EmployeeRecord.vue';
import AddRole from './components/Pages/AddRole.vue';
import ForgetPassword from './components/Pages/ForgetPassword.vue';
import ResetPassword from './components/Pages/ResetPassword.vue';
import ProfilePage from './components/Pages/ProfilePage.vue';
import EmployeeProfile from './components/Pages/EmployeeProfile.vue'
import store from './store/store';
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/storeconstants';


// const LoginForm = () =>
//     import(/* webpackChunkName: "LoginForm" */ './pages/LoginForm.vue');
// const SignUp = () => import('./pages/Signup.vue');
// const HomePage = () => import('./pages/HomePage.vue');
// const AddEmployee = () => import('./pages/AddEmployee.vue');

const routes = [
  {
    name: 'HomePage',
    component: HomePage,
    path: '/home-page',
    meta: { auth: true },
  },
  {
    name: 'AddEmployee',
    component: AddEmployee,
    path: '/add-employee',
    meta: { auth: true },
  },
  {
    name: 'AddTask',
    component: AddTask,
    path: '/add-task',
    meta: { auth: true },
  },
  {
    name: 'RecordPage',
    component: RecordPage,
    path: '/record-page',
    meta: { auth: true },
  },
  {
    name: 'AboutUs',
    component: AboutUs,
    path: '/about-us',
    meta: { auth: true },
  },
  {
    name: 'LoginForm',
    component: LoginForm,
    path: '/login-form',
    meta: { auth: false },
  },
  {
    name: 'HomeView',
    component: HomeView,
    path: '/',
    meta: { auth: true },
  },
  {
    name: 'AboutView',
    component: AboutView,
    path: '/about-view',
    meta: { auth: true },
  },
  {
    name: 'SignUp',
    component: SignUp,
    path: '/sign-up',
    meta: { auth: false },
  },
  {
    name: 'EmployeePage',
    component: EmployeePage,
    path: '/employee-page',
    meta: { auth: true },
  },
  {
    name: 'EmployeeHome',
    component: EmployeeHome,
    path: '/employee-home',
    meta: { auth: true },
  },
  {
    name: 'EmployeeAbout',
    component: EmployeeAbout,
    path: '/employee-about',
    meta: { auth: true },
  },
  {
    name: 'EmployeeRecord',
    component: EmployeeRecord,
    path: '/employee-record',
    meta: { auth: true },
  },
  {
    name: 'AddRole',
    component: AddRole,
    path: '/add-role',
    meta: { auth: true },
  },
  {
    name: 'ForgetPassword',
    component: ForgetPassword,
    path: '/forget-password',
    meta: { auth: false },
  },
  {
    name: 'ResetPassword',
    component: ResetPassword,
    path: '/reset-password',
    meta: { auth: false },
  },
  {
    name: 'ProfilePage',
    component: ProfilePage,
    path: '/profile-page',
    meta: { auth: true } 
  },
  {
    name: 'EmployeeProfile',
    component: EmployeeProfile,
    path: '/employee-profile',
    meta: { auth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   if (
//       'auth' in to.meta &&
//       to.meta.auth &&
//       !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
//   ) {
//       next('/login-form');
//   } else if (
//       'auth' in to.meta &&
//       !to.meta.auth &&
//       store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
//   ) {
//       next('/home-page');
//   } else {
//       next();
//   }
// });

// router.beforeEach((to, from, next) => {
//  if (to.meta.auth && !store.getters['auth/${IS_USER_AUTHENTICATE_GETTER}']
//  ){
//   next('/login-form')
//  } else if (!to.meta.auth && 
//   store.getters['auth/${IS_USER_AUTHENTICATE_GETTER}']
//   ) {
//       next('/home-page');
//  } else {
//   next();
//  }
// });

// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !store.getters[IS_USER_AUTHENTICATE_GETTER]) {
//     // User needs authentication for this route but is not logged in
//     if (to.fullPath !== '/login-form') {
//       next({ name: 'LoginForm', query: { redirect: to.fullPath } });
//     } else {
//       // User is already at login page, probably refreshing or trying a direct access.
//       // Handle this situation based on your needs (e.g., show message, redirect elsewhere)
//       console.warn('User trying to access protected route while not logged in.');
//     }
//   } else {
//     next(); // Allow navigation if not protected or user is authenticated
//   }
// });



export default router;
