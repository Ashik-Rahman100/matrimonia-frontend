/* eslint-disable react/no-unescaped-entities */
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import img1 from "../../../assets/1.jpg";
import img3 from "../../../assets/3.jpg";
import img4 from "../../../assets/4.jpg";
import img5 from "../../../assets/5.jpg";
import img7 from "../../../assets/7.jpg";

const SpecialMoments = () => {
  return (
    <div className="lg:my-28 my-4">
      <div>
        <h1 className="text-3xl font-bold text-center font-libre">
          Special <span className="text-red-600">Moments</span>
        </h1>
        <p className="text-center md:w-3/6 w-4/5 mx-auto my-5">
          Our 'Special Moments' feature is where you'll find a collection of
          heartwarming stories, from engagement tales that begin the journey to
          lifelong commitments, to the enchanting weddings that mark the start
          of a new chapter. It's where couples share their experiences, from the
          first 'hello' to the 'I do.'
        </p>
      </div>
      <section className="pb-6 ">
        <div className="container flex flex-wrap gap-4 p-4 mx-auto  items-center justify-center">
          <PhotoProvider>
            <PhotoView src={img1}>
              <img
                alt=""
                className=" md:w-56 w-5/6 h-auto rounded shadow-sm min-h-56 dark:bg-gray-500 aspect-square object-fit"
                src={img1}
              />
            </PhotoView>
          </PhotoProvider>

          <PhotoProvider>
            <PhotoView src={img3}>
              <img
                alt=""
                className=" md:w-56 w-5/6 h-auto rounded shadow-sm min-h-56 dark:bg-gray-500 aspect-square object-cover"
                src={img3}
              />
            </PhotoView>
          </PhotoProvider>
          <PhotoProvider>
            <PhotoView src={img4}>
              <img
                alt=""
                className=" md:w-56 w-5/6 h-auto rounded shadow-sm min-h-56 dark:bg-gray-500 aspect-square object-cover"
                src={img4}
              />
            </PhotoView>
          </PhotoProvider>
          <PhotoProvider>
            <PhotoView src={img5}>
              <img
                alt=""
                className=" md:w-56 w-5/6 h-auto rounded shadow-sm hidden lg:block min-h-56 dark:bg-gray-500 aspect-square object-cover"
                src={img5}
              />
            </PhotoView>
          </PhotoProvider>

          <PhotoProvider>
            <PhotoView src={img7}>
              <img
                alt=""
                className="md:w-56 w-5/6 h-auto rounded hidden lg:block shadow-sm min-h-56 dark:bg-gray-500 aspect-square object-cover"
                src={img7}
              />
            </PhotoView>
          </PhotoProvider>
        </div>
      </section>
    </div>
  );
};

export default SpecialMoments;
