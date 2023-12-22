<template>
    <div class="container">
      <LoginHeader />
      <h1 class="main-heading">This is Random Task Generator.</h1>
      <router-link to="/" class="image-link">
        <div class="image-container">
          <img :src="require('@/assets/logo.png')" alt="Random Task Generator" class="hover-image" />
  
        </div>
      </router-link>
  
      
    <section class="footer">
      <div class="footer-row">
        <div class="footer-col">
          <h4>Info</h4>
          <ul class="links">
            <li><a href="/">Home</a></li>
            <li><a href="/about-view">About Us</a></li>
          </ul>
        </div>
  
        <div class="footer-col">
          <h4>Help</h4>
          <p>
            This is a Random Task Generator.
          </p>
            <div class="icons">
            <a href="https://www.linkedin.com/in/rahul-jaiswal-66491122a/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRnZFHkDLxQRgwdqTSJxXrlKhxLjTHStdhwdQVZZJflQJxLHXHkkhDRhQfRLzLnFnWQWzZL">
            <i class="far fa-envelope"></i>
          </a>
            <a href="https://www.github.com/Thehackernonymous" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
            </a>
          </div>
      </div>
      <div class="footer-text">
      <p>© Created by Rahul Jaiswal</p>
      </div>
    </div>
    </section>
  
    </div>
  </template>
  
  <script>
  import LoginHeader from '@/components/Header/LoginHeader.vue';
  
  export default {
    name: 'HomeView',
  
    components: {
      LoginHeader,
    },
  
    data() {
      return {
        email: '',
        emailSent: false,
      };
    },
  
    methods: {
      handleSubmit() {
        console.log('Form submitted! Sending email response...');
        this.emailSent = true;
        window.location.reload();
      },
    },
  }
  </script>
  
  
  <style scoped>
  
  .container {
    height: 130vh; 
    /* overflow-y: auto; Enable vertical scrolling if necessary */
    display: flex;
    flex-direction: column;
  }
  .home-page {
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .main-heading {
    font-size: 3em;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  
  .footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: auto ;
    text-align: center;
    background-color: #333;
    color: white;
     /* position: fixed; */
    bottom: 0; 
    width: auto;
    border-top: 1px solid #ccc;
  }
  
  .footer-row {
    display: flex;
    flex-wrap: wrap;
  }
  
  .footer-col {
    flex: 1;
    padding: 20px;
  }
  
  .footer-col h4 {
    margin-bottom: 15px;
    font-size: 18px;
  }
  
  .footer-text {
    display: flex;
    justify-content: center;
    margin-top: auto; 
    text-align: center;
    font-size: 14px;
    padding: 5px;
    background-color: #333;
    color: white;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ccc;
  }
  
  .links li {
    list-style: none;
    margin-bottom: 10px;
  }
  
  .links a {
    text-decoration: none;
    color: white;
    font-size: 14px;
  }
  
  .links a:hover {
    color: #007BFF;
  }
  
  .icons i {
    margin: 10px 5px ;
    font-size: 24px;
    color: #ccc;
    text-decoration: none;
  }
  
  .icons i:hover {
    color: #007BFF;
  }
  .input-field {
    padding: 2px 5px;
    border: 1px solid ; 
    border-radius: 5px;
    width: 150px;
    color: white; 
  }
  
  .input-field::placeholder {
    color: black; 
  }
  
  .submit-button {
    background-color: #333;
    color: white;
    margin: 5px;
    padding: 2px 5px;
    font-size: 1em;
    border: 1px solid ;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #007BFF;
    border: #007BFF;
  }
  
  
  .email-response {
    margin-top: 10px;
    color: green; 
  }
  </style>
  