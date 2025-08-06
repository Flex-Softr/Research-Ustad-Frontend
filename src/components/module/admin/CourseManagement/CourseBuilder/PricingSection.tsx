"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PricingSectionProps } from "@/type";
import { DollarSign, Calendar } from "lucide-react";

export function PricingSection({
  formData,
  onChange,
  errors,
  hasAttemptedSubmit = false,
}: PricingSectionProps) {
  const getFieldError = (field: string) => {
    return errors.find((err) => err.field === field)?.message;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Pricing & Schedule Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="isFree">Course Type *</Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="isFree"
                  value="false"
                  checked={!formData.isFree}
                  onChange={(e) => onChange("isFree", !e.target.checked)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">Paid Course</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="isFree"
                  value="true"
                  checked={formData.isFree}
                  onChange={(e) => onChange("isFree", e.target.checked)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">Free Course</span>
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => onChange("startDate", e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            {getFieldError("startDate") && hasAttemptedSubmit && (
              <p className="text-sm text-red-600">{getFieldError("startDate")}</p>
            )}
          </div>
        </div>

        {!formData.isFree && (
          <div className="space-y-2">
            <Label htmlFor="fee">Course Price *</Label>
            <Input
              id="fee"
              type="number"
              placeholder="0.00"
              value={formData.fee}
              onChange={(e) => onChange("fee", e.target.value)}
            />
            {getFieldError("fee") && hasAttemptedSubmit && (
              <p className="text-sm text-red-600">{getFieldError("fee")}</p>
            )}
          </div>
        )}

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
            {getFieldError("enrolled") && hasAttemptedSubmit && (
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
            {getFieldError("capacity") && hasAttemptedSubmit && (
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
            {getFieldError("rating") && hasAttemptedSubmit && (
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
            {getFieldError("totalReviews") && hasAttemptedSubmit && (
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
