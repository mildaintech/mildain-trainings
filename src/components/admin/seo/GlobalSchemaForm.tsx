"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function GlobalSchemaForm({ onClose }: { onClose: () => void }) {
  const [schemaData, setSchemaData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/global-schema")
      .then((res) => res.json())
      .then((data) => setSchemaData(data.schemaData || ""));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/global-schema", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schemaData }),
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-md w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Global Schema (JSON-LD)</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            rows={15}
            value={schemaData}
            onChange={(e) => setSchemaData(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-md font-mono text-sm outline-none focus:border-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-md font-bold w-full md:w-auto self-end"
          >
            {loading ? "Saving..." : "Save Global Schema"}
          </button>
        </form>
      </div>
    </div>
  );
}