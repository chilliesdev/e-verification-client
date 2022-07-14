import { forwardRef } from "react";

// @selectvalue[{ name, value }]
function Select({ label, selectvalue, ...props }, ref) {
  return (
    <div className="mb-6">
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        ref={ref}
        {...props}
        id={props.id}
        defaultValue="DEFAULT"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="DEFAULT" disabled>
          Select one
        </option>
        {selectvalue.map(({ name, value }) => (
          <option value={value} key={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
