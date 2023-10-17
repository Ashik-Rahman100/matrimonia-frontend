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
          <h2 className="max-w-lg mb-6 text-center font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="232db96b-4aa2-422f-9086-5a77996d1df1"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#232db96b-4aa2-422f-9086-5a77996d1df1)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative md:block hidden">?</span>
            </span>{" "}
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-700 md:text-lg ">
            Consider promoting the FAQ section during onboarding or through
            notifications to new users to encourage them to explore it and find
            answers to their questions.{" "}
          </p>
        </div>
        <div className="space-y-4">
          <Item
            title="Is It FREE to create profile in Marriage Media?
"
          >
            Absolutely. Creating a profile in BD Marriage is completely FREE and
            no service charge is required. Create your profile and enjoy the
            exciting services.
          </Item>
          <Item
            title="How can i create my profile on Juti Badhi?
"
          >
            It's very easy & simple. Just click Register Now to go to the
            registration page and follow the steps by filling up all the
            required information.
          </Item>
          <Item
            title="How long does it take to create my profile?
"
          >
            It will take less than 10 minutes. However, we suggest you fill up
            all information nicely so that others will get a better
            understanding of you.
          </Item>
          <Item
            title="What is Profile ID?
"
          >
            Profile ID is a unique auto-generated Id. All members have a unique
            ID on Juti Badhi. Other members can search your profile by your
            Profile ID.
          </Item>
          <Item
            title="Are my photos are secure?

"
          >
            Yes. Your photos are secure. On Juti Badhi, all photos are coded and
            tamper-proof.
          </Item>
        </div>
      </div>
    </div>
  );
};
