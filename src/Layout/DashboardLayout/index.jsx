import { NavLink, Outlet } from "react-router-dom";
import { useRef } from "react"; // Import useRef from React
import Cookies from "universal-cookie";
import { PhotoProvider, PhotoView } from "react-photo-view";

const DashboardLayout = () => {
  const drawerCheckboxRef = useRef(null); // Create a ref for the checkbox input
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const userName = cookies.get("name");
  const userRole = cookies.get("role");
  const photo = localStorage.getItem("photo");
  // const hideDrawer = () => {
  //   // Function to hide the drawer
  //   if (drawerCheckboxRef.current) {
  //     drawerCheckboxRef.current.checked = false; // Uncheck the checkbox
  //   }
  // };

  return (
    <div className="">
      <div className="drawer lg:drawer-open ">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerCheckboxRef}
        />

        <div className="drawer-content pt-20 w-[350px] md:w-[100%] mx-auto">
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side  z-10">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="text-xl  font-medium menu p-4 pt-20 w-64 min-h-full bg-gray-200 flex flex-col ">
            {/* Sidebar content here */}
            {/* <NavLink
              rel="noopener noreferrer"
              to={`/dashboard/profiles`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                  : " flex items-center p-2 space-x-3 rounded-md"
              }
            >
              <span>Profile</span>
            </NavLink> */}
            {userRole === "user" && (
              <>
                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/user`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>My Package</span>
                </NavLink>
                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/visited`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>Visited Profile</span>
                </NavLink>
                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/userProposal`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>All Proposal</span>
                </NavLink>
              </>
            )}
            {(userRole === "admin" || userRole === "super_admin") && (
              <>
                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/allPackage`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>All Package</span>
                </NavLink>
                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/package-update`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>Price Update</span>
                </NavLink>
                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/purchesPending`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>Purches Pending</span>
                </NavLink>

                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/addPriviledge`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>Add Privileges</span>
                </NavLink>
                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/acceptProposal`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>All Proposal</span>
                </NavLink>

                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/allUser`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>All Users</span>
                </NavLink>
                <NavLink
                  rel="noopener noreferrer"
                  to={`/dashboard/orders`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center p-2 space-x-3 rounded-md"
                      : " flex items-center p-2 space-x-3 rounded-md"
                  }
                >
                  <span>Orders</span>
                </NavLink>
              </>
            )}

            <div className="text-center mt-auto">
              {" "}
              {/* "mt-auto" adds margin-top to push the button to the bottom */}
              <div className="flex items-center gap-2 bg-gradient-to-tr from-sky-200 to-sky-400 p-4 hover:bg-gradient-to-bl hover:from-sky-200 hover:to-sky-400 rounded-full duration-300">
                <PhotoProvider>
                  <PhotoView src={photo}>
                    <img
                      alt="Admin"
                      src={photo}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </PhotoView>
                </PhotoProvider>

                <div>
                  <p className="text-sm text-start">
                    <strong className="block font-medium">{userName}</strong>

                    <span> {userEmail}</span>
                  </p>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
