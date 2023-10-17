/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useLoaderData, useNavigate } from "react-router-dom";
import img from "../../assets/5.jpg";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { packageCheck, proposalSendCheck } from "../../Utils/purchesTimeCheck";

const UserDetails = () => {
  const [allUser, setAllUser] = useState([]);

  const detail = useLoaderData();
  const cookies = new Cookies();
  const navigate = useNavigate();
  let senderEmail = cookies.get("email");
  let senderName = cookies.get("name");

  const singleUser = allUser.filter((user) => user.email === senderEmail);
  const signleUserId = singleUser.map((user) => user._id);
  const {
    name,
    looking,
    _id,
    age,
    email,
    photo,
    height,
    religion,
    profession,
    designation,
    education,
    institute,
    currentCountry,
    currentCity,
    currentArea,
    mairtalStatus,
    haveChildren,
    bodyType,
    complexion,
    bloodGroup,
    fatherOccupation,
    motherOccupation,
    brother,
    sister,
    myself,
    myfamily,
  } = detail.message;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    let checkProfle = await packageCheck("message");
    console.log(checkProfle);
    if (checkProfle) {
      data.senderId = signleUserId[0];
      // console.log(data);
      fetch(
        `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/proposal/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success("Successfully send");
            reset();
            navigate(`/userDetails/${_id}`);
            document.getElementById("my_modal_3").close();
          } else {
            document.getElementById("my_modal_3").close();
            toast.error("Sorry! Try Again...");
          }
        });
    } else {
      document.getElementById("my_modal_3").close();
      toast.error("Please check your package");
    }
  };

  useEffect(() => {
    fetch(
      "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/"
    )
      .then((res) => res.json())
      .then((data) => setAllUser(data.message));
  }, []);

  const convertToFeetAndInches = (heightCm) => {
    const feet = Math.floor(heightCm / 30.48); // Convert cm to feet
    const inches = Math.round((heightCm / 2.54) % 12); // Convert cm to inches
    return `${heightCm} cm / ${feet}'${inches}"`;
  };

  let gender = " ";
  if (looking === "Men") {
    gender = "Male";
  } else if (looking === "Women") {
    gender = "Female";
  }

  return (
    <div className="card bg-base-100 shadow-xl pt-24">
      <Toaster></Toaster>
      <figure>
        <img src={photo ? photo : img} alt=" Album" className="w-44" />
      </figure>
      <div className="card-body">
        <h3 className="text-center">
          Profile ID{" "}
          <span className=" font-bold text-red-500">{_id.slice(-5)}</span>
        </h3>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Connect
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
          <div>
            <h2 className="text-center text-2xl font-bold underline my-4">
              Personal Information
            </h2>
            <table className="table">
              <tbody>
                <tr className="hover ">
                  <th className="font-normal">Name : </th>
                  <td className=" font-bold">{name}</td>
                </tr>
                <tr className="hover">
                  <th className="font-normal">Age: </th>
                  <td>
                    <span className=" font-bold">{age}</span>
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal">Height: </th>
                  <td>
                    <span className=" font-bold">
                      {convertToFeetAndInches(height)} inch
                    </span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal">Gender: </th>
                  <td>
                    <span className=" font-bold">{gender}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal">Religion: </th>
                  <td>
                    <span className=" font-bold">{religion}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal">Marrital Status: </th>
                  <td>
                    <span className=" font-bold">{mairtalStatus}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal">Have Children: </th>
                  <td>
                    <span className=" font-bold">{haveChildren}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal">Body Type: </th>
                  <td>
                    <span className=" font-bold">{bodyType}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Complexion: </th>
                  <td>
                    <span className=" font-bold">{complexion}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Blood Group: </th>
                  <td>
                    <span className=" font-bold">{bloodGroup}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Myself: </th>
                  <td>
                    <span className=" font-bold">{myself}</span>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <p className="text-center my-4 text-2xl font-bold underline">
              Basic Information
            </p>

            <table className="table">
              <tbody>
                <tr className="hover">
                  <th className="font-normal"> Profession: </th>
                  <td>
                    <span className=" font-bold">{profession}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Designation: </th>
                  <td>
                    <span className=" font-bold"> {designation}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Education: </th>
                  <td>
                    <span className=" font-bold">{education}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Institute: </th>
                  <td>
                    <span className=" font-bold">{institute}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Country: </th>
                  <td>
                    <span className=" font-bold">{currentCountry}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> City: </th>
                  <td>
                    <span className=" font-bold">{currentCity}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Area: </th>
                  <td>
                    <span className=" font-bold">{currentArea}</span>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <p className="text-center my-4 text-2xl font-bold underline">
              Family Information
            </p>

            <table className="table">
              <tbody>
                <tr className="hover">
                  <th className="font-normal"> Father Occupation : </th>
                  <td>
                    <span className=" font-bold">{fatherOccupation}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Mother Occupation : </th>
                  <td>
                    <span className=" font-bold">{motherOccupation}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Brother : </th>
                  <td>
                    <span className=" font-bold">{brother}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal"> Sister : </th>
                  <td>
                    <span className=" font-bold">{sister}</span>{" "}
                  </td>
                </tr>
                <tr className="hover">
                  <th className="font-normal">About his/her Family : </th>
                  <td>
                    <span className=" font-bold">{myfamily}</span>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle bg-red-600 hover:btn-warning text-white absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello {senderName}</h3>
            <p className="py-4 w-5/6 text-md font-libre font-extrabold text-purple-700">
              Invitation to Explore a Beautiful Connection: A Proposal of Heart
              and Soul ❤️
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-black my-3 font-bold">
                  From <span className="text-xs">(can't change)</span>{" "}
                  <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={senderEmail}
                    {...register("senderEmail", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>
              <div className="hidden">
                <div className="relative">
                  <input
                    type="text"
                    value={senderName}
                    {...register("senderName", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>
              <div className="hidden">
                <div className="relative ">
                  <input
                    type="text"
                    value={email}
                    {...register("receiverEmail", { required: true })}
                    className="w-full  border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>
              <div className="hidden">
                <div className="relative ">
                  <input
                    type="text"
                    value={signleUserId}
                    {...register("senderId")}
                    className="w-full  border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black my-3 font-bold">
                  Proposal <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <textarea
                    type="text"
                    placeholder="Write your proposal"
                    {...register("proposal", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <div className="text-right mt-9">
                <button type="submit" className="btn btn-success btn-md ">
                  Send
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default UserDetails;
