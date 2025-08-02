"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PricingSectionProps } from "@/type";
import { DollarSign } from "lucide-react";



export function PricingSection({
  formData,
  onChange,
  errors,
}: PricingSectionProps) {
  const getFieldError = (field: string) => {
    return errors.find((err) => err.field === field)?.message;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Pricing Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fee">Current Price *</Label>
            <Input
              id="fee"
              type="number"
              placeholder="0.00"
              value={formData.fee}
              onChange={(e) => onChange("fee", e.target.value)}
            />
            {getFieldError("fee") && (
              <p className="text-sm text-red-600">{getFieldError("fee")}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="originalFee">Original Price</Label>
            <Input
              id="originalFee"
              type="number"
              placeholder="0.00"
              value={formData.originalFee}
              onChange={(e) => onChange("originalFee", e.target.value)}
            />
            {getFieldError("originalFee") && (
              <p className="text-sm text-red-600">
                {getFieldError("originalFee")}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="enrolled">Enrolled Students</Label>
            <Input
              id="enrolled"
              type="number"
              placeholder="0"
              value={formData.enrolled}
              onChange={(e) => onChange("enrolled", e.target.value)}
            />
            {getFieldError("enrolled") && (
              <p className="text-sm text-red-600">
                {getFieldError("enrolled")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Course Capacity</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="0"
              value={formData.capacity}
              onChange={(e) => onChange("capacity", e.target.value)}
            />
            {getFieldError("capacity") && (
              <p className="text-sm text-red-600">
                {getFieldError("capacity")}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              value={formData.rating}
              onChange={(e) => onChange("rating", e.target.value)}
            />
            {getFieldError("rating") && (
              <p className="text-sm text-red-600">{getFieldError("rating")}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalReviews">Total Reviews</Label>
            <Input
              id="totalReviews"
              type="number"
              placeholder="0"
              value={formData.totalReviews}
              onChange={(e) => onChange("totalReviews", e.target.value)}
            />
            {getFieldError("totalReviews") && (
              <p className="text-sm text-red-600">
                {getFieldError("totalReviews")}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
