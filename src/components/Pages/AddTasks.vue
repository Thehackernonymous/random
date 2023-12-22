 <template>
  <div class="body-container">
    <AppHeader />
    <div class="container">
      <h1>Add Task</h1>
      <form @submit.prevent="addTask">
      <input
        type="text"
        v-model="taskName"
        placeholder="Enter Task"
        @keydown.enter="addTask"
        ref="taskInput"
        required
        class="input-box"
      />
      <button type="submit">Add Task</button>
      </form>
      <p v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</p>
      <ul>
        <li
          v-for="(task, index) in filteredTasks"
          :key="index"
          :ref="task.id"
          @click="scrollToTask(task.id)"
        >
        {{ task.id }} - {{ task.taskname }}
      </li>
      </ul>
    </div>
    <!-- v-if="tasks.length > 0" -->
    <div class="table-container">
      <table id="myTable" class="emptable">
        <thead>
          <tr>
            <th >Task No.</th>
            <th >Task Name</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tasks.length === 0">
            <td colspan="3">No data available</td>
          </tr>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.taskname }}</td>
            <td>
              <button @click="deleteTask(task.id)">Delete</button> 
              <!-- <button @click="deleteTask(task.taskname)">Delete</button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <div v-if="showDeleteModal" class="background-blur"></div> -->
    <div :class="{ 'background-blur': showDeleteModal }"></div>
    <div class="delete-modal" v-if="showDeleteModal">
      <p>Do you want to delete this task?</p>
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
  name: 'AddTask',
  components: {
    AppHeader
  },
  created(){
    this.fetchTaskData();
    this.$store.dispatch('fetchTaskData');
    console.log('Tasks:', this.tasks);
    this.$store.dispatch('fetchTasks').then(() => {
      this.tasks = this.$store.getters.getTaskData;
    });
  },
  data() {
    return {
      taskName: '',
      tasks: [],
      searchQuery: '',
      // taskIdCounter: 1,
      taskAdded: false,
      feedbackMessage: "",
      showDeleteModal: false,
      confirmationText: "",
    };
  },
  computed: {
    ...mapActions(['addTaskToDatabase']),
    ...mapState(['tasks']),
    tasks(){
      return this.$store.getters.getTaskData;
    },
    // filteredTasks() {
    //   console.log('Filtered tasks', this.tasks);
    //   if (!Array.isArray(this.tasks)) {
    //     console.error('this.tasks is not an array:', this.tasks);
    //     return [];
    //   }
    //   const lowerSearchQuery = this.searchQuery.toLowerCase();
    //   return this.tasks.filter(task => {
    //     return task.taskname.toLowerCase().includes(lowerSearchQuery);
    //    });
    // },
  },
  methods: {
    // performSearch() {
    //   console.log('Performing search for:', this.searchQuery);
    // },
  //   performSearch() {
  //   if (this.searchQuery.trim() === '') {
  //     // If the search query is empty, show all tasks
  //     this.filteredTasks = this.tasks;
  //   } else {
  //     const lowerSearchQuery = this.searchQuery.toLowerCase();
  //     this.filteredTasks = this.tasks.filter(task => {
  //       return task.taskname.toLowerCase().includes(lowerSearchQuery);
  //     });
  //   }
  // },
    async fetchTaskData() {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        // this.$store.commit('setTasks', response.data);
        this.tasks = response.data; 
        console.log('Fetched data:', this.tasks);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    },
    async addTask() {
      if (this.taskName.trim() !== "") {
        const newTask = {
          taskname: this.taskName,
        };

        try {
          await this.$store.dispatch('addTask',newTask);

        const response = await axios.post(
            "http://localhost:5000/api/add-task",
            newTask
          );

          if (response.data.success) {
            this.taskAdded = true;
            this.feedbackMessage = "Task added successfully!";
          } else {
            this.taskAdded = false;
            this.feedbackMessage = "Task already added.";
            setTimeout(() => {
          // Reload the page after 6 seconds
          window.location.reload();
        }, 2000);
          }

          setTimeout(() => {
      this.taskAdded = false;
      this.feedbackMessage = "";
    }, 3000);

          this.taskName = "";
  

          await this.fetchTaskData(); 
          await this.$store.dispatch('fetchTasks');
           
          this.$refs.taskInput.focus();
          this.searchQuery = "";
        } catch (error) {
      if (error.response && error.response.data) {
        this.feedbackMessage = error.response.data.message || "Task already added.";   
      } else {
        this.feedbackMessage = "An error occurred while adding the task.";
        
      }
      console.error("Error adding task:", error);
    }
  } else {
    this.feedbackMessage = "Please fill all the input fields.";
  }
},
// async deleteTask(id) {
//       this.showDeleteModal = true;
//       const confirmDelete = async () => {
//         if (this.confirmationText === "delete", "DELETE", "Delete") {
//           try {
//            await axios.delete(`http://localhost:5000/api/delete-task/${id}`);
//             console.log("Deleted task with id:", id);
//             // this.tasks = this.tasks.filter(task => task.id !== id);
//             this.$store.commit('deleteTask', id);
            // this.fetchTaskData();
//             this.feedbackMessage = "Task deleted successfully";
//           } catch (error) {
//             console.error("Error deleting task:", error);
//          }
//           this.confirmationText = "";
//           this.showDeleteModal = false;
//         } else {
//           this.feedbackMessage = "Please type 'delete' to confirm deletion.";
//         }
//         setTimeout(() => {
//           this.feedbackMessage = "";
//         }, 4000);
//       };
//       this.confirmDelete = confirmDelete;
//     },
//     cancelDelete() {
//       this.confirmationText = "";
//       this.showDeleteModal = false;
//     },
//   },
// async deleteTask(id) {
//     this.showDeleteModal = true;
//     const confirmDelete = async () => {
//       if (this.confirmationText === "delete" || this.confirmationText === "DELETE" || this.confirmationText === "Delete") {
//         try {
//           // Make an API call to delete the task from the database
//           await axios.delete(`http://localhost:5000/api/delete-task/${id}`);
//           console.log('Deleted task with id:', id);
          
//           // Commit the mutation to delete the task from the client-side store
//           this.$store.dispatch('deleteTask', id);
//           // this.fetchTaskData();

//           // Close the delete modal and provide feedback
//           this.confirmationText = '';
//           this.showDeleteModal = false;
//           this.feedbackMessage = "Task deleted successfully";

//      // Clear the feedback message after a delay
//      setTimeout(() => {
//           this.feedbackMessage = '';
//         }, 3000);
//       } catch (error) {
//         console.error('Error deleting task:', error);
//         // Handle the error here
//         this.feedbackMessage = "An error occurred while deleting the task.";
//       }
//     } else {
//       this.feedbackMessage = "Please type 'delete' to confirm deletion.";
//     }
//   };

//   this.confirmDelete = confirmDelete;
// },
// cancelDelete() {
//   this.confirmationText = "";
//   this.showDeleteModal = false;

// },

async deleteTask(id) {
  this.showDeleteModal = true;

  const confirmDelete = async () => {
    if (this.confirmationText === "delete", "DELETE", "Delete") {
      try {
        await axios.delete(`http://localhost:5000/api/delete-task/${id}`);
        console.log('Deleted task with id:', id);
        this.$store.dispatch('deleteTask', id);
        this.fetchTaskData();
        this.feedbackMessage = 'Task deleted successfully';
      } catch (error) {
        console.error('Error deleting task:', error);
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

    async updateTask(updatedTask) {
      try {
        await axios.put(
          `http://localhost:5000/api/update-task/${updatedTask.id}`,
          updatedTask
        );
        console.log("Updated task:", updatedTask);
        this.fetchTaskData(); // Refresh the employee list after updating
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
  }
  };
</script> 

<style scoped>


/* Add transitions for smoother effects */
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
  height: 130vh; /* Adjust the height to your desired size */
  /* overflow-y: auto; Enable vertical scrolling if necessary */
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
  background-color:  #007BFF; /* Green background color */
  color: white; /* White text color */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a shadow */
  transition: all ease 0.2s;
}

/* Style for the "Add Employee" button on hover */
.container button:active {
  scale: 0.9;
}

.input-box::placeholder {
  color: black; /* Set placeholder text color to black */
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
  color: black; /* Set placeholder text color to black */
}

/* Style the button container for the "OK" and "Cancel" buttons */
.button-container {
  display: flex;
  justify-content: center;
}

/* Style the centered button within the modal */
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

/* Style the "OK" and "Cancel" buttons */
.centered-button:nth-child(2) {
  background-color: #e74c3c; /* Red for the "OK" button */
  color: #fff;
}

.centered-button:nth-child(3) {
  background-color: #3498db; /* Blue for the "Cancel" button */
  color: #fff;
}
</style>
