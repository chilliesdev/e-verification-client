import AppLogo from "../components/AppLogo";

function verified({ data }) {
  return (
    <div className="w-screen h-screen flex items-center flex-col pt-20 text-lg uppercase">
      <AppLogo />
      <strong className="mb-7">{`Reciept for verification (${new Date(
        Date.now()
      ).toDateString()})`}</strong>

      <table className="border-collapse w-1/2">
        <tbody>
          <TableRow label="Name">{data.name}</TableRow>
          <TableRow label="Matric Number">{data.matricNumber}</TableRow>
          <TableRow label="Date Of Birth">
            {new Date(data.dataOfBirth).toLocaleDateString()}
          </TableRow>
          <TableRow label="Level">{data.level}</TableRow>
          <TableRow label="Faculty">{data.faculty}</TableRow>
          <TableRow label="Department">{data.department}</TableRow>
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ label, children }) {
  return (
    <tr>
      <td className="border-4 border-black p-2">{label}:</td>
      <td className="border-4 border-black p-2">{children}</td>
    </tr>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { matricNumber } = context.query;

  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/verify`, {
    method: "POST",
    body: JSON.stringify({
      matricNumber: matricNumber,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default verified;
