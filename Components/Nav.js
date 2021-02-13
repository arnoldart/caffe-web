import React, {useState} from 'react'
import {tw} from 'twind'
import { FaBars, FaTimes } from 'react-icons/fa'
import Link from '../Components/ActiveLink'
import { authPage } from '../middleware/authorizationPage'
import cookies from 'js-cookie'

export default function Nav({username}) {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false);
  const logoutHandler = () => setClick(cookies.remove('token'))

  return(
    <>
      <nav className={tw `flex px-9 py-6 flex-col sm:flex-row items-center justify-between text-white text-center`} style={{backgroundColor: "#111111"}}>
        <div>
          <div className={tw `ml-7 sm:ml-0`}>
            <h1 className={tw `text-2xl font-semibold transition duration-150 ease-in hover:text-yellow-300`}> <a href="">Logo</a> </h1>
          </div>
          {/* <div className={styled.menuIcon} onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div> */}
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
                <Link activeClassName={tw `text-yellow-300 font-bold`} href="/project">
                  <a onClick={closeMobileMenu} className={tw `ml-0 sm:ml-10  transition duration-150 ease-in hover:text-yellow-300`}>Menu</a>
                </Link>
              </li>
              <li className={tw `mt-8 sm:mt-0`}>
                <Link activeClassName={tw `text-yellow-300 font-bold`} href="/blog">
                  <a onClick={closeMobileMenu} className={tw `ml-0 sm:ml-10  transition duration-150 ease-in hover:text-yellow-300`}>Contact</a>
                </Link>
              </li>
              <li>
                <p className={tw `ml-0 sm:ml-10`}>{username}</p>
              </li>
              <li>
                <Link href="/auth/login">
                  <a onClick={logoutHandler}><p className={tw `ml-0 sm:ml-10`}>Logout</p></a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}