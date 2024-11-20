"use client";
import { useState } from "react";

export default async function ResultPage() {
  const vehicleFound = useState(true);
  const [selectedMake, setSelectedMake] = useState("CHEVROLET");
  const [selectedYear, setSelectedYear] = useState("2024");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">
        {`Vehicle Models for ${selectedMake} - ${selectedYear}`}
      </h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Models:</h2>
        <ul className="space-y-2">
          {vehicleFound ? (
            <li key={0} className="text-lg">
              {"model"}
            </li>
          ) : (
            <li>No models available for this make and year.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
