import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "../utils/error";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import axios from 'axios'

const Register = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async ({name, email, password }) => {
    try {
        await axios.post('/api/auth/signup',{
            name,
            email,
            password
        })
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Create Account">
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="hidden md:flex grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmit(submit)}>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Register with</p>
                  <div className="flex">
                    <button>
                      <AiFillGoogleCircle className="drop-shadow-lg hover:text-green-600 cursor-pointer rounded-md text-green-500 mr-4 text-3xl font-bold" />
                    </button>
                    <button>
                      <AiFillFacebook className="drop-shadow-lg hover:text-green-600 cursor-pointer rounded-md text-green-500 text-3xl font-bold" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Or</p>
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

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-gray-800">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-green-500 text-white hover:bg-green-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0  "
                  >
                    Register
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Have an account?
                    <Link href="/login"><a
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Login
                    </a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
