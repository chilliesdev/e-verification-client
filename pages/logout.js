import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAccessToken } from "../slice/authSlice";
import { useRouter } from "next/router";

export default function logout() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAccessToken());
    router.push("/");
  }),
    [];

  return <></>;
}
