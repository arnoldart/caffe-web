import React, { useState } from 'react'
import {tw} from 'twind'

export default function Register() {
  const [fields, setFields] = useState({
    email: '',
    password: ''
  })

  const [status, setStatus] = useState('normal')

  async function registerHanlder(e) {
    e.preventDefault()

    setStatus('Loading')

    const registerReq = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(!registerReq.ok) return setStatus('error ' + registerReq.status)

    const regsiterRes = await registerReq.json()

    setStatus('success')

  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name')

    setFields({
      ...fields,
      [name]: e.target.value
    })
  }

  return (
    <>
      <main className={tw `text-white flex justify-center`} style={{marginTop: '14%'}}>
        <div className={tw `border-2 border-yellow-400 p-6 rounded-xl`}>
          <h1 className={tw `text-center font-bold text-3xl`}>Register</h1>
          <form onSubmit={registerHanlder.bind(this)}>
            <div className={tw `text-black flex flex-col`}>
              <input name="email" onChange={fieldHandler.bind(this)} className={tw `w-56 mb-4 mt-6`} type="text" placeholder="Email"/>
              <input name="password" onChange={fieldHandler.bind(this)} className={tw `w-56 mt-4`} type="password" placeholder="Password"/>
            </div>
            <div className={tw `flex justify-center mt-6`}>
              <button type="submit" className={tw `bg-yellow-400 py-1 px-6 rounded-lg transition ease-in duration-150 text-white hover:text-black`} style={{outline: 'none'}}>Register</button>
            </div>
            <div className={tw `text-center mt-4`}>{status}</div>
          </form>
       </div>
      </main>
    </>
  )
}