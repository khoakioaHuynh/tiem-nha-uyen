import { useEffect, useState, useRef } from "react"
import {

  collection,
  onSnapshot,
  doc,
  updateDoc,
   deleteDoc,
  setDoc

} from "firebase/firestore"

import { db } from "../firebase"

function Admin() {

  const [orders, setOrders] = useState([])
  const [shopOpen, setShopOpen] = useState(true)
  const [filterStatus, setFilterStatus] = useState("Tất cả")
  const totalOrders = orders.length
  const toggleShop = async (status) => {

  await setDoc(
    doc(db, "settings", "shop"),
    {
      shopOpen: status
    }
  )

}
  const completedOrders = orders.filter(
    (order) => order.status === "Hoàn thành"
  )

  const cancelledOrders = orders.filter(
    (order) => order.status === "Đã huỷ"
  )

  const totalRevenue = completedOrders.reduce(


    (total, order) => total + order.totalPrice,

    0

  )
  const today = new Date()

  const todayRevenue = completedOrders.reduce(

    (total, order) => {

      if (!order.createdAt) return total

      const orderDate = order.createdAt.toDate()

      const isToday =

        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()

      return isToday

        ? total + order.totalPrice

        : total

    },

    0

  )

  const monthRevenue = completedOrders.reduce(

    (total, order) => {

      if (!order.createdAt) return total

      const orderDate = order.createdAt.toDate()

      const isThisMonth =

        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()

      return isThisMonth

        ? total + order.totalPrice

        : total

    },

    0

  )

  const [audioEnabled, setAudioEnabled] = useState(false)
  const previousOrdersLength = useRef(0)
  const toggleAudio = () => {

    setAudioEnabled(!audioEnabled)

  }

  useEffect(() => {

    const unsubscribe = onSnapshot(

      collection(db, "orders"),

      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data()

        }))
        if (

          previousOrdersLength.current > 0 &&
          data.length > previousOrdersLength.current &&
          audioEnabled

        ) {

          const audio = new Audio("/sounds/notification.mp3")

          audio.play().catch((err) => console.log(err))

        }

        setOrders(data)
        previousOrdersLength.current = data.length

      }

    )

    return () => unsubscribe()

  }, [audioEnabled])
  useEffect(() => {

  const unsubscribe = onSnapshot(

    doc(db, "settings", "shop"),

    (snapshot) => {

      if (snapshot.exists()) {

        setShopOpen(snapshot.data().shopOpen)

      }

    }

  )

  return () => unsubscribe()

}, [])
  const updateStatus = async (id, status) => {

    const orderRef = doc(db, "orders", id)

    await updateDoc(orderRef, {

      status

    })

  }
 

  return (

    <div className="min-h-screen bg-[#F5F1EC] p-5">

      <h1 className="text-4xl font-black text-[#7A3200] mb-8">

        Quản lý đơn hàng

      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">


        <div className="bg-white rounded-3xl p-5">

          <p className="text-gray-500">
            Tổng đơn
          </p>

          <h2 className="text-3xl font-black text-[#7A3200] mt-2">

            {totalOrders}

          </h2>

        </div>

        <div className="bg-white rounded-3xl p-5">

          <p className="text-gray-500">
            Hoàn thành
          </p>

          <h2 className="text-3xl font-black text-green-500 mt-2">

            {completedOrders.length}

          </h2>

        </div>

        <div className="bg-white rounded-3xl p-5">

          <p className="text-gray-500">
            Đã huỷ
          </p>

          <h2 className="text-3xl font-black text-red-500 mt-2">

            {cancelledOrders.length}

          </h2>

        </div>

        <div className="bg-white rounded-3xl p-5">

          <p className="text-gray-500">
            Doanh thu
          </p>
          <div className="bg-white rounded-3xl p-5">

            <p className="text-gray-500">
              Hôm nay
            </p>

            <h2 className="text-3xl font-black text-blue-500 mt-2">

              {todayRevenue.toLocaleString()}đ

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-5">

            <p className="text-gray-500">
              Tháng này
            </p>

            <h2 className="text-3xl font-black text-purple-500 mt-2">

              {monthRevenue.toLocaleString()}đ

            </h2>

          </div>


        </div>

      </div>

      <div className="flex flex-wrap gap-3 mb-6">

        <button

          onClick={toggleAudio}

          className={`

      px-5
      py-3
      rounded-2xl
      font-bold
      text-white
      duration-300

      ${audioEnabled
              ? "bg-green-500"
              : "bg-gray-500"

            }

    `}

        >

          {

            audioEnabled

              ? "🔔 Đã bật âm thanh"

              : "🔕 Đang tắt âm thanh"

          }

        </button>
        <button

          onClick={() => toggleShop(true)}

          className={`
  px-5
  py-3
  rounded-2xl
  font-bold
  text-white

  ${shopOpen
              ? "bg-green-600"
              : "bg-gray-400"}
`}

        >

          {shopOpen ? "🟢 Đang mở quán" : "Mở quán"}

        </button>

        <button

          onClick={() => toggleShop(false)}

          className={`
  px-5
  py-3
  rounded-2xl
  font-bold
  text-white

  ${!shopOpen
              ? "bg-red-600"
              : "bg-gray-400"}
`}

        >

          {!shopOpen ? "🔴 Đang tạm nghỉ" : "Tạm nghỉ"}

        </button>

        <button

          onClick={() => setFilterStatus("Tất cả")}

          className={`

      px-4
      py-3
      rounded-2xl
      font-bold

      ${filterStatus === "Tất cả"

              ? "bg-[#7A3200] text-white"

              : "bg-white text-[#7A3200]"
            }

    `}

        >

          Tất cả

        </button>

        <button

          onClick={() => setFilterStatus("pending")}

          className={`

      px-4
      py-3
      rounded-2xl
      font-bold

      ${filterStatus === "pending"

              ? "bg-orange-500 text-white"

              : "bg-white text-orange-500"
            }

    `}

        >

          Mới nhất

        </button>

        <button

          onClick={() => setFilterStatus("Hoàn thành")}

          className={`

      px-4
      py-3
      rounded-2xl
      font-bold

      ${filterStatus === "Hoàn thành"

              ? "bg-green-500 text-white"

              : "bg-white text-green-500"
            }

    `}

        >

          Hoàn thành

        </button>

        <button

          onClick={() => setFilterStatus("Đã huỷ")}

          className={`

      px-4
      py-3
      rounded-2xl
      font-bold

      ${filterStatus === "Đã huỷ"

              ? "bg-red-500 text-white"

              : "bg-white text-red-500"
            }

    `}

        >

          Đã huỷ

        </button>

      </div>

      <div className="space-y-5">

        {

          orders

            .filter((order) => {

              if (filterStatus === "Tất cả") {

                return true

              }

              if (filterStatus === "pending") {

                return order.status === "pending"

              }

              return order.status === filterStatus

            })

            .sort((a, b) => {

              if (!a.createdAt || !b.createdAt) {

                return 0

              }

              return (

                b.createdAt.seconds -

                a.createdAt.seconds

              )

            })

            .map((order) => (

              <div

                key={order.id}

                className="bg-white rounded-3xl p-5"

              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-2xl font-black text-[#7A3200]">

                      {order.customerInfo?.name || "Khách"}

                    </h2>

                    <p className="text-gray-500 mt-1">

                      📞 {order.customerInfo?.phone}

                    </p>
                    <p className="text-gray-500 mt-1">
                    </p>

                    <p className="text-gray-500">

                      📍 {order.customerInfo?.address}

                    </p>
                    <p className="text-gray-500 mt-1">

                      🕒 {

                        order.createdAt

                          ? new Date(
                            order.createdAt.seconds * 1000
                          ).toLocaleString("vi-VN")

                          : "Không có thời gian"

                      }

                    </p>


                  </div>

                  <div>

                    <span

                      className={`

                    px-4
                    py-2
                    rounded-xl
                    text-white
                    font-bold

                    ${order.status === "pending"

                          ? "bg-orange-500"

                          : order.status === "Đã xác nhận"

                            ? "bg-blue-500"

                            : order.status === "Hoàn thành"

                              ? "bg-green-500"

                              : "bg-red-500"

                        }

                  `}

                    >

                      {order.status}

                    </span>

                  </div>

                </div>

                <div className="mt-5 space-y-3">

                  {order.cart?.map((item) => (

                    <div

                      key={item.id}

                      className="bg-[#F5F1EC] rounded-2xl p-4"

                    >

                      <div className="flex justify-between">

                        <div>

                          <h3 className="font-bold text-[#7A3200]">

                            {item.name}

                          </h3>

                          <p className="text-gray-500">

                            SL: {item.quantity}

                          </p>

                          {item.note && (

                            <p className="text-sm mt-2">

                              📝 {item.note}

                            </p>

                          )}

                        </div>

                        <p className="font-bold text-[#FF6B35]">

                          {(item.price * item.quantity).toLocaleString()}đ

                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="mt-5 border-t pt-5 flex justify-between items-center">

                  <div>

                    <p className="text-gray-500">

                      ⏰ {order.pickupTime}

                    </p>

                    <h3 className="text-3xl font-black text-[#FF6B35] mt-2">

                      {order.totalPrice?.toLocaleString()}đ

                    </h3>

                  </div>

                  <div className="flex gap-3 flex-wrap">

                    <button

                      disabled={order.status !== "pending"}

                      onClick={() =>
                        updateStatus(order.id, "Đã xác nhận")
                      }

                      className={`

    px-4
    py-3
    rounded-2xl
    text-white

    ${order.status !== "pending"

                          ? "bg-gray-400 cursor-not-allowed"

                          : "bg-blue-500"

                        }

  `}

                    >

                      Xác nhận

                    </button>

                    <button

                      disabled={order.status === "Hoàn thành"}

                      onClick={() =>
                        updateStatus(order.id, "Hoàn thành")
                      }

                      className={`

    px-4
    py-3
    rounded-2xl
    text-white

    ${order.status === "Hoàn thành"

                          ? "bg-gray-400 cursor-not-allowed"

                          : "bg-green-500"

                        }

  `}

                    >

                      Hoàn thành

                    </button>

                    <button

                      disabled={order.status === "Đã huỷ"}

                      onClick={() =>
                        updateStatus(order.id, "Đã huỷ")
                      }

                      className={`

    px-4
    py-3
    rounded-2xl
    text-white

    ${order.status === "Đã huỷ"

                          ? "bg-gray-400 cursor-not-allowed"

                          : "bg-red-500"

                        }

  `}

                    >

                      Huỷ đơn

                    </button>

                  </div>

                </div>

              </div>

            ))}

      </div>

    </div>

  )

}

export default Admin