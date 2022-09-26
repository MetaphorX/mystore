import React, { useEffect } from 'react'
import {signIn, useSession} from 'next-auth/react'
import {useForm} from 'react-hook-form'
import { toast } from "react-toastify"
import { getError } from "../utils/error";
import axios from 'axios';
import Layout from '../components/Layout';

const Profile = () => {
  
    const {data: session} = useSession()

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: {errors}
    } = useForm()

    useEffect(()=>{
        setValue('name', session.user.name)
        setValue('email', session.user.email)
    },[session?.user, setValue])
    
    const submitHandler = async({name, email, password, confirmPassword})=>{
        try {
            await axios.put('/api/auth/update',{
                name,
                email,
                password
            })

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })
            toast.success('Profile Updated Successfully')

            if(result.error){
                toast.error(result.error)
            }
        } catch (err) {
            toast.error(getError(err))
        }
    }

    return (
    <Layout title="Profile">
        <section className="h-screen -mt-12">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12  md:mb-0">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Update Profile</p>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="name"
                    placeholder="Full Name"
                    {...register("name", {
                      required: "Please enter Name",
                      
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500 text-xs">
                      {errors.name.message}{" "}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="email"
                    placeholder="Email address"
                    {...register("email", {
                      required: "Please enter email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9-.]+$/i,
                        message: "Enter valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-xs">
                      {errors.email.message}{" "}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Please enter password",
                      minLength: {
                        value: 6,
                        message: "Password must be more than 6",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="text-red-500 text-xs">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm password",
                      validate: (value) => value === getValues('password'),
                      minLength: {
                        value: 6,
                        message: "Password must be more than 6",
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="text-red-500 text-xs">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                  {errors.confirmPassword &&(
                    errors.confirmPassword.type === 'validate' &&(
                        <div className="text-xs text-red-500"> Passwords do not match</div>
                    )
                  )}
                </div>

<div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-green-500 text-white hover:bg-green-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0  "
                  onClick={handleSubmit(submitHandler)}
                  >
                    Update
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Profile
Profile.auth=true