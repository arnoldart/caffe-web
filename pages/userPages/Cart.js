import useCart from "../../Components/useCart"

export default function Cart() {
  const {cartItems} = useCart()
  console.log(cartItems)
  return (
    <>
      <main >
        {cartItems}
      </main>
    </>
  )
}