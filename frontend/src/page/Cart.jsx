import React from "react";
import { useSelector } from "react-redux";
import CardProduct from "../component/CardProduct";
import emptyCart from "../assets/emptyCart.gif";

function Cart() {
  const productCartItem = useSelector((state) => state.product.cartItem);
  console.log(productCartItem);
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div>
            <div className="my-4 flex gap-3">
              {/* Display Cart Item  */}
              <div className="w-full max-w-3xl">
                {productCartItem.map((el) => {
                  return (
                    <CardProduct
                      key={el._id}
                      id={el._id}
                      name={el.name}
                      image={el.image}
                      category={el.category}
                      qty={el.qty}
                      total={el.total}
                      price={el.price}
                    />
                  );
                })}
              </div>

              {/* Total Cart Item  */}
              <div className="w-full max-w-sm  ml-auto">
                <h2 className="bg-blue-500 text-white p-1 text-lg ">Summary</h2>
                <div className="flex w-full py-2 text-lg border-b">
                  <p>Total Quantity</p>
                  <p className="ml-auto w-32 font-bold">{totalQty}</p>
                </div>
                <div className="flex w-full py-2 text-lg border-b">
                  <p>Total Price</p>
                  <p className="ml-auto w-32 font-bold">
                    <span className="text-red-500">₹</span>
                    {totalPrice}
                  </p>
                </div>
                <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
                  Payment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center flex-col">
            <img className="w-full max-w-sm" src={emptyCart} alt="" />
            <p className="text-slate-500 text-3xl font-bold ">Empty Cart</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
