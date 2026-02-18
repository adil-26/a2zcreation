"use client";

import { useState } from "react";

const basePrices: Record<string, number> = {
  "2bhk": 357000,
  "3bhk": 423000,
  "4bhk": 481000,
  "kitchen": 137000
};

export default function EstimatorForm() {
  const [estimate, setEstimate] = useState("Approximate: INR 0");

  function onEstimatorSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const scope = String(formData.get("scope") || "2bhk");
    const finishFactor = Number(formData.get("finish") || 1);
    const finalEstimate = Math.round((basePrices[scope] || 0) * finishFactor);
    setEstimate(`Approximate: INR ${finalEstimate.toLocaleString("en-IN")}`);
  }

  return (
    <form id="estimator-form" className="estimator-card" onSubmit={onEstimatorSubmit}>
      <label>
        Scope
        <select name="scope" defaultValue="2bhk">
          <option value="2bhk">2BHK</option>
          <option value="3bhk">3BHK</option>
          <option value="4bhk">4BHK</option>
          <option value="kitchen">Kitchen</option>
        </select>
      </label>
      <label>
        Finish
        <select name="finish" defaultValue="1">
          <option value="1">Standard</option>
          <option value="1.2">Premium</option>
          <option value="1.4">Luxury</option>
        </select>
      </label>
      <button type="submit" className="btn">
        Calculate
      </button>
      <output>{estimate}</output>
    </form>
  );
}
