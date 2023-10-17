/* eslint-disable no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

const AddPriviledge = () => {
  const [selectPackage, setSelectPackage] = useState([]);
  const [packageData, setPackageData] = useState(null);
  let num;

  const batchRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: allPakage, refetch } = useQuery({
    queryKey: ["condition"],
    queryFn: async () => {
      const res = await fetch(
        "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/package"
      );
      const data = await res.json();
      return data.message;
    },
  });

  useEffect(() => {
    let title = "Free";

    if (selectPackage) {
      title = selectPackage.title;
    }

    const defaultPackage = allPakage?.find((item) => item.title === title);

    setSelectPackage(defaultPackage);
  }, [allPakage, selectPackage]);

  const handleAddPriviledge = (data) => {
    const title = data.pakageTitle;
    const option = data.priviledgesOption;
    const value = data.priviledgesCount;

    // console.log(option);

    const selectPackage = allPakage.find((item) => item.title === title);

    const previousPackageConditions = selectPackage.condition;

    const remainingPackageConditions = previousPackageConditions.filter(
      (condition) => condition.option !== option
    );

    remainingPackageConditions.push({ option, value });

    // console.log(remainingPackageConditions);

    fetch(
      "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/package",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, condition: remainingPackageConditions }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Privilege added successfully");
        refetch();
        // console.log(data);
      });
  };

  const handleOnchange = (e) => {
    const title = e.target.value;

    const selectPackage = allPakage.find((item) => item.title === title);

    setSelectPackage(selectPackage);
  };

  const handleItemDelete = (i) => {
    let allCondition = selectPackage.condition;
    // console.log(selectPackage);
    // console.log(allCondition);
    // console.log(i);

    allCondition.splice(i, 1);

    console.log(allCondition);

    fetch(
      "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/package",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selectPackage.title,
          condition: allCondition,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Privilege added successfully");
        refetch();
      });
  };

  const startValue = 1;
  const endValue = 30;
  const options = [];

  // Use a for loop to generate options
  for (let i = startValue; i <= endValue; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const priviledgesOption = [
    "Visit Profiles",
    "Send Proposal Message.",
    "Top Position in search results.",
    "Enhanced support by our support team.",
    "Paid membership logo that shows your seriousness.",
    "Click here to see the Membership Level Comparison Chart",
  ];

  const packageName = ["Free", "Silver", "Gold", "Diamond"];

  return (
    <div className="md:w-5/6 mx-auto p-7">
      <Toaster />
      <h2 className="text-5xl font-bold mb-10">Add Priviledges</h2>
      <form
        onSubmit={handleSubmit(handleAddPriviledge)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
      >
        <div className="form-control col-span-2">
          <label className="label">
            <span className="label-text">Package Title</span>
          </label>
          <select
            className="select w-full focus:outline-0 focus:border-blue-500 border-gray-400 text-black "
            {...register("pakageTitle")}
            onChange={handleOnchange}
          >
            {packageName.map((pkg) => (
              <option key={pkg} value={pkg} className="text-black  ">
                {pkg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Priviledges Option</span>
          </label>
          <select
            className="select w-full focus:outline-0 focus:border-blue-500 border-gray-400 text-black "
            {...register("priviledgesOption")}
          >
            {priviledgesOption.map((priOption) => (
              <option
                key={priOption}
                value={priOption}
                className="text-black  "
              >
                {priOption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Priviledges Count</span>
          </label>
          <select
            className="input-bordered   select   w-full focus:outline-0 focus:border-blue-500"
            {...register("priviledgesCount", {
              required: "Priviledges Count is required",
            })}
          >
            <option value={"yes"}>Yes</option>
            {options}
          </select>
        </div>

        <input
          type="submit"
          className="  col-span-2 mt-2 btn bg-sky-600 hover:bg-sky-900  text-white"
          value=" Add Package"
        />
      </form>
      {/* Display the fetched packageData */}
      {selectPackage && (
        <div className="text-center my-9">
          <h2 className="text-2xl font-bold mb-5">
            {selectPackage?.title} Condition:
          </h2>
          <div>
            <table className="text-lg font-bold table">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Conditions</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              {selectPackage?.condition?.map((data, i) => (
                <tbody key={i}>
                  <tr className="hover:bg-gray-300  duration-200">
                    <th>{i + 1} </th>
                    <td>{data.option}</td>
                    <td>{data.value}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleItemDelete(i)}
                        className="btn  btn-error btn-sm"
                      >
                        Delete
                      </button>{" "}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPriviledge;
