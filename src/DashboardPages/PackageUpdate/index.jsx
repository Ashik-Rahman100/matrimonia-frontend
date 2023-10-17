import { useForm } from "react-hook-form";

const PackageUpdate = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const { title, price, detail } = data;

    let updateData = { title };
    if (price !== "") {
      updateData = { title, price };
    }

    if (detail !== "") {
      updateData = { title, price, detail };
    }

    fetch(
      "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/package",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    ).then((res) => res.json());

    reset();
  };

  const packageName = ["Free", "Silver", "Gold", "Diamond"];

  return (
    <div className="md:w-5/6 mx-auto p-7">
      <h2 className="text-5xl font-semibold mb-10">Package Info Update</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Package Title</span>
            </label>
            <select
              className="select w-full focus:outline-0 focus:border-blue-500 border-gray-400 text-black "
              {...register("title")}
            >
              {packageName.map((pkg) => (
                <option key={pkg} value={pkg} className="text-black  ">
                  {pkg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Package Price</span>
            </label>
            <input
              type="text"
              className="input w-full input-bordered  focus:outline-0 focus:border-blue-500 "
              placeholder="Price"
              {...register("price")}
            />
          </div>
          <div className="col-span-2">
            <label className="label ">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 w-full focus:outline-0 focus:border-blue-500"
              {...register("detail")}
              placeholder="Description..."
            ></textarea>
          </div>
          <input
            type="submit"
            className="btn bg-sky-600 hover:bg-sky-900  col-span-2 text-white"
            value=" Add Package"
          />
        </div>
      </form>
    </div>
  );
};

export default PackageUpdate;
