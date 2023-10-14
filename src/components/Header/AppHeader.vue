<template>
  <div> 
    <div class="nav">
    <i class="uil uil-bars navOpenBtn"></i>
      <a href="/" class="logo">Random</a> 
          <router-link to="/" :class="{ active: isActive('/home-page') }">Home</router-link>
          <router-link to="/add-employee" :class="{ active: isActive('/add-employee') }">Employee</router-link>
          <router-link to="/add-task" :class="{ active: isActive('/add-task') }">Task</router-link>
          <router-link to="/record-page" :class="{ active: isActive('/record-page') }">Records</router-link>
          <router-link to="/about-us" :class="{ active: isActive('/about-us')}">About</router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    isActive(route) {
      return this.$route.path === route;
    }
  }
};
</script>
<!-- 
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');
*{
  margin: 10px;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.nav{
  display: flex;
  overflow-x: auto;
 
  background: #2192ff;
  align-items: center;
  justify-content: center;

  background: black;
  border-radius: 9px;
  padding: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.4);
}

.nav .a {
  color: #fff;
  text-decoration: none;
}
.nav .logo {
  margin:0 3px;
  font-size: 35px;
  font-weight: 500;
}
.nav a{
  display: inline-block;
  list-style: none;
  font-size: 2rem;
  /* padding: 0px 10px; */
  margin: 0 20px;
  cursor: pointer;
  position: relative;

  color: white;
  padding: 5px 16px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  transition: background-color 0.3s;
}
.nav a:after{
  content: '';
  width: 0;
  height: 3px;
  background: #2192ff;
  position: absolute;
  left: 0;
  bottom: -10px;
  transition: 0.5s;
}
.nav a:hover::after{
  width:100%;
}

.nav a:hover {
  background-color: aliceblue;
  color: black;
}

.nav .logo:hover {
  background-color: aliceblue;
}
.nav a.active {
  background-color: aliceblue;
  color: black;
} 



</style> -->


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
}

.nav a:hover::after {
  width: 100%;
}

.nav a:hover {
  background-color: aliceblue;
  color: black;
}

.nav .logo:hover {
  background-color: aliceblue;
  transform: translateY(-5px);
}

.nav a.active {
  background-color: aliceblue;
  color: black;
}
</style>
