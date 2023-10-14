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
      <h1>Random Task Assign</h1>
      <button @click="generateRandomTask">Assign Task</button>
      <p v-if="taskGenerated" class="feedback">Tasks Assigned successfully!</p>
      <ul>
        <li
          v-for="(record, index) in record"
          :key="index"
          :ref="record.id"
          @click="scrollToRecord(record.id)"
        >
          {{ record.id }} - {{ record.name }} - {{ record.taskname }} - {{ record.role }}
        </li>
      </ul>
    </div>

    <div class="table-container">
          <table id="myTable" class="emptable">
            <thead>
              <tr>
                <th>Emp. No.</th>
                <th>Employee Name</th>
                <th>Assigned Task</th>
                <th>Assigned Date</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in records" :key="index">
               <td>{{ record.id }}</td>
               <td>{{ record.name }}</td>
               <td>{{ record.taskname }}</td>
               <td>{{ format(record.assigneddate) }}</td>
               <td>{{ record.role }}</td>
               <td>
              <button @click="deleteRecord(record.id)">Delete</button>
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
     import { mapGetters } from 'vuex';
     import axios from 'axios';
     
     export default {
       name: 'RecordPage',
       components: {
         AppHeader,
       },
       created() {
         this.fetchRecordData();
        //  this.$store.dispatch('fetchEmployees');
        //  this.$store.dispatch('fetchTasks');
       },
       computed: {
         ...mapGetters(['getEmployeeData', 'getTaskData']),
         record() {
           return this.$store.getters.getEmployeeData.getTaskData;
         },
         filteredRecords() {
           console.log('Filtered records:', this.records);
           if (!Array.isArray(this.records)) {
             console.error('this.records is not an array:', this.records);
             return [];
           }
     
           return this.records.filter((record) => {
             return (
               (record.name && record.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
               (record.taskname && record.taskname.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
               (record.assigneddate && record.assigneddate.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
               (record.role && record.role.toLowerCase().includes(this.searchQuery.toLowerCase()))
             );
           });
         },
       },
       data() {
         return {
           searchQuery: '',
           recordIDCounter: 1,
           taskGenerated: false,
           records: [],
         };
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
         editUser(record) {
           this.$store.commit('setEditRecord', record);
         },
         performSearch() {
           console.log('Performing search for:', this.searchQuery);
         },
         async handleGenerateTask() {
    try {
      await this.$store.dispatch('generateTask');
    } catch (error) {
      console.error('Error generating task:', error);
    }
  },
         async fetchRecordData() {
           // Fetch record data from the server
           try {
             const response = await axios.get('http://localhost:5000/api/records');
             if (Array.isArray(response.data)) {
               this.records = response.data;
             } else {
               console.error('Invalid data format:', response.data);
               this.records = [];
             }
           } catch (error) {
             console.error('Error fetching records:', error);
             this.records = [];
           }
         },
         async deleteRecord(id) {
           try {
             await axios.delete(`http://localhost:5000/api/delete-record/${id}`);
             console.log('Deleted record with id:', id);
             this.fetchRecordData();
           } catch (error) {
             console.error('Error deleting record:', error);
           }
         },
         async addRecord(records) {
           try {
             const response = await axios.post('http://localhost:5000/api/add-record', records);
             const addedRecords = response.data.records;
             this.$store.commit('addRecord', addedRecords);
           } catch (error) {
             console.error('Error adding records:', error);
           }
         },
        //  async generateTask() {
        //    try {
        //      // Fetch employees and tasks
        //      const employeesResponse = await axios.get('http://localhost:5000/api/employees');
        //      const tasksResponse = await axios.get('http://localhost:5000/api/tasks');
     
        //      if (employeesResponse.status !== 200 || tasksResponse.status !== 200) {
        //        console.error('Error fetching employees or tasks');
        //        return;
        //      }
     
        //      const employees = employeesResponse.data.employees;
        //      const tasks = tasksResponse.data.tasks;
     
        //      // Generate random records
        //      const records = employees.map(user => {
        //        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        //        return {
        //          name: user.name,
        //          taskname: randomTask.taskname,
        //          assigneddate: new Date().toISOString(),
        //          role: user.role,
        //        };
        //      });
     
        //      // Store the generated records in the record database
        //      await this.addRecord(records);
     
        //      // Check if records were successfully added
        //      this.taskGenerated = true;
        //      setTimeout(() => {
        //        this.taskGenerated = false;
        //      }, 2000);
     
        //      // Scroll smoothly to the generated task
        //      this.scrollToRecord();
        //    } catch (error) {
        //      console.error('Error generating tasks:', error);
        //    }
        //  },


        async generateRandomTask() {
      try {
        // Fetch employees and tasks from the respective endpoints
        const employeesResponse = await axios.get('http://localhost:5000/api/employees');
        const tasksResponse = await axios.get('http://localhost:5000/api/tasks');

        if (employeesResponse.data && employeesResponse.data.employees.length > 0 &&
            tasksResponse.data && tasksResponse.data.tasks.length > 0) {
          const employees = employeesResponse.data.employees;
          const tasks = tasksResponse.data.tasks;

          // Select a random employee and task
          const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
          const randomTask = tasks[Math.floor(Math.random() * tasks.length)];

          // Create the record to be stored
          const record = {
            name: randomEmployee.name,
            taskname: randomTask.taskname,
            assigneddate: new Date().toISOString(),
            role: randomEmployee.role
          };

          // Send a request to store the generated record
          await axios.post('http://localhost:5000/api/generate-task', record);

          console.log('Task generated and stored successfully:', record);
        } else {
          console.error('No employees or tasks available to generate a task.');
        }
      } catch (error) {
        console.error('Error generating and storing task:', error);
      }
    }
  }
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
  /* overflow-y: auto;  */
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
  padding: 20px;
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

.container button:active {
  scale: 0.9;
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
