import React from 'react'

const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div 
      className='todo' 
      style={{textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <div className='content'>
        <p className='cep'>CEP: {todo.cep}</p>
        <p className='numero'>Nº: {todo.numero}</p>
        <p className='complemento'>Complemento: {todo.complemento}</p>
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