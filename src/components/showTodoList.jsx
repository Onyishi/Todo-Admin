// src/components/showTodoList.jsx

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { updateTodo } from './updateTodo' // added

function TodoCard ({ data, handleEdit, handleDelete }) { // updated
  const { _id, title, description } = data
  return (
    <li key={_id}>
      <div className='title-description'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className='button-container'>
        <button name={_id} className='button' name={_id} onClick={handleEdit}>
          edit
        </button>
        <button name={_id} className='button' onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  )
}

export function ShowTodoList () {
  const [todo, setTodo] = useState([])
  const [open, setOpen] = useState(false)  //added
  const [id, setId] = useState('')  // added
  const [update, setUpdate] = useState(false) // added

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/todo')
      .then((res) => {
        console.log(res.data)
        setTodo(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [update]) // added

  function handleEdit (e) { // added
    setId(e.target.name)
    setOpen(true)
  }

  function handleUpdate() { // added
    console.log('update:', update, !update)
    setUpdate(!update)
  }

  function handleDelete (e) { // added
    axios.delete(`http://localhost:8000/api/todo/${e.target.name}`)

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name)
    })
  }

  function handleClose() {
    setId('')
    setOpen(false)
  }

  return (
    <section className='container'>
      <Link to='/create-todo' className='button-new'>
        <button className='button'>New</button>
      </Link>
      <section className='contents'>
        <h1>TODO</h1>
        <ul className='list-container'>
          {todo.map((data) => (
            <TodoCard data={data} handleDelete={handleDelete} />
          ))}
        </ul>
      </section>
    </section>
  )
}