import React from "react";
import Link from "next/link";
import { AiFillHeart, AiFillEye } from "react-icons/ai";

const Products = ({ product, addToCart }) => {
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden">
          <Link href={`/product/${product?.slug}`}>
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-contain cursor-pointer"
            />
          </Link>
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Link href={`/category/${product?.slug}`}>
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text cursor-pointer">
                  {product?.category}
                </span>
              </Link>
              <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text">
                {product?.countInStock > 0 ? "In Stock" : "Unavailable"}
              </span>
            </div>

            <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap">
              {product?.name}
            </h2>
            <div>
              <span className="text-xl font-bold">${product?.price}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white">
                  {" "}
                  Save 20% off
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500">
              {product?.rating} of {product?.numReviews} Reviews
            </span>

            <div className="mt-5 flex gap-2">
              <button
                className="bg-green-500/80 hover:bg-green-500/90 px-6 py-2 text-white font-medium rounded-md tracking-wider transition"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button className="flex-grow flex justify-center items-center ">
                <AiFillHeart className="text-gray-500 hover:text-gray-300/80 text-2xl" />
              </button>
              <button className="flex-grow flex justify-center items-center ">
                <AiFillEye className="text-gray-500 hover:text-gray-300/80 text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
