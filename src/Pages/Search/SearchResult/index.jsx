import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeSearchCard from "../../../Components/HomeSearchCard";

const SearchResult = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const storedSearchData = localStorage.getItem("searchData");
  const retrivedData = JSON.parse(storedSearchData);
  // console.log("Data from search ", retrivedData);
  let lookingFor = retrivedData.looking;
  let heightsAge = retrivedData.ageTo;
  let countryData = retrivedData.country;
  let educationData = retrivedData.education;
  let maritalData = retrivedData.mairtalStatus;
  let maxHeight = retrivedData.maximum;
  let professionData = retrivedData.profession;

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://matrimoni-ashik-rahman100.vercel.app/api/v1/user"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.message);
        // Use filter to filter users based on criteria
        const filteredUsers = data.message.filter((user) => {
          // Check if user matches the filter criteria
          const isLookingMatch = user.looking === lookingFor;

          let isAgeMatch = true;
          if (heightsAge) {
            isAgeMatch = user.age <= heightsAge;
          }

          let isCountryMatch = true;
          if (countryData != "0") {
            isCountryMatch = user.currentCountry <= countryData;
          }

          let checkEducation = true;
          if (educationData) {
            checkEducation = user.education === educationData;
          }

          let maritalStatus = true;
          if (maritalData) {
            maritalStatus = user.mairtalStatus === maritalData;
          }
          let maxHeightMatch = true;
          if (maxHeight) {
            maxHeightMatch = user.height <= maxHeight;
          }
          let professionMatch = true;
          if (professionData) {
            professionMatch = user.profession === professionData;
          }

          // Return true if all criteria match
          return (
            isLookingMatch &&
            isAgeMatch &&
            isCountryMatch &&
            checkEducation &&
            maritalStatus &&
            professionMatch &&
            maxHeightMatch
          );
        });

        setUsers(filteredUsers);
        setLoading(false);
      });
  }, [
    lookingFor,
    heightsAge,
    countryData,
    educationData,
    maritalData,
    maxHeight,
    professionData,
  ]);

  return (
    <div className="py-32">
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
            <Link to="/search">
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

export default SearchResult;
