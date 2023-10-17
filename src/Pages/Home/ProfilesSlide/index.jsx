/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
import Cookies from "universal-cookie";
import HomeSearchCard from "../../../Components/HomeSearchCard";

export default function ProfilesSlide() {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");

  const { data: usersProfile = [] } = useQuery({
    queryKey: ["usersas"],
    queryFn: async () => {
      const res = await fetch(
        "https://matrimoni-ashik-rahman100.vercel.app/api/v1/user"
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
  // let slidesPerView = 4; // Default value for large screens
  // let spacePerView = 10; // Default value for large screens

  // if (window?.innerWidth <= 768) {
  //   slidesPerView = 1; // Small screens
  //   spacePerView = 200;
  // } else if (window?.innerWidth <= 1024) {
  //   slidesPerView = 2; // Medium screens
  //   spacePerView = 40;
  // }

  let settings = {
    centerMode: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
          slidesToShow: 2,
          autoplay: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          speed: 500,
          fade: true,
          cssEase: "linear",
        },
      },
    ],
  };
  return (
    <div className="mt-20 md:mt-20 lg:mt-20">
      <h1 className="text-3xl text-black  text-center lg:text-5xl  font-bold">
        <span className="font-libre">Profiles</span>
      </h1>
      <h2 className="text-3xl  my-5 font-bold text-center ">
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

      {/* swiper carousel */}
      {/* <Swiper */}
      {/* ref={swiperRef} */}
      {/* slidesPerView={slidesPerView} */}
      {/* spaceBetween={spacePerView} */}
      {/* loop={true} */}
      {/* pagination={{ */}
      {/* clickable: true, */}
      {/* }} */}
      {/* modules={[Pagination, Autoplay]} */}
      {/* autoplay={{ */}
      {/* delay: 1500, */}
      {/* disableOnInteraction: false, */}
      {/* }} */}
      {/* className="mySwiper w-[85%] mx-auto" */}
      {/* > */}
      {/* {usersProfile && */}
      {/* usersProfile?.map((user) => ( */}
      {/* <SwiperSlide key={user?._id}> */}
      {/* <ProfileCard data={data} userEmail={userEmail}></ProfileCard> */}
      {/* <HomeSearchCard key={user._id} user={user}></HomeSearchCard> */}
      {/* </SwiperSlide> */}
      {/* ))} */}
      {/* </Swiper> */}

      {/*React slick carousel */}
      <Slider {...settings}>
        {usersProfile &&
          usersProfile?.map((user) => (
            <SwiperSlide key={user?._id}>
              {/* <ProfileCard data={data} userEmail={userEmail}></ProfileCard> */}
              <HomeSearchCard key={user._id} user={user}></HomeSearchCard>
            </SwiperSlide>
          ))}
      </Slider>
    </div>
  );
}
