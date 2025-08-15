"use client";

import { useState } from "react";
import { User, Phone, MapPin, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Client } from "@/services/clients";

interface ClientProfileProps {
  client: Client;
  onAddRecord: () => void;
}

export default function ClientProfile({
  client,
  onAddRecord,
}: ClientProfileProps) {
  const [showAddRecord, setShowAddRecord] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Client Profile
          </CardTitle>
          <Button
            onClick={() => setShowAddRecord(!showAddRecord)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {showAddRecord ? "Hide" : "Add New Record"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-6">
          {/* Client Photo */}
          <div className="flex-shrink-0">
            <img
              src={client.photo}
              alt={client.fullName}
              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
            />
          </div>

          {/* Client Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {client.fullName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="font-mono">
                  NID: {client.nid}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{client.phoneNumber}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{client.district}</span>
              </div>
            </div>

            <div className="text-gray-600">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 mt-0.5" />
                <span className="text-sm">{client.fullAddress}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
