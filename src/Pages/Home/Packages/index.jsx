/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import PackageCard from "../../../Components/PackageCard";

const Packages = () => {
  const { data: packages, refetch } = useQuery({
    queryKey: ["categoriy"],
    queryFn: async () => {
      const res = await fetch(
        "https://marriage-media-server-ongbh0igr-th-raju.vercel.app/api/v1/package"
      );
      const data = await res.json();
      // refetch();
      return data.message;
    },
  });

  return (
    <div className=" container px-4 mx-auto pt-20  text-black mb-10">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <span className=" tracki uppercase text-black text-xl font-bold">
          Membership <span className="text-red-600">Plans</span>
        </span>
        <h2 className="text-4xl text-black font-bold lg:text-5xl">
          Choose your best plan
        </h2>
        <p className="mt-5">
          Primarily it`s free to search any profiles. Upgrade For customized the
          search. With a paid membership, you can seamlessly connect with your
          prospects and get more responses. Many have found their love. Are you
          ready to meet your Soul Mate?
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center-mx-4 gap-6">
        {packages?.map((pack) => (
          <PackageCard pack={pack} key={pack.id} id={pack._id}></PackageCard>
        ))}
      </div>
    </div>
  );
};

export default Packages;
