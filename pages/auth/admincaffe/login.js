import React, { useState } from 'react'
import { tw } from 'twind'
import Cookie from 'js-cookie'
import Router from 'next/router'


export default function Login() {
  const [field, setField] = useState({
    user: '',
    password: ''
  }) 

  const [status, setStatus] = useState('normal')

  async function loginHandler(e) {
    e.preventDefault()

    setStatus('Loading')

    const loginReq = await fetch('/api/auth/admincaffe/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(field)
    })

    if(!loginReq.ok) return setStatus('Error ' + loginReq.status)

    const loginRes = await loginReq.json()

    setStatus('Success')

    Cookie.set('token', loginRes.token)

    Router.push('/posts')
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name')

    setField({
      ...field,
      [name]: e.target.value
    })
  }

  return (
    <>
      <main className={tw `text-white flex justify-center`} style={{marginTop: '14%'}}>
        <div className={tw `border-2 border-yellow-400 p-6 rounded-xl`}>
          <h1 className={tw `text-center font-bold text-3xl`}>Login</h1>
          <form onSubmit={loginHandler.bind(this)}>
            <div className={tw `text-black flex flex-col`}>
              <input onChange={fieldHandler.bind(this)} name="user" className={tw `w-56 mb-4 mt-6`} type="text" placeholder="Username"/>
              <input onChange={fieldHandler.bind(this)} name="password" className={tw `w-56 mt-4`} type="password" placeholder="Password"/>
            </div>
            <div className={tw `flex justify-center mt-6`}>
              <button type="submit" className={tw `bg-yellow-400 py-1 px-6 rounded-lg transition ease-in duration-150 text-white hover:text-black`} style={{outline: 'none'}}>Login</button>
            </div>
            <div className={tw `text-center mt-4`}>{status}</div>
          </form>
       </div>
      </main>
    </>
  )
}