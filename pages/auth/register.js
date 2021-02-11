import {tw} from 'twind'

export default function Register() {
  function registerHanlder(e) {
    e.preventDefault()
  }

  return (
    <>
      <main className={tw `text-white flex justify-center`} style={{marginTop: '14%'}}>
        <div className={tw `border-2 border-yellow-400 p-6 rounded-xl`}>
          <h1 className={tw `text-center font-bold text-3xl`}>Register</h1>
          <form onSubmit={registerHanlder.bind(this)}>
            <div className={tw `text-black flex flex-col`}>
              <input className={tw `w-56 mb-4 mt-6`} type="text" placeholder="Email"/>
              <input className={tw `w-56 mt-4`} type="password" placeholder="Password"/>
            </div>
            <dir className={tw `flex justify-center mt-6`}>
              <button type="submit" className={tw `bg-yellow-400 py-1 px-6 rounded-lg`} style={{outline: 'none'}}>SUBMIT</button>
            </dir>
          </form>
       </div>
      </main>
    </>
  )
}