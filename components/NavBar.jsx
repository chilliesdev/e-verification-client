import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../public/logo.jpeg";
import StyledLink from "./StyledLink";

export default function NavBar() {
  const [accessToken, setAccessToken] = useState(null);
  const newAccessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    setAccessToken(newAccessToken);
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800 absolute w-screen">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <StyledLink href="/" className="flex items-center">
          <span className="mr-3">
            <Image src={Logo} alt="Logo" height={24} width={24} />
          </span>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            E Verification Portal
          </span>
        </StyledLink>
        <div className="flex items-center">
          {accessToken ? (
            <StyledLink
              href="/logout"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Logout
            </StyledLink>
          ) : (
            <StyledLink
              href="/login"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </StyledLink>
          )}
        </div>
      </div>
    </nav>
  );
}
