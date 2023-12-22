<template>
    <div class="body-container">
    <EmployeeHeader />
    <div class="container">
      <h1>Random Task Assign</h1>
      <form @submit.prevent="assignTask">
      <button type="submit">Assign Task</button>
      </form>
      <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
      <ul>
        <li
          v-for="(record, index) in filteredRecords"
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
                <th>Record No.</th>
                <th>Employee Name</th>
                <th>Assigned Task</th>
                <th>Assigned Date</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="records.length === 0">
            <td colspan="6">No data available</td>
          </tr>
              <tr v-for="(record) in records" :key="record.id">
               <td>{{ record.id }}</td>
               <td>{{ record.name }}</td>
               <td>{{ record.taskname }}</td>
               <td>{{ formatDate(record.assigneddate) }}</td>
               <td>{{ record.role }}</td>
               <td>
              <button @click="deleteRecord(record.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
              
        <div :class="{ 'background-blur': showDeleteModal }"></div>
     <div class="delete-modal" v-if="showDeleteModal">
      <p>Do you want to delete the record?</p>
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
     import EmployeeHeader from "@/components/Header/EmployeeHeader.vue";
     import { mapGetters, mapState } from 'vuex';
     import axios from 'axios';
     
     export default {
       name: 'EmployeePage',
       components: {
         EmployeeHeader,
       },
       created() {
         this.fetchRecordData();
         this.$store.dispatch('fetchRecordData');
         console.log('Records:', this.records);
         this.$store.dispatch('fetchRecords').then(() => {
           this.records = this.$store.getters.getRecordData;
         });
       },
       computed: {
         ...mapGetters(['getEmployeeData', 'getTaskData']),
         ...mapState(['records']),
         records() {
          return this.$store.getters.getRecordData;
         },
       },
       data() {
         return {
           recordName: "",
           recordtaskName: "",
           recordRole: "",
           searchQuery: '',
          //  recordIDCounter: 1,
           taskAssigned: false,
           records: [],
           feedbackMessage: "",
           showDeleteModal: false,
           confirmationText: "",
         };
       },
       methods: {
         formatDate(dateString) {
           const date = new Date(dateString);
           return date.toLocaleDateString();
         },
         async fetchRecordData() {
           try {
              const response = await axios.get('http://localhost:5000/api/records');
              this.records = response.data; 
              console.log('Fetched data:', this.records)
            } catch (error) {
              console.error("Error fetching record data:", error);
             }
            },
  
  
         async deleteRecord(id) {
        this.showDeleteModal = true;
        const confirmDelete = async () => {
          if (this.confirmationText === "delete" || this.confirmationText === "DELETE" || this.confirmationText === "Delete") {
            try {
             await axios.delete(`http://localhost:5000/api/delete-record/${id}`);
             console.log('Deleted record with id:', id);
             this.records = this.records.filter((record) => record.id !== id);
             this.$store.commit("deleteRecord", id);
             this.fetchRecordData();
             this.feedbackMessage = "Record deleted successfully";
           } catch (error) {
             console.error('Error deleting record:', error);
           }
        this.confirmationText = '';
        this.showDeleteModal = false;
      } else {
        this.feedbackMessage = "Please type 'delete' to confirm deletion."
      }
         // Clear the feedback message after a delay
         setTimeout(() => {
          this.feedbackMessage = "";
        }, 3000);
      };
      this.confirmDelete = confirmDelete;
    },
    cancelDelete() {
      this.confirmationText = "";
      this.showDeleteModal = false;
    },
  
  
         async assignTask() {
        try {
          const employeesResponse = await axios.get('http://localhost:5000/api/employees');
          const tasksResponse = await axios.get('http://localhost:5000/api/tasks');
          if (employeesResponse.data && employeesResponse.data.employees.length > 0 &&
              tasksResponse.data && tasksResponse.data.tasks.length > 0) {
            const employees = employeesResponse.data.employees;
            const tasks = tasksResponse.data.tasks;
            const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
            const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
            const newRecord = {
              name: randomEmployee.name,
              taskname: randomTask.taskname,
              assigneddate: new Date().toISOString(),
              role: randomEmployee.role
            };
           
           const response = await axios.post('http://localhost:5000/api/assign-task', newRecord);
            // this.assignTask(records);
            if (response.data.success) {
              this.taskAssigned = true;
              this.feedbackMessage = "Record added successfully!";
            } else {
              this.taskAssigned = false;
              this.feedbackMessage = "Task already assigned.";
              setTimeout(() => {
            window.location.reload();
          }, 2000);
            }
  
            setTimeout(() => {
        this.taskAssigned = false;
        this.feedbackMessage = "";
      }, 3000);
            window.location.reload();
            // await this.fetchRecordData(); 
            await this.$store.dispatch('fetchRecords');
            this.feedbackMessage = "Task assigned successfully!";
          } else {
            console.error('No employees or tasks available to generate a task.');
          }
        } catch (error) {
          console.error('Error assigning and storing task:', error);
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
    /* overflow-y: auto;  */
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
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent background overlay */
    z-index: 999; /* Ensure it's above other content */
    pointer-events: none; /* Disable interaction with the background blur */
  }
  
  
  /* Styles for the pop-up modal */
  .delete-modal {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000; /* Ensure it's above the blurred background */
  }
  
  /* Style the text and buttons within the modal */
  .delete-modal p {
    margin-bottom: 10px;
    font-size: 18px;
    text-align: center;
    color: black;
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  