/* eslint-disable no-unused-vars */
import { CheckIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";

const PurchesPending = () => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["usr"],
    queryFn: async () => {
      const res = await fetch(
        "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user"
      );
      const data = await res.json();

      // Filter the data to exclude the user with a matching email
      const filteredData = data?.message?.filter(
        (user) =>
          user.email !== userEmail &&
          user.role !== "super_admin" &&
          user.role !== "admin" &&
          user?.purchesPackage?.status === "pending" &&
          user?.purchesPackage?.receivedNumber?.length > 2
      );
      // refetch();

      return filteredData;
    },
  });

  // console.log(users);
  const activeStatus = (user) => {
    let userEmail = user.email;
    let purchesPackage = user?.purchesPackage;

    purchesPackage.status = "active";
    // console.log(userEmail, purchesPackage);

    fetch(
      `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/profile/update/${userEmail}`,
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
        if (data.status == "success") {
          refetch();
        }
      });
  };
  const deactived = (user) => {
    let userEmail = user.email;
    let purchesPackage = user?.purchesPackage;

    purchesPackage.status = "canceled";
    // console.log(userEmail, purchesPackage);

    fetch(
      `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/profile/update/${userEmail}`,
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
        if (data.status == "success") {
          refetch();
        }
      });
  };

  // console.log(users);
  return (
    <div>
      {users.length === 0 ? (
        <>
          <h1 className="text-center font-bold text-2xl font-lilita">
            No Purchase Request Order 😔 right now
          </h1>
        </>
      ) : (
        <div className=" w-[100%] overflow-x-scroll">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>SN</th>
                <th>User Name</th>
                <th>User Number</th>
                <th>Received Number</th>
                <th>Transaction Number</th>
                <th>Pacakge</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.map((user, i) => (
                <tr key={user._id} className="  hover:bg-gray-200 duration-200">
                  <th>{i + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.phone}</td>
                  <td>{user?.purchesPackage?.receivedNumber}</td>
                  <td>{user?.purchesPackage?.transactionId}</td>
                  <td>{user?.purchesPackage?.title}</td>
                  <td>{user?.purchesPackage?.price}</td>
                  <td>{user?.purchesPackage?.status}</td>
                  <td className="flex gap-3">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deactived(user)}
                    >
                      X
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => activeStatus(user)}
                    >
                      <CheckIcon className="h-6 w-4 text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchesPending;
