import { getSession } from "next-auth/react"
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { getError } from "../utils/error";
import axios from "axios";
import Cookies from "js-cookie";

const PlaceOrder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const [loading, setLoading] = useState(false);

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const placeOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
       Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
      
    }
  };
  

  return (
    <Layout title="Place Order">
      {/* <CheckoutWizard activeStep={3} /> */}
      <section className="py-12 bg-gray-200">
        <div className="max-w-5xl mx-auto py-10 -mt-6 bg-white">
          <article className="overflow-hidden">
            <div className="bg-[white] rounded-b-md">
              <div className="p-3">
                <div className="space-y-6 text-slate-700">
                  <p className="text-xl font-extrabold tracking-tight uppercase font-body text-green-500">
                    Order Details
                  </p>
                </div>
              </div>
              {cartItems.length === 0 ? (
                <div>Cart is Empty!!</div>
              ) : (
                <div className="p-9">
                  <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-12">
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Billed To
                        </p>
                        <p className="">{shippingAddress.fullName}</p>
                        <p>{shippingAddress.address}</p>
                        <p>{shippingAddress.city}</p>
                        <p>{shippingAddress.postalCode}</p>
                        <p>{shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="px-9">
                <div className="flex flex-col mx-0 mt-8">
                  <table className="min-w-full divide-y divide-slate-500">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr
                          className="border-b border-slate-200"
                          key={item._id}
                        >
                          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                            <div className="font-medium text-slate-700">
                              {item.name}
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            {item.quantity}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            {item.price}
                          </td>
                          <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            ${item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th
                          scope="row"
                          colSpan={3}
                          className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                        >
                          Subtotal
                        </th>
                        <th
                          scope="row"
                          className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                        >
                          Subtotal
                        </th>
                        <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          ${itemsPrice}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          colSpan={3}
                          className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                        >
                          Shipping
                        </th>
                        <th
                          scope="row"
                          className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                        >
                          Shipping
                        </th>
                        <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          ${shippingPrice}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          colSpan={3}
                          className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                        >
                          Tax
                        </th>
                        <th
                          scope="row"
                          className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                        >
                          Tax
                        </th>
                        <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          ${taxPrice}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          colSpan={3}
                          className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                        >
                          Total
                        </th>
                        <th
                          scope="row"
                          className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                        >
                          Total
                        </th>
                        <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                          ${totalPrice}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div className="w-2/5 ">
              <button
                disabled={loading}
                onClick={placeOrder}
                className="ml-10 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded cursor-pointer shadow-md w-full"
              >
                {loading ? "Loading..." : "Place Order"}
              </button>
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default PlaceOrder;
PlaceOrder.auth = true;
