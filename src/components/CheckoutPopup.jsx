function CheckoutPopup({
  handlePlaceOrder,
  showCheckout,
  loadingOrder,
  setShowCheckout,
  cart,
  setCart,
  totalPrice,
  customerInfo,
  setShowCustomerForm,
  pickupTime,
  setShowTimePopup,
  increaseQuantity,
  decreaseQuantity,

}) {

  if (!showCheckout) return null

  return (

    <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center p-3">

      <div className="bg-white w-full max-w-6xl rounded-[30px] p-5 md:p-8 max-h-[95vh] overflow-y-auto relative">

        {/* CLOSE */}
        <button
          onClick={() => setShowCheckout(false)}
          className="absolute top-5 left-5 text-3xl"
        >
          ←
        </button>

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-black text-center text-[#7A3200]">

          Thông tin giỏ hàng

        </h1>

        <div className="border-b mt-5 mb-8"></div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="space-y-5">

            {/* DELIVERY */}
            <div className="bg-[#F5F1EC] rounded-3xl p-4">

              <button className="w-full bg-[#7A3200] text-white py-4 rounded-2xl text-xl font-bold">
                Giao hàng
              </button>

            </div>

            {/* CUSTOMER */}
            <div className="bg-[#F5F1EC] rounded-3xl p-6">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-black text-[#7A3200]">
                  Thông tin khách hàng
                </h2>

                <button onClick={() => setShowCustomerForm(true)} className="text-[#FF6B35] font-bold" >
                  Thêm
                </button>

              </div>

              <div className="text-gray-500 mt-3">

                {customerInfo.name ? (

                  <div className="space-y-1">

                    <p>{customerInfo.name}</p>

                    <p>{customerInfo.phone}</p>

                    <p>{customerInfo.address}</p>

                  </div>

                ) : (

                  <p>Chưa có thông tin</p>

                )}

              </div>

            </div>

            {/* TIME */}
            <div className="bg-[#F5F1EC] rounded-3xl p-6">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-black text-[#7A3200]">
                  Thời gian muốn nhận
                </h2>

                <button
                  onClick={() => setShowTimePopup(true)}
                  className="text-[#FF6B35] font-bold"
                >
                  Sửa
                </button>

              </div>

              <p className="text-gray-500 mt-3">
                {pickupTime}
              </p>

            </div>

            {/* PAYMENT */}
            <div className="bg-[#F5F1EC] rounded-3xl p-6">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-black text-[#7A3200]">
                  Phương thức thanh toán
                </h2>



              </div>

              <p className="text-gray-500 mt-3">
                Tiền mặt
              </p>

            </div>

            {/* PRODUCTS */}
            <div className="bg-[#F5F1EC] rounded-3xl p-6">

              <h2 className="text-3xl font-black text-[#7A3200] mb-5">

                Món đã chọn

              </h2>

              <div className="space-y-4">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-3xl"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h3 className="text-xl font-bold text-[#7A3200]">
                          {item.name}
                        </h3>
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

                          className="w-full mt-3 bg-[#F5F1EC] rounded-xl p-3 outline-none resize-none text-sm"
                        />


                        <div className="flex items-center gap-3 mt-3">

                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-200 font-bold text-xl"
                          >
                            -
                          </button>

                          <span className="font-bold text-lg">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-[#7A3200] text-white font-bold text-xl"
                          >
                            +
                          </button>

                        </div>
                        {item.note && (

                          <div className="mt-3 bg-[#FFF] rounded-xl p-3 border">

                            <p className="text-xs text-gray-500">
                              Ghi chú
                            </p>

                            <p className="text-[#7A3200] mt-1 text-sm">
                              📝 {item.note}
                            </p>

                          </div>

                        )}

                      </div>

                      <p className="text-[#FF6B35] text-xl font-black">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-[#F5F1EC] rounded-3xl p-6 h-fit sticky top-5">

            <div className="flex justify-between items-center border-b pb-5">

              <h2 className="text-2xl text-[#7A3200]">
                Tổng cộng
              </h2>

              <p className="text-2xl font-black text-[#7A3200]">
                {totalPrice.toLocaleString()}đ
              </p>
              <div className="mt-10 sticky bottom-0 bg-[#F5F1EC] pt-5">

                <button
                  onClick={handlePlaceOrder}
                  disabled={loadingOrder}
                  className="w-full bg-[#7A3200] text-white py-5 rounded-3xl text-2xl font-black"
                >

                  {loadingOrder ? "Đang đặt hàng..." : "Đặt hàng"}

                </button>

              </div>

            </div>

            <div className="mt-8">

              <h1 className="text-5xl font-black text-[#7A3200]">
                Thành tiền
              </h1>

              <p className="text-5xl font-black text-[#FF6B35] mt-5">
                {totalPrice.toLocaleString()}đ
              </p>

            </div>



          </div>

        </div>

      </div>

    </div>

  )

}

export default CheckoutPopup