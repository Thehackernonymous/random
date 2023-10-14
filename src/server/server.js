const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const employeePool = new Pool({
  user: 'newdata',
  host: 'localhost',
  database: 'employee',
  password: 'raj',
  port: 5432,
});

const taskPool = new Pool({
  user: 'newdata',
  host: 'localhost',
  database: 'task',
  password: 'raj',
  port: 5432,
});

const recordPool = new Pool({
  user: 'newdata',
  host: 'localhost',
  database: 'record',
  password: 'raj',
  port: 5432,
});


app.post('/api/generate-task', async (req, res) => {
    try {
      const employeesResponse = await employeePool.query('SELECT * FROM employee');
      const tasksResponse = await taskPool.query('SELECT * FROM task');
  
      if (employeesResponse.rows.length === 0 || tasksResponse.rows.length === 0) {
        console.error('No employees or tasks found.');
        return res.status(500).json({ error: 'No employees or tasks found.' });
      }
  
      const employees = employeesResponse.rows;
      const tasks = tasksResponse.rows;
  
      const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
      const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  
      const generatedTask = {
        name: randomEmployee.name,
        taskname: randomTask.taskname,
        assigneddate: new Date().toISOString(),
        role: randomEmployee.role
      };
  
      await recordPool.query(
        'INSERT INTO record (name, taskname, assigneddate, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [generatedTask.name, generatedTask.taskname, generatedTask.assigneddate, generatedTask.role]
      );
  
      res.json({ success: true, generatedTask });
    } catch (error) {
      console.error('Error generating task and storing in record database:', error);
      res.status(500).json({ error: 'Error generating task and storing in record database.' });
    }
  });
  
  // ... (rest of the existing routes and server setup)
  
  
  
  // ////
  app.post('/api/add-task', async (req, res) => {
    const { taskname } = req.body;
  
    try {
      const result = await taskPool.query(
        'INSERT INTO task (taskname) VALUES ($1) RETURNING *',
        [taskname]
      );
      const newTask = result.rows[0];
  
      res.json({ success: true, task: newTask });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ success: false, error: 'Could not add task' });
    }
  });
  
  app.get('/api/tasks', async (req, res) => {
    try {
      const result = await taskPool.query('SELECT * FROM task');
      const tasks = result.rows;
      res.json({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  });
  
  app.put('/api/update-task/:id', async (req, res) => {
    const { id } = req.params;
    const { taskname } = req.body;
  
    try {
      const result = await taskPool.query(
        'UPDATE task SET taskname = $1 WHERE id = $2 RETURNING *',
        [taskname, id]
      );
      const updatedTask = result.rows[0];
  
      res.json({ success: true, task: updatedTask });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ success: false, error: 'Could not update task' });
    }
  });
  
  app.delete('/api/delete-task/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await taskPool.query('DELETE FROM task WHERE id = $1', [id]);
      res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ success: false, error: 'Could not delete task' });
    }
  });
  
  
  
  app.post('/api/add-employee', async (req, res) => {
    const { name, date_added, role } = req.body;
  
      try {
      const result = await employeePool.query(
        'INSERT INTO employee (name, date_added, role) VALUES ($1, $2, $3) RETURNING *',
        [name, date_added, role]
      );
      const newEmployee = result.rows[0];
  
      res.json({ success: true, employee: newEmployee });
    } catch (error) {
      console.error('Error adding employee:', error);
      res.status(500).json({ success: false, error: 'Could not add employee' });
    }
  });
  
  app.get('/api/employees', async (req, res) => {
    try {
      const result = await employeePool.query('SELECT * FROM employee');
      const employees = result.rows;
      res.json({ employees });
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Error fetching employees' });
    }
  });
  
  app.put('/api/update-employee/:id', async (req, res) => {
    const { id } = req.params;
    const { name, date_added, role } = req.body;
  
    try {
      const result = await employeePool.query(
        'UPDATE employee SET name = $1, date_added = $2, role = $3 WHERE id = $4 RETURNING *',
        [name, date_added, role, id]
      );
      const updatedEmployee = result.rows[0];
  
      res.json({ success: true, employee: updatedEmployee });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ success: false, error: 'Could not update employee' });
    }
  });
  
  app.delete('/api/delete-employee/:id', async (req, res) => {
    const { id } = req.params;
  
    // Ensure id is a valid integer
    const employeeId = parseInt(id);
  
    if (isNaN(employeeId)) {
      res.status(400).json({ success: false, error: 'Invalid employee ID' });
      return;
    }
  
    try {
      await employeePool.query('DELETE FROM employee WHERE id = $1', [employeeId]);
      res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ success: false, error: 'Could not delete employee' });
    }
  });
  
  
  
  
  
  employeePool && taskPool && recordPool .connect((err) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err);
    } else {
      console.log('Connected to PostgreSQL');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    }
  });
  
  
  
