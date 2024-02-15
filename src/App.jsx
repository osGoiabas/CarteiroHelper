import { useState } from 'react'
import { useForm } from 'react-hook-form';
import './App.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import Filter from './components/Filter'

function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      cep: "58051540",
      address: "",
      neighborhood: "",
      city: "",
      state: "", 
      addressNumber: "",
      addressExtra: "Apto 301B",
      prioridade: "Urgente",
      isCompleted: false,
    },
  ])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Asc")

  const addTodo = () => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random()*10000),
        cep,
        address,
        neighborhood,
        city,
        state, 
        addressNumber,
        addressExtra,
        prioridade,
        isCompleted: false,
      }
    ]
    setTodos(newTodos);
  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo)  =>
      todo.id !== id ? todo : null
    )
    setTodos(filteredTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) => 
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  }






  



  return (
  <div className='app'>

    <TodoForm /* addTodo={addTodo} *//>
    <h1>Endereços a visitar</h1>
    <Search search={search} setSearch={setSearch} />
    <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
    <div className='todo-list'>
      {todos
        .filter((todo) => 
          filter === "All" 
            ? true 
            : filter === "Completed"
              ? todo.isCompleted
              : !todo.isCompleted
        )
        .filter((todo) => 
          todo.cep.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
          sort === "Asc" 
            ? a.cep.localeCompare(b.cep) 
            : b.cep.localeCompare(a.cep)
        )
        .map((todo) => (
          <Todo 
            key={todo.id} 
            todo={todo} 
            removeTodo={removeTodo} 
            completeTodo={completeTodo}
          />
        ))}
    </div>
  </div>
  )
}

export default App
