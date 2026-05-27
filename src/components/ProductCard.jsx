function ProductCard({
  item,
  addToCart
}) {

  return (

    <div className="flex justify-between items-center bg-[#F5F1EC] p-4 rounded-3xl">

      <div className="flex gap-4 items-center">

        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl">
          🥤
        </div>

        <div>

          <h3 className="text-lg md:text-2xl font-bold text-[#7A3200]">
            {item.name}
          </h3>

          <p className="text-[#FF6B35] mt-1 font-bold">
            {item.price.toLocaleString()}đ
          </p>

        </div>

      </div>

      <button
        onClick={() => addToCart(item)}
        className="bg-[#FF6B35] text-white min-w-[45px] h-[45px] rounded-full text-3xl"
      >
        +
      </button>

    </div>

  )

}

export default ProductCard