<template>
    <div>
      <EmployeeHeader />
    <div class="profile-page">
      <div class="profile-header">
        <img :src="user.avatar" alt="Avatar" />
        <h1>{{ user.name }}</h1>
      </div>
      <div class="profile-info">
        <ul>
          <li><span>Email:</span> {{ user.email }}</li>
          <li><span>Phone:</span> {{ user.phone }}</li>
          <li v-if="user.bio"><span>Bio:</span> {{ user.bio }}</li>
        </ul>
      </div>
    </div>
    </div>
  </template>
  
  <script>
   import EmployeeHeader from '@/components/Header/EmployeeHeader.vue';
    export default {
      name: 'EmployeeProfile',
  components: {
    EmployeeHeader,
  },
  
    data() {
      return {
        user: {
          name: "Rahul",
          email: "test@test.com",
          phone: "+91 9119077432",
          avatar: "",
          bio: "hii"
        },
      };
    },
  };
  
    </script>
    
    <style scoped>
    .profile-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .profile-header img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .profile-info {
    list-style: none;
    padding: 0;
  }
  
  .profile-info li {
    margin-bottom: 10px;
  }
  
  .profile-info span {
    font-weight: bold;
  }
  
    </style>
  
    
  
     
  