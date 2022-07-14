import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import ErrorToast from "./ErrorToast";
import Spinner from "./Spinner";

export default function Hero() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [message, setMessage] = useState("");

  function handleErrors(error) {
    const errArr = error.response.data;

    if (error.response.status == 400) return errArr.message;

    let errMsg = [];
    for (let err of errArr) {
      errMsg.push(`${err.msg} ${err.param}`);
    }

    return errMsg.join("<br/>");
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/verify`, data);
      setLoading(false);
      router.push({
        pathname: "/verified",
        query: {
          matricNumber: data.matricNumber,
        },
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setDisplayError(true);
      setMessage(handleErrors(err));
    }
  };

  return (
    <div className="h-screen w-screen flex items-center mx-auto px-4 max-w-screen-xl md:px-6">
      <div className="text-white w-3/5">
        <h1 className="text-5xl font-bold">Welcome E-Verification Center</h1>
        <h3 className="text-xl py-2">
          Please click the button below start your verification process{" "}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <Input
              {...register("matricNumber")}
              id="verify-form"
              placeholder="Your Matric Number"
            />
            <button
              disabled={loading}
              type="submit"
              className="ml-3 mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 w-32ver:bg-blue-700 focus:outline-none"
            >
              {loading ? <Spinner /> : `Verify`}
            </button>
          </div>
          {displayError && (
            <ErrorToast dismiss={() => setDisplayError(false)}>
              {message}
            </ErrorToast>
          )}
        </form>
      </div>
    </div>
  );
}
