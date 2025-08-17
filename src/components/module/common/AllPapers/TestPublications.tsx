"use client";

import { useEffect, useState } from "react";
import { GetAllUsers } from "@/services/allreserchPaper";

export default function TestPublications() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('🔍 Calling GetAllUsers...');
        const response = await GetAllUsers();
        console.log('🔍 Response:', response);
        setData(response);
      } catch (err) {
        console.error('🔍 Error:', err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Test Publications Data</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
