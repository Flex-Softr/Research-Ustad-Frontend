"use client";

import { useState } from "react";
import { Plus, User, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient, type CreateClientData } from "@/services/clients";
import { toast } from "sonner";

interface ClientFormProps {
  onClientAdded: () => void;
}

export default function ClientForm({ onClientAdded }: ClientFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    nid: "",
    phoneNumber: "",
    district: "",
    fullAddress: "",
    photo: null as File | null,
  });
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const result = await createClient(formData);

      if (result.success && result.data) {
        toast.success("Client added successfully!");
        onClientAdded();

        // Reset form
        setFormData({
          fullName: "",
          nid: "",
          phoneNumber: "",
          district: "",
          fullAddress: "",
          photo: null,
        });
        setPhotoPreview("");
      } else {
        toast.error(result.message || "Failed to add client");
      }
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client");
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      fullName: "",
      nid: "",
      phoneNumber: "",
      district: "",
      fullAddress: "",
      photo: null,
    });
    setPhotoPreview("");
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Add New Client
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nid">NID Number *</Label>
              <Input
                id="nid"
                name="nid"
                value={formData.nid}
                onChange={handleInputChange}
                placeholder="Enter NID number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District *</Label>
              <Input
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="Enter district"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullAddress">Full Address *</Label>
              <Input
                id="fullAddress"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleInputChange}
                placeholder="Enter full address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="flex-1"
                />
              </div>
              {photoPreview && (
                <div className="mt-2">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2 flex justify-end">
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
