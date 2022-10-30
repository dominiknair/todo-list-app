import { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if(storedTodos) setTodos(storedTodos)
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  function toggleTodo(id) {
    const newTodos = [...todos]

    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value

    if(name==="") return;
    console.log(name)

    setTodos(prevTodo => {
      return [...prevTodo, {id:uuidv4(), name:name, completed:false}]
    })

    todoNameRef.current.value=null
    
  }

  function clearComplete() {
    const newTodos = [...todos] //Copy of the current todos
    const nonCompleteTodos = newTodos.filter(todo => !todo.complete)

    setTodos(nonCompleteTodos)
  }

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={clearComplete}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  )
}

export default App;
