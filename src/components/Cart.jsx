function Cart({

  cart,
  setCart,
  totalPrice,
  increaseQuantity,
  decreaseQuantity,
  setShowCheckout,

}) {

  return (

    <div className="hidden lg:block bg-white rounded-3xl p-5 h-fit sticky top-5">

      <h2 className="text-2xl font-black text-[#7A3200] mb-5">
        Giỏ hàng
      </h2>

      {cart.length === 0 ? (

        <div className="text-center py-20">

          <div className="text-7xl">
            🛒
          </div>

          <p className="mt-5 text-gray-500">
            Chưa có món nào
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {cart.map((item) => (

            <div
              key={item.id}
              className="bg-[#F5F1EC] p-4 rounded-2xl"
            >

              <h3 className="font-bold text-[#7A3200]">
                {item.name}
              </h3>

              <p className="text-[#FF6B35] mt-1">
                {item.price.toLocaleString()}đ
              </p>
              {item.note && (

  <div className="mt-3 bg-white rounded-xl p-3">

    <p className="text-xs text-gray-500">
      Ghi chú
    </p>

    <p className="text-[#7A3200] mt-1">
      📝 {item.note}
    </p>

  </div>

)}
              <textarea
  placeholder="Ghi chú cho món..."
  value={item.note || ""}

  onChange={(e) => {

    const updatedCart = cart.map((cartItem) =>

      cartItem.id === item.id
        ? {
            ...cartItem,
            note: e.target.value
          }
        : cartItem

    )

    setCart(updatedCart)

  }}

  className="w-full mt-3 bg-white rounded-xl p-3 outline-none resize-none text-sm"
/>

              <div className="flex items-center gap-3 mt-3">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-[#7A3200] text-white w-8 h-8 rounded-full"
                >
                  -
                </button>

                <span className="font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-[#7A3200] text-white w-8 h-8 rounded-full"
                >
                  +
                </button>

              </div>

            </div>

          ))}

          <div className="border-t pt-5">

            <h3 className="text-2xl font-black text-[#7A3200]">
              Tổng tiền
            </h3>

            <p className="text-3xl font-black text-[#FF6B35] mt-2">
              {totalPrice.toLocaleString()}đ
            </p>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full mt-5 bg-[#FF6B35] text-white py-4 rounded-2xl font-bold text-lg"
            >
              Tiếp tục
            </button>

          </div>

        </div>

      )}

    </div>

  )

}

export default Cart