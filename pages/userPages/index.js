import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {tw} from 'twind'
import Nav from '../../Components/Nav'
import { authPage } from '../../middleware/authorizationPage'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import jumbotron from '../../public/images/jumbotron.png'
import { useEffect } from 'react'

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx)

  // const makananReq = await fetch('http://localhost:5000/api/makanan', {
  //   headers: {
  //     'Authorization': 'Bearer ' + token
  //   }
  // })

  // const minumanReq = await fetch('http://localhost:5000/api/minuman', {
  //   headers: {
  //     'Authorization': 'Bearer ' + token
  //   }
  // })


  // const makanan = await makananReq.json()
  // const minuman = await minumanReq.json()

  return { 
    props: {
      // minuman: minuman.data, 
      // makanan: makanan.data,
      token
    } 
  }
}

function Home(props) {
  
  const decode = jwtDecode(props.token)
  const username = decode.username

  return (
    <>
      <Nav username={username} />

      <main className={tw `text-white`}>
        <div>
          <img src={jumbotron} alt="img"/>
        </div>
        {/* { props.makanan.map(makanan => (
            <div key={makanan.id}>
              <div>Jenis makanan : {makanan.type}</div>
              <div>Nama Makanan : {makanan.name}</div>
            </div>
        ))} */}

        <div>
          <h1 className={tw `text-2xl font-semibold border-b-2 border-yellow-300 w-32`}>Makanan</h1>
          <div>

          </div>
        </div>

        <div>
          <h1 className={tw `text-2xl font-semibold border-b-2 border-yellow-300 w-32`}>Minuman</h1>
          <div>

          </div>
        </div>
      </main>
    </>
  )
}


export default Home