"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "./components/Loading";

interface VehicleModel {
  MakeName: string;
}

export default function Home() {
  const [vehicleMakes, setVehicleMakes] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2015);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

  useEffect(() => {
    async function fetchVehicleMakes() {
      const response = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await response.json();
      setVehicleMakes(data.Results.map((item: VehicleModel) => item.MakeName));
    }

    fetchVehicleMakes();
  }, []);

  useEffect(() => {
    setIsButtonDisabled(!selectedMake || !selectedYear);
  }, [selectedMake, selectedYear]);

  const handleNextClick = () => {
    setIsLoadingNextPage(true);
    setTimeout(() => {
      setIsLoadingNextPage(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Car Dealer Filter
      </h1>

      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="make"
              className="block text-xl font-semibold text-gray-700"
            >
              Select Vehicle Make
            </label>
            <select
              id="make"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="block text-xl font-semibold text-gray-700"
            >
              Select Model Year
            </label>
            <select
              id="year"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="mt-8">
            {isLoadingNextPage ? (
              <Loading />
            ) : (
              <Link
                className="w-full"
                href={`/result/${selectedMake}/${selectedYear}`}
                legacyBehavior
              >
                <a
                  onClick={handleNextClick}
                  className={`w-full p-3 text-white rounded-lg font-semibold text-center transition duration-300 ease-in-out ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  aria-disabled={isButtonDisabled}
                >
                  Next
                </a>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
