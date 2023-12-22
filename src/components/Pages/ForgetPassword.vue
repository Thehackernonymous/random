<!-- <template>
      <LoginHeader />
    <div class="forget-password-container">
      <h2>Forgot Password</h2>
      <form @submit.prevent="sendResetLink">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" placeholder="Enter your email" required>
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
    </div>
  </template>
  
  <script>
  import LoginHeader from '@/components/Header/LoginHeader.vue';
  import axios from 'axios';
  
  export default {
    components: {
    LoginHeader,
  },
    data() {
      return {
        email: '',
        feedbackMessage: '',
      };
    },
    methods: {
      async sendResetLink() {
        try {
          const response = await axios.post('/api/forget-password', { email: this.email });
          this.feedbackMessage = response.data.message;
        } catch (error) {
          console.error('Error sending reset link:', error);
          this.feedbackMessage = 'An error occurred while sending the reset link.';
        }
      },
    },
  };
  </script> -->
  
  <template>
     <LoginHeader />
     <div class="forget-password-container">
      <h2>Forget Password</h2>
      <form @submit.prevent="sendResetLink">
        <div class="form-group">
      <label for="email">Email:</label>
     <input type="email" v-model="email" placeholder="Enter your email" required>
      <button type="submit">Send Reset Link</button>
      </div>
    </form>
    
  </div>
</template>

<script>
import LoginHeader from '@/components/Header/LoginHeader.vue';

export default {
  components: {
    LoginHeader,
  },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async sendResetLink() {
  try {
    await auth().sendPasswordResetEmail(this.email, {
      url: `${window.location.origin}/reset-password`, // Set the URL to your reset-password route
    });
    alert('Password reset email sent. Check your inbox.');
    // Redirect the user to the password reset page
    this.$router.push('/reset-password');
  } catch (error) {
    console.error(error.message);
    alert('Error sending password reset email.');
  }
},
  },
};
</script>


  <style scoped>
  .forget-password-container {
    max-width: 390px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 50px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 2px;
  }
  
  input {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button {
    align-items: center;
    margin-top: 10px 9px;
    margin: 10px 120px;
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
  </style>
  