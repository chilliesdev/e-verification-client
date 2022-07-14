import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import Select from "../../components/Select";
import DATA from "../../data.json";
import Spinner from "../../components/Spinner";
import ErrorToast from "../../components/ErrorToast";

function Add() {
  const router = useRouter();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleErrors(error) {
    const errArr = error.response.data;

    if (error.response.status == 409) return errArr.message;

    let errMsg = [];
    for (let err of errArr) {
      errMsg.push(`${err.msg} ${err.param}`);
    }

    return errMsg.join("<br/>");
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/user`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLoading(false);
      router.push("/user");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setDisplayError(true);
      setMessage(handleErrors(err));
    }
  };

  return (
    <>
      <div className="mx-4 mt-4 flex justify-between">
        <h3 className="text-4xl font-bold">Add User</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
        <Input
          {...register("email")}
          label="Email"
          id="email"
          type="email"
          placeholder="email@example.com"
          required
        />
        <Input
          {...register("name")}
          label="Name"
          id="name"
          type="text"
          placeholder="Firstname Lastname"
          required
        />
        <Input
          {...register("dataOfBirth")}
          label="Date of Birth"
          id="dataOfBirth"
          type="date"
          placeholder=""
          required
        />
        <Select
          {...register("educationLevel")}
          label="Education Level"
          id="educationLevel"
          selectvalue={DATA.educationLevel}
          required
        />
        <Select
          {...register("position")}
          label="Position"
          id="position"
          selectvalue={DATA.position}
          required
        />
        <Select
          {...register("department")}
          label="Department"
          id="department"
          selectvalue={DATA.department}
          required
        />
        <Input
          {...register("staffNo")}
          label="Staff Number"
          id="staffNo"
          type="text"
          placeholder=""
          required
        />
        <Input
          {...register("password")}
          label="Password"
          id="password"
          type="password"
          placeholder=""
          required
        />
        {displayError && (
          <ErrorToast dismiss={() => setDisplayError(false)}>
            {message}
          </ErrorToast>
        )}
        <button
          disabled={loading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {loading ? <Spinner /> : `Add`}
        </button>
      </form>
    </>
  );
}

Add.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Add;
