<template>
  <div>  
      <div class="nav">
        <div>
      <div class="app">
      <div class="slide-menu" :class="{ open: isMenuOpen }">
        <div class="slide-menu-header">
          <router-link to="/" class="logo">Random</router-link>
          <span class="close-btn" @click="toggleMenu">×</span>
        </div>
        <ul class="slide-menu-items">
          <li class="slide-menu-item">
            <router-link to="/home-page" v-if="!isAuthenticated" :class="{ active: isActive('/home-page') }">Home</router-link>
          </li>
          <li class="slide-menu-item">
            <router-link to="/about-us" v-if="!isAuthenticated" :class="{ active: isActive('/about-us') }">About</router-link>
          </li>
          <li class="slide-menu-item">
            <router-link to="/profile-page" v-if="!isAuthenticated" :class="{ active: isActive('/profile-page') }">Profile</router-link>
          </li>
          <li class="slide-menu-item">
            <!-- <router-link to="/login-form" v-if="!isAuthenticated" :class="{ active: isActive('/login-form') }">
          Logout
        </router-link> -->
          <a href="#" @click="onLogout">Logout</a>
          </li>
        </ul>
      </div>
  
      <div class="app-content">
        <router-view />
      </div>
  
      <button class="toggle-btn" @click="toggleMenu">☰</button>
    </div>
  
        <!-- <a href="/home-page" class="logo">Random</a> -->
        <router-link to="/home-page" v-if="!isAuthenticated" :class="{ active: isActive('/home-page') }">
          Home
        </router-link>
        <router-link to="/add-employee" v-if="!isAuthenticated" :class="{ active: isActive('/add-employee') }">
          Employee
        </router-link>
        <router-link to="/add-task" v-if="!isAuthenticated" :class="{ active: isActive('/add-task') }">
          Task
        </router-link>
        <router-link to="/record-page" v-if="!isAuthenticated" :class="{ active: isActive('/record-page') }">
          Records
        </router-link>
        </div>
      </div>
  </div>  
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import { IS_USER_AUTHENTICATE_GETTER, LOGOUT_ACTION } from '@/store/storeconstants';
  
  export default {
    computed: {
      ...mapGetters('auth', {
        isAuthenticated: IS_USER_AUTHENTICATE_GETTER,
      }),
    },
    data() {
      return {
        isMenuOpen: false,
      };
    },
    name: 'AppHeader',
    methods: {
       toggleMenu() {
          this.isMenuOpen = !this.isMenuOpen;
        },
      ...mapActions('auth', {
        logout: LOGOUT_ACTION,
      }),
      onLogout() {
        this.logout();
        this.$router.replace('/login-form');
      },
      isActive(route) {
        return this.$route.path === route;
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');
  
  .nav .logo {
    margin: 0 3px;
    font-size: 35px;
    font-weight: 500;
    color: black;
    transition: background-color 0.3s;
  }
  
  .nav a {
    transition: background-color 0.3s;
  }
  
  .nav a:after {
    transition: 0.5s;
  }
  
  * {
    margin: 10px;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  
  .nav {
    display: flex;
    overflow-x: auto;
    background: black;
    border-radius: 9px;
    padding: 7px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
  }
  
  .nav .a {
    color: #fff;
    text-decoration: none;
  }
  
  .nav .logo {
    margin: 0 3px;
    font-size: 35px;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .nav a {
    display: inline-block;
    list-style: none;
    font-size: 2rem;
    margin: 0 15px;
    cursor: pointer;
    position: relative;
    color: white;
    padding: 5px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    transition: background-color 0.3s;
  }
  
  .nav a:after {
    content: '';
    width: 0;
    height: 3px;
    background: #2192ff;
    position: absolute;
    left: 0;
    bottom: -10px;
    transition: 0.5s;
  }
  
  .nav a:hover::after {
    width: 100%;
  }
  
  .nav a:hover {
    background-color: aliceblue;
    color: black;
    border-radius: 50px;
  }
  
  .nav .logo:hover {
    background-color: aliceblue;
    transform: translateY(-5px);
  }
  
  .nav a.active {
    background-color: aliceblue;
    color: black;
    border-radius: 50px;
  }
  
  .slide-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 250px;
      height: 100vh;
      background-color: #fff;
      z-index: 1000;
      transition: transform 0.3s ease-in-out;
      transform: translateX(-250px);
    }
    
    .slide-menu.open {
      transform: translateX(0);
    }
    
    .slide-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: black;
    }
    
    .close-btn {
      cursor: pointer;
      font-size: 20px;
    }
    
    .slide-menu-items {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .slide-menu-item {
      padding: 10px 20px;
      cursor: pointer;
    }
    
    .slide-menu-item a {
      text-decoration: none;
      color: #000;
    }
    
    .slide-menu-item a:hover {
      color: #333;
    }
    
      /* .app-content {
      padding: 20px;
    } */
    
    .toggle-btn {
      position: fixed;
      /* top: 20px; */
      /* bottom: 10px; */
      margin: -8px 25px;
      left: 20px;
      background-color: #fff;
      border: 1px solid #eee;
      padding: 10px;
      cursor: pointer;
    }
  </style>