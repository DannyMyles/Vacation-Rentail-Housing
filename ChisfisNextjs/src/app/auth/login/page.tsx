"use client"

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/navbar/Logo";
import styles from "@/styles/login.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import Input from "@/UI/Input/Input";
import { useRouter } from "next/navigation";
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

const Login = () => {
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

  const router = useRouter();

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
          router.push("/");
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
                      className="auth-button bg-gray-300 p-4  w-[100%] rounded-full "
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
                        className="text-center  text-blue-800  mt-3 text-[0.9rem] cursor-pointer"
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
                        className="auth-button text-black w-[100%] p-4  bg-red-300 rounded-full"
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
                        className="auth-button bg-[#0C86EF] p-4  w-[100%] rounded-full "
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
                        className="auth-button bg-black text-white p-4  w-[100%] rounded-full "
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

export default Login