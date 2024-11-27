import Link from "next/link";

interface Make {
  Make_ID: number;
  Make_Name: string;
}

interface VehicleModel {
  Model_Name: string;
}

export default async function ResultPage(context: {
  params: { make: string; year: string };
}) {
  const { make, year } = await context.params; // Await params here

  const fetchMakeId = async (make: string) => {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getAllMakes?format=json`
    );

    if (!res.ok) throw new Error("Failed to fetch make list");

    const data = await res.json();
    const makeObj = data.Results.find(
      (item: Make) => item.Make_Name.toLowerCase() === make.toLowerCase()
    );

    if (!makeObj) throw new Error("Make not found");
    return makeObj.Make_ID;
  };

  const fetchVehicleModels = async (makeId: number, year: string) => {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );

    if (!res.ok) throw new Error("Failed to fetch vehicle models");

    const data = await res.json();
    return [
      ...new Set(
        data.Results.map((item: VehicleModel) => item.Model_Name).filter(
          Boolean
        )
      ),
    ] as string[];
  };

  const makeId = await fetchMakeId(make).catch((error) => {
    console.error("Error fetching makeId:", error.message);
    return null;
  });

  if (!makeId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: Unable to find make "{make}".</p>
      </div>
    );
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
            vehicleModels.map((model, index) => (
              <li key={index} className="text-lg">
                {model}
              </li>
            ))
          ) : (
            <li>No models available for this make and year.</li>
          )}
        </ul>
      </div>

      <Link href="/" className="mt-5 p-2 bg-blue-500 text-white rounded-lg">
        Back to Home
      </Link>
    </div>
  );
}
