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
import Cart from './Cart'
import useCart from '../../Components/useCart'

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
  const [cartItems, setCartItems ] = useState([])
  const decode = jwtDecode(props.token)
  const username = decode.username

  const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  const onAdd = (produk) => {
    setCartItems(produk)
  }

  console.log(cartItems)

  useEffect(() => {
    document.body.style.overflowY = "scroll"
  })

  return (
    <>
      <Nav username={username} />

      <main className={tw `m-2 p-10`}>
        <div className={tw `text-white flex`}>
          <aside>
            <p>Filter</p>
            <div className={tw `mt-4 ml-4`}>
              <p>Makanan</p>
              <ul className={tw `ml-4`}>
                <li><input className={tw `mr-2`} type="checkbox"/>Makanan</li>
                <ul>
                  <li className={tw `flex items-center`}><input className={tw `mr-2`} type="checkbox"/>Hamburger</li>
                  <li className={tw `flex items-center`}><input className={tw `mr-2`} type="checkbox"/>Pasta</li>
                  <li className={tw `flex items-center`}><input className={tw `mr-2`} type="checkbox"/>Dessert</li>
                  <li className={tw `flex items-center`}><input className={tw `mr-2`} type="checkbox"/>Bakery</li>
                </ul>
              </ul>
            </div>
            <div className={tw `mt-4 ml-4`}>
              <p>Minuman</p>
              <ul className={tw `ml-4`}>
                <li><input className={tw `mr-2`} type="checkbox"/>Minuman</li>
                <ul>
                  <li className={tw `flex items-center`}><input className={tw `mr-2`} type="checkbox"/>Milkshake</li>
                  <li className={tw `flex items-center`}><input className={tw `mr-2`} type="checkbox"/>Coffe</li>
                  <li className={tw `flex items-center`}><input className={tw `mr-2`} type="checkbox"/>Juice</li>
                  <li className={tw `flex items-center`}><input className={tw `mr-2`} type="checkbox"/>Tea</li>
                </ul>
              </ul>
            </div>
          </aside>
          <div className={tw `ml-20`}>
            <p className={tw `border-b-1 border-gray-500`} style={{width: '94.5%'}}>Menu</p>
            <div className={tw `flex flex-wrap`}>
            {props.products.map(produk => (
                <div key={produk.id} className={tw `border-1 border-gray-500 mr-9 mt-9 p-4 rounded-lg`} style={{width: '21%'}}>
                  <a href={`/userPages/detail/${produk.id}`}>
                    <div>
                      <img className={tw `rounded-lg`} src={produk.img} alt="makanan"/>
                    </div>
                    <div>
                      <p className={tw `mt-4`}>{produk.name}</p>
                      <p className={tw `mt-2 font-bold`}>Rp {formatNumber(produk.harga)}</p>
                    </div>
                  </a>
                  <div className={tw `mt-4`}>
                    <button onClick={() => onAdd(produk)} className={tw `border-1 border-yellow-300 py-1 px-2 rounded bg-transparent hover:bg-yellow-300 transition duration-150 ease-in`} style={{outline: 'none'}}>Add to card</button>
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