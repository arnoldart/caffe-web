import {tw} from 'twind'
import Nav from '../../../Components/Nav'
import { authPage } from '../../../middleware/authorizationPage'
import jwtDecode from 'jwt-decode'

export async function getServerSideProps(ctx) {
  // let res = await fetch(`http://localhost:5000/api/makanan/${ctx.params.name}`)
  const { token } = await authPage(ctx)
  // let json = await res.json()
  let res = await fetch(`http://localhost:5000/api/posts`)
  let json = await res.json()

  const { name } = ctx.params
  // const upperCase = name.charAt(0).toUpperCase() + name.slice(1)
  const regex = new RegExp(name, "i")

  const products = json.data.filter(e => {
    return regex.test(e.name)
  })

  return {
    props: {
      products,
      token,
      name
    } 
  }
}

export default function handler(props) {
  const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  const decode = jwtDecode(props.token)
  const username = decode.username

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
          <div className={tw `ml-20`} style={{width: '78.5%'}}>
            <p className={tw `border-b-1 border-gray-500`}>Menu | {props.name}</p>
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
