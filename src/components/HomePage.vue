<template>
  <div class="container">
    <AppHeader />
    <h1 class="main-heading">This is Random Task Generator.</h1>
    <router-link to="/add-employee" class="image-link">
      <div class="image-container">
        <img :src="require('@/assets/logo.png')" alt="Random Task Generator" class="hover-image" />

      </div>
    </router-link>

    
  <section class="footer">
    <div class="footer-row">
      <div class="footer-col">
        <h4>Info</h4>
        <ul class="links">
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/add-employee">Employee</a></li>
          <li><a href="/add-task">Tasks</a></li>
          <li><a href="/record-page">Records</a></li>
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
import AppHeader from '@/components/Header/AppHeader.vue';

export default {
  name: 'HomePage',

  components: {
    AppHeader,
  },

  data() {
    return {
      email: '',
      emailSent: false,
    };
  },

  methods: {
    handleSubmit() {
      // Simulate email sending
      console.log('Form submitted! Sending email response...');
      // You can implement actual email sending logic here
      this.emailSent = true;
      window.location.reload();
    },
  },
}
</script>


<style scoped>

.container {
  height: 130vh; /* Adjust the height to your desired size */
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
  align-items: center; /* Center vertically */
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
  margin-top: auto; /* Align at the bottom */
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
  border: 1px solid ; /* Adjusted border color */
  border-radius: 5px;
  width: 150px;
  color: white; /* Text color */
}

.input-field::placeholder {
  color: black; /* Placeholder color */
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
  color: green; /* Adjust color of the email response message */
}
</style>
