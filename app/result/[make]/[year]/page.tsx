import React, { Suspense } from "react";

export default async function ResultPage({
  params: { make, year },
}: {
  params: { make: string; year: string };
}) {
  const fetchMakeId = async (make: string) => {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getAllMakes?format=json`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch make list");
    }

    const data = await res.json();

    console.log("API Response:", data);

    if (!data.Results || !Array.isArray(data.Results)) {
      throw new Error(
        "Invalid data format: 'Results' is not an array or does not exist"
      );
    }

    const makeObj = data.Results.find(
      (item: any) => item.Make_Name.toLowerCase() === make.toLowerCase()
    );

    if (!makeObj) {
      throw new Error("Make not found");
    }

    return makeObj.Make_ID;
  };

  const fetchVehicleModels = async (makeId: number, year: string) => {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch vehicle models");
    }

    const data = await res.json();

    console.log("Response Data:", data);

    if (!data.Results || !Array.isArray(data.Results)) {
      throw new Error("Invalid response format");
    }

    return [
      ...new Set(
        data.Results.map((item: any) => item.Model_Name).filter(Boolean)
      ),
    ] as string[];
  };

  const makeId = await fetchMakeId(make).catch((error) => {
    console.error("Error fetching makeId:", error.message);
    return null; // check
  });

  if (!makeId) {
    return <div>Make not found or error occurred.</div>;
  }

  const vehicleModels = await fetchVehicleModels(makeId, year).catch(
    (error) => {
      console.error("Error fetching vehicle models:", error.message);
      return [];
    }
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Vehicle Models for {make} - {year}
      </h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Models:</h2>
        <ul className="space-y-2">
          {vehicleModels.length > 0 ? (
            vehicleModels.map((model: string, index: number) => (
              <li key={index} className="text-lg">
                {model}
              </li>
            ))
          ) : (
            <li>No models available for this make and year.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
