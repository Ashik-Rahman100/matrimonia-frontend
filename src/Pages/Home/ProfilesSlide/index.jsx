/* eslint-disable react/no-unescaped-entities */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { useEffect, useRef, useState } from "react";
import HomeSearchCard from "../../../Components/HomeSearchCard";

export default function ProfilesSlide() {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");

  const { data: usersProfile = [] } = useQuery({
    queryKey: ["usersas"],
    queryFn: async () => {
      const res = await fetch(
        "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/user"
      );
      const data = await res.json();
      const filteredData = data?.message?.filter(
        (user) => user?.email !== userEmail && user.role !== "super_admin"
      );

      const loopedData = filteredData?.concat(filteredData);

      return loopedData;
    },
  });

  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperInitialized && swiperRef.current) {
      swiperRef?.current?.swiper?.autoplay.start();
      setSwiperInitialized(true);
    }
  }, [swiperInitialized]);

  // console.log("userProfile: ", usersProfile);

  // Determine the number of slides per view based on screen size
  let slidesPerView = 4; // Default value for large screens
  let spacePerView = 10; // Default value for large screens

  if (window?.innerWidth <= 768) {
    slidesPerView = 1; // Small screens
    spacePerView = 200;
  } else if (window?.innerWidth <= 1024) {
    slidesPerView = 2; // Medium screens
    spacePerView = 40;
  }

  return (
    <div className="md:my-24 my-14">
      <h1 className="text-3xl text-center  font-bold">
        Browse <span className="text-red-600">Profiles</span>
      </h1>
      <h2 className="text-3xl text-black my-5 font-bold text-center lg:text-5xl">
        Choose best Profile for yourself
      </h2>
      {/* <img src="./src/assets/ab.jpg" alt="abc" width="100px"></img> */}
      {/* <p className="text-center  md:w-3/6 w-4/5 mx-auto">
        Explore a world of possibilities in our 'Browse Profiles' section.
        Discover a diverse community of individuals seeking meaningful
        connections and lifelong partnerships. With detailed profiles, stunning
        photos, and compatibility indicators, finding your ideal match has never
        been easier. Start your journey towards a loving and lasting
        relationship by browsing through our carefully curated profiles today
      </p> */}
      <Swiper
        ref={swiperRef}
        slidesPerView={slidesPerView}
        spaceBetween={spacePerView}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        className="mySwiper w-[80%] mx-auto"
      >
        {usersProfile &&
          usersProfile?.map((user) => (
            <SwiperSlide key={user?._id}>
              {/* <ProfileCard data={data} userEmail={userEmail}></ProfileCard> */}
              <HomeSearchCard key={user._id} user={user}></HomeSearchCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
