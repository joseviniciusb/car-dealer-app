export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">Car Dealer Filter</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        My car
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-5">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="make"
              className="block text-lg font-medium text-gray-700"
            >
              Select Vehicle Make
            </label>
            <select
              id="make"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={0}
            >
              <option value="">Select Make</option>
              veh make
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
