import React, {useState} from 'react'
import {tw} from 'twind'
import { FaBars, FaTimes } from 'react-icons/fa'
import Link from '../Components/ActiveLink'
import { authPage } from '../middleware/authorizationPage'
import cookies from 'js-cookie'
import useForm from '../Components/useForm'
import Router from 'next/router'
import cart from '../public/images/cart.svg'


export default function Nav({username}) {
  const [ search, setSearch ] = useState({
    name: ''
  })
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false);
  const logoutHandler = () => setClick(cookies.remove('token'))

  async function searchHandler(e) {
    e.preventDefault()
    
    if(search.name === '') return Router.push('/userPages/menu')

    // const name = search.name

    // Router.push(`/userPages/menu/${search.name}`)
    // const searchReq = await fetch(`/api/makanan/${search.name}`)
    // const json = await searchReq.json()
    Router.push(`/userPages/result/${search.name}`)
  }

  function searchFields(e) {
    const name = e.target.getAttribute('name')
    setSearch({
      ...search,
      [name]: e.target.value
    })
  }

  return(
    <>
      <nav className={tw `flex px-9 py-6 flex-col sm:flex-row items-center justify-between text-white text-center`} style={{backgroundColor: "#111111"}}>
        <div className={tw `flex items-center`}>
          <div className={tw `ml-7 sm:ml-0`}>
            <h1 className={tw `text-2xl font-semibold transition duration-150 ease-in hover:text-yellow-300`}> <a href="/userPages">Logo</a> </h1>
          </div>
          {/* <div className={styled.menuIcon} onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div> */}
        <form onSubmit={searchHandler} className={tw `ml-10 text-black`} style={{width: '45rem'}}>
          <input onChange={searchFields} name="name" value={search.name} type="text" className={tw `rounded py-1 px-2 w-full`} placeholder="Cari makanan atau minuman"/>
        </form>
        </div>
        <div className={click ? 'navMenu active' : 'navMenu'}>
          <div>
            <ul className={tw `flex flex-col sm:flex-row text-xl sm:text-lg items-center`}>
              <li className={tw `mt-8 sm:mt-0`}>
                <Link activeClassName={tw `text-yellow-300 font-bold`} href="/userPages">
                  <a onClick={closeMobileMenu} className={tw `ml-0 sm:ml-10  transition duration-150 ease-in hover:text-yellow-300`}>Home</a>
                </Link>
              </li>
              <li className={tw `mt-8 sm:mt-0`}>
                <Link activeClassName={tw `text-yellow-300 font-bold`} href="/userPages/menu">
                  <a onClick={closeMobileMenu} className={tw `ml-0 sm:ml-10  transition duration-150 ease-in hover:text-yellow-300`}>Menu</a>
                </Link>
              </li>
              <li className={tw `mt-8 sm:mt-0`}>
                <Link activeClassName={tw `text-yellow-300 font-bold`} href="/blog">
                  <a onClick={closeMobileMenu} className={tw `ml-0 sm:ml-10  transition duration-150 ease-in hover:text-yellow-300`}>Contact</a>
                </Link>
              </li>
              <li className={tw `group mt-8 sm:mt-0 ml-0 sm:ml-10 flex relative items-center justify-center`}>
                <p className={tw `cursor-pointer`}>{username}</p>
                <div className={tw `group-hover:block hidden absolute right-0 top-6 flex-col w-32 p-2 rounded border-1 border-yellow-300`} style={{backgroundColor: "#111111"}}>
                  <div>
                    <a className={tw `transition ease-in duration-150 hover:text-yellow-300`} href="/">akun saya</a>
                  </div>
                  <div>
                    <Link href="/auth/login" >
                      <a onClick={logoutHandler} className={tw `transition ease-in duration-150 hover:text-yellow-300`} href="/">Logout</a>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={tw `mt-8 sm:mt-0 ml-0 sm:ml-10`}>
                <a href="#"><img src={cart} alt="img"/></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}