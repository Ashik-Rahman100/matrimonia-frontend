import { PhotoProvider, PhotoView } from "react-photo-view";

/* eslint-disable react/prop-types */
const ReviewCard = ({ review }) => {
  const { name, img, rating, description } = review;
  return (
    <div className="bg-base-200 mx-4 p-4 rounded">
       
      <div className="flex justify-center items-center">
      <figure>
        <PhotoProvider>
          <PhotoView src={img}>
            <img
              src={img}
              alt="Shoes"
              className="h-40 object-fill w-40 rounded-full border border-blue-400 "
            />
          </PhotoView>
        </PhotoProvider>
      </figure>
      </div>
      <div className="text-center">
        <h2 className="mt-2">{name}</h2>
        <p>rating {rating}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
