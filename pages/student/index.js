import axios from "axios";
import Layout from "../../components/Layout";
import StyledLink from "../../components/StyledLink";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Student() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const data = {
    secondaryLink: {
      name: "Edit",
      url: "/student/edit",
    },
    head: [
      "Name",
      "Matric Number",
      "Date Of Birth",
      "Level",
      "Faculty",
      "Department",
    ],
    selectedColumns: [
      "name",
      "matricNumber",
      "dataOfBirth",
      "level",
      "faculty",
      "department",
    ],
    body: [],
  };

  const [students, setStudents] = useState(data);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/student`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setStudents({ ...students, body: res.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [accessToken, students]);

  return (
    <>
      <div className="mx-4 mt-4 flex justify-between">
        <h3 className="text-4xl font-bold">Students</h3>
        <StyledLink
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          href="/student/add"
        >
          Add Student
        </StyledLink>
      </div>
      <Table data={students} />;
    </>
  );
}

Student.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
