import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";

function AllProduct({ heading }) {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  //filter data display
  const [filterBy, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState(productData);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
      <div className="flex justify-center gap-4 overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                isActive={el === filterBy}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[200px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-5">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingArrayFeature.map((el) => (
              <CardFeature loading="Loading...." />
            ))}
      </div>
    </div>
  );
}

export default AllProduct;
