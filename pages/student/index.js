import axios from "axios";
import Layout from "../../components/Layout";
import StyledLink from "../../components/StyledLink";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Student() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [students, setStudents] = useState([]);

  // const data =

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/student`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setStudents(res.data))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
      <Table data={data} />;
    </>
  );
}

Student.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const data = {
  secondaryLink: {
    name: "Edit",
    url: "/student/edit",
  },
  head: ["Product name", "Color", "Category", "Price"],
  selectedColumns: ["title", "color", "type", "price"],
  body: [
    {
      id: 1,
      title: 'Apple MacBook Pro 17"',
      color: "Sliver",
      type: "Accessories",
      price: "$2999",
    },
    {
      id: 2,
      title: 'Apple MacBook Pro 17"',
      color: "Sliver",
      type: "Accessories",
      price: "$2999",
    },
  ],
};
