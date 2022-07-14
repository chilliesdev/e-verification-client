import Link from "next/link";

export default function StyledLink({ children, ...props }) {
  return (
    <Link href={props.href} {...props}>
      <a className={props.className}>{children}</a>
    </Link>
  );
}
