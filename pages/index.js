import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {tw} from 'twind'
import Nav from '../Components/NavIndex'
import Cookie from 'js-cookie'
import { useEffect } from 'react'
import Router from 'next/router'
// import Cookies from 'next-cookies'

// export async function getServerSideProps(ctx) {
//   const cookies = Cookies(ctx)
  
//   if(cookies.token)
//     return ctx.res.writeHead(302, {
//       Location: '/userPages'
//     }).end()

//   return{ props: {} }
// }

function Home() {

  useEffect(() => {
    const token = Cookie.get('token')
    
    if(token) return Router.push('/userPages')
  }, [])

  return (
    <>
      <Nav />
    </>
  )
}


export default Home