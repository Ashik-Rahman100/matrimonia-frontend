/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
const ChooseMarriage = () => {
  return (
    <div className="sm:flex items-center justify-around w-5/6 mx-auto md:mt-12 mt-10">
      {/* Video */}
      <div className="md:w-1/2">
        <iframe
          className="w-full h-96"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/TeZ9y70Ea04?si=9D6CjdHJHA2hYMSk"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      {/* Text */}
      <div className="md:w-3/6 w-4/5 md:p-8 pt-8 mx-auto md:my-20 my-2">
        <h2 className="text-3xl font-libre font-bold lg:text-5xl mb-4 ">
          Why Choose <span className="text-red-600">Matromonia</span>
        </h2>
        <p className="text-gray-700 ">
          Are you wondering why matrimonial websites are the most preferable way
          of searching for life partners? Why do you need to use an online
          matrimonial site for finding a life partner? Is it worthwhile? and
          benefits of matrimonial websites. You can find all the answers to
          these questions in this blog. Marriage is the most important stage to
          start your life.
        </p>
        <p className="text-gray-700">
          Marriage is not just contained two individual's life but also includes
          the happiness and prosperity of two families. When choosing a life
          partner you have to be very careful and cautious, you should put a lot
          of thought into it. 
        </p>
        <p className="text-gray-700">
          Therefore, the matrimonial site advantages you that you will have the
          chance to meet your soulmate and have a conversation for a better
          understanding on both sides. In this modern world, everything has
          become advanced, including the matrimonial site. Here you can find the
          most preferable way and pros of matrimonial websites.
        </p>
      </div>
    </div>
  );
};

export default ChooseMarriage;
