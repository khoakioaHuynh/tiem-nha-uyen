function CustomerForm({

  showCustomerForm,
  setShowCustomerForm,
  customerInfo,
  setCustomerInfo,

}) {

  if (!showCustomerForm) return null

  return (

    <div className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-3">

      <div className="bg-white w-full max-w-md rounded-[30px] p-6">

        <h1 className="text-3xl font-black text-[#7A3200] mb-6">

          Thông tin khách hàng

        </h1>

        <div className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Tên khách hàng"
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                name: e.target.value,
              })
            }
            className="w-full bg-[#F5F1EC] p-4 rounded-2xl outline-none"
          />

          {/* PHONE */}
          <input
            type="text"
            placeholder="Số điện thoại"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                phone: e.target.value,
              })
            }
            className="w-full bg-[#F5F1EC] p-4 rounded-2xl outline-none"
          />

          {/* ADDRESS */}
          <textarea
            placeholder="Địa chỉ giao hàng"
            value={customerInfo.address}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                address: e.target.value,
              })
            }
            className="w-full bg-[#F5F1EC] p-4 rounded-2xl outline-none h-32 resize-none"
          />

        </div>

        {/* BUTTON */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => setShowCustomerForm(false)}
            className="flex-1 bg-gray-200 py-4 rounded-2xl font-bold"
          >
            Hủy
          </button>

          <button
            onClick={() => setShowCustomerForm(false)}
            className="flex-1 bg-[#FF6B35] text-white py-4 rounded-2xl font-bold"
          >
            Lưu
          </button>

        </div>

      </div>

    </div>

  )

}

export default CustomerForm