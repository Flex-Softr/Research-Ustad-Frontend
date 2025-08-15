"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  DollarSign,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { type Company } from "@/services/company";
import CompanySearchInput from "./CompanySearchInput";

interface ClientRecordsFormProps {
  clientId: string;
  onRecordAdded: () => void;
}

export default function ClientRecordsForm({
  clientId,
  onRecordAdded,
}: ClientRecordsFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companySearchValue, setCompanySearchValue] = useState("");

  const [formData, setFormData] = useState({
    disDate: "",
    amount: "",
    age: "",
    endingDate: "",
    bod: "",
    eod: "",
    note: "",
    noteStatus: "pending",
    scheme: "",
    company: "",
    companyId: "",
  });

  const handleCompanyChange = (value: string, companyId: string) => {
    setCompanySearchValue(value);
    setFormData((prev) => ({ ...prev, company: value, companyId }));

    // Update selected company if we have a companyId
    if (companyId) {
      setSelectedCompany({
        _id: companyId,
        name: value,
        status: "",
        createdAt: "",
        id: "",
      });
    } else {
      setSelectedCompany(null);
    }
  };

  const handleCompanyRemove = () => {
    setSelectedCompany(null);
    setFormData((prev) => ({ ...prev, company: "", companyId: "" }));
    setCompanySearchValue("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      // Here you would call the API to create the record
      // const result = await createClientRecord({ ...formData, clientId });

      // Mock success for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Record added successfully!");
      onRecordAdded();

      // Reset form
      setFormData({
        disDate: "",
        amount: "",
        age: "",
        endingDate: "",
        bod: "",
        eod: "",
        note: "",
        noteStatus: "pending",
        scheme: "",
        company: "",
        companyId: "",
      });
      setSelectedCompany(null);
      setCompanySearchValue("");
    } catch (error) {
      console.error("Error adding record:", error);
      toast.error("Failed to add record");
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      disDate: "",
      amount: "",
      age: "",
      endingDate: "",
      bod: "",
      eod: "",
      note: "",
      noteStatus: "pending",
      scheme: "",
      company: "",
      companyId: "",
    });
    setSelectedCompany(null);
    setCompanySearchValue("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Record
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Disbursement Date */}
            <div className="space-y-2">
              <Label htmlFor="disDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Disbursement Date *
              </Label>
              <Input
                id="disDate"
                name="disDate"
                type="date"
                value={formData.disDate}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Amount *
              </Label>
              <Input
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="e.g., 5000 BDT"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Age *
              </Label>
              <Input
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="e.g., 3 Years"
                required
              />
            </div>

            {/* Ending Date */}
            <div className="space-y-2">
              <Label htmlFor="endingDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ending Date *
              </Label>
              <Input
                id="endingDate"
                name="endingDate"
                type="date"
                value={formData.endingDate}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* BOD */}
            <div className="space-y-2">
              <Label htmlFor="bod">BOD *</Label>
              <Input
                id="bod"
                name="bod"
                value={formData.bod}
                onChange={handleInputChange}
                placeholder="e.g., 1256"
                required
              />
            </div>

            {/* EOD */}
            <div className="space-y-2">
              <Label htmlFor="eod">EOD *</Label>
              <Input
                id="eod"
                name="eod"
                value={formData.eod}
                onChange={handleInputChange}
                placeholder="e.g., 888"
                required
              />
            </div>

            {/* Scheme */}
            <div className="space-y-2">
              <Label htmlFor="scheme">Scheme *</Label>
              <Input
                id="scheme"
                name="scheme"
                value={formData.scheme}
                onChange={handleInputChange}
                placeholder="e.g., 2500"
                required
              />
            </div>

            {/* Company Search Input */}
            <CompanySearchInput
              value={companySearchValue}
              onChange={handleCompanyChange}
              onRemove={handleCompanyRemove}
              selectedCompany={selectedCompany}
              required
            />

            {/* Note Status */}
            <div className="space-y-2">
              <Label htmlFor="noteStatus">Note Status *</Label>
              <Select
                value={formData.noteStatus}
                onValueChange={(value) =>
                  handleSelectChange("noteStatus", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      Pending
                    </div>
                  </SelectItem>
                  <SelectItem value="completed">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Completed
                    </div>
                  </SelectItem>
                  <SelectItem value="cancelled">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Cancelled
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Note
            </Label>
            <Textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="Enter any additional notes..."
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Record...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={clearForm}
              className="flex-1"
              disabled={submitting}
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
