import Image from "next/image";
import StyledLink from "./StyledLink";
import Logo from "../public/logo.jpeg";

export default function AppLogo() {
  return (
    <StyledLink href="/" className="flex items-center">
      <span className="mr-3">
        <Image src={Logo} alt="Logo" height={24} width={24} />
      </span>
      <span className="self-center text-xl font-semibold whitespace-nowrap">
        E Verification Portal
      </span>
    </StyledLink>
  );
}
