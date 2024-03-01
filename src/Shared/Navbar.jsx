/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import profile from "../assets/6.jpg";

const Navbar = () => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");

  const photo = localStorage.getItem("photo");

  const navigate = useNavigate();

  // https://matrimoni-ashik-rahman100.vercel.app/
  // http://serverapi.jutibadhi.com/

  const handleLogout = async () => {
    fetch(
      "https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(() => {
        cookies.remove("email", { path: "/" });
        cookies.remove("name", { path: "/" });
        cookies.remove("role", { path: "/" });
        localStorage.clear();
        navigate("/login");
      });
  };

  const menuItems = (
    <>
      <Link to="/">
        <li className="hover:bg-sky-500  rounded-lg duration-100">
          <span className=" hover:text-white duration-150">Home</span>
        </li>
      </Link>
      <Link to="/search">
        <li className="hover:bg-sky-500 rounded-lg duration-100">
          <span className=" hover:text-white duration-150">Search</span>
        </li>
      </Link>
      <Link to="/packages">
        <li className="hover:bg-sky-500 rounded-lg duration-100">
          <span className=" hover:text-white duration-150">Packages</span>
        </li>
      </Link>
      <Link to="/contact">
        <li className="hover:bg-sky-500 rounded-lg duration-100">
          <span className=" hover:text-white duration-150">Contact Us</span>
        </li>
      </Link>
      {userEmail ? (
        <>
          {/* <Link to={`/profile/${userEmail}`}>
                <img src={profile} />
              </Link> */}
          <Link to="/dashboard">
            <li className="hover:bg-sky-500 rounded-lg duration-100">
              <span className=" hover:text-white duration-150">Dashboard</span>
            </li>
          </Link>

          <div className="dropdown dropdown-hover  dropdown-end hidden lg:block ">
            <label tabIndex={0} className="">
              <img
                src={photo ? photo : profile}
                className="w-10 h-10  avatar online mx-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
            >
              <Link to={`/profile`}>
                <li className=" mb-2">
                  <button className="hover:bg-primary hover:text-white my-2 bg-sky-500  rounded-lg duration-100">
                    Profile
                  </button>
                </li>
              </Link>
              <li className="">
                <button
                  onClick={() => handleLogout()}
                  className="hover:bg-red-700 hover:text-white bg-red-500    rounded-lg duration-100"
                >
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </div>

          {/* <Link to={`/profile`}>
            <div className="hover:bg-primary text-center hover:text-white my-2 bg-sky-500 lg:hidden block px-3 mx-2 lg:py-0 py-2 rounded-lg duration-100">
              <button className="">Profile</button>
            </div>
          </Link> */}
          <button
            onClick={() => handleLogout()}
            className="hover:bg-red-700 hover:text-white bg-red-500 lg:hidden block px-3 mx-2 lg:py-0 py-2 rounded-lg duration-100"
          >
            <span>Log out</span>
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <li className="hover:bg-sky-500 rounded-lg duration-100">
              <button className=" hover:text-white duration-150">Log in</button>
            </li>
          </Link>
          {/* <Link to="/signup">
            <li className="hover:bg-sky-500 rounded-lg duration-100 lg:mr-10">
              <button className=" hover:text-white duration-150">
                Sign up
              </button>
            </li>
          </Link> */}
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-300  bg-opacity-75 sticky z-20 top-0 text-black font-bold shadow-lg">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 lg:mr-20"
          >
            {menuItems}
          </ul>
        </div>
        <Link href="/">
          <button className="font-libre font-bold md:text-2xl text-xl btn btn-ghost normal-case ">
            Matromonia
          </button>
          {/* <img src={logo} alt="Logo" width="120px" className="lg:ml-20" /> */}
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-md ">{menuItems}</ul>
      </div>

      {userEmail && <div className="navbar-end lg:hidden lg:mr-10">
        <div className="flex flex-col items-end justify-end">
          <label
            htmlFor="my-drawer-2"
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
      </div>}

      {/* <div className="navbar-end lg:hidden">
        <div className="flex flex-col items-end justify-end">
          <label
            htmlFor="my-drawer-2"
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
