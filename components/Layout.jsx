import React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {Navigation} from './index'

const Layout = ({ title, children }) => {
  

  return (
    <>
      <Head>
        <title>{title ? title + ' - MetaPhorx Store': 'MetaPhorx Store'}</title>
        <meta name="description" content="Metaphorx Ecommerce Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1}/>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
            <Navigation/>
        </header>
        <main className="bg-gray-200 mt-20">{children}</main>
        <footer>
            footer
        </footer>
      </div>
    </>
  );
};

export default Layout;
