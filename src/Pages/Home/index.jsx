import AdminRoute from "../../SecureRoute/AdminRoute";
import Contacts from "../Contact";
import Banner from "./Banner";
import ChooseMarriage from "./ChooseMarrige";
import { Faq } from "./Faq";
import Packages from "./Packages";
import ProfilesSlide from "./ProfilesSlide";
import Reviews from "./Reviews";
import SpecialMoments from "./SpecialMoments";
import SuccessStory from "./SuccessStory";

const Home = () => {
  return (
    <div>
      <Banner />
      <ProfilesSlide />
      <ChooseMarriage />
      <SuccessStory />
      <Packages />
      <SpecialMoments />
      <AdminRoute></AdminRoute>
      <Reviews />
      <Contacts />
      <Faq />
    </div>
  );
};

export default Home;
