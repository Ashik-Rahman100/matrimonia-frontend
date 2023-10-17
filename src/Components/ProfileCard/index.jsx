/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import pic from "../../assets/wedding.jpg";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { packageCheck } from "../../Utils/purchesTimeCheck";

// data from ProfileCard.jsx
const ProfileCard = ({ data, userEmail }) => {
  const navigate = useNavigate();
  // console.log("data:", data.purchesPackage.purchaseLastTime);
  const {
    photo,
    name,
    myself,
    age,
    religion,
    education,
    _id,
    designation,
    currentCity,
  } = data;

  const checkView = async () => {
    if (userEmail === undefined) {
      // console.log("Click Slide login");
      toast.error("Please login First");
      return;
    }

    let checkProfle = await packageCheck("profile", _id);
    console.log(checkProfle);

    if (checkProfle) {
      navigate(`/userDetails/${_id}`);
    } else {
      toast.error("Please check your package");
    }
  };

  return (
    <div className="card card-compact w-64 shadow-[rgba(0,_0,_0,_0.3)_5px_15px_20px] md:mx-4 mx-6 sm:px-2 mt-9 mb-14  py-3">
      <figure>
        <PhotoProvider>
          <PhotoView src={photo ? photo : pic}>
            <img
              src={photo ? photo : pic}
              alt="Shoes"
              className="h-40 object-fill w-40 rounded-full border border-blue-400 "
            />
          </PhotoView>
        </PhotoProvider>
      </figure>

      <div
        className="pl-2 text-center cursor-pointer"
        onClick={() => checkView()}
      >
        <h2 className=" font-bold mt-2 text-xl w-[80%] mx-auto">
          {userEmail ? (
            <span className=" font-bold mt-2 text-xl w-[80%] mx-auto">
              {" "}
              {name}{" "}
            </span>
          ) : (
            <span className="text-red-500 text-lg">Name: Login First </span>
          )}
        </h2>
        <h2 className="text-xs mb-2 w-[80%] mx-auto">{designation}</h2>
        <div className="overflow-x-auto">
          <table className="table leading-[3px]">
            <tbody>
              {" "}
              <td>Current City</td>
              <td className="font-bold"> {currentCity}</td>
            </tbody>
            <tbody>
              <td>Religion</td>
              <td className="font-bold"> {religion}</td>
            </tbody>

            <tbody>
              <td>Education</td>
              <td className="font-bold"> {education}</td>
            </tbody>
            <tbody>
              {" "}
              <td>Age</td>
              <td className="font-bold"> {age}</td>
            </tbody>
          </table>
        </div>

        {/* <div className="card-actions justify-center my-3 pt-4">
            <Link to={`/userDetails/${_id}`}>
              <button className="btn btn-primary btn-xs btn-outline">
                Details
              </button>
            </Link>
          </div> */}
      </div>
    </div>
  );
};

export default ProfileCard;
