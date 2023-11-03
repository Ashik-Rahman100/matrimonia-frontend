/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import PackageCard from "../../../Components/PackageCard";

const Packages = () => {
  const { data: packages, refetch } = useQuery({
    queryKey: ["categoriy"],
    queryFn: async () => {
      const res = await fetch(
        "https://matrimoni-ashik-rahman100.vercel.app/api/v1/package"
      );
      const data = await res.json();
      // refetch();
      return data.message;
    },
  });

  return (
    <div className=" container px-4 mx-auto py-24  text-black ">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <span className=" tracki uppercase text-black text-3xl lg:text-5xl font-libre font-bold">
          Membership <span className="text-red-600">Plans</span>
        </span>
        <h2 className="text-4xl text-black font-bold mt-4">
          Choose your best plan
        </h2>
        <p className="mt-5">
          Primarily it`s free to search any profiles. Upgrade For customized the
          search. With a paid membership, you can seamlessly connect with your
          prospects and get more responses. Many have found their love. Are you
          ready to meet your Soul Mate?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-4">
        {packages?.map((pack) => (
          <PackageCard pack={pack} key={pack.id} id={pack._id}></PackageCard>
        ))}
      </div>
    </div>
  );
};

export default Packages;
