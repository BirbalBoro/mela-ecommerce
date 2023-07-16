import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      // style={{
      //   backgroundImage:
      //    "url('../../../Assests/images/20221201_162733.jpg')",
      // }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%] text-align flex flex-col items-center gap-4`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#008080] font-[600] capitalize text-center`}
        >
          Welcome to our bustling marketplace!
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba] text-center">
        Explore a diverse range of products from various vendors, all in one convenient location. Uncover unique treasures, support independent sellers, and enjoy a seamless shopping experience. Start exploring now and make your purchases with confidence. Happy shopping!
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-10 bg-[teal]`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
