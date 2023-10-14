<template>
  <div class="body-container">
    <AppHeader />
    
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search"
        class="search-input"
      />
      <i class="fas fa-search" @click="performSearch"></i>
    </div>

    <div class="container">
      <h1>Add Employee</h1>
      <input
        type="text"
        v-model="employeeName"
        placeholder="Enter Employee Name"
        @keydown.enter="addEmployee"
        ref="employeeInput"
        required class="input-box"
      />
      <select v-model="employeeRole" placeholder="Role">
        <option value="" disabled selected>Select Role</option>
        <option value="Intern">Intern</option>
        <option value="Contractor">Contractor</option>
        <option value="Employee">Employee</option>
      </select>
      <button @click="addEmployee">Add Employee</button>
      <p v-if="employeeAdded" class="feedback">Employee added successfully!</p> 
      
      <ul>
        <li
          v-for="(user, index) in userList"
          :key="index"
          :ref="user.id"
          @click="scrollToEmployee(user.id)"
        >
          {{ user.id }} - {{ user.name }}
        </li>
      </ul>
    </div>

    <div class="table-container">
      <table id="myTable" class="emptable">
        <thead>
          <tr>
            <th>Emp. No.</th>
            <th>Employee Name</th>
            <th>Date Added</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="index">
            <td>{{ employee.id }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ formatDate(employee.date_added) }}</td>
            <td>{{ employee.role }}</td>
            <td>
              <button @click="editUser(employee)">Edit</button>
              <button @click="updateUser(employee)">Update</button>
              <button @click="deleteUser(employee.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
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
        <h4>Help</h4>
        <p>
          This is a Random Task Generator. If you want help email us.
        </p>
        <form @submit.prevent="handleSubmit" class="custom-form">
            <input v-model="email" type="email" placeholder="Your email" required class="input-field">
            <button type="submit" class="submit-button">Submit</button>
          </form>
          <div v-if="emailSent" class="email-response">
            Email sent! Thank you for reaching out.
          </div>
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
import AppHeader from "@/components/Header/AppHeader.vue";
import { mapActions } from "vuex";
import axios from "axios";


export default {
  name: "AddEmployee",
  components: {
    AppHeader,
  },
  created() {
    this.fetchEmployeeData(); 
    // this.$store.dispatch('fetchEmployees');
  },
  data() {
    return {
      employeeName: "",
      employeeRole: "",
      users: [],
      searchQuery: "",
      employeeIdCounter: 1,
      employeeAdded: false,
    };
  },
  computed: {
    ...mapActions(["addEmployeeToDatabase"]),
    employees() {
      return this.$store.getters.getEmployeeData;
    },
    filteredUsers() {
      console.log('Filtered users:', this.users); 
      if (!Array.isArray(this.users)) {
        console.error('this.users is not an array:', this.users);
        return [];
      }

      return this.users.filter((user) => {
        return (
          (user.name &&
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (user.date_added &&
            user.date_added.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (user.role &&
            user.role.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      });
    },
  },
  methods: {
    
    handleSubmit() {
      console.log('Form submitted! Sending email response...');
      this.emailSent = true;
      window.location.reload();
    },
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  },

  editUser(user) {
   
      this.$store.commit('setEditUser', user);
    },

    async fetchEmployeeData() {
  try {
    const response = await axios.get("http://localhost:5000/api/employees");
    console.log('Fetched data:', response.data); 
    if (Array.isArray(response.data)) {
      this.users = response.data;
    } else {
      console.error('Invalid data format:', response.data);
      this.users = [];
    }
  } catch (error) {
    console.error("Error fetching employee data:", error);
    this.users = [];
  }
},
    async addEmployee() {
      if (this.employeeName.trim() !== "" && this.employeeRole !== "") {
        const newEmployee = {
          name: this.employeeName,
          date_added: new Date().toISOString(),
          role: this.employeeRole,
        };


        try {
          // await this.$store.dispatch('addEmployeeToDatabase', newEmployee);

          await axios.post(
            "http://localhost:5000/api/add-employee",
            newEmployee
          );

          this.employeeAdded = true;

          setTimeout(() => {
            this.employeeAdded = false;
          }, 2000);

          this.employeeName = "";
          this.employeeRole = "";

          await this.fetchEmployeeData(); 
          await this.$store.dispatch('fetchEmployees');

          this.$refs.employeeInput.focus();
          this.searchQuery = "";
        } catch (error) {
          console.error("Error adding employee:", error);
        }
      }
    },
    performSearch() {
      console.log("Performing search for:", this.searchQuery);
    },

    async updateUser(updatedEmployee) {
      try {
        await axios.put(
          `http://localhost:5000/api/update-employee/${updatedEmployee.id}`,
          updatedEmployee
        );

        console.log("Updated employee:", updatedEmployee);
        this.fetchEmployeeData(); 
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    },

    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:5000/api/delete-employee/${id}`);
        console.log("Deleted user with id:", id);
        this.fetchEmployeeData(); 
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    },
  },
};

</script>
   


<style scoped>

.feedback {
    color: green;
    margin-top: 10px;
    animation: fadeOut 2s forwards;
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
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.search-container input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.container {
  max-width: 400px;
  margin: 20px auto;
  padding:  25px;
  /* text-align: center; */
  /* align-items: center; */
  border: 1px solid #ccc;
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

/* Style for the "Add Employee" button on hover */
 .container button:active {
  scale: 0.9;
} 

.input-box::placeholder {
  color: black; /* Set placeholder text color to black */
}


input[type=text],
input[type=date],
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
}

.emptable td button:hover {
  background-color: #d32f2f;
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
</style>
