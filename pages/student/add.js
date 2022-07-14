import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ErrorToast from "../../components/ErrorToast";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import Select from "../../components/Select";
import Spinner from "../../components/Spinner";
import DATA from "../../data.json";

export default function Add({ data }) {
  const router = useRouter();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [department, setDepartment] = useState([]);
  watch("faculty");
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "faculty") {
        setDepartment(
          DATA.faculty.filter((data) => data.value === value.faculty)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/student`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLoading(false);
      router.push("/student");
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
        <h3 className="text-4xl font-bold">Add Student</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
        <Input
          {...register("name")}
          label="Name"
          id="name"
          type="text"
          placeholder="Firstname Lastname"
          required
        />
        <Input
          {...register("matricNumber")}
          label="Matric Number"
          id="matricNumber"
          type="text"
          placeholder=""
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
          {...register("level")}
          label="Level"
          id="level"
          selectvalue={DATA.level}
          required
        />
        <Select
          {...register("faculty")}
          label="Faculty"
          id="faculty"
          selectvalue={DATA.faculty}
          required
        />
        <Select
          {...register("department")}
          label="Department"
          id="department"
          selectvalue={department.length > 0 ? department[0].department : []}
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
