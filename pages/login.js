import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveAccessToken } from "../slice/authSlice";
import axios from "axios";
import { useRouter } from "next/router";
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
import AppLogo from "../components/AppLogo";
import Spinner from "../components/Spinner";
import ErrorToast from "../components/ErrorToast";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const onSubmit = async (data) => {
    setDisplayError(false);
    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/auth`,
        data
      );
      setLoading(false);

      dispatch(
        saveAccessToken({
          accessToken: result.data.accessToken,
          rememberMe: data.rememberMe,
        })
      );
      router.push("/student");
    } catch (err) {
      setLoading(false);
      setDisplayError(true);
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center">
      <div className="flex w-80 justify-center items-center flex-col">
        <AppLogo />
        <h3 className="text-lg font-bold my-6">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            label="Your Email"
            id="email"
            type="email"
            placeholder="email@example.com"
            required
          />

          <Input
            {...register("password")}
            label="Your password"
            id="password"
            type="password"
            required
          />
          <CheckBox
            {...register("rememberMe")}
            label="Remember me"
            id="remember"
          />
          {displayError && (
            <ErrorToast dismiss={() => setDisplayError(false)}>
              Invalid email or password
            </ErrorToast>
          )}
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? <Spinner /> : `Login`}
          </button>
        </form>
      </div>
    </div>
  );
}
