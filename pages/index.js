import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {tw} from 'twind'
import Nav from '../Components/Nav'

function Home() {
  return (
    <>
      <Nav />
    </>
  )
}


// Home.getInitialProps = async (ctx) => {
//   const res = await fetch('http://localhost:4030/api/v1/minuman')
//   const resData = await res.json()
  
//   return {data: resData.data}
// }

export default Home