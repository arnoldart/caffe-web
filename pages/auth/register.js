import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {tw} from 'twind'
import {unauthPage} from '../../middleware/authorizationPage'
import Router from 'next/router'
import validate from '../../Components/ValidateInfo'
import useForm from '../../Components/useForm'
import loginImg from '../../public/images/login.png'
import NavForm from '../../Components/NavForm'

export async function getServerSideProps(ctx) {
  await unauthPage(ctx)

  return{ props: {} }
}

export default function Register() {
  const { registerHanlder, fieldHandler, fields, status, errors } = useForm(validate)

  useEffect(() => {
    document.body.style.overflowY = "hidden"
  })

  return (
    <>

      <NavForm />

      <main className={tw `text-white flex justify-center items-center`} style={{height: '90vh'}}>
        <div className={tw `border-2 border-yellow-400 rounded-xl flex`}>
          <div>
            <h1 className={tw `text-center mt-8 font-bold text-3xl`}>Register</h1>
            <div className={tw `flex justify-center items-center mx-8 -mt-8 h-full`}>
              <form onSubmit={registerHanlder.bind(this)}>
                <div className={tw `text-black flex flex-col`}>
                  <input value={fields.username} onChange={fieldHandler.bind(this)} name="username" className={tw `text-white bg-transparent border-b-1 border-white w-56`} type="text" placeholder="Username"/>
                  <p className={tw `inline-block mb-8 text-yellow-300`}>{errors.username}</p>
                  <input value={fields.email} onChange={fieldHandler.bind(this)} name="email" className={tw `text-white bg-transparent border-b-1 border-white w-56`} type="text" placeholder="Email"/>
                  <p className={tw `inline-block mb-8 text-yellow-300`}>{errors.email}</p>
                  <input value={fields.password} onChange={fieldHandler.bind(this)} name="password" className={tw `text-white bg-transparent border-b-1 border-white w-56`} type="password" placeholder="Password"/>
                  <p className={tw `inline-block text-yellow-300`}>{errors.password}</p>
                </div>
                <div className={tw `flex items-center justify-between mt-6`}>
                  <button type="submit" className={tw `bg-yellow-400 py-1 px-6 rounded-lg transition ease-in duration-150 text-white hover:text-black`} style={{outline: 'none'}}>Register</button>
                  <p className={tw `text-center`}>{status}</p>
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