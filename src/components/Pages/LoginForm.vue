<template>
<div class="body-container">
    <LoginHeader />
    <div class="container">
      
  <div class="login-container">
    <div class="slider-container">
          <label class="slider-label" :class="{ active: loginType === 'user' }">User</label>
          <div class="slider" @click="toggleLoginType">
            <div :class="{ 'slider-thumb-user': loginType === 'user', 'slider-thumb-admin': loginType === 'admin' }"></div>
          </div>
          <label class="slider-label" :class="{ active: loginType === 'admin' }">Admin</label>
        </div>
      </div>
    <transition name="slide-fade">
      <div v-if="loginType === 'user'">
        <h2>User Login {{ name }}</h2>
        <div class="alert alert-danger" v-if="error">
        {{ error }}
        </div>
        <form @submit.prevent="onLogin()" class="right-align-form">
          <label for="email">Email:</label>
          <div class="form-group">
          <input type="email" v-model.trim="email" placeholder="Email" required>
        </div>
        <div class="error" v-if="errors.email">
        {{ errors.email }}
        </div>
          <label for="password">Password:</label>
          <div class="form-group">
          <input type="password" v-model.trim="password" placeholder="Password" required >
          </div>
          <div class="error" v-if="errors.password">
        {{ errors.password }}
        </div>
            <!-- <div>
              <input type="checkbox" v-model="rememberMe"> Remember Me
            </div>
          <a href="/forgot-password">Forgot Password?</a> -->
          <div class="option-field" style="margin-right: 10px; ">
  <div class="checkbox-container">
    <span class="checkbox">
      <input style="margin: -55px;" type="checkbox" id="check" />
    </span>
    <p style="margin-top: -20px;">Remember me</p>
  </div>
  <a href="/forget-password" class="forgot-pw" style="margin-left: 20px; margin-top: -20px;">Forgot password?</a>
</div>


      
          <button type="submit">Login</button>
        </form>
      </div>
      <div v-else="loginType === 'admin'">
      <h2>Admin Login</h2>
      <div class="alert alert-danger" v-if="error">
        {{ error }}
        </div>
      <form @submit.prevent="onAdminLogin">
        <label for="adminVerificationCode">Admin Verification Code:</label>
            <input
              type="text"
              v-model.trim="adminVerificationCode"
              placeholder="Enter admin verification code"
              required
            />
        <label for="email">Email:</label>
        <input type="email" v-model.trim="email" placeholder="Enter email address" required>
        <div class="error" v-if="errors.email">
        {{ errors.email }}
        </div>
        <label for="password">Password:</label>
        <input type="password" v-model.trim="password" placeholder="Enter password" required />
        <div class="error" v-if="errors.password">
        {{ errors.password }}
        </div>
        <div class="option-field" style="margin-right: 10px; ">
  <div class="checkbox-container">
    <span class="checkbox">
      <input style="margin: -55px;" type="checkbox" id="check" />
    </span>
    <p style="margin-top: -20px;">Remember me</p>
  </div>
  <a href="/forget-password" class="forgot-pw" style="margin-left: 20px; margin-top: -20px;">Forgot password?</a>
</div>
        <button type="submit">Login</button>
      </form>
    </div>
  </transition>
 

        <div class="login-signup">Don't have an account? <a href="/sign-up" id="signup">Signup</a></div>
    </div>
  </div>

    <section class="footer">
      <div class="footer-row">
        <div class="footer-col">
          <h4>Info</h4>
          <ul class="links">
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

</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import Validations from '@/services/Validations';
import SignupValidations from '@/services/SignupValidations';
import LoginHeader from '@/components/Header/LoginHeader.vue';
import axios from 'axios';
import { LOGIN_ACTION } from '@/store/storeconstants';
import { LOADING_SPINNER_SHOW_MUTATION } from '@/store/storeconstants';
import store from '@/store/store';
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/storeconstants';

export default {
  components: {
    LoginHeader,
  },
  computed: {
    ...mapState('auth', {
      name: (state) => state.name,
    }),

    ...mapGetters('auth', {
      isUserAuthenticate: IS_USER_AUTHENTICATE_GETTER,
    }),
  },
  data() {
    return {
      adminVerificationCode: '',
      loadingText: 'Loading...',
      transitionName: 'slide-fade',
      loginType: 'user',
      email: '',
      password: '',
      adminUserCode: '',
      adminEmail: '',
      adminPassword: '',
      loginFeedback: '',
      rememberMe: false,
      showPassword: false,
      errors: [],
      error: '',
    };
  },
  methods: {
    
    yourOtherMethods() {
      // Call the mutation
      this.showLoading(true);
    },
    toggleLoginType() {
      this.loginType = this.loginType === 'user' ? 'admin' : 'user';
      this.transitionName = 'slide-fade';
    },
    onUserLogin() {
      // Implement user login logic here
      // Use userEmail and userPassword
      console.log('User login clicked');
    },
    onAdminLogin() {
      // Implement admin login logic here
      // Use adminUserCode, adminEmail, and adminPassword
      console.log('Admin login clicked');
    },
    ...mapActions('auth', {
      login: LOGIN_ACTION,
    }),
    ...mapMutations({
      showLoading: 'LOADING_SPINNER_SHOW_MUTATION',
    }),
    async onAdminLogin() {
      this.errors = [];

      // Perform input validations
      let validations = new SignupValidations(this.email, this.password);
      this.errors = validations.checkValidations();

      if (this.errors.length > 0) {
        return;
      }

      // Verify admin verification code
      const isValidCode = await this.verifyAdminVerificationCode(this.adminVerificationCode);

      if (!isValidCode) {
        this.error = 'Invalid admin verification code.';
        return;
      }

      this.error = '';
      this.showLoading(true);

      try {
        // Call the login action from the Vuex store
        await this.login({
          email: this.email,
          password: this.password,
        });
        this.showLoading(false);

        // Redirect on successful login
        this.$router.push('/home-page');
      } catch (e) {
        // Handle login error
        this.showLoading(false);

        this.error = e.message || 'Login failed. Please check your credentials.';
      }
    },

    async verifyAdminVerificationCode(code) {
      try {
        // Call an API endpoint to verify the admin verification code
        const response = await axios.post('/api/verify-admin-code', { code });
        return response.data.isValid;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
  
      //  axios.post ('/api/login', loginData)
      //   .then(response => {
      //     if (response.data.token) {
      //       // Successful login; store the token in local storage or use as needed.
      //       localStorage.setItem('token', response.data.token);
      //       alert('Login successful');
      //     } else {
      //       alert('Login failed. Please check your credentials.');
      //     }
      //   })
      //   .catch(error => {
      //     alert('Login failed. Please check your credentials.');
      //     console.error(error);
      //   }),
  

</script>

<style scoped>

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}

.slider-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.slider-label {
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  background-color: #eee;
  transition: background-color 0.3s;
}

.slider-label.active {
  background-color: #4CAF50;
  color: white;
}

.slider {
  position: relative;
  width: 60px;
  height: 30px;
  margin: 10px;
  background-color: #ccc;
  border-radius: 15px;
  cursor: pointer;
}

.slider-thumb-user, .slider-thumb-admin {
  position: absolute;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #4CAF50;
  transition: transform 0.3s;
}

.slider-thumb-admin {
  left: 30px;
}

.slider-thumb-user {
  left: 0;
}

.slider:hover .slider-thumb-user {
  transform: translateX(30px);
}

.slider:hover .slider-thumb-admin {
  transform: translateX(0);
}
.right-align-form {
  max-width: 500px;
  margin: 5px auto;
  padding: 30px;
  /* border: 1px solid #ccc; */
  /* border-radius: 15px; */
  background-color: #f9f9f9;
}

/* .option-field {
    display: flex;
    flex-direction: row;
    align-items: center; 
    margin-top: 10px; 
  }

  .checkbox {
    margin-bottom: 5px; 
  } */
  .option-field {
  display: flex; 
  align-items: center; 
  flex-direction: row;
  margin: 10px 10px;
}

.checkbox {
  margin-right: 10px; 
}


  .forgot-pw {
    margin-top: 5px; /* Adjust the margin as needed */
  }

  label {
    margin-left: 5px; /* Adjust the margin as needed */
  }

  button {
    margin-top: 10px; /* Adjust the margin as needed */
    padding: 10px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  margin-top: 10px;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.data {
    margin-top: 13px;
    padding: 5px;
  }
  
  .signup {
    font-size: 18px;
    background: #0056b3;
    color: #fff;
    text-decoration: none;
    border: none;
    padding: 8px 25px;
    border-radius: 20px;
    transition: 0.5s;
  }
  
  .signup:hover {
    background: #000;
    border: 1px solid #0056b3;
  }
.feedback {
    color: green;
    margin-top: 10px;
    animation: fadeOut 4s forwards;
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  .body-container {
    height: 130vh;
    /* overflow-y: auto; */
    display: flex;
    flex-direction: column;
  }
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 50px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  select,
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button {
    margin-top: 10px;
    padding: 10px;
    margin: 5px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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

  .login-signup{
    margin: 0px 50px;
  }


.login-type-toggle {
  margin-top: 10px;
  text-align: center;
}

.login-type-toggle p {
  margin-bottom: 5px;
}

.login-type-toggle a {
  cursor: pointer;
  text-decoration: underline;
}
</style>

