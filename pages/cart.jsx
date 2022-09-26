import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { BsTrashFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItem = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const router = useRouter();
  const updateCart = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Product out of Stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Shopping Cart Updated");
  };
  return (
    <>
      <Layout title="Shopping Cart">
        {cartItems.length === 0 ? (
          <Link href="/">
            <div className="flex font-semibold text-indigo-600 text-md cursor-pointer">
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </div>
          </Link>
        ) : (
          <body className="bg-gray-100 -mt-8">
            <div className="container mx-auto">
              <div className="flex shadow-md my-10">
                <div className="w-full bg-white px-10 py-10">
                  <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">Shopping Cart</h1>

                    <h2 className="hidden lg:font-semibold text-2xl">
                      {cartItems.reduce((a, c) => a + c.quantity, 0)} Items
                    </h2>
                  </div>
                  <div className="flex mt-10 mb-5">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Product Image
                    </h3>
                    <h3 className="font-semibold mr-5 lg:text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Quantity
                    </h3>
                    <h3 className="font-semibold lg:text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Price
                    </h3>
                    <h3 className=" font-semibold lg:text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Action
                    </h3>
                  </div>
                  {cartItems.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    >
                      <div className="flex w-2/5">
                        <div className="w-20">
                          <Image
                            src={item?.image}
                            alt={item?.image}
                            width={50}
                            height={50}
                          />
                          <span className="text-center w-1/5 lg:ml-4 font-semibold text-sm">
                            {item?.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center w-2/5">
                        <select
                          value={item?.quantity}
                          onChange={(e) => updateCart(item, e.target.value)}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ${item?.price}
                      </span>
                      <button
                        className="justify-around w-1/5 font-semibold text-lg"
                        onClick={() => removeItem(item)}
                      >
                        <BsTrashFill className="lg:ml-20 text-gray-500 hover:text-gray-600" />
                      </button>
                    </div>
                  ))}
                  <div className="card p-5">
                    <ul>
                      <li>
                        <div className="pb-3">
                          Subtotal ({" "}
                          {cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                          {cartItems.reduce(
                            (a, c) => a + c.quantity * c.price,
                            0
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => router.push("login?redirect=/shipping")}
                    className="bg-green-500 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </body>
        )}
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
Cart.auth = true