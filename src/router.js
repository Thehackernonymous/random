import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AddEmployee from './components/Pages/AddEmployee.vue'; 
import AddTask from './components/Pages/AddTasks.vue';
import RecordPage from './components/Pages/RecordPage.vue';
import AboutUs from './components/Pages/AboutUs.vue';

const routes = [
  {
    name: 'HomePage',
    component: HomePage,
    path: '/'
  },
  {
    name: 'AddEmployee',
    component: AddEmployee,
    path: '/add-employee'
  },
  {
    name: 'AddTask',
    component: AddTask,
    path: '/add-task'
  },
  {
    name: 'RecordPage',
    component: RecordPage,
    path: '/record-page'
  },
  {
    name: 'AboutUs',
    component: AboutUs,
    path: '/about-us'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
