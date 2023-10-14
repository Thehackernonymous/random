import Vuex from 'vuex';
import axios from 'axios';

const store = new Vuex.Store({
  state: {
    employees: [],
    tasks: [],
    records: [],
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setRecords(state, records) {
      state.records = records;
    },
  },
  
  actions: {
    async fetchEmployees({ commit }) {
      try {
        // Update the users data property
        this.users = this.$store.getters.getEmployeeData;
        //
        const response = await axios.get('http://localhost:5000/api/employees');
        commit('setEmployees', response.data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },

    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        commit('setTasks', response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    async fetchRecordData({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/api/records');
        commit('setRecords', response.data.records);
      } catch (error) {
        console.error('Error fetching records:', error);
        throw error;
      }
    },
  },
  getters: {
    // getEmployeeData: state => state.employees,
    // getTaskData: state => state.tasks,
    // getRecordData: state => state.records



    getEmployeeData(state) {
      return state.employees;
    },
    getTaskData(state) {
      return state.tasks;
    },
    getRecordData(state) {
      return state.records;
    }
  },
});

export default store;

