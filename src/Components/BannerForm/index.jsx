import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { countryOptions } from "../Countries";
import { maritalOptions } from "../MaritalOptions";
const BannerForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.from = parseInt(data.from);
    data.to = parseInt(data.to);
    // console.log(data);
    navigate("/homeSearchResult");
    const jsonString = JSON.stringify(data);
    localStorage.setItem("homeSearchData", jsonString);
    reset();
  };

  const startValue = 18;
  const endValue = 80;
  const options = [];

  // Use a for loop to generate options
  for (let i = startValue; i <= endValue; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex  gap-3 md:justify-center">
          <div>
            <label className="block text-black my-3 font-bold">
              Looking for
            </label>
            <select
              {...register("looking")}
              className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
          <div>
            <label className="block text-black my-3 font-bold">Age</label>
            <select
              {...register("from", { required: true })}
              placeholder="From"
              className="w-full border  px-2 py-2  rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              <option value={18}>From</option>
              {options}
            </select>
          </div>
          <div className="md:mt-9">
            <select
              {...register("to", { required: true })}
              className="w-full border mt-3  px-2 py-2 mr-6 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              <option value={80}>To</option>
              {options}
            </select>
          </div>
          <div>
            <label className="block text-black my-3 font-bold">Country</label>
            <select
              {...register("country")}
              className="w-full border  px-2 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              {countryOptions}
            </select>
          </div>
          {/* <div>
            <label className="block text-black my-3 font-bold">
              Profile ID
            </label>
            <input
              type="text"
              {...register("profileId")}
              className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            />
          </div> */}

          <div>
            <label className="block text-black my-3 font-bold">
              Marital Status
            </label>
            <select
              {...register("mairtalStatus")}
              className="w-full border  px-4 py-2 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              <option value="">Select</option>
              {maritalOptions}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-3 block w-full p-3 text-center rounded bg-blue-700 text-white hover:bg-indigo-800"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default BannerForm;
