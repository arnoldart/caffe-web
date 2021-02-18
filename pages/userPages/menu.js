import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {tw} from 'twind'
import Nav from '../../Components/Nav'
import { authPage } from '../../middleware/authorizationPage'
import jwtDecode from 'jwt-decode'
import Cookies, { set } from 'js-cookie'
import jumbotron from '../../public/images/jumbotron.png'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx)

  const productsReq = await fetch('http://localhost:5000/api/posts')

  const products = await productsReq.json()

  return { 
    props: {
      products: products.data,
      token
    } 
  }
}

function Home(props) {
  const [ cart, setCart ] = useState([])
  
  const decode = jwtDecode(props.token)
  const username = decode.username

  const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  useEffect(() => {
    document.body.style.overflowY = "scroll"
  })

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
            {props.products.map(produk => (
                <div key={produk.id} className={tw `border-1 border-gray-500 mr-9 mt-9 p-4 rounded-lg`} style={{width: '21%'}}>
                  <a href={`/userPages/detail/${produk.id}`}>
                    <div>
                      <img src={produk.img} alt="makanan"/>
                    </div>
                    <div>
                      <p className={tw `mt-4`}>{produk.name}</p>
                      <p className={tw `mt-2 font-bold`}>Rp {formatNumber(produk.harga)}</p>
                    </div>
                  </a>
                  <div>
                    <button>Add to card</button>
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