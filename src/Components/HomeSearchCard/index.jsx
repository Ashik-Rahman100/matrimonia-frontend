/* eslint-disable react/prop-types */

import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
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
    // currentCity,
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
      // toast.error("Please Update Package");
    }
  };

  return (
    <Link  to={`/userDetails/${_id}`}>
      <div className="card card-compact w-full lg:w-96 bg-base-100 shadow-xl h-[500px] my-24">
        <figure className="">
          <PhotoProvider>
            <PhotoView src={photo ? photo : pic}>
              <img
                src={photo ? photo : pic}
                alt="image"
                className=""
              />
            </PhotoView>
          </PhotoProvider>
        </figure>

        <div
          className="pl-2 text-start cursor-pointer"
          onClick={() => checkView()}
        >
          {/* <h2 className=" font-bold mt-2 text-xl w-[80%] mx-auto">
            {userEmail ? (
              <span className=" font-bold mt-2 text-xl w-[80%] mx-auto">
                {" "}
                {name}{" "}
              </span>
            ) : (
              <span className="text-black text-lg">{name} </span>
            )}
          </h2> */}
          
          <div className="overflow-x-auto">
            <div className="card-body items-start text-start">
              <h2 className="card-title">{name}</h2>
               <h2 > {designation}</h2>
              {age &&<p>Age :{age}</p>}
              <p>Education: {education}</p>
              <p>Religion: {religion}</p>
              <div className="card-actions">
                <Link to={`/userDetails/${_id}`}>
                  <button className="btn btn-primary">Connect</button>
                </Link>
              </div>
            </div>
            {/* <div className="flex justify-between">
              <p>Current City: </p>
              <span>{currentCity}</span>
            </div>
            <div className="flex ">
              <p>Religion: </p>
              <span>{religion}</span>
            </div>
            <div className="flex">
              <p>Education: </p>
              <span>{education}</span>
            </div>
            <div className="flex">
              <p>Age: </p>
              <span>{age}</span>
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeSearchCard;
