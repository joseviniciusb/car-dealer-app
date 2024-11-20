import { useState } from "react";

export default function Home() {
  const [vehicleMakes, setVehicleMakes] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2015);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">Car Dealer Filter</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        My car
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
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

          <div>
            <label
              htmlFor="year"
              className="block text-lg font-medium text-gray-700"
            >
              Select Model Year
            </label>
            <select
              id="year"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value="2011"
            ></select>
          </div>

          <div>
            <a href={`/result/${"lala"}/${"land"}`}>Next</a>
          </div>
        </form>
      </div>
    </div>
  );
}
