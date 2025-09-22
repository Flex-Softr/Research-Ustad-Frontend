/**
 * Utility functions for image cropping operations
 */

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

/**
 * Create a cropped image from the source image and crop area
 */
export const createCroppedImage = (
  imageSrc: string,
  cropArea: Area,
  fileName: string = 'cropped-image.jpg'
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Set canvas size to crop area size
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      // Draw the cropped image
      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );

      // Convert canvas to blob and then to File
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob from canvas'));
            return;
          }
          
          const file = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          
          resolve(file);
        },
        'image/jpeg',
        0.9 // Quality
      );
    };

    image.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    image.src = imageSrc;
  });
};

/**
 * Get the pixel crop area from the percentage crop area
 */
export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  fileName: string = 'cropped-image.jpg'
): Promise<File> => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('No 2d context'));
        return;
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          
          const file = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          
          resolve(file);
        },
        'image/jpeg',
        0.9
      );
    };

    image.onerror = reject;
    image.src = imageSrc;
  });
};

/**
 * Resize image to fit within max dimensions while maintaining aspect ratio
 */
export const resizeImage = (
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.9
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    image.onload = () => {
      // Calculate new dimensions
      let { width, height } = image;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw resized image
      ctx.drawImage(image, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to resize image'));
            return;
          }
          
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          
          resolve(resizedFile);
        },
        file.type,
        quality
      );
    };

    image.onerror = () => reject(new Error('Failed to load image'));
    image.src = URL.createObjectURL(file);
  });
};
