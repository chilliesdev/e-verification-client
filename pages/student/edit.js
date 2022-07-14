import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import Select from "../../components/Select";
import DATA from "../../data.json";

export default function Edit() {
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
      console.log(value, name, type);
      if (name === "faculty") {
        setDepartment(
          DATA.faculty.filter((data) => data.value === value.faculty)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="mx-4 mt-4 flex justify-between">
        <h3 className="text-4xl font-bold">Edit Student</h3>
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
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Edit
        </button>
      </form>
    </>
  );
}

Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
