/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/avatar.jpg";
import { profileViewCheck } from "../../Utils/purchesTimeCheck";
import toast, { Toaster } from "react-hot-toast";

const SearchCard = ({ user }) => {
  const navigate = useNavigate();
  const convertToFeetAndInches = (heightCm) => {
    const feet = Math.floor(heightCm / 30.48); // Convert cm to feet
    const inches = Math.round((heightCm / 2.54) % 12); // Convert cm to inches
    return `${heightCm} cm / ${feet}'${inches}"`;
  };

  let gender = " ";
  if (user.looking === "Men") {
    gender = "Male";
  } else if (user.looking === "Women") {
    gender = "Female";
  }

  const checkView = () => {
    let checkProfle = profileViewCheck();

    if (checkProfle) {
      navigate(`/userDetails/${user?._id}`);
    } else {
      toast.error("Please Update Package First");
    }

    // navigate(`/userDetails/${_id}`);
  };

  return (
    <div className="card pb-3 text-xs bg-base-100 shadow-xl">
      <Toaster />
      <figure>
        <img src={image} alt="Movie" className="  object-cover" />
      </figure>
      <div className="pt-6 leading-5">
        <h3>
          Profile ID{" "}
          <span className="ml-3 font-bold text-red-500">
            {user._id.slice(-5)}
          </span>
        </h3>
        <h2>
          Name: <span className="ml-7 font-bold">{user.name}</span>
        </h2>
        <p>
          Age: <span className="ml-9 font-bold">{user.age}</span>
        </p>
        <p>
          Height:{" "}
          <span className="ml-6 font-bold">
            {convertToFeetAndInches(user.height)}
          </span>{" "}
          inch
        </p>
        <p>
          Gender: <span className="ml-6 font-bold">{gender}</span>
        </p>
        <p>
          Religion: <span className="ml-5 font-bold">{user.religion}</span>
        </p>
        <p>
          Profession: <span className="ml-2 font-bold">{user.profession}</span>
        </p>
        <p>
          City: <span className="ml-11 font-bold">{user.currentCity}</span>
        </p>
        <p>
          Country: <span className="ml-6 font-bold">{user.currentCountry}</span>
        </p>

        <div
          onClick={() => checkView()}
          className="card-actions justify-end mt-10"
        >
          <Link to={`/userDetails/${user._id}`}>
            <button className="btn btn-primary btn-sm">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
