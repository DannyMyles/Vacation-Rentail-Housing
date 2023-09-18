// "use client";
// import React, { FC, useState } from "react";
// import facebookSvg from "@/images/Facebook.svg";
// import twitterSvg from "@/images/Twitter.svg";
// import googleSvg from "@/images/Google.svg";
// import Input from "@/shared/Input";
// import ButtonPrimary from "@/shared/ButtonPrimary";
// import Image from "next/image";
// import Link from "next/link";
// import { useGoogleLogin } from "@/hooks/providers/useGoogleLogin";
// import { useAppleLogin } from "@/hooks/providers/useAppleLogin";
// import { useFacebookLogin } from "@/hooks/providers/useFacebookLogin";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { app } from "config/firebase";
// import axios from "axios";

// export interface PageLoginProps {}


// const PageLogin: FC<PageLoginProps> = ({}) => {
//   const { googleLogin, isLoading: googleLoggining } = useGoogleLogin();
//   const { appleLogin, isLoading: appleLoading } = useAppleLogin();
//   const { facebookLogin, isLoading: facebookLoading } = useFacebookLogin();
//   const [userDetails, setUserDetails] = useState({ email: "", password: "" });

//   const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     const auth = getAuth(app);
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         userDetails.email,
//         userDetails.password
//       );
//       const user = userCredential.user;
//       const token = await user?.getIdToken();

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
//         {
//           token,
//           password: userDetails.password,
//         }
//       );
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className={`nc-PageLogin`}>
  
//       <div className="container mb-24 lg:mb-32">
//         <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
//           Login
//         </h2>
//         <div className="max-w-md mx-auto space-y-6">
//           <div className="grid gap-3">
//             <button
//               className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
//               onClick={() => googleLogin()}
//               disabled={googleLoggining}
//             >
//               <Image
//                 className="flex-shrink-0"
//                 src={googleSvg}
//                 alt="Continue with Google"
//               />
//               <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
//                 {googleLoggining ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-4 h-4 border-t-2 border-r-2 border-gray-900 rounded-full animate-spin"></div>
//                   </div>
//                 ) : (
//                   "Continue with Google"
//                 )}
//               </h3>
//             </button>
//             <button
//               className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
//               onClick={() => facebookLogin()}
//               disabled={facebookLoading}
//             >
//               <Image
//                 className="flex-shrink-0"
//                 src={facebookSvg}
//                 alt="Continue with Facebook"
//               />
//               <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
//                 {facebookLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-4 h-4 border-t-2 border-r-2 border-gray-900 rounded-full animate-spin"></div>
//                   </div>
//                 ) : (
//                   "Continue with Facebook"
//                 )}
//               </h3>
//             </button>
//             <button
//               className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
//               onClick={() => appleLogin()}
//               disabled={appleLoading}
//             >
//               <Image
//                 className="flex-shrink-0"
//                 src={twitterSvg}
//                 alt="Continue with Apple"
//               />
//               <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
//                 {appleLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-4 h-4 border-t-2 border-r-2 border-gray-900 rounded-full animate-spin"></div>
//                   </div>
//                 ) : (
//                   "Continue with Apple"
//                 )}
//               </h3>
//             </button>
//           </div>
//           {/* OR */}
//           <div className="relative text-center">
//             <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
//               OR
//             </span>
//             <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
//           </div>
//           {/* FORM */}
//           <form
//             className="grid grid-cols-1 gap-6"
//             onSubmit={loginUser}
//             method="post"
//           >
//             <label className="block">
//               <span className="text-neutral-800 dark:text-neutral-200">
//                 Email address
//               </span>
//               <Input
//                 type="email"
//                 onChange={(e) =>
//                   setUserDetails({ ...userDetails, email: e.target.value })
//                 }
//                 value={userDetails.email}
//                 placeholder="example@example.com"
//                 className="mt-1"
//               />
//             </label>
//             <label className="block">
//               <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//                 Password
//                 <Link
//                   href="/auth/login"
//                   className="text-sm underline font-medium"
//                 >
//                   Forgot password?
//                 </Link>
//               </span>
//               <Input
//                 type="password"
//                 className="mt-1"
//                 onChange={(e) =>
//                   setUserDetails({ ...userDetails, password: e.target.value })
//                 }
//                 value={userDetails.password}
//               />
//             </label>
//             <ButtonPrimary type="submit">Continue</ButtonPrimary>
//           </form>

//           {/* ==== */}
//           <span className="block text-center text-neutral-700 dark:text-neutral-300">
//             New user? {` `}
//             <Link href="/auth/signup" className="font-semibold underline">
//               Create an account
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageLogin;
"use client"
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/navbar/Logo";
import styles from "@/styles/login.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import Input from "@/UI/Input/Input";
// import { useRouter } from "next/router";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import OvalSpinner from "@/UI/Spinner/OvalSpinner";
import { useToast } from "@/hooks/useToast";
import { useGoogleLogin } from "@/hooks/providers/useGoogleLogin";
import { useFacebookLogin } from "@/hooks/providers/useFacebookLogin";
import { FaFacebook } from "react-icons/fa";
import { useAppleLogin } from "@/hooks/providers/useAppleLogin";

type LoginUser = {
  mobile?: string;
  password: string;
  email?: string;
  rememberMe: boolean;
};

export default function Login() {
  const [authMethod, setAuthMethod] = useState("custom_phone");
  const { toast, sendSuccessToast, sendErrorToast } = useToast();
  const {
    googleLogin,
    googleToast,
    isLoading: googleLoggining,
  } = useGoogleLogin();
  const {
    facebookLogin,
    facebookToast,
    isLoading: facebookLoading,
  } = useFacebookLogin();

  const { appleLogin, appleToast, isLoading: appleLoading } = useAppleLogin();

  // const router = useRouter();

  const [loginUser, setLoginUser] = useState<LoginUser>({
    mobile: "",
    password: "",
    email: "",
    rememberMe: false,
  });

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (formData: LoginUser) =>
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          ...formData,
          method: authMethod,
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      if (data.status) {
        sendSuccessToast("Logged in", "You are logged in");
        localStorage.setItem("auth-token", data.data.token);
        localStorage.setItem("user_id", data.data.id);
        localStorage.setItem("user_info", JSON.stringify(data.data));
        setTimeout(() => {
          // router.push("/");
        }, 1000);
      }
    },
    onError: (error: any) => {
      sendErrorToast("Error", error.response.data.data.error);
    },
  });

  const checkDisabled = (user: LoginUser) => {
    if (isLoading) return true;
    if (authMethod === "custom_phone") {
      const newObj = { ...user };
      delete newObj.email;
      return Object.values(newObj).some(
        (val) => val === "" || val === undefined
      );
    } else {
      const newObj = { ...user };
      delete newObj.mobile;
      return Object.values(newObj).some((val) => val === "");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginUser);
  };

  return (
    <div>
      <Head>
        <title>Totel - Login</title>
      </Head>
      <div className="flex  justify-center md:items-start items-center flex-col md:flex-row md:p-0 px-5  w-1512 h-1117.09 ">
        <div className={styles.left}>
          <div className={styles.lefttext1}>
            Shared living space,
            <br /> find places and Join
            <br /> with them today.
          </div>
          <div className={styles.lefttext2}>
            What fun could we have more than having roommate
            <br /> with similar interest. You can find places and stay
            <br /> with hotels and home-stays ranked by travellers.
          </div>
        </div>
        <div className={styles.card}>
          <div className="flex flex-col justify-center bg-gray-100 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <div className="align-middle sm:mx-auto sm:w-full sm:max-w-md ">
                      <div className="">
                        <Logo />
                      </div>

                      <div>
                        <h2 className="mt-6 text-2xl font-bold text-gray-900">
                          Welcome Back!
                        </h2>

                        <div className="flex gap-1 mb-3 text-sm">
                          <div>Dont have an account?</div>
                          <Link
                            href="/auth/signup"
                            className="ml-2 text-purple"
                          >
                            Create one
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {authMethod === "custom_phone" ? (
                        <div className="flex flex-col gap-2">
                          <label className="text-xs">Phone Number</label>
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={loginUser.mobile as string}
                            onChange={(e) =>
                              setLoginUser({
                                ...loginUser,
                                mobile: e as string,
                              })
                            }
                          />
                        </div>
                      ) : (
                        <Input
                          id="email"
                          name="Email"
                          onChange={(e) =>
                            setLoginUser({
                              ...loginUser,
                              email: e.target.value,
                            })
                          }
                          type="text"
                          value={loginUser.email as string}
                          placeholder="Enter your email address"
                        />
                      )}
                      <div className="mt-1">
                        <Input
                          id="password"
                          name="Password"
                          onChange={(e) =>
                            setLoginUser({
                              ...loginUser,
                              password: e.target.value,
                            })
                          }
                          type="password"
                          value={loginUser.password}
                          placeholder="********"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={loginUser.rememberMe}
                        onChange={(e) =>
                          setLoginUser({
                            ...loginUser,
                            rememberMe: e.target.checked,
                          })
                        }
                      />
                      <label className="block ml-2 text-xs text-gray-900">
                        Keep me logged in
                      </label>
                    </div>

                    <div className="ml-2 cursor-pointer text-xs">
                      <p
                        className="font-medium text-purple-600 hover:text-purple-500"
                        onClick={() => {}} // router.push("/auth/forgot")
                      >
                        Forgot your password?
                      </p>
                    </div>
                  </div>
                  {/* Other Auth Methods */}
                  <div>
                    <button
                      type="submit"
                      className="auth-button bg-purple disabled:bg-gray-50/30"
                      disabled={checkDisabled(loginUser)}
                    >
                      {isLoading ? (
                        <div className="space-x-2 flex items-center">
                          <OvalSpinner
                            color="#fff"
                            height={20}
                            width={30}
                            visible={isLoading}
                          />
                          <p className="font-semibold">Please wait...</p>
                        </div>
                      ) : (
                        "Continue"
                      )}
                    </button>

                    {authMethod === "custom_phone" ? (
                      <h5
                        className="text-center text-purple mt-3 text-[0.9rem] cursor-pointer"
                        onClick={() => setAuthMethod("custom_email")}
                      >
                        Login with Email
                      </h5>
                    ) : (
                      <h5
                        className="text-center text-purple mt-3 text-[0.9rem] cursor-pointer"
                        onClick={() => setAuthMethod("custom_phone")}
                      >
                        Login with Phone
                      </h5>
                    )}

                    <h5 className="flex justify-center my-3">or</h5>
                    <div className="space-y-5">
                      <button
                        type="button"
                        disabled={googleLoggining}
                        onClick={() => googleLogin()}
                        className="auth-button text-black bg-white"
                      >
                        <div className={styles.apple}>
                          <FcGoogle size={25} />
                          <h6>
                            {googleLoggining
                              ? "Logging in..."
                              : "Continue with Google"}
                          </h6>
                        </div>
                      </button>
                      <button
                        type="button"
                        disabled={facebookLoading}
                        onClick={() => facebookLogin()}
                        className="auth-button bg-[#0C86EF]"
                      >
                        <div className={styles.apple}>
                          <FaFacebook size={25} />
                          <h6>
                            {facebookLoading
                              ? "Logging in..."
                              : "Continue with Facebook"}
                          </h6>
                        </div>
                      </button>

                      <button
                        type="button"
                        disabled={appleLoading}
                        onClick={() => appleLogin()}
                        className="auth-button bg-black"
                      >
                        <div className={styles.apple}>
                          <AiFillApple size={25} />
                          <h6>
                            {appleLoading
                              ? "Logging in..."
                              : "Continue with Apple"}
                          </h6>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Toast ref={toast} />
          <Toast ref={googleToast} />
          <Toast ref={facebookToast} />
          <Toast ref={appleToast} />
        </div>
      </div>
    </div>
  );
}
