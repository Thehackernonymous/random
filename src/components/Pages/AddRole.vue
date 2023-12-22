<template>
    <div class="body-container">
      <AppHeader />
      <div class="container">
        <h1>Add Role</h1>
        <form @submit.prevent="addRole">
        <input
          type="text"
          v-model="role"
          placeholder="Enter Role"
          @keydown.enter="addRole"
          ref="roleInput"
          required
          class="input-box"
        />
        <button type="submit">Add Role</button>
        </form>
        <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
        <ul>
          <li
            v-for="(role, index) in filteredRoles"
            :key="index"
            :ref="role.id"
            @click="scrollToRole(role.id)"
          >
          {{ role.id }} - {{ role.role }}
        </li>
        </ul>
      </div>
      <div class="table-container" style="height: 350px; overflow-y: auto;">
        <table id="myTable" class="emptable">
          <thead>
            <tr>
              <th >Role No.</th>
              <th >Role</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="roles.length === 0">
              <td colspan="3">No data available</td>
            </tr>
            <tr v-for="role in roles" :key="role.id">
              <td>{{ role.id }}</td>
              <td>{{ role.role }}</td>
              <td>
                <button @click="deleteRole(role.id)">Delete</button> 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div :class="{ 'background-blur': showDeleteModal }"></div>
      <div class="delete-modal" v-if="showDeleteModal">
        <p>Do you want to delete this role?</p>
        <form>
      <input v-model="confirmationText"
           @keydown.enter="confirmDelete" 
           ref="confirmInput"
           required
           class="input-box"
           placeholder="Type 'delete' to confirm" 
           />
      <div class="button-container">
        <button @click="confirmDelete" class="centered-button">OK</button>
        <button @click="cancelDelete" class="centered-button">Cancel</button>
      </div>
      </form>
        </div>
   
          
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
          <h4>Info.</h4>
          <p>
            This is a Random Task Generator. 
              </p>
            <div class="icons">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://www.gmail.com/">
            <i class="far fa-envelope"></i>
          </a>
            <a href="https://www.github.com/" target="_blank" rel="noopener noreferrer">
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
  import { mapActions, mapState } from 'vuex';
  import axios from 'axios';
  
  export default {
    name: 'AddRole',
    components: {
      AppHeader
    },
    created(){
      this.fetchRoleData();
      this.$store.dispatch('fetchRoleData');
      console.log('Roles:', this.roles);
      this.$store.dispatch('fetchRoles').then(() => {
        this.roles = this.$store.getters.getRoleData;
      });
    },
    data() {
      return {
        role: '',
        tasks: [],
        roleAdded: false,
        feedbackMessage: "",
        showDeleteModal: false,
        confirmationText: "",
      };
    },
    computed: {
      ...mapActions(['addRoleToDatabase']),
      ...mapState(['roles']),
      roles(){
        return this.$store.getters.getRoleData;
      },
    },
    methods: {
      async fetchRoleData() {
        try {
          const response = await axios.get("http://localhost:5000/api/roles");
          this.roles = response.data; 
          console.log('Fetched data:', this.roles);
        } catch (error) {
          console.error("Error fetching role data:", error);
        }
      },
      async addRole() {
        if (this.role.trim() !== "") {
          const newRole = {
            role: this.role,
          };
  
          try {
            await this.$store.dispatch('addRole',newRole);
  
          const response = await axios.post(
              "http://localhost:5000/api/add-role",
              newRole
            );
  
            if (response.data.success) {
              this.roleAdded = true;
              this.feedbackMessage = "Role added successfully!";
            } else {
              this.roleAdded = false;
              this.feedbackMessage = "Role already added.";
              setTimeout(() => {
            window.location.reload();
          }, 2000);
            }
  
            setTimeout(() => {
        this.roleAdded = false;
        this.feedbackMessage = "";
      }, 3000);
            this.role = "";
            await this.fetchRoleData(); 
            await this.$store.dispatch('fetchRoles');
            this.$refs.roleInput.focus();
            this.searchQuery = "";
          } catch (error) {
        if (error.response && error.response.data) {
          this.feedbackMessage = error.response.data.message || "Role already added.";   
        } else {
          this.feedbackMessage = "An error occurred while adding the role.";
        }
        console.error("Error adding role:", error);
      }
    } else {
      this.feedbackMessage = "Please fill all the input fields.";
    }
  },
  async deleteRole(id) {
    this.showDeleteModal = true;
    const confirmDelete = async () => {
      if (this.confirmationText === "delete", "DELETE", "Delete") {
        try {
          await axios.delete(`http://localhost:5000/api/delete-role/${id}`);
          console.log('Deleted role with id:', id);
          this.$store.dispatch('deleteRole', id);
          this.fetchRoleData();
          this.feedbackMessage = 'Role deleted successfully';
        } catch (error) {
          console.error('Error deleting role:', error);
        }
        this.confirmationText = '';
        this.showDeleteModal = false;
      } else {
        this.feedbackMessage = "Please type 'delete' to confirm deletion."
      }
         setTimeout(() => {
          this.feedbackMessage = "";
        }, 4000);
      };
      this.confirmDelete = confirmDelete;
    },
    cancelDelete() {
      this.confirmationText = "";
      this.showDeleteModal = false;
    },
      async updateRole(updatedRole) {
        try {
          await axios.put(
            `http://localhost:5000/api/update-role/${updatedRole.id}`,
            updatedRole
          );
          console.log("Updated role:", updatedRole);
          this.fetchRoleData(); 
        } catch (error) {
          console.error("Error updating role:", error);
        }
      },
    }
    };
  </script> 
  
  <style scoped>
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
    display: flex;
    flex-direction: column;
  }
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 5px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .container button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    align-items: center;
    background-color:  #007BFF; 
    color: white; 
    border: none; 
    border-radius: 4px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    transition: all ease 0.2s;
  }

  .container button:active {
    scale: 0.9;
  }
  
  .input-box::placeholder {
    color: black; 
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .input-box {
    width: 70%;
    padding: 10px;
  }
  
  button[type="submit"] {
    padding: 10px 20px;
  }
  
  input[type=text],
  select {
    width: calc(100% - 40px);
    padding: 12px 20px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    align-items: center;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  .table-container {
    max-width: 100%;
    padding: 20px;
  }
  
  tbody tr:hover {
    background-color: bisque;
    color: purple;
  }
  .emptable {
    width: 100%;
    border-collapse: collapse;
  }
  
  .emptable th, 
  .emptable td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .emptable th {
    background-color: #f2f2f2;
  }
  
  .emptable td button {
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all ease 0.2s;
  }
  
  .emptable td button:hover {
    background-color: #d32f2f;
  }
  
  .emptable td button:active {
    scale: 0.9;
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
    color: white; 
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
  
  .background-blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    pointer-events: none; 
  }
  
  .delete-modal {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000; 
  }
  
  .delete-modal p {
    margin-bottom: 10px;
    font-size: 18px;
    text-align: center;
  }
  
  .delete-modal input {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .delete-modal::placeholder {
    color: black; 
  }
  
  .button-container {
    display: flex;
    justify-content: center;
  }
  
  .centered-button {
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    margin: 4px;
    transition: all ease 0.2s;
  }
  .centered-button:active {
    scale: 0.9;
  }
  
  .centered-button:nth-child(2) {
    background-color: #e74c3c; 
    color: #fff;
  }
  
  .centered-button:nth-child(3) {
    background-color: #3498db; 
    color: #fff;
  }
  </style>
  