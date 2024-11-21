"use client";
import React from "react";
import { Suspense } from "react";

async function fetchVehicleModels(make: string, year: string) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getModelsForMakeYear?make=${make}&year=${year}&format=json`
  );
  const data = await res.json();

  if (!data.Results) {
    throw new Error("No vehicle models found");
  }

  return data.Results.map((item: any) => item.ModelName);
}

function VehicleModels({ make, year }: { make: string; year: string }) {
  const [models, setModels] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchVehicleModels(make, year)
      .then(setModels)
      .catch(() => setModels([]));
  }, [make, year]);

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Models:</h2>
      <ul className="space-y-2">
        {models.length > 0 ? (
          models.map((model: string, index: number) => (
            <li key={index} className="text-lg">
              {model}
            </li>
          ))
        ) : (
          <li>No models available for this make and year.</li>
        )}
      </ul>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin h-8 w-8 border-4 border-t-blue-500 border-gray-300 rounded-full"></div>
    </div>
  );
}

export default function ResultPage({
  make,
  year,
}: {
  make: string;
  year: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <Loading />
        </div>
      }
    >
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-8">
          Vehicle Models for {make} - {year}
        </h1>
        <VehicleModels make={make} year={year} />
      </div>
    </Suspense>
  );
}
