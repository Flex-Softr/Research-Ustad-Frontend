"use client";

import { useState, useEffect } from "react";
import { getAllClients, type Client } from "@/services/clients";
import {
  ClientForm,
  ClientTable,
  ClientHeader,
} from "@/components/module/dashboard/clients";
import { toast } from "sonner";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const result = await getAllClients();
      if (result.success && result.data) {
        setClients(result.data);
      } else {
        toast.error(result.message || "Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleClientAdded = () => {
    fetchClients(); // Refresh the clients list
  };

  const handleClientDeleted = () => {
    fetchClients(); // Refresh the clients list
  };

  const handleClearForm = () => {
    // This will be handled by the ClientForm component
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ClientHeader onClearForm={handleClearForm} />

      <div className="space-y-6">
        {/* Add Client Form */}
        <ClientForm onClientAdded={handleClientAdded} />

        {/* Clients Table */}
        <ClientTable
          clients={clients}
          loading={loading}
          onClientDeleted={handleClientDeleted}
        />
      </div>
    </div>
  );
}
