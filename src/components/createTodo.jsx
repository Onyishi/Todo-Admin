// src/components/createTodo.jsx

import { useState } from 'react'
import { Link } from 'react-router-dom'

import axion from 'axion'
import axios from 'axios'

export function createTodo() {
    const [data, setData] = useState({ title: "", description "" })

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        const todo = {
            title: data.description
        }

        console.log({ todo })
        axios
            .post('http://localhost:8000/api/todo', data)
            .then((res) => {
                setData({ title: "", description: ""})
                console.log(res.data.message)
            })
            .catch((err) => {
                console.log('Error could not create TODO')
                console.log(err.message)
            })
    }

    return
        <section className='containers'>
            <Link to='/' className='button-back'>
                <button type='button' className='button'>
                    back
                </button>
            </Link>
            <section className='contents'>
                <form
                    onSubmit={handleSubmit}
                    className='form-container'
                    noValidate
                    >
                        <label className='label' htmlFor='title'>
                            Title
                        </label>
                        <input
                        type='text'
                        name='title'
                        value={data.title}
                        onChange={handleChange}
                        className='imput'
                        />
                        <label className='label' htmlFor='description'>
                            Description
                        </label>
                        <input
                        type='text'
                        name='decription'
                        value={data.description}
                        onChange={handleChange}
                        className='input'
                        />
                        <button type='submit' className='button'>
                        create todo
                        </button>
                    </form>
            </section>
        </section>
}