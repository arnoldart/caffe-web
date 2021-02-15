import { useState } from "react"
import Router from 'next/router'
import Cookie from 'js-cookie'

export default function useForm(validate) {
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('normal')
  const [fields, setFields] = useState({
    email: '',
    username: '',
    password: ''
  })

  const [ search, setSearch ] = useState({
    name: ''
  })

  async function registerHanlder(e) {
    e.preventDefault()
    
    setErrors(validate(fields))

    setStatus('Loading')

    if(fields.username === '') return setStatus('error')

    if(fields.email === '' || !/\S+@\S+\.\S+/.test(fields.email)) return setStatus('error')

    if(fields.password === '') return setStatus('error')

    const registerReq = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if(!registerReq.ok) return setStatus('error')

    const regsiterRes = await registerReq.json()

    setStatus('Success')

    Router.push('/auth/login')
  }

  
  async function loginHandler(e) {
    e.preventDefault()

    setErrors(validate(fields))

    setStatus('Loading')

    const loginReq = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })

    if(!loginReq.ok) return setStatus('Error')

    const loginRes = await loginReq.json()

    setStatus('Success')

    Cookie.set('token', loginRes.token)

    Router.push('/userPages')
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name')
    setFields({
      ...fields,
      [name]: e.target.value
    })
  }

 

  return {registerHanlder, fieldHandler, loginHandler, searchHandler, fields, status, errors}
}