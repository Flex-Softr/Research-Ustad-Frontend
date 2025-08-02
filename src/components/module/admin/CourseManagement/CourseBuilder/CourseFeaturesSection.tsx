"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CourseFeaturesSectionProps } from "@/type";



export function CourseFeaturesSection({
  formData,
  onChange,
}: CourseFeaturesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Features</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Certificate of Completion</Label>
            <p className="text-sm text-gray-500">
              Students will receive a certificate upon completion
            </p>
          </div>
          <Switch
            checked={formData.certificate}
            onCheckedChange={(v) => onChange("certificate", v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Lifetime Access</Label>
            <p className="text-sm text-gray-500">
              Students get lifetime access to course content
            </p>
          </div>
          <Switch
            checked={formData.lifetimeAccess}
            onCheckedChange={(v) => onChange("lifetimeAccess", v)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
