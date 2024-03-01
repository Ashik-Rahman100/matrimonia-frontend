import { PhotoProvider, PhotoView } from "react-photo-view";
import img from "../../../assets/r4.jpg";

/* eslint-disable react/prop-types */
const ReviewCard = ({ review }) => {
  const { name, rating, description, image } = review;
  return (
    <div >
      <div className="card card-compact w-full lg:w-96 bg-base-100 shadow-xl">
        <figure>
          <PhotoProvider>
            <PhotoView src={img}>{image}</PhotoView>
          </PhotoProvider>
        </figure>
        <div className="card-body my-6">
        <h2 className=" card-title flex justify-center ">{name}</h2>
        <div className="flex justify-between mt-4">
        <p>rating {rating}</p>
        <div className="rating">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
       
        </div>
        <p>{description}</p>
      </div>
      </div>
      
    </div>
  );
};

export default ReviewCard;
