import { forwardRef } from "react";

function CheckBox({ label, id, ...props }, ref) {
  return (
    <div className="flex items-start mb-6">
      <div className="flex items-center h-5">
        <input
          {...props}
          ref={ref}
          id={id}
          type="checkbox"
          value=""
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3"
        />
      </div>
      <label
        htmlFor="remember"
        className="ml-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
    </div>
  );
}

export default forwardRef(CheckBox);
