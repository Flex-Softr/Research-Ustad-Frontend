"use client";

import { useState } from "react";
import {
  FileText,
  Trash2,
  Calendar,
  DollarSign,
  Building,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ClientRecord {
  _id: string;
  disDate: string;
  amount: string;
  age: string;
  endingDate: string;
  bod: string;
  eod: string;
  note: string;
  noteStatus: "pending" | "completed" | "cancelled";
  scheme: string;
  company: string;
  createdAt: string;
}

interface ClientRecordsTableProps {
  records: ClientRecord[];
  clientId: string;
  onRecordDeleted: () => void;
}

export default function ClientRecordsTable({
  records,
  clientId,
  onRecordDeleted,
}: ClientRecordsTableProps) {
  const [loading, setLoading] = useState(false);

  const handleDeleteRecord = async (recordId: string) => {
    if (!confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      setLoading(true);

      // Here you would call the API to delete the record
      // const result = await deleteClientRecord(recordId);

      // Mock success for now
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Record deleted successfully!");
      onRecordDeleted();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Failed to delete record");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Client Records ({records.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {records.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No records found</p>
              <p className="text-sm">Add a new record to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Disbursement Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Ending Date</TableHead>
                  <TableHead>BOD</TableHead>
                  <TableHead>EOD</TableHead>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {formatDate(record.disDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{record.amount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        {record.age}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {formatDate(record.endingDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {record.bod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {record.eod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{record.scheme}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{record.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.noteStatus)}</TableCell>
                    <TableCell>
                      <div className="max-w-32">
                        <p
                          className="text-sm text-gray-600 truncate"
                          title={record.note}
                        >
                          {record.note || "No note"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecord(record._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
