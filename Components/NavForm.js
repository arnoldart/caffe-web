import { tw } from 'twind'

export default function NavForm() {
  return (
    <>
      <nav className={tw `px-9 py-6 text-white flex items-center justify-between`} style={{backgroundColor: "#111111"}}>
        <h1 className={tw `text-2xl font-bold`}>Logo</h1>
        <div>
          <a href="" className={tw `transition ease-in duration-150 hover:text-yellow-300`}><p>butuh bantuan ?</p></a>
        </div>
      </nav>
    </>
  )
}