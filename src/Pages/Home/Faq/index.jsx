/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-10">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <svg
          viewBox="0 0 24 24"
          className={`w-3 text-gray-600 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="2,7 12,17 22,7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-700">{children}</p>
        </div>
      )}
    </div>
  );
};

export const Faq = () => {
  return (
    <div className="px-4 md:py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-4 ">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className=" text-center px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              FAQ's
            </p>
          </div>
          <h2 className="max-w-lg mb-6 text-center font-sans text-3xl  font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-700 md:text-lg ">
            Most of the users asking this kind of questions which is shown in
            below with our answers.
          </p>
        </div>
        <div className="space-y-1">
          <Item
            title="How to find a quick and suitable match ?
"
          >
            Keep a constant eye on our app to view newly registered profiles. By
            viewing the given details, of the bride or groom, you can select the
            one who meets all your expectations.
          </Item>
          <Item
            title="How to active and existing plan ?
"
          >
            Choose a package that is affordable for you. Click that plan and you
            will be taken to the payment. After your payment, you will be
            activated to the premium membership.
          </Item>
          <Item
            title="How to find a nearby profile?
"
          >
            Select your preferable location in the filter option. You will get
            hundreds of profiles from your selected location.
          </Item>
          <Item
            title="Can I edit my profile after registration?
"
          >
            Yes, you can!! Contact our team (78239 21155) and tell them the
            information to change and they will update your profile
          </Item>
          <Item
            title="How to contact customer care?

"
          >
            Call this toll-free number 78239 21155 . Or else you can contact us
            via Gmail and WhatsApp. Gmail: manamaalai@nithra.mobi Whatsapp:
            9150029420
          </Item>
          <Item
            title="How to contact a profile I liked?

"
          >
            If you are interested in a profile, you can click on the favorite
            icon so that they will receive a notification of your request. If
            they accept your request, you will receive their contact details.
          </Item>
        </div>
      </div>
    </div>
  );
};
