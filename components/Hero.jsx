import Input from "../components/Input";

export default function Hero() {
  return (
    <div className="h-screen w-screen flex items-center mx-auto px-4 max-w-screen-xl md:px-6">
      <div className="text-white w-3/5">
        <h1 className="text-5xl font-bold">Welcome E-Verification Center</h1>
        <h3 className="text-xl py-2">
          Please click the button below start your verification process{" "}
        </h3>
        <div className="flex items-center">
          <Input id="verify-form" placeholder="Your Matrc Number" />
          <button
            type="button"
            className="ml-3 mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 w-32ver:bg-blue-700 focus:outline-none"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
