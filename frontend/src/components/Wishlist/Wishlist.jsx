import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm border-[red]">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist is empty!</h5>
          </div>
        ) : (
          <>
            <div className="">
                <div className="flex w-full justify-between p-4 border-b border-[#737373]">
                  <h5 className="text-[20px] font-[600]">My Wishlist</h5>
                <RxCross1
                  size={25}
                  className="cursor-pointer border"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} pl-4 text-[#737373]`}>
                {/* <AiOutlineHeart size={25} /> */}
                <h5 className="text-[14px]">
                  Total {wishlist && wishlist.length} item available in your wishlist.
                </h5>
              </div>

              {/* wishlist Single Item */}
              <br />
              <div className="w-full">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b border-[#737373] px-4 py-2">
      <div className="w-full 800px:flex items-center">
        <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2"
        onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-full ml-2 mr-2 rounded-[5px] border"
        />

        <div className="h-[94px] w-[130px] flex flex-col items-center">
          <h1 className="w-[100%] text-[14px]">{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[16px] text-[teal] w-[100%] font-Roboto">
          ₹{totalPrice}
          </h4>
          <div
            className="cursor-pointer text-[12px] bg-[teal] text-[white] font-[600] flex items-center justify-center rounded-lg h-[30px] w-[115px] mt-2 border"
            onClick={() => addToCartHandler(data)}
          >
          Add to cart
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Wishlist;
