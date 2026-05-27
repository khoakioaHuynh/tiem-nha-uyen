function TimePopup({

  showTimePopup,
  setShowTimePopup,
  pickupTime,
  setPickupTime,

}) {

  if (!showTimePopup) return null

  const timeOptions = [
    "Càng sớm càng tốt",
    "15 phút nữa",
    "30 phút nữa",
    "1 tiếng nữa",
  ]

  return (

    <div className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-3">

      <div className="bg-white w-full max-w-md rounded-[30px] p-6">

        <h1 className="text-3xl font-black text-[#7A3200] mb-6">

          Thời gian muốn nhận

        </h1>

        <div className="space-y-3">

          {timeOptions.map((time, index) => (

            <button
              key={index}
              onClick={() => {

                setPickupTime(time)
                setShowTimePopup(false)

              }}
              className={`w-full p-4 rounded-2xl text-left font-bold duration-300

              ${
                pickupTime === time
                  ? "bg-[#7A3200] text-white"
                  : "bg-[#F5F1EC] text-[#7A3200]"
              }`}
            >

              {time}

            </button>

          ))}

        </div>

      </div>

    </div>

  )

}

export default TimePopup