"use client";

import { useState } from "react";
import {
  ClientSearchForm,
  ClientRecordsForm,
} from "@/components/module/dashboard/clients-records";
import { type Client } from "@/services/clients";

export default function ClientsRecordsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleClientSelected = (client: Client) => {
    setSelectedClient(client);
  };

  const handleRecordAdded = () => {
    // Refresh records if needed
    console.log("Record added successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clients Records</h1>
        <p className="text-gray-600 mt-1">
          Search clients by NID and manage their records
        </p>
      </div>

      {/* Client Search */}
      <ClientSearchForm onClientSelected={handleClientSelected} />

      {/* Records Form - Only show when client is selected */}
      {selectedClient && (
        <ClientRecordsForm
          clientId={selectedClient._id}
          onRecordAdded={handleRecordAdded}
        />
      )}
    </div>
  );
}
