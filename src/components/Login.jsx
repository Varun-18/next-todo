import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Toast from "alerts/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "yupSchema/schema";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async ({ username, password }) => {
    const data = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/todos",
    });
    console.log(data, "*** sigin in data ***", status);
    if (data.error) {
      Toast.fire({ icon: "error", title: data.error });
    } else {
      router.push("/todos");
      Toast.fire({ icon: "success", title: `Welcome ` });
    }
  };

  const googleSignIn = async () => {
    const loading = toast.loading("toast is loading", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    try {
      await signIn("google", { callbackUrl: "/todos" });
      toast.update(loading, {
        render: "login successful",
        type: "success",
        isLoading: false,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      // Toast.fire({ icon: "warning", title: "please try again" });
    }
  };

  useEffect(() => {
    console.log(status);
    if (status === "authenticated") {
      router.replace("/todos");
    }
  }, [status, router]);

  return (
    <section className="text-gray-400 bg-gray-900 body-font flex items-center">
      <div className="mx-auto lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full sm:mt-10 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-white text-lg font-medium title-font mb-5 ">
            Login
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
            <Typography sx={{ color: "red", m: 1 }}>
              {errors.username?.message}
            </Typography>
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

            <Typography sx={{ color: "red", m: 1 }}>
              {errors.password?.message}
            </Typography>
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full">
            Login
          </button>
          <div className="my-4 flex items-center">
            <hr className="border-white  w-full" />
            <span className="px-2">OR</span>
            <hr className="border-white  w-full" />
          </div>
        </form>
        <button
          className="flex items-center justify-center text-white bg-slate-800 border-s-white py-2.5 px-8 focus:outline-none hover:bg-white hover:text-black rounded text-lg w-full"
          onClick={() => googleSignIn()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
        <button className="mt-2" onClick={() => router.push("/signup")}>
          Don't have an account Signup ?
        </button>
      </div>
    </section>
  );
};

export default Login;
