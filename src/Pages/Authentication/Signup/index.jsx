/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { maritalOptions } from "../../../Components/MaritalOptions";
import { bloodOptions } from "../../../Components/BloodGroup";
import { educationOptions } from "../../../Components/EducationOptions";
import { professionOptions } from "../../../Components/Occupations";
import { countryOptions } from "../../../Components/Countries";
import { useState } from "react";
import Cookies from "universal-cookie";

const Signup = () => {
  const imgHostKey = "2c087bcd54b283072bf4f7216761240d";
  const [nextState, setNextState] = useState("sign");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const cookies = new Cookies();

  let dataType = "";
  if (visible) {
    dataType = "text";
  } else {
    dataType = "password";
  }

  // console.log(imgHostKey);
  const onSubmit = async (data) => {
    // data.age = parseInt(data.age);
    const img = data.photo[0];
    const formData = new FormData();

    // when use multer for upload
    // formData.append("userImage", img);
    // or  use imgbb
    formData.append("image", img);
    // setLoading(true);
    setNextState(" ");
    // console.log(img);

    // for multer router use this route
    // const url = `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/img/upload`;

    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        // console.log(imgData);
        if (imgData.success) {
          data.photo = imgData.data.url;
        }
        setLoading(true);
        setNextState(" ");
        fetch(
          "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/signup",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            // console.log(result);
            if (result.status === "success") {
              // toast.success("Sign in Successful.");
              cookies.set("email", result?.data.email, { path: "/" });
              cookies.set("name", result?.data.name, { path: "/" });
              localStorage.setItem("photo", result?.data.photo);
            } else {
              setLoading(false);
            }
          });
        fetch(
          "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/userData/create",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            // console.log(result);
            if (result.status === "success") {
              toast.success("Sign in Successful.");
              cookies.set("email", result?.data.email, { path: "/" });
              cookies.set("name", result?.data.name, { path: "/" });
              cookies.set("role", result?.data.role, { path: "/" });

              localStorage.setItem("photo", result?.data.photo);

              navigate(`/membershipForm`);
              setNextState("basic");
              setLoading(false);
            } else {
              toast.error(result.message);
              setLoading(false);
            }
          });
      });
  };
  const heightOption = [];

  // height
  for (let cm = 122; cm <= 241; cm++) {
    const feet = Math.floor(cm / 30.48); // Convert cm to feet
    const inches = Math.round((cm / 2.54) % 12); // Convert cm to inches
    const displayText = `${cm} cm / ${feet}'${inches}"`;

    heightOption.push(
      <option key={cm} value={cm}>
        {displayText}
      </option>
    );
  }

  const startValue = 18;
  const endValue = 80;
  const ageOptions = [];

  // Use a for loop to generate options
  for (let i = startValue; i <= endValue; i++) {
    ageOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const broSisOptions = [];

  // Use a for loop to generate options
  for (let i = 1; i <= 10; i++) {
    broSisOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <Toaster></Toaster>
      {loading && (
        <div className="text-center mt-96 text-green-600">
          <span className="loading loading-dots loading-lg text-center"></span>
        </div>
      )}

      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create Your Account</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipar/form-data"
        action=""
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        {/* sign form  */}
        <div>
          {nextState === "sign" && (
            <>
              <div>
                <label className="block text-black my-2 font-bold">
                  Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("name", { required: true })}
                    className="w-full border  px-2 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Phone <span className="text-red-600">*</span>
                  <span className="text-xs">(min 11 digit)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    {...register("phone", { required: true })}
                    className="w-full border  px-2 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Email <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    {...register("email", { required: true })}
                    className="w-full border  px-2 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={dataType}
                    placeholder="Set Your Password"
                    {...register("password", { required: true })}
                    className="w-full border  px-2 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
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
              </div>
              <div>
                <label className="block text-black my-2 font-bold">
                  Photo <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    // accept="image/*"
                    placeholder="Set Your Password"
                    {...register("photo", { required: true })}
                    className="w-full border  px-2 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Already have an account?
                <Link to="/login">
                  <a className="underline ml-2 text-blue-900" href="">
                    Log in
                  </a>
                </Link>
              </p>

              <div className="flex items-center justify-center mt-4 gap-8">
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-900 duration-150"
                >
                  Create
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
