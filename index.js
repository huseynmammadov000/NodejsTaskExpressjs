const { v4: uuidv4 } = require('uuid');
 
var express = require('express');
var app = express();
app.use(express.json());
const path = require('path')
const fs = require('fs')
 
 
let todos = [
  {id : uuidv4(),title :'task1',content:'someTask'},
  {id : uuidv4(),title :'task2',content:'someTask'},
  {id : uuidv4(),title :'task3',content:'someTask'},
]
 
console.log(todos)
 
 
 
 
app.get('/todos', (req, res) => {
  res.json(todos)
})
 
app.get('/todos/:id', (req, res) => {
 
  const id = req.params.id;
  var todo = todos.find(todo => todo.id ===id)
 
  if(todo){
 
    res.json(todo)
  }
  else   res.status(404).json({ message: 'Todo not found' });
})
 
 
app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const newTodo = { id: uuidv4(), title, content };
 
  todos.push(newTodo);
  res.status(201).json(newTodo);
})
 
app.put('/edit/:id',(req,res)=>{
  const id = req.params.id;
  const { title, content } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);
 
  if(todoIndex != -1){
    todos[todoIndex] = { ...todos[todoIndex], title, content };
    res.json(todos[todoIndex]);
  }
  else res.status(404).json({message :"todo not found"})
 
})
 
 
app.delete('/delete/:id',(req,res)=>{
  const id = req.params.id;
  const todoIndex = todos.findIndex(todo => todo.id === id);
 const deletedTodo =  todos.splice(todoIndex,1)
 res.json(deletedTodo)
})
 
app.get('/download',(req,res)=>{
       const filePath = path.join(__dirname,"files",'todos.txt')
       fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
       res.download(filePath)
       
    })
 
app.listen(5004,()=>{
    console.log("server running port 5000")
})
 

