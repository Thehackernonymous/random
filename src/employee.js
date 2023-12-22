// const { DataTypes } = require('sequelize');
// const sequelize = require('./sequelize');

// const Employee = sequelize.define('Employee', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//       len: [2, 100] // Name should be between 2 and 100 characters
//     }
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//       isIn: [['Intern', 'Contractor', 'Employee']] // Role should be one of these values
//     }
//   }
// }, {
//   timestamps: true // Adds createdAt and updatedAt timestamps
// });

// module.exports = Employee;
