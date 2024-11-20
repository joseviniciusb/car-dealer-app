"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [vehicleMakes, setVehicleMakes] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2015);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    async function fetchVehicleMakes() {
      const response = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await response.json();
      setVehicleMakes(data.Results.map((item: any) => item.MakeName));
    }

    fetchVehicleMakes();
  }, []);

  useEffect(() => {
    setIsButtonDisabled(!selectedMake || !selectedYear);
  }, [selectedMake, selectedYear]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">Car Dealer Filter</h1>

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
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">Select Make</option>
              {vehicleMakes.map((make, index) => (
                <option key={index} value={make}>
                  {make}
                </option>
              ))}
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
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {[...Array(new Date().getFullYear() - 2015 + 1).keys()].map(
                (i) => (
                  <option key={i} value={2015 + i}>
                    {2015 + i}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <a href={`/result/${"lala"}/${"land"}`}>Next</a>
          </div>
        </form>
      </div>
    </div>
  );
}
