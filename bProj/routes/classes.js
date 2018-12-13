var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.get('/', function (request, response) {

    var query = 'select * from classes';

    db.any(query)
      .then(function (rows) {
          // render views/store/list.ejs template file
          response.render('classes/list', {
              title: '',
              data: rows
          })
      })
      .catch(function (err) {
          // display error message in case an error
          request.flash('error', err);
          response.render('classes/list', {
              title: '',
              data: ''
          })
      })
});

app.get('/add', function (request, response) {
    // render views/store/add.ejs
    response.render('classes/add', {
        title: 'Add New Class',
        classnumber: '',
        classname: ''
    })
});

// Route to insert values. Notice that request method is POST here
app.post('/add', function (request, response) {
    // Validate user input - ensure non emptiness
    request.assert('classnumber', 'Class Number is required').notEmpty();
    request.assert('classname', 'Class Name is required').notEmpty();

    var errors = request.validationErrors();
    if (!errors) { // No validation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            classnumber: request.sanitize('classnumber').escape().trim(),
            classname: request.sanitize('classname').escape().trim()
        };
        // Running SQL query to insert data into the store table
        db.none('INSERT INTO classes(classnumber, classname) VALUES($1, $2)', [item.classnumber, item.classname])
            .then(function (result) {
                request.flash('success', 'Data added successfully!');
                // render views/store/add.ejs
                response.render('classes/add', {
                    title: 'Add New Class',
                    classnumber: '',
                    classname: ''
                })
            }).catch(function (err) {
            request.flash('error', err);
            // render views/store/add.ejs
            response.render('classes/add', {
                title: 'Add New Class',
                    classnumber: '',
                    classname: ''
            })
        })
    } else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        request.flash('error', error_msg);
        response.render('classes/add', {
            title: 'Add New Class',
            classnumber: request.body.classnumber,
            classname: request.body.classname
        })
    }
});


// bttw: added increment route handler
app.get('/increment/:classnumber', function (req, res) {
  var classId = req.params.classnumber;

  var query = 'UPDATE classes SET upvotes = upvotes + 1 WHERE classnumber = ' + classId + ';' +
    'SELECT upvotes FROM classes WHERE classnumber = ' + classId + ';';
  db.one(query)
    .then(function (value) {
      res.send(value)
    })
    .catch(function (err) {
      // todo: add a return value to let the web app understand
      // that an error was thrown
      // something like this and then check for -1 in the app and
      // show a message
      res.send(-1)
    })

})

// bttw: added decrement route handler
app.get('/decrement/:classnumber', function (req, res) {
  var classId = req.params.classnumber;

  var query = 'UPDATE classes SET downvotes = downvotes + 1 WHERE classnumber = ' + classId + ';' +
    'SELECT downvotes FROM classes WHERE classnumber = ' + classId + ';';
  db.one(query)
    .then(function (value) {
      res.send(value)
    })
    .catch(function (err) {
      // todo: add a return value to let the web app understand
      // that an error was thrown
      // something like this and then check for -1 in the app and
      // show a message
      res.send(-1)
    })

})


app.get('/edit/(:upvotes)', function (request, response) {

    response.send(JSON.stringify(request.query))
    return

    // Fetch the id of the item from the request.
    var classId = request.params.classnumber;
    var upvotes = request.params.upvotes;
    console.log(upvotes);
    

    // TODO: Initialize the query variable with a SQL query
    // that returns all columns of an item whose id = itemId in the
    // 'store' table
    var query = 'select * from classes where classnumber = '+classId;
    db.one(query)
        .then(function (row) {
            // if item not found
            if (row.length === 0) {
                request.flash('error', 'Item not found with classnumber = ' + request.params.classnumber);
                response.redirect('/classes')
            }
            else {
                response.render('classes/edit', {
                    title: 'Edit Class',
                    id:row.id,
                    classnumber: row.classnumber,
                    classname: row.classname, 
                    upvotes: row.upvotes
                })
            }
        })
        .catch(function (err) {
            request.flash('error', err);
            response.render('classes/list', {
                title: 'Class listing',
                data: ''
            })
        })
});

// Route to update values. Notice that request method is PUT here
app.put('/edit/(:id)', function (req, res) {
    // Validate user input - ensure non emptiness
    req.assert('classnumber', 'Class Number is required').notEmpty();
    req.assert('classname', 'Class Name is required').notEmpty();

    var errors = req.validationErrors();
    if (!errors) { // No validation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            classnumber: req.sanitize('classnumber').escape().trim(),
            classname: req.sanitize('classname').escape().trim()
        };

        // Fetch the id of the item from the request.
        var classnum = req.params.id;
        var votes = req.params.upvotes;

        // TODO: Initialize the updateQuery variable with a SQL query
        // that updates the details of an item given its id
        // in the 'store' table
        var updateQuery = "UPDATE classes SET upvotes = "+31+" WHERE classnumber =" + classnum;
        // Running SQL query to insert data into the store table
        db.none(updateQuery)
            .then(function (result) {
                req.flash('success', 'Data updated successfully!');
                res.redirect('/classes');
            })
            .catch(function (err) {
                req.flash('error', err);
                res.render('classes/edit', {
                    title: 'Edit Class',
                    classnumber: req.params.classnumber,
                    classname: req.body.classname,
                    upvotes: req.body.upvotes
                })
            })
    }
    else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        req.flash('error', error_msg);
        res.render('classes/edit', {
            title: 'Edit Class',
                    classnumber: req.params.classnumber,
                    classname: req.body.classname,
                    upvotes: req.body.upvotes
        })
    }
});

//Route to delete an item. Notice that request method is DELETE here
app.delete('/delete/(:id)', function (req, res) {
    // Fetch item id of the item to be deleted from the request.
    var classnumber = req.params.classnumber;

    // TODO: Initialize the deleteQuery variable with a SQL query
    // that deletes an item whose id = itemId in the
    // 'store' table
    var deleteQuery = "DELETE FROM classes WHERE classnumber =" + classnumber;
    db.none(deleteQuery)
        .then(function (result) {
                  req.flash('success', 'successfully deleted it');
                  res.redirect('/classes');
        })
        .catch(function (err) {
                   req.flash('error', err);
                   res.redirect('/classes')
        })
});













































