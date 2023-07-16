import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12 border border-[#000]`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex flex-row cursor-pointer overflow-hidden border-2 rounded-lg hover:border-[#000]"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`w-2/4 h-[100px] text-[15px] flex justify-center items-center text-center`}>{i.title}</h5>
                  <div className={`w-2/4 h-[100px] flex justify-center items-center`}>
                    <img
                    src={i.image_Url}
                    className="object-scale-down w-9/12 h-9/12"
                    alt=""
                    />
                  </div> 
                </div>
              );
            })}
        </div>
      </div>

      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
