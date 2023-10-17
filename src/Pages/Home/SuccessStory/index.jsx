/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SuccessCard from "../../../Components/SuccessCard";

const SuccessStory = () => {
  const [storys, setStorys] = useState([]);
  const [slidePerView, setSlidePerView] = useState(2); // Initial value for slidePerView

  useEffect(() => {
    fetch("story.json")
      .then((res) => res.json())
      .then((data) => setStorys(data));
  }, []);

  useEffect(() => {
    // Update slidePerView when the window is resized
    const handleResize = () => {
      if (window.innerWidth <= 760) {
        setSlidePerView(1); // Small screens
      } else {
        setSlidePerView(2); // Larger screens
      }
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the correct value on page load
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="md:mt-10">
      <div className="text-center md:my-10">
        <h1 className="text-3xl lg:text-5xl font-libre font-bold ">
          Success <span className="text-red-600">Story</span>
        </h1>
        <h2 className="text-2xl md:w-3/6 w-4/5 mx-auto text-black my-5 font-bold text-center ">
          The Juti Badhi Journey to Matchmaking Success
        </h2>
        <p className="text-center  md:w-3/6 w-4/5 mx-auto">
          Juti Badhi was born out of a simple yet profound idea: to create a
          platform that would help people find their life partners in a world
          increasingly dominated by virtual interactions. The founders, inspired
          by their own experiences and the desire to bring happiness to others,
          embarked on a journey to change the way we think about love and
          relationships.
        </p>
      </div>
      <Swiper
        slidesPerView={slidePerView}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper w-[100%]  md:w-[80%] mx-auto my-5"
      >
        {storys.map((story) => (
          <SwiperSlide key={story.id}>
            <SuccessCard story={story}></SuccessCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SuccessStory;
