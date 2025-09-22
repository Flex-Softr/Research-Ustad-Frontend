"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCroppedImg, Area, Point } from '@/utils/cropUtils';
import { ZoomIn, ZoomOut, Crop, X } from 'lucide-react';
import Cropper from 'react-easy-crop'

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
  isOpen: boolean;
  aspectRatio?: number;
  cropShape?: 'rect' | 'round';
  fileName?: string;
}

export const ImageCropper = ({
  imageSrc,
  onCropComplete,
  onCancel,
  isOpen,
  aspectRatio = 1, // Default to square (1:1)
  cropShape = 'round', // Default to round for profile images
  fileName = 'cropped-image.jpg'
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = useCallback((crop: Point) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);


  const onCropCompleteHandler = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      setIsProcessing(true);
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels, fileName);
      onCropComplete(croppedFile);
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [croppedAreaPixels, imageSrc, fileName, onCropComplete]);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[550px] h-[500px] p-4">
        <DialogHeader className="pb-3">
          <DialogTitle className="flex items-center gap-2">
            <Crop className="h-5 w-5" />
            Crop Image
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Cropper Container */}
          <div className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              cropShape={cropShape}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropCompleteHandler}
              showGrid={true}
              style={{
                containerStyle: {
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f3f4f6'
                }
              }}
            />
          </div>

          {/* Controls */}
          <div className="space-y-2">
            {/* Zoom Control */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <ZoomOut className="h-4 w-4 text-gray-500" />
                <Label className="text-sm font-medium">Zoom</Label>
                <ZoomIn className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                type="range"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                min={1}
                max={3}
                step={0.1}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">
                {((zoom - 1) * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              size="sm"
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              size="sm"
              className="bg-brand-primary hover:bg-brand-secondary text-white"
            >
              {isProcessing ? 'Processing...' : 'Apply Crop'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
