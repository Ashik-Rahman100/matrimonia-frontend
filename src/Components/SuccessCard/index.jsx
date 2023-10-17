/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { PhotoProvider, PhotoView } from "react-photo-view";
import imge from "../../assets/marriage.jpg";
const SuccessCard = ({ story }) => {
  return (
    <div className="card lg:card-side lg:h-64 bg-base-100 shadow-xl mx-10 mb-16 ">
      <figure>
        <PhotoProvider>
          <PhotoView src={story.pic ? story.pic : imge}>
            <img
              src={story.pic ? story.pic : imge}
              alt="Album"
              className="w-full lg:h-full object-fit"
            />
          </PhotoView>
        </PhotoProvider>
      </figure>
      <div className=" w-4/5 ml-4 ">
        <h2 className="card-title">{story.name}</h2>
        <p className=" h-2/4 w-full">
          {story.details.slice(0, 150)}
          <button
            onClick={() => document.getElementById(story.id).showModal()}
            className="font-bold"
          >
            {story.details.length > 149 && "...Read more"}
          </button>
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        </p>
      </div>
      <dialog id={story.id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{story.name}'s Success Story</h3>
          <p className="py-4">{story.details}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SuccessCard;
