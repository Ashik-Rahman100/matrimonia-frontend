/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import EditModal from "../../Components/EditModal";
import Cookies from "universal-cookie";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";

const Profiles = () => {
  const [stateName, setStateName] = useState("personal");
  const [allProposals, setAllProposals] = useState([]);
  const [proposals, setProposals] = useState([]);
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [activeTab, setActiveTab] = useState("personal"); // Initialize with the default active tab

  useEffect(() => {
    const filterProposals = allProposals.filter(
      (proposals) =>
        proposals.receiverEmail === userEmail && proposals.status === "Pending"
    );
    setProposals(filterProposals);
  }, [allProposals, userEmail]);

  console.log(proposals);

  // console.log(userEmail);

  // fetch(`https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/getuser/${params.email}`)
  // console.log(allProposals);

  const { data: users = [] } = useQuery({
    queryKey: ["usropu"],
    queryFn: async () => {
      const res = await fetch(
        `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/getuser/${userEmail}`
      );
      const data = await res.json();

      // Filter the data to exclude the user with a matching email
      // const filteredData = data?.message?.filter(
      //   (user) => user.email !== userEmail && user.role !== "super_admin"
      // );

      return data.message;
    },
  });

  // console.log(users);

  useEffect(() => {
    fetch(
      "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/proposal/"
    )
      .then((res) => res.json())
      .then((data) => setAllProposals(data.message));
  }, []);

  const stateChange = (d) => {
    setStateName(d);
    setActiveTab(d);
  };
  // //   console.log(stateName);

  const {
    name,
    looking,
    _id,
    email,
    photo,
    phone,
    age,
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
  } = users;

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
    <div className="card bg-base-100 shadow-xl m-6">
      <div className="card-body pt-0">
        <div className="text-center mt-5">
          <button
            className="btn btn-sm bg-blue-500 text-white ml-4"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Edit <PencilSquareIcon className="h-4 w-4 text-white" />
          </button>
          <Link to="/dashboard/proposals">
            <button className="btn btn-sm btn-primary ml-4">
              Inbox{" "}
              <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-white" />
            </button>
          </Link>
          {proposals.length >= 1 && (
            <>
              <div className="badge badge-secondary -ml-2">
                <h1>
                  {proposals.length >= 99 ? (
                    <>
                      <h1>+99</h1>
                    </>
                  ) : (
                    <>
                      <h1 className="font-bold">{proposals.length}</h1>
                    </>
                  )}
                </h1>
              </div>
            </>
          )}
        </div>
        <div className="w-[90%] mx-auto">
          <div className="tabs my-3">
            <button
              className={`tab tab-lifted text-lg ${
                activeTab === "personal" ? "tab-active" : ""
              }`}
              onClick={() => stateChange("personal")}
            >
              Personal Information
            </button>
            <button
              className={`tab tab-lifted text-lg ${
                activeTab === "basic" ? "tab-active" : ""
              }`}
              onClick={() => stateChange("basic")}
            >
              Basic Information
            </button>
            <button
              className={`tab tab-lifted text-lg ${
                activeTab === "family" ? "tab-active" : ""
              }`}
              onClick={() => stateChange("family")}
            >
              Family Information
            </button>
          </div>

          {/* personal  */}

          <div>
            {stateName === "personal" && (
              <>
                <h1 className="text-center text-2xl border border-blue-700 rounded-full font-bold mb-5">
                  Personal Information
                </h1>
                <table className="table leading-3">
                  <tbody>
                    <tr className="hover ">
                      <th className="font-normal">Name : </th>
                      <td className=" font-bold">{name}</td>
                    </tr>
                    <tr className="hover ">
                      <th className="font-normal">Email : </th>
                      <td className=" font-bold">{email}</td>
                    </tr>
                    <tr className="hover ">
                      <th className="font-normal">Phone : </th>
                      <td className=" font-bold">{phone}</td>
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
              </>
            )}
          </div>
          {/* basic  */}
          <div>
            {stateName === "basic" && (
              <div>
                <h1 className="text-center text-2xl border border-blue-700 rounded-full font-bold mb-5 ">
                  Basic Information
                </h1>
                <table className="table leading-3">
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
            )}
          </div>

          {/* Family  */}
          <div>
            {stateName === "family" && (
              <>
                <h1 className="text-center text-2xl border border-blue-700 rounded-full font-bold mb-5 ">
                  Family Information
                </h1>
                <table className="table leading-3">
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
                      <th className="font-normal">About Family : </th>
                      <td>
                        <span className=" font-bold">{myfamily}</span>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>

      <EditModal id="my_modal_5" user={users}></EditModal>
    </div>
  );
};
export default Profiles;
