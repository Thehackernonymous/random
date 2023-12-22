<template>
  <div class="container">
  <EmployeeHeader />
  <!-- </router-link> -->
    <section class="about-view">
      <div class="about">
        <img :src="require('@/assets/logo.png')" class="pic">
        <div class="text">
          <h2>About Us</h2>
          <h5>This is a <span>Random Task Generator.</span></h5>
          <p>
            
          </p>
          <div
           class="data">
            <a href="/employee-record" class="generate">See Records</a>
          </div>
        </div>
      </div>
    </section>

    
  <section class="footer">
    <div class="footer-row">
      <div class="footer-col">
        <h4>Info</h4>
        <ul class="links">
          <li><a href="/employee-about">About Us</a></li>
          <li><a href="/employee-record">Records</a></li>
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
import EmployeeHeader from '@/components/Header/EmployeeHeader.vue';

export default {
  name: 'EmployeeAbout',

  components: {
    EmployeeHeader,
  },
  
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');

* {
  margin: 0;
  padding: 5px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.container {
  background: white;

}

.about-view {
  height: 100vh;
  width: 100%;
  padding: 90px 0;
  background: white;
}
.about {
  width: 1130px;
  max-width: 85%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}


.pic {
  height: auto;
  width: 302px;
}

.text {
  width: 540px;
}

.text h2 {
  font-size: 90px;
  font-weight: 600;
  margin-bottom: 10px;
}

.text h5 {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
}

span {
  color: #4070f4;
}

.text p {
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 1px;
}

.data {
  margin-top: 30px;
}

.generate {
  font-size: 18px;
  background: #4070f4;
  color: #fff;
  text-decoration: none;
  border: none;
  padding: 8px 25px;
  border-radius: 6px;
  transition: 0.5s;
}

.generate:hover {
  background: #000;
  border: 1px solid #4070f4;
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
  width: 100%;
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
  color: white; /* Placeholder color */
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
  