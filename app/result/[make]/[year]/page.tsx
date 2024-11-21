import Loading from "@/app/components/Loading";
import React, { Suspense } from "react";

export default async function ResultPage({
  params: { make, year },
}: {
  params: { make: string; year: string };
}) {
  const fetchVehicleModels = async (make: string, year: string) => {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getModelsForMakeYear?make=${make}&year=${year}&format=json`
    );
    const data = await res.json();

    if (!data.Results) {
      throw new Error("No vehicle models found");
    }

    return data.Results.map((item: any) => item.ModelName);
  };

  const vehicleModels = await fetchVehicleModels(make, year).catch(() => []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Vehicle Models for {make} - {year}
      </h1>

      <Suspense fallback={<Loading />}>
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Available Models:</h2>
          <ul className="space-y-2">
            {vehicleModels.length > 0 ? (
              vehicleModels.map(
                (model: string, index: React.Key | null | undefined) => (
                  <li key={index} className="text-lg">
                    {model}
                  </li>
                )
              )
            ) : (
              <li>No models available for this make and year.</li>
            )}
          </ul>
        </div>
      </Suspense>
    </div>
  );
}
