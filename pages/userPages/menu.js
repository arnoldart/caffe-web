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
      makanan: makanan.data,
      token
    } 
  }
}

function Home(props) {
  
  const decode = jwtDecode(props.token)
  const username = decode.username

  const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return (
    <>
      <Nav username={username} />

      <main className={tw `m-20`}>
        <div className={tw `text-white flex`}>
          <aside className={tw ``}>
            <p>Filter</p>
          </aside>
          <div className={tw `ml-48`}>
            <p className={tw `border-b-1 border-gray-500`}>Menu</p>
            <div className={tw `flex flex-wrap pl-8`}>
            {props.makanan.map((makanan, key) => (
                <div key={key} className={tw `border-1 border-gray-500 mr-9 mt-9 p-4 rounded-lg`} style={{width: '21%'}}>
                  <div>
                    <img src={makanan.img} alt="makanan"/>
                  </div>
                  <div>
                    <p className={tw `mt-4`}>{makanan.name}</p>
                    <p className={tw `mt-2 font-bold`}>Rp {formatNumber(makanan.harga)}</p>
                  </div>
                </div>
              ))}
              {props.minuman.map(minuman => (
                <div key={minuman.id} className={tw `border-1 border-gray-500 mr-9 mt-9 p-4 rounded-lg`} style={{width: '21%'}}>
                  <div>
                    <img src={minuman.img} alt="minuman"/>
                  </div>
                  <div>
                    <p className={tw `mt-4`}>{minuman.name}</p>
                    <p className={tw `mt-2 font-bold`}>Rp {formatNumber(minuman.harga)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}


export default Home