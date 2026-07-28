import { useEffect, useState } from "react";
import { Card } from "@/components/ui";

export interface ImagePreviewProps {
  image: File | null;
}

/**
 * Preview of the currently selected image, framed in the existing `Card`
 * primitive. Renders nothing when there's no image — the parent decides
 * what (if anything) to show instead, keeping this single-purpose.
 */
export function ImagePreview({ image }: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  if (!image || !previewUrl) return null;

  return (
    <Card noPadding className="w-full max-w-md overflow-hidden">
      <img src={previewUrl} alt={image.name} className="h-full w-full object-contain" />
    </Card>
  );
}
