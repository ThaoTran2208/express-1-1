// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var todos = [
      {id: 1, todo: "Đi chợ"},
      {id: 2, todo: "Nấu cơm"},
      {id: 3, todo: "Rửa bát"},
      {id: 4, todo: "Học code tại CodersX"},
    ]

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.render('index', {
    name: 'BBB'
  });
});

app.get('/todos', (req, res) => {
  var q = req.query.q;
  if (q){
    var matchedTodos = todos.filter(todo => {
      return todo.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('todos/index',{
      todos: matchedTodos
    });
  }
  res.render('todos/index',{
      todos: todos
    })
})

app.get('/todos/create', (req, res) => {
  res.render('todos/create');
})

app.post('/todos/create', (req, res) => {
  todos.push(req.body);
  res.redirect('back');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
