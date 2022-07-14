import StyledLink from "../components/StyledLink";

export default function Table({ data }) {
  function TableHead() {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {data.head.map((item) => (
            <TableHeadItem key={item}>{item}</TableHeadItem>
          ))}
          <TableHeadItem>
            <span className="sr-only">Edit</span>
          </TableHeadItem>
        </tr>
      </thead>
    );
  }

  function TableHeadItem({ children }) {
    return (
      <th scope="col" className="px-6 py-3">
        {children}
      </th>
    );
  }

  function TableBody() {
    return (
      <tbody>
        {data.body.map((row) => (
          <TableRow key={row._id} columnData={row} />
        ))}
      </tbody>
    );
  }

  function TableRow({ columnData }) {
    let column = [];

    for (let key of Object.keys(columnData)) {
      if (column.length < 1 && key !== "_id") {
        column.push(<TableTitleCol key={key}>{columnData[key]}</TableTitleCol>);
      } else if (data.selectedColumns.indexOf(key) !== -1) {
        column.push(<TableCol key={key}>{columnData[key]}</TableCol>);
      }
    }

    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        {column}
        <TableColLink id={columnData._id} />
      </tr>
    );
  }

  function TableCol({ children }) {
    return <td className="px-6 py-4">{children}</td>;
  }

  function TableTitleCol({ children }) {
    return (
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {children}
      </th>
    );
  }

  function TableColLink({ id }) {
    return (
      <td className="px-6 py-4 text-right">
        <StyledLink
          href={`${data.secondaryLink.url}/${id}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {data.secondaryLink.name}
        </StyledLink>
      </td>
    );
  }

  return (
    <div className="m-4 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
}
