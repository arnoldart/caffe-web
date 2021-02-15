import {tw} from 'twind'

export async function getServerSideProps(ctx) {

  let res = await fetch(`http://localhost:5000/api/makanan/${ctx.params.name}`)
  let json = await res.json()

  return {
    props: {
      json: json.data
    } 
  }
}

export default function handler(props) {
  
  return (
    <>
      <main className={tw `text-white`}>
        <img src={props.json.img} alt="img"/>
        <h1>{props.json.name}</h1>
        <h1>{props.json.harga}</h1>
      </main>
    </>
  )
}