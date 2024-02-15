import { useState } from 'react'
import { useForm } from 'react-hook-form';
import './App.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import Filter from './components/Filter'
import api from './services/api'

function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      cep: "58035040",
      numero: "100",
      complemento: "803B",
      prioridade: "Urgente",
      isCompleted: false,
    },
    {
      id: 2,
      cep: "58051540",
      numero: "451",
      complemento: "301B",
      prioridade: "Urgente",
      isCompleted: false,
    },
    {
      id: 3,
      cep: "58051541",
      numero: "337",
      complemento: "301A",
      prioridade: "Normal",
      isCompleted: false,
    }
  ])

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Asc")







  const addTodo = (cep, numero, complemento, prioridade) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random()*10000),
        cep,
        numero, 
        complemento, 
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






//aqui embaixo é do CEP
/*   const [input, setInput] = useState('')
  
  async function checkCep(){
    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }
    try {
      const response = await api.get("${input}/json")
      console.log(response)
    } catch {
      
    }
  } */

  const {register, handleSubmit, setValue, setFocus} = useForm();

  const onSubmit = (e) => {
    console.log(e);
  }

  const checkCep = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json()).then(data => {
        setValue('address', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
        setFocus('addressNumber');
      });
  }

  return (
  <div className='app'>

    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        CEP: 
        <input type='text' {...register("cep")} onBlur={checkCep}/>
      </label>
      <label>
        Rua:
        <input type="text" {...register("address" )}/>
      </label>
      <label>
        Número:
        <input type="text" {...register("addressNumber" )}/>
      </label>
      <label>
        Complemento (opcional):
        <input type="text" {...register("addressExtra" )}/>
      </label>
      <label>
        Bairro:
        <input type="text" {...register("neighborhood" )}/>
      </label>
      <label>
        Cidade:
        <input type="text" {...register("city" )}/>
      </label>
      <label>
        Estado:
        <input type="text" {...register("state" )}/>
      </label>
      <select 
        {...register("prioridade")}
        //value={prioridade} 
        //onChange={(e) => setPrioridade(e.target.value)}
      >
        <option value=''>Selecione a prioridade</option>
        <option value='Urgente'>Urgente</option>
        <option value='Normal'>Normal</option>
      </select>
      <button type="submit">Adicionar à lista</button>
    </form>


    <TodoForm addTodo={addTodo}/>
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
