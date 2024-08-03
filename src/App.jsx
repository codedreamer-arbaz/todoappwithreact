import TodoInput from './component/TodoInput'
import TodoList from './component/TodoList'
import { useState,useEffect } from 'react';
function App() {
  
const [todos,setTodos] = useState([
])
const [todoValue, setTodoValue] = useState('')

function handleAddTodos(newTodo){
  const newTodoList = [...todos,newTodo]
  persistData(newTodoList)
  setTodos(newTodoList)
}

function handleDeleteTodo(index){
  const newTodoList = todos.filter((todo,todoIndex)=>{
    return todoIndex !== index
  })
  setTodos(newTodoList)
  persistData(newTodoList)
}
function handleEditTodo(index){
  const valueToBeEdited = todos[index]
  setTodoValue(valueToBeEdited)
  handleDeleteTodo(index)
}
useEffect(()=>{
  if(!localStorage){
    return
  }
  let localTodos = localStorage.getItem('todos')
  if(localTodos){
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }
},[])
function persistData(newList){
  localStorage.setItem('todos',JSON.stringify({todos:newList}))
}
  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
    </>
  )
}


export default App
