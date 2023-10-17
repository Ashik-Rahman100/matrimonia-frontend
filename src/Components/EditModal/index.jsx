/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { maritalOptions } from "../MaritalOptions";
import { bloodOptions } from "../BloodGroup";
import { educationOptions } from "../EducationOptions";
import { professionOptions } from "../Occupations";
import { countryOptions } from "../Countries";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* eslint-disable react/prop-types */
const EditModal = ({ id, user }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Clicked outside of the modal, close the modal
        setIsModalOpen(false);
      }
    };

    // Add the event listener when the modal is open
    if (isModalOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    // Remove the event listener when the modal is closed
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user"
      );
      const data = await res.json();
      return data;
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(user.email);
    reset();
    fetch(
      `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/profile/update/${user?.email}`,
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
        if (data.modifiedCount > 0) {
          toast.success("update successful");
        }
        navigate(`/`);
        navigate(`/profile/${user?.email}`);
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
    isModalOpen && (
      <dialog id={id} className="modal modal-bottom sm:modal-middle ">
        <Toaster></Toaster>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello! {user.name}</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle bg-red-500 mt-4 hover:bg-red-700 text-white absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="mx-auto mb-0 mt-4 max-w-md space-y-4"
          >
            <div>
              <label className="block text-black my-2 font-bold">Name</label>
              <div className="relative">
                <input
                  defaultValue={user.name}
                  type="text"
                  placeholder="Enter Your Name"
                  {...register("name", { required: true })}
                  className="w-full border  px-3 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">Phone</label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue={user.phone}
                  placeholder="Your Phone Number"
                  {...register("phone", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                />
              </div>
            </div>

            <div className="divider divide-green-600 font-bold py-6 text-2xl">
              <h1>Basic Information</h1>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">You're</label>
              <select
                {...register("looking")}
                defaultValue={user.looking}
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
                {...register("createdBy", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.createdBy}>{user.createdBy}</option>
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
                defaultValue={user.nationalId}
                {...register("nationalId")}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              ></input>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">
                Marital Status
              </label>
              <select
                {...register("mairtalStatus", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.mairtalStatus}>{user.mairtalStatus}</option>
                {maritalOptions}
              </select>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">
                Have Children
              </label>
              <select
                {...register("haveChildren", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.haveChildren}>{user.haveChildren}</option>
                <option value="no">No</option>
                <option value="yes/livingTogether">Yes/Living together </option>
                <option value="yes/NotLivingTogether">
                  Yes/Not Living together{" "}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">Height</label>
              <div className="flex gap-3">
                <select
                  {...register("height")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user.height}>
                    {convertToFeetAndInches(user.height)}
                  </option>
                  {heightOption}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">Age</label>

              <select
                {...register("age", { required: true })}
                className="w-full border mt-3 px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.age}>{user.age}</option>
                {ageOptions}
              </select>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">
                Body Type
              </label>
              <select
                {...register("bodyType", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.bodyType}>{user.bodyType}</option>
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
                {...register("complexion", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.complexion}>{user.complexion}</option>
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
                  {...register("bloodGroup", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user.bloodGroup}>{user.bloodGroup}</option>
                  <option value=" ">Select</option>
                  {bloodOptions}
                </select>
              </div>
            </div>

            <div className=" divider divide-green-600 font-bold pb-2 pt-7 sm:text-md md:text-2xl lg:text-2xl">
              <h1 className=" ">Community & Religion Information</h1>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">
                Religion
              </label>
              <select
                {...register("religion", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.religion}>{user.religion}</option>
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
                {...register("motherTounge", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.motherTounge}>{user.motherTounge}</option>
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
                {...register("familyValues", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.familyValues}>{user.familyValues}</option>
                <option value="Religious">Religious</option>
                <option value="Traditional">Traditional</option>
                <option value="Moderate">Moderate</option>
                <option value="Liberal">Liberal</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="divider divide-green-600 font-bold pb-3 pt-5 text-xl">
              <h1>Family Information</h1>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">Father</label>
              <select
                {...register("fatherOccupation")}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.fatherOccupation}>
                  {user.fatherOccupation}
                </option>
                <option value="Retired">Retired</option>
                <option value="Employed">Employed</option>
                <option value="Business">Business</option>
                <option value="Professional">Professional</option>
                <option value="Not Employed">Not Employed</option>
                <option value="Passed Away">Passed Away</option>
              </select>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">Mother</label>
              <select
                {...register("motherOccupation")}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.motherOccupation}>
                  {user.motherOccupation}
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
                  <option value={user.brother}>{user.brother}</option>
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
                  <option value={user.sister}>{user.sister}</option>
                  {broSisOptions}
                </select>
              </div>
            </div>

            <div className="divider divide-green-600 font-bold pt-5 pb-3 text-xl">
              <h1>Education & Occupation</h1>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">
                Education
              </label>
              <div className="flex gap-3">
                <select
                  {...register("education", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user.education}>{user.education}</option>
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
                  defaultValue={user.institute}
                  {...register("institute", { required: true })}
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
                  {...register("profession", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user.profession}>{user.profession}</option>
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
                  defaultValue={user.designation}
                  {...register("designation")}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                ></input>
              </div>
            </div>

            <div className="divider divide-green-600 font-bold pt-4 pb-4 text-xl">
              <h1>Address in Bangladesh</h1>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">
                Current Living Country
              </label>
              <div className="flex gap-3">
                <select
                  {...register("currentCountry", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user.currentCountry}>
                    {user.currentCountry}
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
                  defaultValue={user.currentCity}
                  {...register("currentCity", { required: true })}
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
                  defaultValue={user.currentArea}
                  {...register("currentArea", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                ></input>
              </div>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">
                Residential Status
              </label>
              <select
                {...register("residentialStatus", { required: true })}
                className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              >
                <option value={user.residentialStatus}>
                  {user.residentialStatus}
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
                  {...register("homeCountry", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                >
                  <option value={user.homeCountry}>{user.homeCountry}</option>
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
                  defaultValue={user.district}
                  {...register("district", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                ></input>
              </div>
            </div>

            <div className="divider divide-green-600 font-bold py-8 text-2xl">
              <h1>Your Details</h1>
            </div>

            <div>
              <label className="block text-black my-2 font-bold">
                About Yourself
              </label>
              <div className="flex gap-3">
                <textarea
                  type="text"
                  defaultValue={user.myself}
                  {...register("myself", { required: true })}
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
                  defaultValue={user.myfamily}
                  {...register("myfamily", { required: true })}
                  className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                ></textarea>
              </div>
            </div>

            {/* submit button  */}

            <div className="flex items-center justify-center modal-action gap-8">
              <div>
                <button
                  type="submit"
                  method="dialog"
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-900 duration-150 mt-3 "
                >
                  Update
                </button>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="inline-block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white hover:bg-red-900 duration-150 -mt-7">
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    )
  );
};

export default EditModal;
