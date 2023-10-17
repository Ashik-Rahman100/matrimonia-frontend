/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ConfirmModal from "../../Shared/ConfirmModal";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../Shared/Loading";

const AcceptProposal = () => {
  const [requestUser, setrequestUser] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [deleteUser, setDeleteUser] = useState(null);
  const [showProposal, setShowProposal] = useState();
  let [filterProposal, setFilterProposal] = useState([]);
  let [haveData, setHaveData] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const userRole = cookie.get("role");
  const userEmail = cookie.get("email");

  const closeModal = () => {
    setDeleteUser(null);
  };

  const { data: acceptProposal = [], refetch } = useQuery({
    queryKey: ["acceptusr"],
    queryFn: async () => {
      setLoading(true);
      const res = await fetch(
        "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/proposal"
      );
      const data = await res.json();
      if (data) {
        setLoading(false);
      }
      return data.message;
    },
  });

  useEffect(() => {
    if (acceptProposal) {
      // console.log(acceptProposal);
      if (userRole === "user") {
        setLoading(true);
        let proposalFilter = acceptProposal.filter(
          (request) =>
            request.receiverEmail === userEmail ||
            request.senderEmail === userEmail
        );
        setLoading(false);
        setShowProposal(proposalFilter);
      } else {
        setLoading(false);
        setShowProposal(acceptProposal);
      }
    }
  }, [acceptProposal, userEmail, userRole]);

  // console.log(acceptProposal);

  const seeDetail = (email) => {
    document.getElementById("detail_modal").showModal();
    setrequestUser(email);
  };

  useEffect(() => {
    fetch(
      `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/getuser/${requestUser}`
    )
      .then((res) => res.json())
      .then((data) => setUserDetail(data?.message));
  }, [requestUser]);

  // console.log(userRole);

  const handleDeleteUser = (accpetPro) => {
    fetch(
      `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/proposal/delete/${accpetPro._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status == "success") {
          toast.success("Proposal Delete successfully");
          refetch();
        }
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOnchange = (e) => {
    const title = e.target.value;
    console.log(title);

    const filterTitle = showProposal.filter((item) => item?.status === title);

    // setFilterData(filterTitle);
    setFilterProposal(filterTitle);
    if (filterTitle) {
      console.log(filterTitle);
    }
  };

  const uniqueProposalStatus = [
    ...new Set(showProposal?.map((user) => user.status)),
  ];
  // console.log(uniqueProposalStatus);
  const clearFilter = () => {
    filterProposal = [];
    setFilterProposal(filterProposal);
    // console.log(filterData);
  };

  return (
    <div className="min-h-screen">
      {loading && <Loading></Loading>}
      {acceptProposal.length <= 0 ? (
        <>
          <h1 className="text-center font-bold text-2xl font-lilita">
            No Request Accept 😔 right now
          </h1>
        </>
      ) : (
        <>
          <div className="my-4">
            <span className="font-bold ml-4">Filter Data By :</span>
            <select
              className="select select-primary ml-4"
              onChange={handleOnchange}
            >
              <option disabled selected>
                Select
              </option>

              {uniqueProposalStatus?.map((title, i) => (
                <option key={i} value={title}>
                  {title}
                </option>
              ))}
            </select>

            {filterProposal.length > 0 && (
              <button className="btn btn-primary  mx-3" onClick={clearFilter}>
                Reset
              </button>
            )}
          </div>
          <h2 className="md:text-4xl text-2xl my-4 font-bold text-center">
            Matched User <span>❣</span>
          </h2>
          <Toaster />
          <div className="w-[100%] overflow-x-scroll ">
            <table className=" table min-w-full  text-sm bg-gray-100">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Accept By</th>
                  <th>Request By</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>

              {filterProposal.length > 0 ? (
                <>
                  <tbody>
                    {filterProposal?.map((user, i) => (
                      <tr
                        key={user._id}
                        className="border border-gray-300  hover:bg-gray-200 duration-200"
                      >
                        <th className="  ">{i + 1}</th>
                        <td className="">
                          {user.receiverEmail}
                          <button
                            className="btn btn-xs bg-sky-600 hover:bg-sky-900 text-white ml-4"
                            onClick={() => {
                              seeDetail(user.receiverEmail);
                            }}
                          >
                            <EyeIcon className="h-3 w-3 text-white" />
                          </button>
                        </td>
                        <td className="">
                          {user.senderEmail}
                          <button
                            className="btn btn-xs bg-sky-600 hover:bg-sky-900 text-white ml-4"
                            onClick={() => {
                              seeDetail(user.senderEmail);
                            }}
                          >
                            <EyeIcon className="h-3 w-3 text-white" />
                          </button>
                        </td>
                        <td className="">{user.status}</td>

                        <td>
                          <label
                            onClick={() => setDeleteUser(user)}
                            htmlFor="confirmation-modal"
                            className="btn bg-red-600 hover:bg-red-900 text-white  btn-sm "
                          >
                            Delete
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <tbody>
                    {showProposal?.map((user, i) => (
                      <tr
                        key={user._id}
                        className="border border-gray-300  hover:bg-gray-200 duration-200"
                      >
                        <th className="  ">{i + 1}</th>
                        <td className="">
                          {user.receiverEmail}
                          <button
                            className="btn btn-xs bg-sky-600 hover:bg-sky-900 text-white ml-4"
                            onClick={() => {
                              seeDetail(user.receiverEmail);
                            }}
                          >
                            <EyeIcon className="h-3 w-3 text-white" />
                          </button>
                        </td>
                        <td className="">
                          {user.senderEmail}
                          <button
                            className="btn btn-xs bg-sky-600 hover:bg-sky-900 text-white ml-4"
                            onClick={() => {
                              seeDetail(user.senderEmail);
                            }}
                          >
                            <EyeIcon className="h-3 w-3 text-white" />
                          </button>
                        </td>
                        <td className="">{user.status}</td>

                        <td>
                          <label
                            onClick={() => setDeleteUser(user)}
                            htmlFor="confirmation-modal"
                            className="btn bg-red-600 hover:bg-red-900 text-white  btn-sm "
                          >
                            Delete
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
          {deleteUser && (
            <ConfirmModal
              title={`Are You sure you want to delete?`}
              message={`If You delete It cannot be undone.`}
              closeModal={closeModal}
              successButtonName="Delete"
              successAction={handleDeleteUser}
              modalData={deleteUser}
            ></ConfirmModal>
          )}

          <dialog id="detail_modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">
                Details of {userDetail?.name}
              </h3>
              <div className="flex justify-center">
                <img src={userDetail?.photo} alt="" className="h-24 w-24" />
              </div>
              <div className="leading-3">
                <p className="py-4">
                  Name: <span className="font-bold">{userDetail?.name}</span>
                </p>
                <p className="py-4">
                  Phone: <span className="font-bold">{userDetail?.phone}</span>
                </p>
                <p className="py-4">
                  Email: <span className="font-bold">{userDetail?.email}</span>
                </p>
                <p className="pt-4">
                  Live in:{" "}
                  <span className="font-bold">
                    {userDetail?.currentCountry}
                  </span>
                </p>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <Link to={`/userDetails/${userDetail?._id}`}>
                    <button className="btn bg-sky-600 hover:bg-sky-900 text-white md:btn-md btn-sm">
                      Details
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
};

export default AcceptProposal;
