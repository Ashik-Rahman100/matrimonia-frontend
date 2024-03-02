/* eslint-disable no-unused-vars */
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

/* eslint-disable react/prop-types */
const PackageCard = ({ pack, id }) => {
  const cookies = new Cookies();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  // console.log(pack.title);

  const userRole = cookies.get("role");
  const userEmail = cookies.get("email");

  const onSubmit = (data) => {
    let startMiliSecond = Date.now();
    document.getElementById(id).close();

    let packageTime;
    if (pack.title === "Silver") {
      packageTime = 30;
    } else if (pack.title === "Gold") {
      packageTime = 60;
    } else if (pack.title === "Diamond") {
      packageTime = 90;
    } else {
      packageTime = 15;
    }

    let lastMiliSecond = startMiliSecond + packageTime * 24 * 60 * 60 * 1000;

    let purchesPackage = {
      ...pack,

      status: "pending",
      receivedNumber: data.receivedNumber,
      transactionId: data.transactionNumber,
      purchaseLastTime: lastMiliSecond,
    };

    fetch(
      `https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/profile/update/${userEmail}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purchesPackage }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Package Purches Successfull");
        alert("payment successfully done.")

        // console.log(data);
      });

    // reset();
  };
  const validatePhoneNumber = (value) => {
    if (value.length < 11) {
      return "Minimum 11 digits required";
    }
    return true;
  };

  return (
    <div className="flex justify-center w-full  h-96">
      <Toaster />
      <div
        className={`flex flex-col  space-y-6 rounded shadow  p-4 text-black  
        ${
          pack.title === "Free" &&
          "border-2 rounded-2xl border-indigo-500/100 "
        } 
        ${
          pack.title === "Silver" &&
          ""
          // "flex justify-center flex-col space-y-6 rounded shadow  bg-gradient-to-b from-sky-400 to-blue-400  text-gray-900"
        } 
        ${
          pack.title === "Gold" &&
          ""
          // "  space-y-6 rounded shadow  bg-gradient-to-b from-green-600 via-green-300 to-blue-500"
        }
        ${
          pack.title === "Diamond" &&
          ""
          // "flex justify-center flex-col space-y-6 rounded shadow  bg-gradient-to-b from-sky-400 to-blue-400  text-gray-900"
        }`}
      >
        <div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">{pack.title}</h4>
            <span className="text-4xl font-bold">{pack.price} Tk</span>
            {pack.title === "Free" ? (
              <span className="text-xl  font-semibold ml-2"> for 15 Days</span>
            ) : (
              ""
            )}
            {pack.title === "Silver" ? (
              <span className="text-xl font-semibold ml-2"> for 30 Days</span>
            ) : (
              ""
            )}
            {pack.title === "Gold" ? (
              <span className="text-xl font-semibold ml-2"> for 60 Days</span>
            ) : (
              ""
            )}
            {pack.title === "Diamond" ? (
              <span className="text-xl font-semibold ml-2"> for 90 Days</span>
            ) : (
              ""
            )}
          </div>
          <p className="mt-3 leadi text-black  ">{pack.detail}</p>
        </div>
        <ul className="flex-1 mb-6 text-black space-y-2">
          {pack.condition.map((cond, item) => (
            <li
              key={item}
              className={`flex mb-2 
              ${pack.title === "Free" && "flex mb-2 space-x-2 "} 
              ${pack.title === "Silver" && "flex mb-2 space-x-2 "} 
              ${pack.title === "Gold" && "flex mb-2 space-x-2 "}
              ${pack.title === "Diamond" && "flex mb-2 space-x-2"} 
            `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-shrink-0 w-6 h-6 text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="grid grid-cols-9 w-full">
                <p className="col-span-6 lg:w-[260px]">{cond.option}</p>
                <p> -- </p>
                <p className="col-span-2 text-rose-800 font-semibold">
                  {cond.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {userRole === "admin" || userRole === "super_admin" || !userRole ? (
          ""
        ) : (
          <button
            onClick={() => document.getElementById(id).showModal()}
            type="button"
            className="inline-block px-5 py-3 font-semibold tracki text-center rounded bg-blue-700 text-white hover:bg-indigo-800"
          >
            Subscribe Now 
          </button>
        )}
        {!userEmail ? (
          <Link
            to="/login"
            onClick={() => document.getElementById(id).showModal()}
            className="inline-block px-5 py-3 font-semibold tracki text-center rounded bg-blue-700 text-white hover:bg-indigo-800"
          >
            Subscribe Now
          </Link>
        ) : (
          ""
        )}

        <dialog id={id} className="modal">
          <div className="modal-box">
            <h3 className="text-2xl font-bold">{pack.title} Package</h3>
            <h3 className=" text-small">
              Pay <span className="text-xl font-bold"> {pack.price} Tk</span>
            </h3>
            <h3 className=" text-small">
              On <span className="font-bold">BKash</span>{" "}
              <span className="font-small text-red-500 underline">
                01836595245
              </span>{" "}
            </h3>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="hidden">
                <label className="block text-black my-3 font-bold">
                  pacakge Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pack.title}
                    {...register("packageName", { required: true })}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>
              <div className="hidden">
                <label className="block text-black my-3 font-bold">
                  pacakge Price <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pack.price}
                    {...register("packagePrice", { required: true })}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black my-3 font-bold">
                  Number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Controller
                    name="receivedNumber"
                    control={control}
                    defaultValue=""
                    rules={{ validate: validatePhoneNumber }}
                    render={({ field }) => (
                      <input
                        type="number"
                        placeholder="Your Bkash Number"
                        {...field}
                        className="w-full border px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                      />
                    )}
                  />
                </div>
                {errors.receivedNumber && (
                  <span className="text-red-600">
                    {errors.receivedNumber.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-black my-3 font-bold">
                  Transaction Number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Bkash Transaction Number"
                    {...register("transactionNumber", { required: true })}
                    className="w-full border  px-2 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-7 my-5">
                <form method="dialog">
                  <button className="btn btn-error text-white">Close</button>
                </form>
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-900 duration-150"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default PackageCard;
