import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";

const Shipping = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submit = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push("/payment");
  };
  return (
    <Layout title="Shipping Address">
      {/* <CheckoutWizard activeStep={1} /> */}
      <div className="flex justify-center items-center">
        <div className="py-16 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
          <form onSubmit={handleSubmit(submit)}>
            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-full">
              <h1 className="font-semibold text-2xl">Shipping Address</h1>
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="text"
                  placeholder="Full Name"
                  id="fullName"
                  autoFocus
                  {...register("fullName", {
                    required: "Enter Full Name",
                  })}
                />
                {errors.fullName && (
                  <div className="text-xs text-red-500">
                    {errors.fullName.message}
                  </div>
                )}
              </div>
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="text"
                  placeholder="Street Address"
                  id="address"
                  autoFocus
                  {...register("address", {
                    required: "Enter Address",
                    minLength: {
                      value: 5,
                      message: "Address should be more than 5",
                    },
                  })}
                />
                {errors.address && (
                  <div className="text-xs text-red-500">
                    {errors.address.message}
                  </div>
                )}
              </div>
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="text"
                  placeholder="City"
                  id="city"
                  autoFocus
                  {...register("city", {
                    required: "Enter City",
                  })}
                />
                {errors.city && (
                  <div className="text-xs text-red-500">
                    {errors.city.message}
                  </div>
                )}
              </div>
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="text"
                  placeholder="Postal Code"
                  id="postalCode"
                  autoFocus
                  {...register("postalCode", {
                    required: "Enter Postal Code",
                  })}
                />
                {errors.postalCode && (
                  <div className="text-xs text-red-500">
                    {errors.postalcode.message}
                  </div>
                )}
              </div>
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="text"
                  placeholder="Country"
                  id="country"
                  autoFocus
                  {...register("country", {
                    required: "Enter Country",
                  })}
                />
                {errors.country && (
                  <div className="text-xs text-red-500">
                    {errors.country.message}
                  </div>
                )}
              </div>

              <button className="mt-8 border border-transparent bg-green-500 hover:bg-green-600 text-white hover:text-white flex justify-center items-center py-4 rounded w-full">
                <div>
                  <p className="text-base leading-4">Next</p>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
Shipping.auth = true;
