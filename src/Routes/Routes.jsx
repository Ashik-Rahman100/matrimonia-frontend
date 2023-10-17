import { createBrowserRouter } from "react-router-dom";
import AcceptProposal from "../DashboardPages/AcceptProposal";
import AddPriviledge from "../DashboardPages/AddPriviledges";
import AllUser from "../DashboardPages/AllUser";
import Orders from "../DashboardPages/Orders";
import PackageUpdate from "../DashboardPages/PackageUpdate";
import Profiles from "../DashboardPages/Profiles";
import PurchesPending from "../DashboardPages/PurchesPending";
import UserDashboard from "../DashboardPages/UserDashboard";
import VisitedProfile from "../DashboardPages/VisitedProfile";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import Contacts from "../Pages/Contact";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Packages from "../Pages/Home/Packages";
import MembershipForm from "../Pages/MembershipForm";
import Profile from "../Pages/Profile";
import Proposals from "../Pages/Proposals";
import Search from "../Pages/Search";
import HomeSearchResult from "../Pages/Search/HomeSearchResult";
import SearchResult from "../Pages/Search/SearchResult";
import UserDetails from "../Pages/UserDetails";
import AdminRoute from "../SecureRoute/AdminRoute";
import PrivateRoute from "../SecureRoute/PrivateRoute";
import UserOrAdmin from "../SecureRoute/UserOrAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/packages",
        element: <Packages />,
      },
      {
        path: "/search",
        element: (
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        ),
      },
      {
        path: "/homeSearchResult",
        element: <HomeSearchResult></HomeSearchResult>,
      },
      {
        path: "/searchResult",
        element: <SearchResult></SearchResult>,
      },
      {
        path: "/userDetails/:id",
        element: (
          <PrivateRoute>
            <UserDetails></UserDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/${params.id}`
          ),
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/proposals",
        element: <Proposals></Proposals>,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/membershipForm",
        element: <MembershipForm />,
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            {" "}
            <DashboardLayout></DashboardLayout>{" "}
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <UserOrAdmin />,
          },
          {
            path: "/dashboard/allPackage",
            element: (
              <AdminRoute>
                {" "}
                <Packages />{" "}
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/allUser",
            element: (
              <AdminRoute>
                {" "}
                <AllUser />{" "}
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/orders",
            element: (
              <AdminRoute>
                {" "}
                <Orders />{" "}
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/addPriviledge",
            element: (
              <AdminRoute>
                {" "}
                <AddPriviledge />{" "}
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/acceptProposal",
            element: (
              <AdminRoute>
                {" "}
                <AcceptProposal />{" "}
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/purchesPending",
            element: (
              <AdminRoute>
                {" "}
                <PurchesPending />{" "}
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/package-update",
            element: (
              <AdminRoute>
                {" "}
                <PackageUpdate />{" "}
              </AdminRoute>
            ),
          },

          {
            path: "/dashboard/user",
            element: <UserDashboard />,
          },
          {
            path: "/dashboard/profiles",
            element: <Profiles />,
          },
          {
            path: "/dashboard/proposals",
            element: <Proposals></Proposals>,
          },
          {
            path: "/dashboard/visited",
            element: <VisitedProfile />,
          },
          {
            path: "/dashboard/userProposal",
            element: <AcceptProposal />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);
