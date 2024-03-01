import Slider from "react-slick";
import { SwiperSlide } from "swiper/react";
import { reviews } from "../../../Constant";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
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
    <div className="my-4 lg:my-24">
      <h2 className="text-3xl lg:text-5xl font-bold font-serif text-center my-20">
        Reviews
      </h2>
      <Slider {...settings}>
        {reviews &&
          reviews?.map((review) => (
            <SwiperSlide key={review?.id}>
              <ReviewCard key={review.id} review={review}></ReviewCard>
            </SwiperSlide>
          ))}
      </Slider>
    </div>
  );
};

export default Reviews;
