import React from 'react'

function CardProduct({id,name,image,category,qty,total,price}) {
  return (
    <div className='bg-slate-200 p-2 flex'>
      <div className='bg-white p-3'>
        <img src={image} className='h-28 w-40 object-cover' alt="" />
      </div>
      <div className="flex flex-col gap-1">
          <h3 className="font-semibold  text-slate-600 capitalize text-lg md:text-xl ">
            {name}
          </h3>
          <p className=" text-slate-500 capitalize font-medium">
            {category}
          </p>
          <p className=" font-bold text-base">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>
          <div className="flex gap-3">
            <button className="bg-slate-400 py-2 mt-2 min-w-[100px] rounded hover:bg-yellow-600">
              +
            </button>
            <button className="bg-slate-400 py-2 mt-2 min-w-[100px] rounded hover:bg-yellow-600">
             -
            </button>
          </div>
        </div>
    </div>
  )
}

export default CardProduct
