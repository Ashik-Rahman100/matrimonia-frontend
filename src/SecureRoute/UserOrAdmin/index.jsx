import Cookies from "universal-cookie";
import UserDashboard from "../../DashboardPages/UserDashboard";
import Packages from "../../Pages/Home/Packages";

const UserOrAdmin = () => {
  const cookie = new Cookies();
  const userRole = cookie.get("role");
  return (
    <div>
      <h1>{userRole === "user" ? <UserDashboard /> : <Packages />}</h1>
    </div>
  );
};

export default UserOrAdmin;
