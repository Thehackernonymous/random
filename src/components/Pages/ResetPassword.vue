<template>
    <LoginHeader />
    <div class="reset-password-container">
      <h2>Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model.trim="password" placeholder="Enter your password" required>
        </div>
        <div class="form-group">
          <label for="confirmpassword">Confirm Password:</label>
          <input type="confirmpassword" v-model.trim="confirmpassword" placeholder="Confirm your password" required>
        </div>
        <button type="submit" style="align-items: center; margin: 0px 120px;">Change Password</button>
      </form>
      <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
    </div>

</template>

<script>
import LoginHeader from '../Header/LoginHeader.vue';
import axios from 'axios';

export default{
 components: {
  LoginHeader,  
 },
 data() {
    return {
      newPassword: '',
    };
  },
  methods: {
    async resetPassword() {
      try {
        const actionCode = this.$route.query.oobCode;
        await auth().confirmPasswordReset(actionCode, this.newPassword);
        alert('Password reset successful.');
        this.$router.push('/login-form');
      } catch (error) {
        console.error(error.message);
        alert('Error resetting password.');
      }
    },
  },
};

</script>

<style scoped>
.reset-password-container {
    max-width: 400px;
    margin: 5px auto;
    padding: 18px;
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
    margin-top: 10px;
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