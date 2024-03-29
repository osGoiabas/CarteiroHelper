import React from 'react'

const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div 
      className='todo' 
      style={{textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <div className='content'>
        <p className='cep'>CEP: {todo.cep}</p>
        <p className='address'>Logradouro: {todo.address}</p>
        <p className='neighborhood'>Bairro: {todo.neighborhood}</p>
        <p className='city'>Cidade: {todo.city}</p>
        <p className='state'>UF: {todo.state}</p>
        <p className='addressNumber'>Nº: {todo.addressNumber}</p>
        <p className='addressExtra'>Complemento: {todo.addressExtra}</p>
        <p className='prioridade'>Prioridade: {todo.prioridade}</p>
      </div>
      <div className='botoes'>
        <button className='complete'onClick={() => completeTodo(todo.id)}>
          Completar
        </button>
        <button className='remove' onClick={() => removeTodo(todo.id)}>
          X
        </button>
      </div>
    </div>
  )
}

export default Todo