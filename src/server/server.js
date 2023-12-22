const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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

// const recordPool = new Pool({
//   user: 'newdata',
//   host: 'localhost',
//   database: 'record',
//   password: 'raj',
//   port: 5432,
// });
const testPool = new Pool({
  user: 'newdata',
  host: 'localhost',
  database: 'test',
  password: 'raj',
  port: 5432
});

const adminPool = new Pool({
  user: 'newdata',
  host: 'localhost',
  database: 'admin',
  password: 'raj',
  port: 5432,
});

const usersPool = new Pool({
  user: 'newdata',
  host: 'localhost',
  database: 'users',
  password: 'raj',
  port: 5432,
});

const rolePool = new Pool({
  user: 'newdata',
  host: 'localhost',
  database: 'role',
  password: 'raj',
  port: 5432
});
app.put('/api/update-test-status/:id', (req, res) => {
  const testId = parseInt(req.params.id);
  const { status } = req.body;
  const test = test.find(test => test.id === testId);
  if (!test) {
    return res.status(404).json({ success: false, error: 'Test not found' });
  }
  test.status = status;
  return res.json({ success: true, data: test });
});



app.post('/api/add-role', async (req, res) => {
  const { role } = req.body;
  try {
    const result = await rolePool.query(
      'INSERT INTO role (role) VALUES ($1) RETURNING *',
      [role]
    );
    const newRole = result.rows[0];
    res.status(200).send({ success: true, message: 'Role added successfully!', role: newRole });
  } catch (error) {
    if (error.code === '23505' && error.constraint === 'role_role_key') {
res.status(409).send({ success: false, message: 'Role already added.' });
} else {
console.error('Error adding task:', error);
res.status(500).send({ success: false, message: 'An error occurred while adding the role.' });
}
  }
});

app.get('/api/roles', async (req, res) => {
  try {
    const result = await rolePool.query('SELECT * FROM role');
    const roles = result.rows;
    res.json({ roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Error fetching roles' });
  }
});

app.put('/api/update-role/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const result = await rolePool.query(
      'UPDATE role SET taskname = $1 WHERE id = $2 RETURNING *',
      [role, id]
    );
    const updatedRole = result.rows[0];
    res.json({ success: true, role: updatedRole });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ success: false, error: 'Could not update role' });
  }
});

app.delete('/api/delete-role/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await rolePool.query('DELETE FROM role WHERE id = $1', [id]);
    res.json({ success: true, message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ success: false, error: 'Could not delete role' });
  }
});

app.post('/api/add-users', (req, res) => {
  const userData = req.body;
  userDb.query(
     'INSERT INTO users (firstname, lastname, role, email, contactno, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
     [userData.firstname, userData.lastname, userData.role, userData.email, userData.contactno, userData.password],
     (error, result) => {
        if (error) {
           console.error(error);
           return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'User added successfully!', data: result.rows[0] });
     }
  );
});

// Express route for admin registration
app.post('/api/add-admin', (req, res) => {
  const adminData = req.body;
  adminDb.query(
     'INSERT INTO admin (firstname, lastname, email, contactno, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
     [adminData.adminfirstname, adminData.adminlastname, adminData.adminemail, adminData.admincontactno, adminData.adminpassword],
     (error, result) => {
        if (error) {
           console.error(error);
           return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Admin added successfully!', data: result.rows[0] });
     }
  );
});

app.get('/api/roles', )

/////////////////////////////
// app.post('/api/assign-task', async (req, res) => {
//   const { name, taskname, assigneddate, role } = req.body;
//   try {
//     const employeeResponse = await employeePool.query('SELECT * FROM employee WHERE name = $1', [name]);
//     const taskResponse = await taskPool.query('SELECT * FROM task WHERE taskname = $1', [taskname]);

//     if (employeeResponse.rows.length === 0 || taskResponse.rows.length === 0) {
//       console.error('Assigned employee or task not found.');
//       return res.status(500).json({ error: 'Assigned employee or task not found.' });
//     }

//     const randomEmployee = employeeResponse.rows[0];
//     const randomTask = taskResponse.rows[0];


//     const result = await recordPool.query(
//       'INSERT INTO record (name, taskname, assigneddate, role) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, taskname, assigneddate, role]
//     );

//        // Delete the assigned employee and task records
//        await employeePool.query('DELETE FROM employee WHERE id = $1', [randomEmployee.id]);
//        await taskPool.query('DELETE FROM task WHERE id = $1', [randomTask.id]);

//     const newRecord = result.rows[0];

//     res.json({ success: true, message: 'Task assigned and stored successfully!', record: newRecord });
//   } catch (error) {
//     console.error('Error assigning and storing task:', error);
//     res.status(500).json({ error: 'Error assigning and storing task.' });
//   }
// });

//   app.get('/api/records', async (req, res) => {
//     try {
//       const result = await recordPool.query('SELECT * FROM record');
//       const records = result.rows;
//       res.json({ records });
//     } catch (error) {
//       console.error('Error fetching records:', error);
//       res.status(500).json({ error: 'Error fetching records' });
//     }
//   });

//   app.put('/api/update-record/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, taskname, assigneddate, role } = req.body;
//     try {
//       const result = await recordPool.query(
//         'UPDATE record SET name = $1, taskname = $2, assigneddate = $3, role = $4 WHERE id = $5 RETURNING *',
//         [name, taskname, assigneddate, role, id]
//       );
//       const updatedRecord = result.rows[0];
//       res.json({ success: true, record: updatedRecord });
//     } catch (error) {
//       console.error('Error updating record:', error);
//       res.status(500).json({ success: false, error: 'Could not update record' });
//     }
//   });

  // app.delete('/api/delete-record/:id', async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     await recordPool.query('DELETE FROM record WHERE id = $1', [id]);
  //     res.json({ success: true, message: 'Record deleted successfully' });
  //   } catch (error) {
  //     console.error('Error deleting record:', error);
  //     res.status(500).json({ success: false, error: 'Could not delete record' });
  //   }
  // });
  
  // app.delete('/api/delete-record/:id', async (req, res) => {
  //   const { id } = req.params;
  //   // const id = parseInt(id, 10); // Parse the "id" as an integer
  //   console.log('Received DELETE request for record ID:', id);
  //   if (isNaN(id)) {
  //     res.status(400).json({ success: false, error: 'Invalid record ID' });
  //     return;
  //   }
  //   try {
  //     await recordPool.query('DELETE FROM record WHERE id = $1', [id]);
  //     res.json({ success: true, message: 'Record deleted successfully' });
  //   } catch (error) {
  //     console.error('Error deleting record:', error);
  //     res.status(500).json({ success: false, error: 'Could not delete record' });
  //   }
  // });
 
  // app.delete('/api/records/:id', async (req, res) => {
  //   const { id } = req.params;
  
  //   try {
  //     // Perform the DELETE operation in the database
  //     const result = await pool.query('DELETE FROM record WHERE id = $1', [id]);
  
  //     if (result.rowCount === 1) {
  //       res.json({ success: true, message: 'Record deleted successfully' });
  //     } else {
  //       res.status(404).json({ success: false, message: 'Record not found' });
  //     }
  //   } catch (error) {
  //     console.error('Error deleting record:', error);
  //     res.status(500).json({ success: false, error: 'Could not delete record' });
  //   }
  // });
////////////////////////
  // app.delete('/api/delete-record/:id', async (req, res) => {
  //   const { id } = req.params;
  //   const recordId = parseInt(id);
  //   if (isNaN(recordId)) {
  //     res.status(400).json({ success: false, error: 'Invalid record ID' });
  //     return;
  //   }
  //   try {
  //     await recordPool.query('DELETE FROM record WHERE id = $1', [recordId]);
  //     res.json({ success: true, message: 'Record deleted successfully' });
  //   } catch (error) {
  //     console.error('Error deleting record:', error);
  //     res.status(500).json({ success: false, error: 'Could not delete record' });
  //   }
  // });

  // //////////

  app.post('/api/add-task', async (req, res) => {
    const { taskname } = req.body;
    try {
      const result = await taskPool.query(
        'INSERT INTO task (taskname) VALUES ($1) RETURNING *',
        [taskname]
      );
      const newTask = result.rows[0];
      res.status(200).send({ success: true, message: 'Task added successfully!', task: newTask });
    } catch (error) {
      if (error.code === '23505' && error.constraint === 'task_taskname_key') {
  res.status(409).send({ success: false, message: 'Task already added.' });
} else {
  console.error('Error adding task:', error);
  res.status(500).send({ success: false, message: 'An error occurred while adding the task.' });
}

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
  
  // app.delete('/api/delete-task/:id', async (req, res) => {
  //   const { taskid } = req.params;
  //   try {
  //     await taskPool.query('DELETE FROM task WHERE id = $1', [taskid]);
  //     res.json({ success: true, message: 'Task deleted successfully' });
  //   } catch (error) {
  //     console.error('Error deleting task:', error);
  //     res.status(500).json({ success: false, error: 'Could not delete task' });
  //   }
  // });

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
  
  
  ///////////////////////////////////////
  app.post('/api/add-employee', async (req, res) => {
    const { name, date_added, role } = req.body;
  
      try {
      const result = await employeePool.query(
        'INSERT INTO employee (name, date_added, role) VALUES ($1, $2, $3) RETURNING *',
        [name, date_added, role]
      );
      const newEmployee = result.rows[0];
      res.status(200).send({ success: true, message: 'Employee added successfully!', employee: newEmployee });
    } catch (error) {
      if (error.code === '23505' && error.constraint === 'employee_name_key') {
        res.status(400).send({ success: false, message: 'Employee already added.' });
      } else {
        console.error('Error adding employee:', error);
        res.status(500).send({ success: false, message: 'An error occurred while adding the employee.' });
      }
    }
    /////
    //  catch (error) {
    //   console.error('Error adding employee:', error);
    //   res.status(500).json({ success: false, error: 'Could not add employee' });
    // }
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
  
  /////////////////////////////////test database 
  app.post('/api/assign-task', async (req, res) => {
    const { name, taskname, assigneddate, role, status } = req.body;
    try {
      const employeeResponse = await employeePool.query('SELECT * FROM employee WHERE name = $1', [name]);
      const taskResponse = await taskPool.query('SELECT * FROM task WHERE taskname = $1', [taskname]);
  
      if (employeeResponse.rows.length === 0 || taskResponse.rows.length === 0) {
        console.error('Assigned employee or task not found.');
        return res.status(500).json({ error: 'Assigned employee or task not found.' });
      }
  
      const randomEmployee = employeeResponse.rows[0];
      const randomTask = taskResponse.rows[0];
  
  
      const result = await testPool.query(
        'INSERT INTO test (name, taskname, assigneddate, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, taskname, assigneddate, role, status]
      );
  
         // Delete the assigned employee and task records
        //  await employeePool.query('DELETE FROM employee WHERE id = $1', [randomEmployee.id]);
        //  await taskPool.query('DELETE FROM task WHERE id = $1', [randomTask.id]);
  
      const newTest = result.rows[0];
  
      res.json({ success: true, message: 'Task assigned and stored successfully!', record: newTest });
    } catch (error) {
      console.error('Error assigning and storing task:', error);
      res.status(500).json({ error: 'Error assigning and storing task.' });
    }
  });
  
    app.get('/api/tests', async (req, res) => {
      try {
        const result = await testPool.query('SELECT * FROM test');
        const tests = result.rows;
        res.json({ tests });
      } catch (error) {
        console.error('Error fetching tests:', error);
        res.status(500).json({ error: 'Error fetching tests' });
      }
    });
  
    app.put('/api/update-test/:id', async (req, res) => {
      const { id } = req.params;
      const { name, taskname, assigneddate, role } = req.body;
      try {
        const result = await testPool.query(
          'UPDATE test SET name = $1, taskname = $2, assigneddate = $3, role = $4 WHERE id = $5 RETURNING *',
          [name, taskname, assigneddate, role, id]
        );
        const updatedtest = result.rows[0];
        res.json({ success: true, test: updatedtest });
      } catch (error) {
        console.error('Error updating test:', error);
        res.status(500).json({ success: false, error: 'Could not update test' });
      }
    });
  
    app.delete('/api/delete-test/:id', async (req, res) => {
      const { id } = req.params;
      const testId = parseInt(id);
      if (isNaN(testId)) {
        res.status(400).json({ success: false, error: 'Invalid test ID' });
        return;
      }
      try {
        await testPool.query('DELETE FROM test WHERE id = $1', [testId]);
        res.json({ success: true, message: 'Test deleted successfully' });
      } catch (error) {
        console.error('Error deleting test:', error);
        res.status(500).json({ success: false, error: 'Could not delete test' });
      }
    });
  
  
  
  employeePool && taskPool && testPool && rolePool .connect((err) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err);
    } else {
      console.log('Connected to PostgreSQL');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    }
  });
  
  














  // ... (rest of the existing routes and server setup)
  
//   app.post('/api/add-record', async (req, res) => {
//     const { taskname } = req.body;
//     try {
//       const result = await taskPool.query(
//         'INSERT INTO task (taskname) VALUES ($1) RETURNING *',
//         [taskname]
//       );
//       const newTask = result.rows[0];
//       res.status(200).send({ success: true, message: 'Task added successfully!', task: newTask });
//     } catch (error) {
//       if (error.code === '23505' && error.constraint === 'task_taskname_key') {
//   res.status(409).send({ success: false, message: 'Task already added.' });
// } else {
//   console.error('Error adding task:', error);
//   res.status(500).send({ success: false, message: 'An error occurred while adding the task.' });
// }
//     }
//   });
  // async addRecord(records) {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/add-record', records);
  //     const addedRecords = response.data.records;
  //     this.$store.commit('addRecord', addedRecords);
  //   } catch (error) {
  //     console.error('Error adding records:', error);
  //   }
  // },



// app.post('/api/add-record', async (req, res) => {
//   // const { name, taskname, assigneddate, role } = req.body;
//     try {
//       const employeesResponse = await employeePool.query('SELECT * FROM employee');
//       const tasksResponse = await taskPool.query('SELECT * FROM task');
  
//       if (employeesResponse.rows.length === 0 || tasksResponse.rows.length === 0) {
//         console.error('No employees or tasks found.');
//         return res.status(500).json({ error: 'No employees or tasks found.' });
//       }
  
//       const employees = employeesResponse.rows;
//       const tasks = tasksResponse.rows;
  
//       const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
//       const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  
//       const newRecord = {
//         name: randomEmployee.name,
//         taskname: randomTask.taskname,
//         assigneddate: new Date().toISOString(),
//         role: randomEmployee.role
//       };
  
//       const result = await recordPool.query(
//         'INSERT INTO record (name, taskname, assigneddate, role) VALUES ($1, $2, $3, $4) RETURNING *',
//         [newRecord.name, newRecord.taskname, newRecord.assigneddate, newRecord.role]
//       );

//       // await employeePool.query('DELETE FROM employee WHERE id = $1', [employeeId]);
//       // await taskPool.query('DELETE FROM task WHERE id = $1', [taskid]);

//       const records = result.rows[0];

//       // records.push(record);
  
//       res.json({ success: true, message: 'Task assigned successfully!', record: records});
//     } catch (error) {
//       console.error('Error assigning task and storing in record database:', error);
//       res.status(500).json({ error: 'Error assigning task and storing in record database.' });
//     }

//   //   res.status(200).send({ success: true, message: 'Task assigned successfully!', record: newRecord });
//   // } catch (error) {
//   //   if (error.code === '23505' && error.constraint === 'employee_name_key') {
//   //     res.status(400).send({ success: false, message: 'Record already added.' });
//   //   } else {
//   //     console.error('Error assigning task:', error);
//   //     res.status(500).send({ success: false, message: 'An error occurred while assigning the task.' });
//   //   }
//   // }
//   });
