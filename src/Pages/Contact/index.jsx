/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import contact from "../../assets/contact.gif";

const notify = () => toast.success("Thank you for contact us");

const Contacts = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    notify();
    reset();
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_8u1rkf8", "template_6jcivzm", form.current, {
        publicKey: "Dh0HzYkiVYLzRZFtY",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          notify();
          reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Something went wrong");
        }
      );
  };

  return (
    <div className="mt-16">
      <Toaster />
      <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32">
        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold leadi lg:text-5xl">
              Let's talk!
            </h2>
            <div className=" w-4/6">
              If You have any Suggestions or Query then You Can Contact us. We
              will reply you soon.
            </div>
            <p className=" w-4/6">
              <span className="font-bold">Address: </span>
              21/A,Road/2,Block-A,Aftab Nagar(Besides East West
              University),Merul Badda,Dhaka-1212. 1212. Dhaka, Dhaka Division,
              Bangladesh
            </p>
            <h2 className="font-bold">Mobile: +880 1000 20000</h2>
          </div>
          <img
            src={contact}
            alt=""
            className="hidden md:block p-6 md:h-4/5 h-fit md:w-5/6 w-2/4 "
          />
        </div>
        <form
          ref={form}
          onSubmit={sendEmail}
          noValidate=""
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="text-sm font-bold">
              Full name
            </label>
            <input
              type="text"
              {...register("user_name")}
              placeholder="Enter Your Name"
              name="user_name"
              className="w-full p-3 rounded border border-black"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-bold">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              {...register("user_email", { required: true })}
              placeholder="Enter your Email"
              className="w-full p-3 rounded  border border-black"
            />
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-bold">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              {...register("subject")}
              placeholder="Subject"
              className="w-full p-3 rounded  border border-black"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-bold">
              Message
            </label>
            <textarea
              rows="3"
              {...register("message", { required: true })}
              name="message"
              placeholder="Write your Message"
              className="w-full p-3 rounded  border border-black"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-900 duration-150"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
