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
      <h1>Add Task</h1>
      <input
        type="text"
        v-model="taskName"
        placeholder="Enter Task"
        @keydown.enter="addTask"
        ref="taskInput"
      />
      <button @click="addTask">Add Task</button>
      <p v-if="taskAdded" class="feedback">Task added successfully!</p>
      <ul>
        <li
          v-for="(task, index) in taskList"
          :key="index"
          :ref="task.id"
          @click="scrollToTask(task.id)"
        >
        {{ task.id }} - {{ task.taskName }}
      </li>
      </ul>
    </div>

    <div class="table-container">
      <table id="myTable" class="emptable table table-bordered">
        <thead>
          <tr>
            <th >Task No.</th>
            <th >Task Name</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in filteredTasks" :key="index">
            <td>{{ task.id }}</td>
            <td>{{ task.taskname }}</td>
            <td>
              <button @click="deleteTask(task.id)">Delete</button> 
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
import AppHeader from '@/components/Header/AppHeader.vue';
import { mapActions, mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'AddTask',
  components: {
    AppHeader
  },
  data() {
    return {
      taskName: '',
      task: [],
      searchQuery: '',
      taskIDCounter: 1,
      taskAdded: false
    };
  },
  computed: {
    ...mapActions(['addTaskToDatabase']),
    taskList() {
      return this.$store.getters.getTaskData;
    },
  //   filteredTasks() {
  //     return this.tasks.filter((task) => {
  //       return (
  //         (task.taskName && task.taskName.toLowerCase().includes(this.searchQuery.toLowerCase()))
  //         );
  //     }); 
  //   },
  // },
  ...mapState(['tasks']),
  filteredTasks() {
    return Array.isArray(this.tasks)
      ? this.tasks.filter(task => {
          return task.taskName.toLowerCase().includes(this.searchQuery.toLowerCase());
        })
      : [];
  }
},
  methods: {
    handleSubmit() {
      // Simulate email sending
      console.log('Form submitted! Sending email response...');
      // You can implement actual email sending logic here
      this.emailSent = true;
      window.location.reload();
    },
    performSearch() {
      console.log('Performing search for:', this.searchQuery);
    },

    // deleteTask(taskId) {
    //   this.deleteTaskFromDatabase(taskId);
    // },

    // addTask() {
    //   if (this.taskName.trim() !== '') {
    //     const newTask = {
    //       id: this.taskIDCounter++, 
    //       taskName: this.taskName
    //     };
    //     this.addTaskToDatabase(newTask);

    //     this.taskAdded = true;
    //     setTimeout(() => {
    //       this.taskAdded = false;
    //     }, 2000);

    //     this.taskName = '';

    //     this.$refs.taskInput.focus();
    //     this.searchQuery = '';
    //   }
    // },

    async fetchTaskData() {
      try {
        const response = await axios.get("http://localhost:5000/api/add-task");
        this.tasks = response.data; // Assuming the response structure is an array of users
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
          await axios.post(
            "http://localhost:5000/api/add-task",
            newTask
          );

          this.taskAdded = true;

          setTimeout(() => {
            this.taskAdded = false;
          }, 2000);

          this.taskName = "";

          this.fetchTaskData(); // Refresh the employee list after adding

          this.$refs.taskInput.focus();
          this.searchQuery = "";
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    },
  
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:5000/api/add-task/${id}`);
        console.log("Deleted task with id:", id);
        this.fetchTaskData(); // Refresh the employee list after deleting
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    async updateTask(updatedTask) {
      try {
        await axios.put(
          `http://localhost:5000/api/add-task/${updatedTask.id}`,
          updatedTask
        );
        console.log("Updated task:", updatedTask);
        this.fetchTaskData(); // Refresh the employee list after updating
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },

    scrollToTask(id) {
      const element = this.$refs[id];
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }
};
</script> 

<style scoped>


/* Add transitions for smoother effects */
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

.search-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.search-container input {
  width: calc(100% - 40px);
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
</style>
