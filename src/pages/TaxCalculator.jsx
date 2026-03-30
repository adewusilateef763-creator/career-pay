import React, { useState } from "react";
import API from "../services/api";

const TaxCalculator = () => {
  const [annualGross, setAnnualGross] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!annualGross) {
      alert("Enter annual gross");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/payroll/tax-breakdown", {
        annualGross: Number(annualGross),
      });

      console.log("✅ Tax:", res.data);
      setResult(res.data.data);

    } catch (err) {
      console.error("❌ Error:", err.response?.data);
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tax Calculator</h1>

      <input
        type="number"
        placeholder="Enter Annual Gross"
        value={annualGross}
        onChange={(e) => setAnnualGross(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleCalculate}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {loading ? "Calculating..." : "Calculate Tax"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p><strong>Annual Gross:</strong> {result.annualGross}</p>
          <p><strong>Relief:</strong> {result.reliefAmount}</p>
          <p><strong>Taxable Income:</strong> {result.taxableIncome}</p>
          <p><strong>Total Tax:</strong> {result.totalTax}</p>

          <h3 className="mt-4 font-bold">Breakdown:</h3>
          {result.breakdown.map((item, index) => (
            <div key={index} className="mt-2 p-2 border rounded">
              <p>{item.band}</p>
              <p>Rate: {item.rate}</p>
              <p>Tax: {item.taxAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaxCalculator;