/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../../Shared/Loading";
import login from "../../../assets/login.png";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const photo = localStorage.getItem("photo");

  let dataType = "";
  if (visible) {
    dataType = "text";
  } else {
    dataType = "password";
  }
  const onSubmit = async (data) => {
    // console.log(data);

    setLoading(true);
    fetch("https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "success") {
          toast.success("Log in Successful.");
          cookies.set("email", data?.data.email, { path: "/" });
          cookies.set("name", data?.data.name, { path: "/" });
          cookies.set("role", data?.data.role, { path: "/" });

          localStorage.setItem("photo", data?.data.photo);
          reset();

          setLoading(false);
          navigate("/");
        } else {
          setLoading(false);
          setErrorMsg(data.message);
        }
      });
  };
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center min-h-screen">
      <Toaster></Toaster>

      {loading && (
        <div className="text-center ml-[50%]">
          {" "}
          <Loading></Loading>
        </div>
      )}

      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Log in</h1>
          <div className="my-4 ">
            <select className="select select-bordered w-full max-w-xs px-4 py-3">
              <option disabled selected>
                Demo User
              </option>
              <option>Admin: admin@gmail.com pass: 123456</option>
              <option>User: mosh@gmail.com pass: 123456</option>
            </select>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
                className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={dataType}
                placeholder="Enter Your Password"
                {...register("password", { required: true })}
                className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              />
              {/* className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" */}

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <button onClick={() => setVisible(!visible)} type="button">
                  {visible ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </span>
            </div>
            {errorMsg && (
              <p className=" mt-3 text-red-500    p-3">{errorMsg + "!!"}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Don't have an account?
              <Link to="/signup">
                <a className="underline ml-2 text-blue-900" href="">
                  Sign up
                </a>
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-900 duration-150"
            >
              Log in
            </button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full object-cover sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src={login}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Login;
