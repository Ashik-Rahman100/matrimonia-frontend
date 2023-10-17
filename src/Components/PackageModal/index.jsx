/* eslint-disable react/prop-types */
const PackageModal = () => {
  // console.log("object", pack);
  return (
    <dialog id="package-modal" className="modal">
      <div className="modal-box">
        {/* <h3 className="font-bold text-lg">{pack.title} Package</h3> */}
        <h3 className=" text-lg">
          {/* Pay <span className="text-xl font-bold">{pack.price}</span> */}
        </h3>
        <h3 className=" text-lg">
          On <span className="font-bold">BKash</span>{" "}
          <span className="font-bold text-red-500 underline">01859-053543</span>{" "}
        </h3>
        <p className="py-4">Working soon....</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default PackageModal;
