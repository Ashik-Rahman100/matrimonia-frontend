/* eslint-disable no-unused-vars */
import { CheckIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "universal-cookie";

const Orders = () => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  let [filterData, setFilterData] = useState([]);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["usrrr"],
    queryFn: async () => {
      let url = `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user`;

      const res = await fetch(url);
      const data = await res.json();

      // Filter the data to exclude the user with a matching email
      const filteredData = data?.message?.filter(
        (user) =>
          user.email !== userEmail &&
          user.role !== "super_admin" &&
          user.role !== "admin" &&
          user?.purchesPackage?.status === "active"
      );
      // refetch();

      return filteredData;
    },
  });
  // console.log(users);

  const handleOnchange = (e) => {
    const title = e.target.value;
    // console.log(title);

    const filterTitle = users.filter(
      (item) => item?.purchesPackage?.title === title
    );

    setFilterData(filterTitle);
    if (filterTitle) {
      console.log(filterTitle);
    }
  };

  const clearFilter = () => {
    filterData = [];
    setFilterData(filterData);
    // console.log(filterData);
  };

  let totalAmount = 0;

  if (filterData.length > 0) {
    filterData.forEach((user) => {
      if (user?.purchesPackage?.status === "active") {
        totalAmount += parseFloat(user?.purchesPackage?.price) || 0;
      }
    });
  } else {
    users.forEach((user) => {
      if (user?.purchesPackage?.status === "active") {
        totalAmount += parseFloat(user?.purchesPackage?.price) || 0;
      }
    });
  }

  const uniquePackageTitles = [
    ...new Set(users.map((user) => user?.purchesPackage?.title)),
  ];

  // console.log(parseInt(totalAmount));

  return (
    <div>
      <div className="my-4">
        <span className="font-bold ml-4">Filter Data :</span>
        <select
          className="select select-primary ml-4"
          onChange={handleOnchange}
        >
          <option disabled selected>
            Select
          </option>

          {uniquePackageTitles.map((title, i) => (
            <option key={i} value={title}>
              {title}
            </option>
          ))}
        </select>

        {filterData.length > 0 && (
          <button className="btn btn-primary  mx-3" onClick={clearFilter}>
            Reset
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SN</th>
              <th>User Name</th>
              <th>User Number</th>
              <th>User Package</th>
              <th>Received Number</th>
              <th>Transaction Number</th>
              <th>Price</th>
            </tr>
          </thead>
          {filterData.length > 0 ? (
            <>
              <tbody>
                {/* row 1 */}
                {filterData?.map((user, i) => (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user?.name}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.purchesPackage?.title}</td>
                    <td>{user?.purchesPackage?.receivedNumber}</td>
                    <td>{user?.purchesPackage?.transactionId}</td>
                    <td>{user?.purchesPackage?.price}</td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <>
              <tbody>
                {/* row 1 */}
                {users?.map((user, i) => (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user?.name}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.purchesPackage?.title}</td>
                    <td>{user?.purchesPackage?.receivedNumber}</td>
                    <td>{user?.purchesPackage?.transactionId}</td>
                    <td>{user?.purchesPackage?.price}</td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
        <hr />
      </div>
      <div className="flex justify-end mr-3 lg:mr-20 font-bold text-md">
        <h1 className="mr-5 font-medium">Total Amount </h1>
        <h1>{totalAmount} tk</h1>
      </div>
    </div>
  );
};

export default Orders;
