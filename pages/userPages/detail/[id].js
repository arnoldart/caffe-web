import { authPage } from "../../../middleware/authorizationPage"
import jwtDecode from 'jwt-decode'
import Nav from "../../../Components/Nav"

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx)

  const res = await fetch(`http://localhost:5000/api/posts/detail/${ctx.params.id}`)
  const json = await res.json()

  return {
    props: {
      json: json.data,
      token
    }
  }
}

export default function handler(props) {
  const decode = jwtDecode(props.token)
  const username = decode.username

  const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return (
    <>
      <Nav username={username} />

      <main>
        {props.json.map(({id, product, makanan, minuman, name, img, harga, desc}) => (
          <div key={id}>
            <dir>
              <img src={img} alt="img"/>
            </dir>
          </div>
        ))}
      </main>
    </>
  )
}