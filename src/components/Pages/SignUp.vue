<template>
    <div class="body-container">
      <LoginHeader />
      <!-- <div class="container"> -->
        <transition name="slide-fade">
        <div>
          
        <div class="signup-toggle">
          <button
            :class="{ active: signupType === 'user' }"
            @click="toggleSignupType('user')"
          >
            Sign up as User
          </button>
          <button
            :class="{ active: signupType === 'admin' }"
            @click="toggleSignupType('admin')"
          >
            Sign up as Admin
          </button>
        </div>
        <div v-if="signupType === 'user'">
          <h2>Signup as User</h2>
          <div class="alert alert-danger" v-if="error">
          {{ error }}
          </div>
          
  <form v-if="signupType === 'user'" @submit.prevent="onSignup()" class="right-align-form">
  <label for="firstname">First Name:</label>
  <div class="form-group">
    <input type="text" v-model="firstname" placeholder="Enter First Name" required id="firstname">
  </div>
  <label for="lastname">Last Name:</label>
  <div class="form-group">
    
    <input type="text" v-model="lastname" placeholder="Enter Last Name" required id="lastname">
  </div>
  <label for="signupRole">Select Role:</label>
  <div class="form-group">
    
    <select v-model="signupRole" required id="signupRole">
      <option value="" disabled>Select Role</option>
      <option v-for="role in roles" :key="role.id" :value="role.role">{{ role.role }}</option>
    </select>
  </div>
  <label for="email">Email:</label>
  <div class="form-group">
    
    <input type="email" v-model.trim="email" placeholder="Enter Email" required id="email">
    <div class="error" v-if="errors.email">{{ errors.email }}</div>
  </div>
  <label for="contactno">Contact No:</label>
  <div class="form-group">
    
    <input type="text" v-model="contactno" placeholder="Enter Contact No" required id="contactno">
  </div>
  <label for="password">Password:</label>
  <div class="form-group">
    
    <input type="password" v-model.trim="password" placeholder="Enter Password" required id="password">
    <div class="error" v-if="errors.password">{{ errors.password }}</div>
  </div>
  <label for="confirmpassword">Confirm Password:</label>
  <div class="form-group">
   
    <input type="password" v-model.trim="confirmpassword" placeholder="Confirm Password" required id="confirmpassword">
  </div>

  <button type="submit">Register</button>
  <div class="login-signup">Already have an account? <a href="/login-form" id="loginform">Login</a></div>

</form>

          <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
        </div>
        <div v-else-if="signupType === 'admin'">
          <h2>Signup as Admin</h2>
          <div class="alert alert-danger" v-if="error">
          {{ error }}
          </div>
          <form v-if="signupType === 'admin'" @submit.prevent="onSignup()" class="right-align-form">
  <label for="adminVerificationCode">Admin Verification Code:</label>
  <input
    type="text"
    v-model.trim="adminVerificationCode"
    placeholder="Enter admin verification code"
    required
  />
  <div class="row">
    <!-- Left Column -->
    <div class="col-md-4">
      <label for="firstname">First Name:</label>
      <div class="form-group">
        <input type="text" v-model="firstname" placeholder="First Name" required>
      </div>
      <label for="lastname">Last Name:</label>
      <div class="form-group">
        <input type="text" v-model="lastname" placeholder="Last Name" required>
      </div>
    </div>

    <!-- Middle Column -->
    <div class="col-md-4">
      <label for="email">Email:</label>
      <div class="form-group">
        <input type="email" v-model.trim="email" placeholder="Email" required>
      </div>
      <label for="contactno">Contact No.:</label>
      <div class="form-group">
        <input type="text" v-model="contactno" placeholder="Contact No" required>
      </div>
    </div>

    <!-- Right Column -->
    <div class="col-md-4">
      <label for="password">Password:</label>
      <div class="form-group">
        <input type="password" v-model.trim="password" placeholder="Password" required>
      </div>
      <label for="confirmpassword">Confirm Password:</label>
      <div class="form-group">
        <input type="password" v-model.trim="confirmpassword" placeholder="Confirm Password" required>
      </div>
    </div>
  </div>
  <button type="submit">Register</button>
  <div class="login-signup">Already have an account? <a href="/login-form" id="loginform">Login</a></div>
</form>
          <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
        </div>
      </div>
    </transition>
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
import LoginHeader from '@/components/Header/LoginHeader.vue';
import { mapActions, mapState, mapMutations } from "vuex";
import axios from 'axios';
import SignupValidations from '@/services/SignupValidations';
import { LOADING_SPINNER_SHOW_MUTATION ,SIGNUP_ACTION } from '@/store/storeconstants';
  
  export default {
    components: {
      LoginHeader,
    },
    created() {
    this.fetchRoleData();
     },
     mounted() {
     console.log('Component mounted.');
     this.fetchRoleData();
    },
    computed: {
    ...mapState(['roles']),
    roles() {
    return this.$store.getters.getRoleData;
     },
     },
    data() {
      return {
           signupType: 'user',
           roles: [],
           firstname: '',
           lastname: '',
           email: '',
           contactno: '',
           password: '',
           confirmpassword: '',
           feedbackMessage: "",
           errors: [],
           error: '',
      };
    },
    beforeRouteLeave() {
      console.log('route leaving');
      console.log(this.$store);
    },
    beforeRouteEnter(_, _1 ,next) {
      next((vm) => {
        console.log('route entering');
        console.log(vm.$store.state.auth);
      });
    },
    methods: {
      toggleTab() {
        this.activeTab = this.activeTab === 'signup' ? 'login' : 'signup';
      },
      toggleSignupType(type) {
        this.signupType = type;
      },
      async fetchRoleData() {
  try {
    console.log('Fetching roles...');
    const response = await axios.get('http://localhost:5000/api/roles');
    console.log('Response:', response.data);
    this.roles = response.data.roles;
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
},
   
...mapActions('auth',{
  signup: SIGNUP_ACTION,
}),

...mapMutations({
  showLoading: LOADING_SPINNER_SHOW_MUTATION,
}),
async onSignup() {
  let validations = new SignupValidations(
    this.email,
    this.password,
  );
  this.errors = validations.checkValidations();
            if ('email' in this.errors || 'password' in this.errors) {
                return false;
            }
            //make spinner true
            this.showLoading(true);
            //signup registration
            try {
                await this.signup({
                    email: this.email,
                    password: this.password,
                    // this.errors = [],
                    // this.feedbackMessage = 'User registered successfully!',
                });
            } catch (error) {
                this.error = error;
                this.showLoading(false);
            }finally {
            this.showLoading(false);
            //make spinner false
            }
        },
    
registerUser() {
      const userData = {
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.signupRole, // Assuming signupRole is the correct property
        email: this.email,
        contactno: this.contactno,
        password: this.password,
      };
      axios.post('/api/add-users', userData)
        .then(response => {
          this.feedbackMessage = "User added successfully!";
        })
        .catch(error => {
          console.error(error);
        });
    },
    registerAdmin() {
      const adminData = {
        firstname: this.adminfirstname,
        lastname: this.adminlastname,
        email: this.adminemail,
        contactno: this.admincontactno,
        password: this.adminpassword,
      };
      axios.post('/api/add-admin', adminData)
        .then(response => {
          this.firstname = '';
          this.lastname = '';
          this.email = '';
          this.contactno = '';
          this.password = '';
          this.errors = [];
          this.feedbackMessage = "Admin registered successfully!";
        })
        .catch(error => {
          console.error(error);
        });
    },
    },
  };
  </script>
  
  <style scoped>
  .slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}

  .signup-toggle {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .signup-toggle button {
    padding: 10px;
    background-color: black;
    border: none;
    cursor: pointer;
  }
  
  .signup-toggle button.active {
    text-decoration: underline;
  }

  .right-align-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 2px;
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
  
  /* .right-align-form {
    text-align: right;
}

.form-group {
  margin-bottom: 10px;
}

label {
  text-align: left;
  margin-bottom: 5px;
} */
  
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
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
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
    width: 95%;
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
  
  
  .toggle-button {
    text-align: center;
  }
  
  .toggle-button button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .toggle-button button:hover {
    text-decoration: underline;
  }
  .data {
    margin-top: 13px;
    padding: 5px;
  }
  
  .login {
    font-size: 18px;
    background: #4070f4;
    margin: 2px 270px;
    color: #fff;
    text-decoration: none;
    border: none;
    padding: 8px 25px;
    border-radius: 50px;
    align-items: center;
    transition: 0.5s;
  }
  
  .login:hover {
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
    border-radius: 50px;
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
    margin: 2px 95px;
  }

  </style>
  