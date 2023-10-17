import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const Footer = () => {
  let year = new Date();
  let now = year.getFullYear();
  return (
    <footer className="bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-800 mb-9 lg:text-left">
              "Connect with Love: Your Trusted Partner in Finding Lasting
              Happiness At Juti Badhi, we're dedicated to helping you find your
              perfect match. Our mission is to bring hearts together, fostering
              love, commitment, and companionship. With a diverse community and
              innovative matchmaking tools, we're here to support your journey
              to a joyful and enduring marriage. Join us today, and let love
              lead the way."
            </p>
          </div>
          <div>
            <h1 className="font-libre font mb-28 text-4xl font-bold text-center">
              Marriage-Media
            </h1>
            <ul className="mt-8 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
              <Link to="/">
                <li>
                  <p className="text-gray-700 transition hover:text-gray-700/75">
                    Home
                  </p>
                </li>
              </Link>

              <Link to="/search">
                <li>
                  <p className="text-gray-700 transition hover:text-gray-700/75">
                    Search
                  </p>
                </li>
              </Link>

              <Link to="/packages">
                <li>
                  <p className="text-gray-700 transition hover:text-gray-700/75">
                    Plans
                  </p>
                </li>
              </Link>

              <Link to="/contact">
                <li>
                  <p className="text-gray-700 transition hover:text-gray-700/75">
                    Contact
                  </p>
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2022 to {now} All rights reserved by{" "}
          <span className="underline-offset-2 underline text-blue-950">
            <Link to="https://tofajjol-hosen-raju.web.app/" target="__blank">
              {" "}
              TH Raju
            </Link>
          </span>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
