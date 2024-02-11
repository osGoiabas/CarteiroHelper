import { useState }  from 'react'

const TodoForm = ({addTodo}) => {
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [prioridade, setPrioridade] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!cep || !numero || !complemento || !prioridade) return;
    addTodo(cep, numero, complemento, prioridade)
    setCep("")
    setNumero("")
    setComplemento("")
    setPrioridade("")
  }

  return <div className='todo-form'>
    <h2>Adicionar endereço: </h2>
    <form onSubmit={handleSubmit}>
      <b>CEP:</b> <input 
        type='text' 
        placeholder='Digite o CEP (apenas números)' 
        value={cep}
        onChange={(e) => setCep(e.target.value)} 
      />
      <b>Número:</b> <input 
        type='text' 
        placeholder='(Digite o número)' 
        value={numero}
        onChange={(e) => setNumero(e.target.value)} 
      />
      <b>Complemento:</b> <input 
        type='text' 
        placeholder='(Digite o complemento)' 
        value={complemento}
        onChange={(e) => setComplemento(e.target.value)} 
      />
      <select 
        value={prioridade} 
        onChange={(e) => setPrioridade(e.target.value)}
      >
        <option value=''>Selecione a prioridade</option>
        <option value='Urgente'>Urgente</option>
        <option value='Normal'>Normal</option>
      </select>
    <button type='submit'>Adicionar endereço</button>
    </form>
  </div>
}

export default TodoForm