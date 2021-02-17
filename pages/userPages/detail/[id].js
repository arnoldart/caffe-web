import { authPage } from "../../../middleware/authorizationPage"

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx)

  const res = await fetch(`http://localhost:5000/api/posts/detail/${ctx.params.id}`)
  const json = await res.json()

  return {
    props: {
      json: json.data
    }
  }
}

export default function handler(props) {
  return (
    <>
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