async function fetchVehicleModels(make: string, year: string) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getModelsForMakeYear?make=${make}&year=${year}&format=json`
  );
  const data = await res.json();
  console.log(res, "res");

  if (!data.Results) {
    throw new Error("No vehicle models found");
  }
  console.log("result:", data);
}

export default async function ResultPage({
  params: { make: selectedMake, year: selectedYear },
}: {
  params: { make: string; year: string };
}) {
  const vehicleModels = await fetchVehicleModels(
    selectedMake,
    selectedYear
  ).catch(() => []);

  console.log("length", vehicleModels?.length);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Vehicle Models for {selectedMake} - {selectedYear}
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
    </div>
  );
}
