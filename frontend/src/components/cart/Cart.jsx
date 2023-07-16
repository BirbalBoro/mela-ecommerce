import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { backend_url } from "../../server";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-between p-4 border-b border-[#737373]">
                <h5 className="text-[20px] font-[600]">My Cart</h5>
                <RxCross1
                  size={25}
                  className="cursor-pointer border"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} pl-4 text-[#737373]`}>
                {/* <IoBagHandleOutline size={25} /> */}
                <h5 className="text-[14px]">
                  Total {cart && cart.length} item is available in your cart
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[teal] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (₹{totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b border-[#737373] px-4 py-2">
      <div className="w-full 800px:flex items-center">
        <div>
          <div
            className={`bg-[teal] border rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="ml-2">{data.qty}</span>
          <div
            className="bg-[teal] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#fff" />
          </div>
        </div>
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-full ml-2 mr-2 rounded-[5px] border"
        />
        <div className="h-[94px] w-[120px] flex flex-col items-center ">
          <h1 className="w-[100%] text-[14px]">{data.name}</h1>
          <h4 className="mt-5 w-[100%] font-[400] text-[12px] text-[#00000082]">
            ₹{data.discountPrice} * {value}
          </h4>
          <h4 className="w-[100%] font-[600] text-[16px] text-[teal] font-Roboto">
            ₹{totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
