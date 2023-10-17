/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import HomeSearchCard from "../../Components/HomeSearchCard";
import Loading from "../../Shared/Loading";

const VisitedProfile = () => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: visitedUSer = [] } = useQuery({
    queryKey: ["uservisit"],
    queryFn: async () => {
      setLoading(true);
      const res = await fetch(
        `https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user/getuser/${userEmail}`
      );
      const data = await res.json();
      if (data) {
        setLoading(false);
      }

      return data.message?.purchesPackage?.profileVisted;
    },
  });

  // console.log(visitedUSer);

  useEffect(() => {
    fetch(
      "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user"
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredUsers = data.message.filter((user) =>
          visitedUSer.includes(user._id)
        );
        setUsers(filteredUsers);
      });
  }, [visitedUSer]);

  return (
    <div className="min-h-screen">
      {loading && <Loading></Loading>}

      {visitedUSer.length <= 0 ? (
        <>
          <div>
            <h2 className="text-3xl text-center font-bold font-lilita">
              You're Not visit any Profile yet
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center ">
            {users.map((user) => (
              <HomeSearchCard key={user._id} user={user}></HomeSearchCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VisitedProfile;
