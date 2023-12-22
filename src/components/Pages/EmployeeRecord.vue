<template>
    <div class="body-container">
    <EmployeeHeader />
    <div class="container">
      <h1>Records</h1>
      <form @submit.prevent="assignTask">
      <button type="submit">See Your Records</button>
      </form>
      <ul>
        <li
          v-for="(test, index) in filteredTests"
          :key="index"
          :ref="test.id"
          @click="scrollToTest(test.id)"
        >
          {{ test.id }} - {{ test.name }} - {{ test.taskname }} - {{ test.role }} - {{ test.status }}
        </li>
      </ul>
    </div>
  
    <div class="table-container" style="height: 350px; overflow-y: auto;">
          <table id="myTable" class="emptable">
            <thead>
              <tr>
                <th>Record No.</th>
                <th>Employee Name</th>
                <th>Assigned Task</th>
                <th>Assigned Date</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="tests.length === 0">
            <td colspan="6">No data available</td>
          </tr>
              <tr v-for="(test) in tests" :key="test.id">
               <td>{{ test.id }}</td>
               <td>{{ test.name }}</td>
               <td>{{ test.taskname }}</td>
               <td>{{ formatDate(test.assigneddate) }}</td>
               <td>{{ test.role }}</td>
               <td>{{ test.status }}</td>
               <td>
                <button class="complete" @click="toggleTestStatus(index)">
                     {{ test.status === 'Completed' ? 'Completed' : 'Complete' }}
                     <span v-if="test.status === 'Completed'">&#10004;</span>
                   </button>
                   <button class="incomplete" @click="toggleTestStatus(index)">
                     {{ test.status === 'Incomplete' ? 'Incomplete' : 'Incomplete' }}
                     <span v-if="test.status === 'Incomplete'">&#10004;</span>
                   </button>
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
          <li><a href="/employee-about">About Us</a></li>
          <li><a href="/employee-record">Records</a></li>
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
       name: 'EmployeeRecord',
       components: {
         EmployeeHeader,
       },
       created() {
         this.fetchTestData();
         this.$store.dispatch('fetchTestData');
         console.log('Tests:', this.tests);
         this.$store.dispatch('fetchTests').then(() => {
           this.tests = this.$store.getters.getTestData;
         });
       },
       computed: {
         ...mapGetters(['getEmployeeData', 'getTaskData']),
         ...mapState(['tests']),
         tests() {
          return this.$store.getters.getTestData;
         },
       },
       data() {
         return {
           testName: "",
           testtaskName: "",
           testRole: "",
           searchQuery: '',
          //  recordIDCounter: 1,
           taskAssigned: false,
           tests: [],
           feedbackMessage: "",
         
         };
       },
       methods: {
         formatDate(dateString) {
           const date = new Date(dateString);
           return date.toLocaleDateString();
         },
         async fetchTestData() {
      try {
        const response = await axios.get('http://localhost:5000/api/tests');
        this.tests = response.data;
        console.log('Fetched data:', this.tests);
      } catch (error) {
        console.error("Error fetching record data:", error);
      }
    },

    toggleTestStatus(index) {
      const test = this.tests[index];

      // Check if record is defined before accessing its properties
      if (test && test.status) {
        test.status = test.status === 'Incomplete' ? 'Completed' : 'Incomplete';

        // Now, proceed with your axios.put or any other logic
        axios.put(`/api/update-test-status/${test.id}`, { status: test.status })
          .then(response => {
            if (response.data.success) {
              // Handle success if needed
            } else {
              console.error('Error updating test status:', response.data.error);
            }
          })
          .catch(error => {
            console.error('Error updating test status:', error);
          });
      }
    },
  }
  };  
  </script>
    
  <style scoped>

.emptable td button span {
  display: none;
}

/* Show the tick mark when the status is 'Completed' */
.emptable td button.complete span {
  display: inline-block;
  margin-left: 5px; /* Adjust the spacing as needed */
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
    margin: 10px auto;
    padding: 20px;
    /* border: 1px solid #ccc; */
    /* border-radius: 5px; */
    /* background-color: #f7f7f7; */
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
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
    border-radius: 50px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    transition: all ease 0.2s;
  }  
  
  .container button:active {
    scale: 0.9;
  }
  
  button[type="submit"] {
    padding: 10px 20px;
  }
  
  /* input[type=text],
  select {
    width: calc(100% - 40px);
    padding: 12px 20px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  } */
  
  button {
    padding: 10px 20px;
    margin: 2px;
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
    /* background-color: green; */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all ease 0.2s;
  }
  

  .emptable td button:active {
    scale: 0.9;
  }
  

  .complete {
  background-color: green;
  color: white;
}

.incomplete {
  background-color: red;
  color: white;
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
    background-color: green; 
    color: #fff;
  }
  </style>
  

