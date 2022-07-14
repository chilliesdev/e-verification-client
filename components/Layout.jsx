import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAccessToken } from "../slice/authSlice";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

export default function Layouts({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
      dispatch(removeAccessToken());
      router.push("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <main className="pt-16 flex h-screen w-screen">
        {" "}
        <Sidebar />
        <div className="w-full">{children}</div>
      </main>
    </>
  );
}
