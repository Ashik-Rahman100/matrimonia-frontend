/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Packages from "../../Pages/Home/Packages";

const UserDashboard = () => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [loading, setLoading] = useState(false);

  const [singlePackage, setSinglePackage] = useState({});

  const { data: user = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      setLoading(true);
      const res = await fetch(
        `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/getuser/${userEmail}`
      );
      const data = await res.json();

      setLoading(false);
      return data.message;
    },
  });

  const { data: allPackages = [] } = useQuery({
    queryKey: ["categoriy"],
    queryFn: async () => {
      const res = await fetch(
        "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/package"
      );
      const data = await res.json();

      const defaultPackage = data?.message?.find(
        (item) => item.title === user?.purchesPackage?.title
      );
      // console.log(defaultPackage);
      // refetch();
      return data?.message;
    },
  });

  useEffect(() => {
    if (allPackages) {
      // console.log(allPackages);
      // console.log(user);

      const defaultPackage = allPackages?.find(
        (item) => item.title === user?.purchesPackage?.title
      );
      setSinglePackage(defaultPackage);
    }
  }, [allPackages, user]);

  // console.log(user?.purchesPackage);

  return (
    <div className="min-h-screen">
      {user?.purchesPackage?.title === undefined ? (
        <>
          <div className=" ">
            <h2 className="text-center text-2xl font-bold">
              Please Buy a Package
            </h2>
            <div className="-mt-10">
              <Packages />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center text-3xl font-bold my-10">
            Your Package
          </div>
          {/* <div>
        Package Condition{" "}
        {user?.purchesPackage?.condition.map((cond, i) => (
          <p key={i}>{cond.option}</p>
        ))}
      </div> */}
          {loading && (
            <div className="text-center mt-96 max-h-screen text-green-600">
              <span className="loading loading-dots loading-lg text-center"></span>
            </div>
          )}
          <div className="flex flex-wrap justify-center max-h-screen items-center-mx-4 gap-6 pb-10">
            <div className="flex justify-center w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
              <div
                className={`flex flex-col  space-y-6 rounded shadow  p-4 text-black  bg-gradient-to-t from-blue-400 to-emerald-400`}
              >
                <div>
                  <div className="space-y-2">
                    <h4 className="text-2xl ">
                      Package Name :{" "}
                      <span className="font-bold">
                        {user?.purchesPackage?.title}
                      </span>
                    </h4>
                    <h2 className="text-2xl">
                      Package Price :{" "}
                      <span className="font-bold">
                        {" "}
                        {user?.purchesPackage?.price} Tk
                      </span>
                    </h2>
                    <h2 className="text-2xl ">
                      Package Status :{" "}
                      <span className="font-bold">
                        {" "}
                        {user?.purchesPackage?.status}...
                      </span>
                    </h2>
                  </div>
                </div>
                <ul className="flex-1  text-black">
                  <h1 className="text-2xl text-center font-bold my-2">
                    Conditons
                  </h1>
                  <div className="flex justify-around my-3 font-bold ">
                    <p>Previlidge</p>
                    <p>Value</p>
                  </div>
                  <hr className="mb-3" />
                  {user?.purchesPackage?.condition?.map((cond, item) => (
                    <li key={item} className={`flex mb-2  space-x-2`}>
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
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
