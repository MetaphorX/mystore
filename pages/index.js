import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Products } from "../components";
import Layout from "../components/Layout";
import Product from "../models/Product";
import db from '../utils/db'
import { Store } from "../utils/Store";

export default function Home({products}) {

  const {state, dispatch} = useContext(Store)
  const {cart} = state

  const addToCart = async(product)=>{
    const existItem = cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1: 1
    const {data} = await axios.get(`/api/products/${product._id}`)
    
    if(data.countInStock < quantity){
      return toast.error('Product is out of Stock')
        
    }
    dispatch({type: 'CART_ADD_ITEM', payload:{...product, quantity}})
    toast.success('Added to Cart')
}

  return (
    <Layout title="Home Page">
      <div className="">
      <div className=" mx-auto py-9 md:py-12 px-4 md:px-6 shadow-lg mb-5">
            <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
                <div className="hidden md:flex flex-col md:flex-row items-strech justify-between bg-gray-150 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12 ">
                    <div className="hidden lg:flex flex-col justify-center md:w-1/2 bg-white px-2">
                        <h1 className="text-3xl lg:text-4xl font-semibold text-green-500">Best Deal</h1>
                        <h4 className="text-base lg:text-xl text-green-500 mt-2">
                            Save upto <span className="font-bold">50%</span>
                        </h4>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end shadow-xl">
                        <img src="https://media.istockphoto.com/photos/creative-minimal-paper-idea-concept-white-shoe-with-white-background-picture-id1149654373?k=20&m=1149654373&s=612x612&w=0&h=YfIwQ1QylFJ2sxMmjKAWLONWniGq9PiMGBkVeBeB9oQ=" alt="babber" />
                    </div>
                </div>
                <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-white py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center shadow-lg">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-semibold text-green-500 pt-2">Jackets and Comfort</h1>
                        <p className="text-base lg:text-xl text-green-500">
                            Save Upto <span className="font-bold">30%</span>
                        </p>
                    </div>
                    <div className="flex justify-end md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
                        <img src="https://media.istockphoto.com/photos/two-sport-jacket-picture-id518378299?k=20&m=518378299&s=612x612&w=0&h=qLRSc8zbZAWXI67jskFIZXy69XOmW55pfCrDVi4Wnho=" alt="banner" className="md:w-20 md:h-20 lg:w-full lg:h-full" />
                    </div>
                </div>
            </div>
        </div>
        {/* banner */}
        <div className="container grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Products product={product} key={product?.slug} addToCart={addToCart}/>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(){
  await db.connect()
  const products = await Product.find().lean()
  return{
    props:{
      products : products.map(db.convertDocToObj)
    },
  }
}