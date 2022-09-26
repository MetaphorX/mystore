import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";




function Payment() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment methode required");
    } else {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          paymentMethod: selectedPaymentMethod,
        })
      );
      router.push("/placeorder");
    }
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    } else {
      setSelectedPaymentMethod(paymentMethod);
    }
  }, [paymentMethod, shippingAddress.address, router]);
  return (
    <Layout title="Payment Method">
      {/* <CheckoutWizard activeStep={2}/> */}
      <form className="mx-auto h-screen  mt-12 max-w-screen-md" onSubmit={submitHandler}>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
          Payment Methods:
        </h1>
        {["Paypal", "Stripe", "Cash On Delivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              type="radio"
              name="paymentMethod"
              id={payment}
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="flex">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="bg-gray-500 px-2 mr-4 text-white rounded"
          >
            Back
          </button>
          <button className="bg-green-500 px-4 hover:bg-green-600 text-white rounded">
            Next
          </button>
        </div>
      </form>


    </Layout>
  );
}

export default Payment;
Payment.auth = true;
