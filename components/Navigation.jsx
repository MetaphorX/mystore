import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Store } from "../utils/Store";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Navigation = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Kids", href: "/kids" },
    { name: "Electronics", href: "/electronics" },
  ];

  const [nav, setNav] = useState(false);
  const navHandler = () => {
    setNav(!nav);
  };

  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // To fix the hydration error
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logout = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <div className="fixed w-full bg-white z-100">
        <div className="flex justify-around items-center shadow-xl w-full h-full px-2 2xl:px-16 cursor-pointer">
          <Link href="/">
          <h2 className="text-2xl font-bold text-left mb-2 py-4 text-gray-400">
            My<span className="text-green-500">-Store</span>
          </h2>
          </Link>
          <div className="md:flex space-x-5">
            <ul className="hidden md:flex text-green-500 font-semibold items-center gap-8">
              <li>
                  <Link href="/">
                    <span className="cursor-pointer">Home</span>
                  </Link>
                </li>
              <li>
                  <Link href="/">
                    <span className="cursor-pointer">Men</span>
                  </Link>
                </li>
              <li>
                  <Link href="/">
                    <span className="cursor-pointer">Women</span>
                  </Link>
                </li>
              <li>
                  <Link href="/">
                    <span className="cursor-pointer">Kids</span>
                  </Link>
                </li>
              
              <Link href="/cart">
                <div>
                  {cartItemsCount > 0 && (
                    <span className="ml-4 rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                  <AiOutlineShoppingCart className="mb-4 text-green-500 hover:text-green-700 cursor-pointer text-4xl font-extrabold"></AiOutlineShoppingCart>
                </div>
              </Link>

              <div>
                {status === "loading" ? (
                  "loading"
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <div className="flex">
                      <AiOutlineUser className="text-green-500 text-3xl" />
                      <Menu.Button className="text-green-600 text-xs">
                        {session.user.name}
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white">
                      <Menu.Item>
                        <DropdownLink
                          className="flex p-2 cursor-pointer hover:bg-gray-200"
                          href="/profile"
                        >
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="flex p-2 cursor-pointer hover:bg-gray-200"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          onClick={logout}
                          className="flex p-2 cursor-pointer hover:bg-gray-200"
                          href="#"
                        >
                          Logout
                        </DropdownLink>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <button className="ml-10 text-sm p-3 px-6 pt-2 text-white bg-green-500 rounded-full baseline cursor-pointer">
                      Log in
                    </button>
                  </Link>
                )}
              </div>
            </ul>

            <div onClick={navHandler} className="md:hidden cursor-pointer">
              <AiOutlineMenu
                fontSize={35}
                className="text-green-500 shadow-md"
                
              />
            </div>
          </div>
        </div>
        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70"
              : ""
          }
        >
          <div
            className={
              nav
                ? "fixed left-0 top-0 w-[100%] sm:w-[100%] md:w-[100%] h-screen bg-white p-10 ease-in duration-500"
                : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
            }
          >
            <div>
              <div className="-mt-4 flex w-full items-center justify-between text-center py-1">
                <h2 className="text-2xl font-bold text-left mb-2  text-gray-400">
                  My<span className="text-green-500">-Store</span>
                </h2>
                <div
                  onClick={navHandler}
                  className="rounded-full text-white bg-green-500 shadow-lg hover:bg-green-600 p-3 cursor-pointer"
                >
                  <AiOutlineClose fontSize={25} />
                </div>
              </div>
            </div>
            {/* end of logo and close icon */}
            <div className="flex flex-col py-6">
              <ul className="text-left font-bold text-green-600 text-lg">
                <li className="py-2">
                    <Link href="/">
                      <span className="cursor-pointer py-3 border-2 px-2 border-rounded w-full drop-shadow-md text-center hover:translate-x-2">Home</span>
                    </Link>
                  </li>
                <li className="py-2">
                    <Link href="/">
                      <span className="cursor-pointer py-3 border-2 px-2 border-rounded w-full drop-shadow-md text-center hover:translate-x-2">Men</span>
                    </Link>
                  </li>
                <li className="py-2">
                    <Link href="/">
                      <span className="cursor-pointer py-3 border-2 px-2 border-rounded w-full drop-shadow-md text-center hover:translate-x-2">Women</span>
                    </Link>
                  </li>
                <li className="py-2">
                    <Link href="/">
                      <span className="cursor-pointer py-3 border-2 px-2 border-rounded w-full drop-shadow-md text-center hover:translate-x-2">Kids</span>
                    </Link>
                  </li>
                
              </ul>
              <div className="inline-block ">
                <Link href="/cart">
                  <div>
                    {cartItemsCount > 0 && (
                      <span className="ml-4 rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
                        {cartItemsCount}
                      </span>
                    )}
                    <AiOutlineShoppingCart className="mb-4 text-green-500 hover:text-green-700 cursor-pointer text-4xl font-extrabold"></AiOutlineShoppingCart>
                  </div>
                </Link>
                <div>
                  {status === "loading" ? (
                    "loading"
                  ) : session?.user ? (
                    <Menu as="div" className="relative inline-block">
                      <div className="flex">
                        <AiOutlineUser className="text-green-500 text-3xl hover:text-green-600" />
                        <Menu.Button className="text-green-500 text-xs font-bold hover:text-green-600">
                          {session.user.name}
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute right-30 w-56 origin-top-right shadow-lg bg-white">
                        <Menu.Item>
                          <DropdownLink
                            className="flex p-2 cursor-pointer hover:bg-gray-200"
                            href="/profile"
                          >
                            Profile
                          </DropdownLink>
                        </Menu.Item>

                        <Menu.Item>
                          <DropdownLink
                            onClick={logout}
                            className="flex p-2 cursor-pointer hover:bg-gray-200"
                            href="#"
                          >
                            Logout
                          </DropdownLink>
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  ) : (
                    <button
                      onClick={logout}
                      className="mt-2 w-full text-sm p-3 px-6 pt-2 text-white bg-green-500 rounded-full baseline cursor-pointer"
                    >
                      Log in
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
