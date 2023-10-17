/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { maritalOptions } from "../../Components/MaritalOptions";
import { countryOptions } from "../../Components/Countries";
import { professionOptions } from "../../Components/Occupations";
import { educationOptions } from "../../Components/EducationOptions";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.ageTo = parseInt(data.ageTo);
    data.ageFrom = parseInt(data.ageFrom);
    data.minimum = parseInt(data.minimum);
    data.maximum = parseInt(data.maximum);
    // console.log(data);
    navigate("/searchResult");
    const jsonSearchString = JSON.stringify(data);
    localStorage.setItem("searchData", jsonSearchString);
    reset();
    reset();
  };

  const startValue = 18;
  const endValue = 60;
  const options = [];
  const heightOption = [];

  // Use a for loop to generate options
  for (let i = startValue; i <= endValue; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  // height
  for (let cm = 122; cm <= 241; cm++) {
    const feet = Math.floor(cm / 30.48); // Convert cm to feet
    const inches = Math.round((cm / 2.54) % 12); // Convert cm to inches
    const displayText = `${cm} cm / ${feet}'${inches}"`;

    heightOption.push(
      <option key={cm} value={cm}>
        {displayText}
      </option>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-3 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Search Profiles</h1>

        <p className="mt-1 text-gray-500">
          "Find Your Perfect Match: Search Profiles on Marriage Media"
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="mx-auto mb-0 mt-3 max-w-md space-y-3"
      >
        <div>
          <label className="block text-black mt-1 font-bold">
            Looking for :
          </label>
          <select
            {...register("looking")}
            className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div>
          <label className="block text-black mt-1 font-bold">Age :</label>
          <div className="flex gap-3">
            <select
              {...register("ageFrom")}
              placeholder="From"
              className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              <option value={0}>From</option>
              {options}
            </select>
            <select
              {...register("ageTo")}
              placeholder="To"
              className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              <option value={0}>To</option>
              {options}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-black mt-1 font-bold">Height :</label>
          <div className="flex gap-3">
            <select
              {...register("minimum")}
              className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              <option value={0}>Minimun</option>
              {heightOption}
            </select>
            <select
              {...register("maximum")}
              className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
            >
              <option value={0}>Maximum</option>
              {heightOption}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-black mt-1 font-bold">Country :</label>
          <select
            {...register("country")}
            className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
          >
            <option value="0">Select</option>
            {countryOptions}
          </select>
        </div>

        <div>
          <label className="block text-black mt-1 font-bold">
            Marital Status :
          </label>
          <select
            {...register("mairtalStatus")}
            className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
          >
            <option value="">Select</option>
            {maritalOptions}
          </select>
        </div>
        <div>
          <label className="block text-black mt-1 font-bold">
            Profession :
          </label>
          <select
            {...register("profession")}
            className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
          >
            <option value="">Select</option>
            {professionOptions}
          </select>
        </div>
        <div>
          <label className="block text-black mt-1 font-bold">Education :</label>
          <select
            {...register("education")}
            className="w-full border  px-3 py-1 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
          >
            <option value="">Select</option>
            {educationOptions}
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 hover:bg-sky-900 duration-150 px-5 py-3 text-sm font-medium text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
