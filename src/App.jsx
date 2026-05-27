import { useState } from "react"
import ProductCard from "./components/ProductCard"
import Cart from "./components/Cart"
import CheckoutPopup from "./components/CheckoutPopup"
import CustomerForm from "./components/CustomerForm"
import TimePopup from "./components/TimePopup"
import { db } from "./firebase"


import {

  collection,
  addDoc

} from "firebase/firestore"
function App() {
  const [loadingOrder, setLoadingOrder] = useState(false)

  const handlePlaceOrder = async () => {

    if (cart.length === 0) {

      alert("Vui lòng chọn món")
      return

    }

    if (
      !customerInfo?.name ||
      !customerInfo?.phone
    ) {

      alert("Vui lòng nhập thông tin khách hàng")

      return

    }

    try {

      setLoadingOrder(true)

      await addDoc(collection(db, "orders"), {

        customerInfo,
        pickupTime,
        cart,
        totalPrice,
        paymentMethod: "Tiền mặt",
        status: "pending",
        createdAt: new Date()

      })

      alert("Đặt hàng thành công 🎉")

      setCart([])

      setShowCheckout(false)

    }

    catch (error) {

      console.log(error)

      alert("Có lỗi xảy ra")

    }

    finally {

      setLoadingOrder(false)

    }

  }

  const increaseQuantity = (id) => {

    setCart(cart.map(item =>

      item.id === id

        ? {

          ...item,

          quantity: item.quantity + 1

        }

        : item

    ))

  }

  const categories = [
    {
      title: "PHIN",
      items: [
        { id: 1, name: "Cà Phê Đen", price: 12000 },
        { id: 2, name: "Cà Phê Sữa", price: 15000 },
        { id: 3, name: "Bạc Xỉu", price: 15000 },
        { id: 4, name: "Cà phê sữa tươi", price: 18000 },
        { id: 5, name: "Cà phê kem cheese", price: 22000 },
      ]
    },

    {
      title: "TRÀ",
      items: [
        { id: 6, name: "Trà Đường", price: 10000 },
        { id: 7, name: "Trà Vải", price: 22000 },
        { id: 8, name: "Trà Mãng Cầu thạch sợi dừa", price: 20000 },
        { id: 9, name: "Trà tắc xí muội", price: 22000 },
        { id: 10, name: "Trà Chanh dây tươi", price: 15000 },
        { id: 11, name: "Trà xoài chanh dây", price: 22000 },
      ]
    },

    {
      title: "CACAO",
      items: [
        { id: 12, name: "Cacao Sữa", price: 18000 },
        { id: 13, name: "Cacao Latte", price: 22000 },
        { id: 14, name: "CaCao kem cheese", price: 25000 },

      ]
    },
    {
      title: "Khoai Môn",
      items: [
        { id: 15, name: "Khoai môn sữa", price: 18000 },
        { id: 16, name: "Khoai môn latte", price: 22000 },
        { id: 17, name: "Khoai môn kem cheese", price: 25000 },

      ]
    },

  ]

  // CART
  const [cart, setCart] = useState([])

  // CHECKOUT
  const [showCheckout, setShowCheckout] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [showTimePopup, setShowTimePopup] = useState(false)
  const [pickupTime, setPickupTime] = useState(
    "Càng sớm càng tốt"
  )

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",

  })
  // ADD TO CART
  const addToCart = (item) => {

    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    )

    if (existingItem) {

      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
            ...cartItem,
            quantity: cartItem.quantity + 1
          }
          : cartItem
      )

      setCart(updatedCart)

    } else {

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          note: ""
        }
      ])

    }

  }

  // INCREASE
  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
          ...item,
          quantity: item.quantity + 1
        }
        : item
    )

    setCart(updatedCart)

  }

  // DECREASE
  const decreaseQuantity = (id) => {

    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity - 1
          }
          : item
      )
      .filter((item) => item.quantity > 0)

    setCart(updatedCart)

  }

  // TOTAL
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (

    <div className="bg-[#F5F1EC] min-h-screen">

      {/* BANNER */}
      <div className="relative">

        <img
          src="https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
          alt=""
          className="w-full h-[180px] md:h-[320px] object-cover"
        />

        <div className="absolute inset-0 bg-black/20"></div>

      </div>

      {/* INFO */}
      <div className="bg-white rounded-t-[30px] -mt-5 relative z-10 p-5">

        <h1 className="text-2xl md:text-4xl font-black text-[#7A3200]">
          Tiệm Nhà Uyên
        </h1>

        <div className="mt-4 space-y-2 text-gray-500">

          <p>📍 KCN Giao Long</p>
          <p>🕐 08:00 - 21:00</p>
          <p>☎️ 0782 870 250</p>

        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Bạn đang cần tìm món gì ?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mt-5 bg-[#F5F1EC] p-4 rounded-2xl outline-none"
        />

      </div>

      {/* MAIN */}
      <section className="mt-5 px-3 md:px-5 pb-32">

        {/* MOBILE CATEGORY */}
        <div className="lg:hidden overflow-x-auto whitespace-nowrap flex gap-5 bg-white rounded-2xl px-4 py-4 sticky top-0 z-20">

          {categories.map((category, index) => (

            <button
              key={index}

              onClick={() => {

                const section = document.getElementById(category.title)

                section?.scrollIntoView({
                  behavior: "smooth"
                })

              }}

              className="w-full text-left bg-[#F5F1EC] hover:bg-[#7A3200] hover:text-white duration-300 p-4 rounded-2xl text-[#7A3200] font-bold"
            >

              {category.title}

            </button>

          ))}

        </div>

        {/* LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">

          {/* SIDEBAR */}
          <div className="hidden lg:block bg-white rounded-3xl p-5 h-fit sticky top-5">

            <h2 className="text-2xl font-black text-[#7A3200] mb-5">
              Thực đơn
            </h2>

            <div className="space-y-3">

              {categories.map((category, index) => (

                <button
                  key={index}

                  onClick={() => {

                    const section = document.getElementById(category.title)

                    section?.scrollIntoView({
                      behavior: "smooth"
                    })

                  }}

                  className="w-full text-left bg-[#F5F1EC] hover:bg-[#7A3200] hover:text-white duration-300 p-4 rounded-2xl text-[#7A3200] font-bold"
                >

                  {category.title}

                </button>

              ))}

            </div>

          </div>

          {/* PRODUCT */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-4 md:p-5">

            <div className="space-y-10">

              {categories.map((category, index) => (

                <div
                  key={index}
                  id={category.title}
                >

                  <h2 className="text-2xl md:text-3xl font-black text-[#7A3200] mb-5">
                    {category.title}
                  </h2>

                  <div className="space-y-4">

                    {category.items
                      .filter((item) =>
                        item.name.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        )
                      )
                      .map((item) => (

                        <ProductCard
                          key={item.id}
                          item={item}
                          addToCart={addToCart}
                        />

                      ))}

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* CART */}
          <Cart
            cart={cart}
            setCart={setCart}
            totalPrice={totalPrice}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            setShowCheckout={setShowCheckout}
          />

        </div>

      </section>

      {/* MOBILE CART */}
      <div className="lg:hidden fixed bottom-5 right-5 z-50">

        <button
          onClick={() => setShowCheckout(true)}
          className="bg-[#FF6B35] text-white px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3"
        >

          <span className="text-2xl">
            🛒
          </span>

          <span className="font-bold">
            {cart.length} món
          </span>

        </button>

      </div>

      {/* CHECKOUT */}
      <CheckoutPopup
      increaseQuantity={increaseQuantity}
decreaseQuantity={decreaseQuantity}
        handlePlaceOrder={handlePlaceOrder}
        pickupTime={pickupTime}
        setShowTimePopup={setShowTimePopup}
        customerInfo={customerInfo}
        setShowCustomerForm={setShowCustomerForm}
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
        cart={cart}
        setCart={setCart}
        totalPrice={totalPrice}
      />
      <CustomerForm
        showCustomerForm={showCustomerForm}
        setShowCustomerForm={setShowCustomerForm}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
      />
      <TimePopup
        showTimePopup={showTimePopup}
        setShowTimePopup={setShowTimePopup}
        pickupTime={pickupTime}
        setPickupTime={setPickupTime}
      />

    </div>

  )
}


export default App