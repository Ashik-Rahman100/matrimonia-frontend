/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { PhotoProvider, PhotoView } from "react-photo-view";
import toast from "react-hot-toast";
import { packageCheck } from "../../Utils/purchesTimeCheck";
import pic from "../../assets/marriage.jpg";

const HomeSearchCard = ({ user }) => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const navigate = useNavigate();

  // console.log(user);

  const {
    photo,
    name,
    age,
    religion,
    education,
    _id,
    designation,
    currentCity,
  } = user;

  const checkView = async () => {
    // console.log(userEmail);
    if (userEmail === undefined) {
      console.log("Click Slide login");
      toast.error("Please login First");
      return;
    }

    let checkProfle = await packageCheck("profile", _id);

    console.log(" HomeSearchCard ");
    console.log(checkProfle);

    if (checkProfle) {
      navigate(`/userDetails/${_id}`);
    } else {
      toast.error("Please Update Package");
    }
  };

  return (
    <div className="card bg-gradient-to-t from-rose-100 to-teal-100 card-compact w-64 shadow-[rgba(0,_0,_0,_0.3)_5px_15px_20px] md:mx-4 mx-6 sm:px-2 mt-9 mb-14  py-3">
      <figure>
        <PhotoProvider>
          <PhotoView src={photo ? photo : pic}>
            <img
              src={photo ? photo : pic}
              alt="Shoes"
              className="h-40 object-fill w-40 rounded-full border border-blue-400 "
            />
          </PhotoView>
        </PhotoProvider>
      </figure>

      <div
        className="pl-2 text-center cursor-pointer"
        onClick={() => checkView()}
      >
        <h2 className=" font-bold mt-2 text-xl w-[80%] mx-auto">
          {userEmail ? (
            <span className=" font-bold mt-2 text-xl w-[80%] mx-auto">
              {" "}
              {name}{" "}
            </span>
          ) : (
            <span className="text-red-500 text-lg">Name: Login First </span>
          )}
        </h2>
        <h2 className="text-xs mb-2 w-[80%] mx-auto">{designation}</h2>
        <div className="overflow-x-auto">
          <table className="table leading-[3px]">
            <tbody>
              {" "}
              <td>Current City</td>
              <td className="font-bold"> {currentCity}</td>
            </tbody>
            <tbody>
              <td>Religion</td>
              <td className="font-bold"> {religion}</td>
            </tbody>

            <tbody>
              <td>Education</td>
              <td className="font-bold"> {education}</td>
            </tbody>
            <tbody>
              {" "}
              <td>Age</td>
              <td className="font-bold"> {age}</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchCard;
