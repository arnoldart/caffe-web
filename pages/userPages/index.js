import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {tw} from 'twind'
import Nav from '../../Components/Nav'
import { authPage } from '../../middleware/authorizationPage'

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx)

  const makananReq = await fetch('http://localhost:5000/api/makanan', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })

  const minumanReq = await fetch('http://localhost:5000/api/minuman', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })

  const makanan = await makananReq.json()
  const minuman = await minumanReq.json()

  return { 
    props: {
      minuman: minuman.data, 
      makanan: makanan.data
    } 
  }
}

function Home(props) {
  console.log(props)
  return (
    <>
      <Nav />
    </>
  )
}


export default Home