/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Cookies from "universal-cookie";
import { maritalOptions } from "../../Components/MaritalOptions";
import { bloodOptions } from "../../Components/BloodGroup";
import { educationOptions } from "../../Components/EducationOptions";
import { professionOptions } from "../../Components/Occupations";
import { countryOptions } from "../../Components/Countries";
import { useQuery } from "@tanstack/react-query";

const MembershipForm = () => {
  const [nextState, setNextState] = useState("basic");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userEmail = cookies.get("email");

  const { data: userData = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user"
      );
      const data = await res.json();
      return data.message;
    },
  });
  // console.log(userData);

  // let user = userData?.filter((usr) => usr?.email === userEmail);
  // console.log(user[0]);
  let user = [];
  if (Array.isArray(userData)) {
    user = userData.filter((usr) => usr?.email === userEmail);
  } else {
    console.error("userData is not an array:", userData);
  }
  const onSubmit = (data) => {
    // console.log(data);
    // console.log(user[0]?.email);
    reset();
    fetch(
      `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/profile/update/${userEmail}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("update successful");
        }
        navigate(`/`);
        navigate(`/profile`);
        refetch();
      });
  };

  const convertToFeetAndInches = (heightCm) => {
    const feet = Math.floor(heightCm / 30.48); // Convert cm to feet
    const inches = Math.round((heightCm / 2.54) % 12); // Convert cm to inches
    return `${heightCm} cm / ${feet}'${inches}"`;
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
        <h1 className="text-2xl font-bold sm:text-3xl">
          Submit Your Information
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        {/* sign form  */}

        {/* basic  */}
        <div>
          {nextState === "basic" && (
            <>
              <div className="divider divide-green-600 font-bold  text-2xl">
                <h1>Basic Information</h1>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  You're
                </label>
                <select
                  {...register("looking")}
                  defaultValue={user[0]?.looking}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Profile Created by
                </label>
                <select
                  {...register("createdBy")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user[0]?.createdBy || ""}>
                    {user[0]?.createdBy || "Select"}
                  </option>
                  <option value="Self">Self</option>
                  <option value="Parent/Guardian">Parent/Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  National ID/Passport No.
                </label>
                <input
                  type="text"
                  defaultValue={user[0]?.nationalId}
                  placeholder="Enter Your NID or Passport no."
                  {...register("nationalId")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                ></input>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Marital Status
                </label>
                <select
                  {...register("mairtalStatus")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user[0]?.mairtalStatus || ""}>
                    {user[0]?.mairtalStatus || "Select"}
                  </option>
                  {maritalOptions}
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Have Children
                </label>
                <select
                  {...register("haveChildren")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user[0]?.haveChildren || ""}>
                    {user[0]?.haveChildren || "Select"}
                  </option>
                  <option value="no">No</option>
                  <option value="yes/livingTogether">
                    Yes/Living together{" "}
                  </option>
                  <option value="yes/NotLivingTogether">
                    Yes/Not Living together{" "}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Height
                </label>
                <div className="flex gap-3">
                  <select
                    {...register("height")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  >
                    <option value={user[0]?.height || ""}>
                      {user[0]?.height
                        ? convertToFeetAndInches(user?.height)
                        : "Select"}
                    </option>
                    {heightOption}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">Age</label>

                <select
                  {...register("age")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user?.age ? user[0]?.age : ""}>
                    {user?.age ? user[0]?.age : "Select"}
                  </option>
                  {ageOptions}
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Body Type
                </label>
                <select
                  {...register("bodyType")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user?.bodyType ? user[0]?.bodyType : ""}>
                    {user?.bodyType ? user[0]?.bodyType : "Select"}
                  </option>
                  <option value="Average">Average</option>
                  <option value="Slim">Slim</option>
                  <option value="Athletic">Athletic</option>
                  <option value="Heavy">Heavy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Complexion
                </label>
                <select
                  {...register("complexion")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user?.complexion ? user[0]?.complexion : ""}>
                    {user?.complexion ? user[0]?.complexion : "Select"}
                  </option>
                  <option value="Fair">Fair</option>
                  <option value="Very Fair">Very Fair</option>
                  <option value="Wheatish">Wheatish</option>
                  <option value="Wheatish Medium">Wheatish Medium</option>
                  <option value="Wheatish Brown">Wheatish Brown</option>
                  <option value="Dark">Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Blood Group
                </label>
                <div className="flex gap-3">
                  <select
                    {...register("bloodGroup")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  >
                    <option value={user?.bloodGroup ? user[0]?.bloodGroup : ""}>
                      {user?.bloodGroup ? user[0]?.bloodGroup : "Select"}
                    </option>
                    <option value=" ">Select</option>
                    {bloodOptions}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center mt-4 gap-8">
                <div>
                  <button
                    onClick={() => setNextState("religion")}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* religion  */}

        <div>
          {nextState === "religion" && (
            <>
              <div className=" divider divide-green-600 font-bold  sm:text-md md:text-2xl lg:text-2xl">
                <h1 className=" ">Community & Religion Information</h1>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Religion
                </label>
                <select
                  {...register("religion")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user[0]?.religion ? user[0]?.religion : ""}>
                    {user[0]?.religion ? user[0]?.religion : "Select"}
                  </option>
                  <option value="Muslim">Muslim</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Christian">Christian</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Wheatish Brown">Wheatish Brown</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Mother Tounge
                </label>
                <select
                  {...register("motherTounge")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option
                    value={user[0]?.motherTounge ? user[0]?.motherTounge : ""}
                  >
                    {user[0]?.motherTounge ? user[0]?.motherTounge : "Select"}
                  </option>
                  <option value="Bengali">Bengali</option>
                  <option value="English">English</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Family Values
                </label>
                <select
                  {...register("familyValues")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option
                    value={user[0]?.familyValues ? user[0]?.familyValues : ""}
                  >
                    {user[0]?.familyValues ? user[0]?.familyValues : "Select"}
                  </option>
                  <option value="Religious">Religious</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Liberal">Liberal</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex items-center justify-center mt-4 gap-8">
                <div>
                  <button
                    onClick={() => setNextState("basic")}
                    className="btn btn-primary"
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setNextState("family")}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* family  */}

        <div>
          {nextState === "family" && (
            <>
              <div className="divider divide-green-600 font-bold text-2xl">
                <h1>Family Information</h1>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Father
                </label>
                <select
                  {...register("fatherOccupation")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option
                    value={
                      user[0]?.fatherOccupation ? user[0]?.fatherOccupation : ""
                    }
                  >
                    {user[0]?.fatherOccupation
                      ? user[0]?.fatherOccupation
                      : "Select"}
                  </option>
                  <option value="Retired">Retired</option>
                  <option value="Business">Business</option>
                  <option value="Professional">Professional</option>
                  <option value="Employed">Employed</option>
                  <option value="Not Employed">Not Employed</option>
                  <option value="Passed Away">Passed Away</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Mother
                </label>
                <select
                  {...register("motherOccupation")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option
                    value={
                      user[0]?.motherOccupation ? user[0]?.motherOccupation : ""
                    }
                  >
                    {user[0]?.motherOccupation
                      ? user[0]?.motherOccupation
                      : "Select"}
                  </option>
                  <option value="Homemaker">Homemaker</option>
                  <option value="Employed">Employed</option>
                  <option value="Business">Business</option>
                  <option value="Professional">Professional</option>
                  <option value="Not Employed">Not Employed</option>
                  <option value="Passed Away">Passed Away</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Brother(s)
                </label>
                <div className="flex gap-3">
                  <select
                    {...register("brother")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  >
                    <option value={user[0]?.brother ? user[0]?.brother : ""}>
                      {user[0]?.brother ? user[0]?.brother : "Select"}
                    </option>
                    {broSisOptions}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-black my-2 font-bold">
                  Sister(s)
                </label>
                <div className="flex gap-3">
                  <select
                    {...register("sister")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  >
                    <option value={user[0]?.sister ? user[0]?.sister : ""}>
                      {user[0]?.sister ? user[0]?.sister : "Select"}
                    </option>
                    {broSisOptions}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center mt-4 gap-8">
                <div>
                  <button
                    onClick={() => setNextState("religion")}
                    className="btn btn-primary"
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setNextState("education")}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* education  */}

        <div>
          {nextState === "education" && (
            <>
              <div className="divider divide-green-600 font-bold text-2xl">
                <h1>Education & Occupation</h1>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Education
                </label>
                <div className="flex gap-3">
                  <select
                    {...register("education")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  >
                    <option
                      value={user[0]?.education ? user[0]?.education : ""}
                    >
                      {user[0]?.education ? user[0]?.education : "Select"}
                    </option>
                    {educationOptions}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  College/University Name
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    defaultValue={user[0]?.institute}
                    placeholder="Enter Your College/University Name"
                    {...register("institute")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  ></input>
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Profession
                </label>
                <div className="flex gap-3">
                  <select
                    {...register("profession")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  >
                    <option
                      value={user[0]?.profession ? user[0]?.profession : ""}
                    >
                      {user[0]?.profession ? user[0]?.profession : "Select"}
                    </option>
                    {professionOptions}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Designation
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    defaultValue={user[0]?.designation}
                    placeholder="Write your Designation"
                    {...register("designation")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  ></input>
                </div>
              </div>

              <div className="flex items-center justify-center mt-4 gap-8">
                <div>
                  <button
                    onClick={() => setNextState("family")}
                    className="btn btn-primary"
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setNextState("address")}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* address  */}

        <div>
          {nextState === "address" && (
            <>
              <div className="divider divide-green-600 font-bold text-2xl">
                <h1>Address in Bangladesh</h1>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Current Living Country
                </label>
                <div className="flex gap-3">
                  <select
                    {...register("currentCountry")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  >
                    <option
                      value={
                        user[0]?.currentCountry ? user[0]?.currentCountry : ""
                      }
                    >
                      {user[0]?.currentCountry
                        ? user[0]?.currentCountry
                        : "Select"}
                    </option>
                    {countryOptions}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Current Living City
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    defaultValue={user[0]?.currentCity}
                    placeholder="Enter your Living city"
                    {...register("currentCity")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  ></input>
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Current Living Area
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    defaultValue={user[0]?.currentArea}
                    placeholder="Enter your Living area"
                    {...register("currentArea")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  ></input>
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Residential Status
                </label>
                <select
                  {...register("residentialStatus")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option
                    value={
                      user[0]?.residentialStatus
                        ? user[0]?.residentialStatus
                        : ""
                    }
                  >
                    {user[0]?.residentialStatus
                      ? user[0]?.residentialStatus
                      : "Select"}
                  </option>
                  <option value="Rental">Rental</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Home Country
                </label>
                <div className="flex gap-3">
                  <select
                    {...register("homeCountry")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  >
                    <option
                      value={user[0]?.homeCountry ? user[0]?.homeCountry : ""}
                    >
                      {user[0]?.homeCountry ? user[0]?.homeCountry : "Select"}
                    </option>
                    {countryOptions}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  Home District
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    defaultValue={user[0]?.district}
                    placeholder="Enter your home district name"
                    {...register("district")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  ></input>
                </div>
              </div>

              <div className="flex justify-center mt-4 gap-5">
                <div className="">
                  <button
                    onClick={() => setNextState("education")}
                    className="btn btn-primary"
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setNextState("self")}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* self  */}

        <div>
          {nextState === "self" && (
            <>
              <div className="divider divide-green-600 font-bold  text-2xl">
                <h1>Your Details</h1>
              </div>

              <div>
                <label className="block text-black my-2 font-bold">
                  About Yourself
                </label>
                <div className="flex gap-3">
                  <textarea
                    type="text"
                    defaultValue={user[0]?.myself}
                    placeholder="Details about yourself"
                    {...register("myself")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  ></textarea>
                </div>
              </div>
              <div>
                <label className="block text-black my-2 font-bold">
                  Write About Your Family
                </label>
                <div className="flex gap-3">
                  <textarea
                    type="text"
                    defaultValue={user[0]?.myfamily}
                    placeholder="Details about your family"
                    {...register("myfamily")}
                    className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  ></textarea>
                </div>
              </div>

              {/* submit button  */}

              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={() => setNextState("address")}
                  className="inline-block rounded-lg btn-primary mr-10 px-5 py-3 text-sm font-medium text-white hover:bg-sky-400 hover:text-black duration-150"
                >
                  Back
                </button>
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

export default MembershipForm;
