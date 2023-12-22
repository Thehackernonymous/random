<template>
    <div> 
      <div class="nav">
      <i class="uil uil-bars navOpenBtn"></i>
        <a href="/" class="logo">Random</a> 
            <router-link to="/" :class="{ active: isActive('/') }">Home</router-link>
            <router-link to="/about-view"  :class="{ active: isActive('/about-view')}">About</router-link>
            <router-link to="/sign-up" v-if="!isAuthenticated" :class="{ active: isActive('/sign-up')}">Signin/SignUp</router-link>
      </div>
    </div>
  
  </template>
  
  <script>
  export default {
    name: 'LoginHeader',
    methods: {
      isActive(route) {
        return this.$route.path === route;
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');
  
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
    border-radius: 50px;
  }
  
  .nav a:hover::after {
    width: 100%;
    border-radius: 50px;
  }
  
  .nav a:hover {
    background-color: aliceblue;
    color: black;
    border-radius: 50px;
  }
  
  .nav .logo:hover {
    background-color: aliceblue;
    transform: translateY(-5px);
    border-radius: 50px;
  }
  
  .nav a.active {
    background-color: aliceblue;
    color: black;
    border-radius: 50px;
  }
  </style>
  

