import React, { useState, useEffect } from 'react'
import { tw } from 'twind'
import Cookie from 'js-cookie'
import Router from 'next/router'
import {unauthPage} from '../../middleware/authorizationPage'
import useForm from '../../Components/useForm'
import validate from '../../Components/ValidateInfo'
import NavForm from '../../Components/NavForm'
import loginImg from '../../public/images/login.png'
import Link from 'next/link'

export async function getServerSideProps(ctx) {
  await unauthPage(ctx)

  return{ props: {} }
}

export default function Login() {
  const { fieldHandler, loginHandler, fields, status, errors } = useForm(validate)
  const [click, setClick] = useState(false)

  const handlerClick = () => setClick(!click)

  
  useEffect(() => {
    const token = Cookie.get('token')
    
    if(token) return Router.push('/userPages')
  },[])

  console.log(fields)

  return (
    <>

      <NavForm />

      <main className={tw `text-white flex justify-center items-center`} style={{height: '87vh'}}>
        <div className={tw `border-2 border-yellow-400 rounded-xl flex`}>
          <div>
            <h1 className={tw `text-center mt-8 font-bold text-3xl`}>Login</h1>
            <div className={tw `flex justify-center items-center mx-8 -mt-8 h-full`}>
              <form onSubmit={loginHandler.bind(this)}>
                <div className={tw `text-black flex flex-col`}>
                  <input value={fields.email} onChange={fieldHandler.bind(this)} name="email" className={tw `text-white bg-transparent border-b-1 border-white w-56`} type="text" placeholder="Email"/>
                  <p className={tw `inline-block mb-8 text-yellow-300`}>{errors.email}</p>
                  <input value={fields.password} onChange={fieldHandler.bind(this)} name="password" className={tw `text-white bg-transparent border-b-1 border-white w-56`} type="password" placeholder="Password"/>
                  <p className={tw `inline-block text-yellow-300`}>{errors.password}</p>
                </div>
                <div className={tw `flex items-center justify-between mt-6 mb-8`}>
                  <button type="submit" className={tw `bg-yellow-400 py-1 px-6 rounded-lg transition ease-in duration-150 text-white hover:text-black`} style={{outline: 'none'}}>Login</button>
                  <p className={tw `text-center`}>{status}</p>
                </div>
                <div className={tw `text-center`}>
                  <p>I don't have an account</p>
                  <Link href="/auth/register">
                    <a className={tw `text-yellow-300 font-semibold`}>Sign up</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div>
            <img className={tw `rounded-r-lg`} src={loginImg} alt="img"/>
          </div>
        </div>
      </main>

    </>
  )
}