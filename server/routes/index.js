/**
 * Main application routes
 */

'use strict';


module.exports = function(app) {

  // Insert routes below
  app.use('/employee', require('../routes/employee/employeeAPI'));
  app.use('/login', require('../routes/login/googleapi'));
};
