/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
const ChooseMarriage = () => {
  return (
    <div className="sm:flex items-center justify-around w-5/6 mx-auto md:my-28 my-10">
      {/* Video */}
      <div className="md:w-1/2">
        <iframe
          className="w-full h-96"
          src="https://www.youtube.com/embed/fbd6lsLV_3k?si=JAe2TNi0eHWmnVrm"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Text */}
      <div className="md:w-3/6 w-4/5 md:p-8 pt-8 mx-auto md:my-20 my-2">
        <h2 className="text-3xl font-bold mb-4 ">
          Why Choose <span className="text-red-600">Marriage Media</span>
        </h2>
        <p className="text-gray-700 ">
          Our advanced matchmaking algorithms consider your unique preferences,
          values, and aspirations to connect you with like-minded individuals
          who are genuinely compatible with you.
        </p>
        <p className="text-gray-700">
          In today's fast-paced world, Marriage Media provides a convenient and
          efficient way to meet potential partners without the pressure of
          traditional dating methods.
        </p>
        <p className="text-gray-700">
          Our commitment is to help you find not just a partner but a lifelong
          companion, someone to share your dreams, joys, and challenges.
        </p>
      </div>
    </div>
  );
};

export default ChooseMarriage;
