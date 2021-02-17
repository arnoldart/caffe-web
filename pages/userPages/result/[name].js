import {tw} from 'twind'
import Nav from '../../../Components/Nav'
import { authPage } from '../../../middleware/authorizationPage'
import jwtDecode from 'jwt-decode'

export async function getServerSideProps(ctx) {
  // let res = await fetch(`http://localhost:5000/api/makanan/${ctx.params.name}`)
  const { token } = await authPage(ctx)
  // let json = await res.json()
  let res = await fetch(`http://localhost:5000/api/posts/`)
  let json = await res.json()

  const { name } = ctx.params
  // const upperCase = name.charAt(0).toUpperCase() + name.slice(1)
  const regex = new RegExp(name, "i")

  const result = json.data.filter(e => {
    return regex.test(e.name)
  })

  return {
    props: {
      result,
      token
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

      <main className={tw `m-20`}>
        <div className={tw `text-white flex`}>
          <aside className={tw ``}>
            <p>Filter</p>
          </aside>
          <div className={tw `ml-48`}>
            <p className={tw `border-b-1 border-gray-500`}>Menu</p>
            <div className={tw `flex flex-wrap pl-8`}>
              {props.result.map(({id, name, img, harga}) => (
                <div key={id} className={tw `border-1 border-gray-500 mr-9 mt-9 p-4 rounded-lg`} style={{width: '21%'}}>
                  <a href={`/userPages/detail/${id}`}>
                    <div>
                      <img src={img} alt="makanan"/>
                    </div>
                    <div>
                      <p className={tw `mt-4`}>{name}</p>
                      <p className={tw `mt-2 font-bold`}>Rp {formatNumber(harga)}</p>
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