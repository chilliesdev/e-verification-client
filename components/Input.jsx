import { forwardRef } from "react";

function Input({ label, id, className, ...props }, ref) {
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-black"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        {...props}
        className={`${
          className ? className : ""
        } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
      />
    </div>
  );
}

export default forwardRef(Input);
