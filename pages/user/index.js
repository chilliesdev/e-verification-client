import Layout from "../../components/Layout";
import StyledLink from "../../components/StyledLink";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { store } from "../../store";

export default function User() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const data = {
    secondaryLink: {
      name: "Edit",
      url: "/user/edit",
    },
    head: [
      "Email",
      "name",
      "date Of Birth",
      "education Level",
      "position",
      "department",
      "staffNo",
    ],
    selectedColumns: [
      "email",
      "name",
      "dataOfBirth",
      "educationLevel",
      "position",
      "department",
      "staffNo",
    ],
    body: [],
  };
  const [users, setUsers] = useState(data);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUsers({ ...users, body: res.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div className="mx-4 mt-4 flex justify-between">
        <h3 className="text-4xl font-bold">Users</h3>
        <StyledLink
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          href="/user/add"
        >
          Add User
        </StyledLink>
      </div>
      <Table data={users} />;
    </>
  );
}

User.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// export async function getServerSideProps() {
//   const data = await store.getState();
//   console.log("TEST");

//   return { props: { data } };
// }
