/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { profileViewCheck } from "../../Utils/purchesTimeCheck";

const Proposals = () => {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const navigate = useNavigate();
  const { data: proposals = [], refetch } = useQuery({
    queryKey: ["proposals"],
    queryFn: async () => {
      const res = await fetch(
        "https://matrimoni-ashik-rahman100.vercel.app/api/v1/proposal"
      );
      const data = await res.json();
      return data.message.filter(
        (proposal) =>
          proposal.receiverEmail === userEmail &&
          proposal.status !== "Accpet" &&
          proposal.status !== "Cancel"
      );
    },
  });

  // console.log(proposals);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteProposal = (proposal) => {
    proposal.status = "Cancel";
    // console.log(proposal);

    setLoading(true);

    fetch(
      `https://matrimoni-ashik-rahman100.vercel.app/api/v1/proposal/req/proposal/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposal),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "success") {
          // handleDeleteProposal(proposal);
          // toast.success("Accpeted! Congratulations!!");
          setLoading(false);
          const updatedProposals = proposals.filter(
            (p) => p._id !== proposal._id
          );
          refetch(updatedProposals);
        } else {
          toast.error("Sorry! Try Again...");
        }
      });
  };

  const accepetProposal = (proposal) => {
    // console.log(proposal);
    proposal.status = "Accpet";
    // console.log(proposal);

    setLoading(true);

    fetch(
      `https://matrimoni-ashik-rahman100.vercel.app/api/v1/proposal/req/proposal/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposal),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "success") {
          // handleDeleteProposal(proposal);
          // toast.success("Accpeted! Congratulations!!");
          setLoading(false);
          const updatedProposals = proposals.filter(
            (p) => p._id !== proposal._id
          );
          refetch(updatedProposals);
        } else {
          toast.error("Sorry! Try Again...");
        }
      });
  };

  const checkView = async (id) => {
    if (userEmail === undefined) {
      // console.log("Click Slide login");
      toast.error("Please login First");
      return;
    }

    let checkProfle = await profileViewCheck();

    if (checkProfle) {
      navigate(`/userDetails/${id}`);
    } else {
      toast.error("Please check your package");
    }
  };

  return (
    <div className="mt-24 max-w-screen-xl mx-auto">
      <Toaster />{" "}
      {loading && (
        <div className="text-center mt-96 text-green-600">
          <span className="loading loading-dots loading-lg text-center"></span>
        </div>
      )}
      {proposals.length < 1 && (
        <p className="text-center text-5xl text-red-500 font-libre">
          You don't have any proposal yet
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {proposals.map((proposal) => (
          <>
            <div className="card  bg-gray-300">
              <div className="card-body">
                <h2 className="card-title">Received From :</h2>
                <div className="flex justify-between  px-2 py-1 rounded-md border-black border ">
                  <h2 className=" text-xl">{proposal.senderName}</h2>
                  <div className="card-actions justify-end">
                    <button
                      className="btn bg-sky-600 hover:bg-sky-900 btn-sm text-white"
                      onClick={() => checkView(proposal.senderId)}
                    >
                      See
                    </button>
                  </div>
                </div>
                <h2 className="card-title">Message</h2>
                <p className="px-2 py-1 rounded-md border-black border ">
                  {proposal.proposal}
                </p>
                <div className="card-actions justify-end mt-3">
                  <button
                    onClick={() => handleDeleteProposal(proposal)}
                    className="btn btn-sm bg-red-600 hover:bg-red-900 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => accepetProposal(proposal)}
                    className="btn btn-sm bg-sky-600 hover:bg-sky-900 text-white"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Proposals;
