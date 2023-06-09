import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const router = useRouter();
  const { status } = useSession();

  const { register, handleSubmit } = useForm();
  const onSubmit = async ({ username, email, password }) => {
    const { data } = await axios.post("/api/signup", {
      username,
      email,
      password,
    });
    console.log(data);
    if (data) {
      router.replace("/");
    }
  };

  const googleSignIn = () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/todos");
    }
  }, [status,router]);

  return (
    <section className="text-gray-400 bg-gray-900 body-font  flex items-center">
      <div className="mx-auto lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full sm:mt-10 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-white text-lg font-medium title-font mb-5 ">
            Sign Up
          </h2>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">
              username
            </label>
            <input
              {...register("username")}
              type="text"
              id="name"
              name="username"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              email
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              name="email"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-400"
            >
              password
            </label>
            <input
              {...register("password")}
              type="text"
              id="password"
              name="password"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Signup
          </button>
          <div className="my-4 flex items-center">
            <hr className="border-white  w-full" />
            <span className="px-2">OR</span>
            <hr className="border-white  w-full" />
          </div>
          <button
            type="button"
            className="text-white bg-slate-800 border-s-white py-2 px-8 focus:outline-none hover:bg-white hover:text-black rounded text-lg w-full"
            onClick={() => googleSignIn()}
          >
            Google
          </button>
        </form>
        <button className="mt-2" onClick={() => router.push("/")}>
          Already have an account Login ?
        </button>
      </div>
    </section>
  );
};

export default Signup;
