/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeSearchCard from "../../../Components/HomeSearchCard";
import Cookies from "universal-cookie";

const HomeSearchResult = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const storedSearchData = localStorage.getItem("homeSearchData");
  const retrivedData = JSON.parse(storedSearchData);
  // console.log("Data from search ", retrivedData);
  let lookingFor = retrivedData.looking;
  let heightsAge = retrivedData.to;
  let countryData = retrivedData.country;
  let maritalData = retrivedData.mairtalStatus;
  let cookies = new Cookies();
  let userEmail = cookies.get("email");

  // console.log(lookingFor, heightsAge, countryData);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user"
    )
      .then((res) => res.json())
      .then((data) => {
        // Use filter to filter users based on criteria
        const filteredUsers = data.message.filter((user) => {
          // Check if user matches the filter criteria
          const isEmailMatched = user.email != userEmail;

          let isLookingMatch = true;
          if (heightsAge) {
            isLookingMatch = user.looking === lookingFor;
          }

          // console.log(heightsAge);

          let isAgeMatch = true;
          if (heightsAge) {
            isAgeMatch = user.age <= heightsAge;
          }

          let isCountryMatch = true;
          if (countryData !== "0") {
            isCountryMatch = user.currentCountry <= countryData;
          }

          let maritalStatus = true;
          if (maritalData) {
            maritalStatus = user.mairtalStatus === maritalData;
          }

          // Return true if all criteria match
          return (
            isLookingMatch &&
            isAgeMatch &&
            isCountryMatch &&
            isEmailMatched &&
            maritalStatus
          );
        });

        setUsers(filteredUsers);
        setLoading(false);
      });
  }, [lookingFor, heightsAge, countryData, userEmail, maritalData]);

  return (
    <div className="pt-20">
      <div className="text-center text-green-600">
        {loading && (
          <span className="loading loading-dots loading-lg text-center"></span>
        )}{" "}
      </div>
      {loading == false && users.length === 0 ? (
        <>
          <p className="text-center font-pacifico text-xl">
            <span className="text-3xl">Sorry!</span> We Did Not Find any matched
            user
          </p>
          <div className="text-center my-5">
            <Link to="/">
              <button className="btn btn-primary text-center">
                Search again
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center ">
          {users.map((user) => (
            <HomeSearchCard key={user._id} user={user}></HomeSearchCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeSearchResult;
