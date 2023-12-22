import Vuex from 'vuex';
import axios from 'axios';
import auth from '@/store/modules/auth/index';
// import { LOADING_SPINNER_SHOW_MUTATION } from '@/store/storeconstants';
// export const IS_USER_AUTHENTICATE_GETTER = 'isUserAuthenticate';

export const LOADING_SPINNER_SHOW_MUTATION = 'LOADING_SPINNER_SHOW_MUTATION';


const store = new Vuex.Store({
  modules: {
    auth,
  },
  state: {
    isLoading: false,
    employees: [],
    tasks: [],
    // records: [],
    tests: [],
    roles: [],
    // isAuthenticated: false,
  },
  
  mutations: {
    [LOADING_SPINNER_SHOW_MUTATION](state, show) {
      state.isLoading = show;
    },
    setEmployees(state, employees) {
      state.employees = employees;
    },
    deleteEmployee(state, id){
      state.employees = state.employees.filter(employee => employee.id !== id);
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    // setRecords(state, records) {
    //   state.records = records;
    // }, 
    // deleteRecord(state, id) {
    //   state.records = state.records.filter(record => record.id !== id);
    // },
      setTests(state, tests) {
      state.tests = tests;
    }, 
    deleteTest(state, id) {
      state.tests = state.tests.filter(test => test.id !== id);
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    deleteRole(state, id){
      state.roles = state.roles.filter(role => role.id !== id);
    },
    // setUserAuthenticate(state, isAuthenticated) {
    //   state.isAuthenticated = isAuthenticated;
    // },
  },
  
  actions: {
    async fetchEmployees({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        commit('setEmployees', response.data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },

    async deleteEmployee({ commit }, id) {
      try {
        // Make an API call to delete the task
        await axios.delete(`http://localhost:5000/api/delete-employee/${id}`);
        console.log("Deleted employee with id:", id);
  
        // Commit the mutation to delete the task from the store
        commit('deleteEmployee', id);
      } catch (error) {
        console.error("Error deleting employee:", error);
        throw error; // Re-throw the error for handling in the component
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

    async deleteTask({ commit }, id) {
      try {
        // Make an API call to delete the task
        await axios.delete(`http://localhost:5000/api/delete-task/${id}`);
        console.log("Deleted task with id:", id);
  
        // Commit the mutation to delete the task from the store
        commit('deleteTask', id);
      } catch (error) {
        console.error("Error deleting task:", error);
        throw error; // Re-throw the error for handling in the component
      }
    },

    async fetchRoles({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/api/roles');
        commit('setRoles', response.data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    },

    async deleteRole({ commit }, id) {
      try {
        // Make an API call to delete the task
        await axios.delete(`http://localhost:5000/api/delete-role/${id}`);
        console.log("Deleted role with id:", id);
  
        // Commit the mutation to delete the task from the store
        commit('deleteRole', id);
      } catch (error) {
        console.error("Error deleting role:", error);
        throw error; // Re-throw the error for handling in the component
      }
    },


    // async fetchRecords({ commit }) {
    //   try {
    //     const response = await axios.get('http://localhost:5000/api/records');
    //     commit('setRecords', response.data.records);
    //   } catch (error) {
    //     console.error('Error fetching records:', error);
    //     throw error;
    //   }
    // },
    // async deleteRecord({ commit }, id) {
    //   try {
    //     // Make an API call to delete the task
    //     await axios.delete(`http://localhost:5000/api/delete-record/${id}`);
    //     console.log("Deleted record with id:", id);
  
    //     // Commit the mutation to delete the task from the store
    //     commit('deleteRecord', id);
    //   } catch (error) {
    //     console.error("Error deleting record:", error);
    //     throw error; // Re-throw the error for handling in the component
    //   }
    // },

     async fetchTests({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/api/tests');
        commit('setTests', response.data.tests);
      } catch (error) {
        console.error('Error fetching records:', error);
        throw error;
      }
    },
    async deleteTest({ commit }, id) {
      try {
        // Make an API call to delete the task
        await axios.delete(`http://localhost:5000/api/delete-test/${id}`);
        console.log("Deleted test with id:", id);
  
        // Commit the mutation to delete the task from the store
        commit('deleteTest', id);
      } catch (error) {
        console.error("Error deleting test:", error);
        throw error; // Re-throw the error for handling in the component
      }
    },
  },
  getters: {
    // getEmployeeData: state => state.employees,
    // getTaskData: state => state.tasks,
    // getRecordData: state => state.records


    // [IS_USER_AUTHENTICATE_GETTER]: state => state.isAuthenticated,
    getEmployeeData(state) {
      return state.employees;
    },
    getTaskData(state) {
      return state.tasks;
    },
    getRoleData(state) {
      return state.roles;
    },
    // getRecordData(state) {
    //   return state.records;
    // }
     getTestData(state) {
      return state.tests;
    }
  },
});

export default store;
