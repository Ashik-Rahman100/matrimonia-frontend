import BannerForm from "../../../Components/BannerForm";
import marriage from "../../../assets/biya.jpg";

const Banner = () => {
  return (
    <div>
      <div
        className="hero  max-h-screen"
        style={{ backgroundImage: `url(${marriage})` }}
      >
        <div className=" rounded-lg p-6 md:mt-[27%] mt-[40%] mb-36 border-blue-200 border">
          <BannerForm />
        </div>
      </div>
    </div>
  );
};

export default Banner;
