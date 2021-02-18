import {tw} from 'twind'
import { authPage } from '../../middleware/authorizationPage'
import AOS from 'aos'
import Head from 'next/head'
import Nav from '../../Components/Nav'
import jwtDecode from 'jwt-decode'
import jumbotron from '../../public/images/jumbotron.png'
import { useEffect } from 'react'
import 'aos/dist/aos.css'

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx)

  const productsReq = await fetch('http://localhost:5000/api/posts/')
  const json = await productsReq.json()

  return { 
    props: {
      json: json.data,
      token
    } 
  }
}

function Home(props) {
  
  const decode = jwtDecode(props.token)
  const username = decode.username

  useEffect(() => {
    AOS.init({duration: 2000})
  }, [])

  return (
    <>
      <Nav username={username} />

      <main className={tw `text-white`}>
        <div>
          <img src={jumbotron} alt="img"/>
        </div>
        <div className={tw `mt-6  text-center`}>
          <h1 className={tw `text-2xl font-semibold`}>Makanan</h1>
          <div className={tw `flex relative`}>
            {props.json.map(({id, product, makanan, minuman, name, img, harga, desc}) => {
              if(product == 'makanan') {
                return (
                  <div data-aos='fade-left' key={id} className={tw `w-auto p-6 block`}>
                    <img className={tw `rounded-xl`} src={img} alt="img"/>
                    <div className={tw `absolute top-6 bottom-0 left-6 right-0 opacity-0 hover:opacity-100 transition ease-in duration-150 rounded-xl`} style={{backgroundColor: 'rgba(0, 0, 0, .5)', width: '85.9%', height: '85.9%'}}>
                      <div className={tw `text-white flex justify-center items-center h-full text-2xl font-bold `}>{name}</div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
        <div>
          <h1 className={tw `text-2xl font-semibold text-center`}>Minuman</h1>
          <div className={tw `flex relative`}>
            {props.json.map(({id, product, makanan, minuman, name, img, harga, desc}) => {
              if(product == 'minuman') {
                return (
                  <div data-aos='fade-left' key={id} className={tw `w-auto p-6 block`}>
                    <img className={tw `rounded-xl`} src={img} alt="img"/>
                    <div className={tw `absolute top-6 bottom-0 left-6 right-0 opacity-0 hover:opacity-100 transition ease-in duration-150 rounded-xl`} style={{backgroundColor: 'rgba(0, 0, 0, .5)', width: '85.9%', height: '85.9%'}}>
                      <div className={tw `text-white flex justify-center items-center h-full text-2xl font-bold `}>{name}</div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </main>
    </>
  )
}


export default Home