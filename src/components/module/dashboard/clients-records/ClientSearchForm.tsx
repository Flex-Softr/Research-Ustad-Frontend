"use client";

import { useState } from "react";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Client } from "@/services/clients";
import { toast } from "sonner";
import config from "@/config";

interface ClientSearchFormProps {
  onClientSelected: (client: Client) => void;
}

export default function ClientSearchForm({
  onClientSelected,
}: ClientSearchFormProps) {
  const [searchNid, setSearchNid] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundClient, setFoundClient] = useState<Client | null>(null);

  const handleSearch = async () => {
    if (searchNid.trim() === "" || searchNid.length < 10) {
      toast.error("Please enter a valid NID (minimum 10 characters)");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${config.api.baseUrl}/client/nid/${searchNid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setFoundClient(data.data);
        onClientSelected(data.data);
      } else {
        setFoundClient(null);
        toast.error(data.message || "Client not found");
      }
    } catch (error) {
      console.error("Error searching client:", error);
      setFoundClient(null);
      toast.error("Failed to search client");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Client by NID
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter NID number to search..."
                value={searchNid}
                onChange={(e) => setSearchNid(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
                disabled={loading}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading || searchNid.trim().length < 10}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Found Client Display */}
          {foundClient && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-900">
                    {foundClient.fullName} ({foundClient.nid})
                  </div>
                  <div className="text-sm text-green-700">
                    Client found successfully
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-blue-700">Searching for client...</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
