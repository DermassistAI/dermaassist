import React from "react";
import { Camera, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function UploadStep({ uploadedImage, onUpload, onContinue }: { uploadedImage: string | null; onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; onContinue: () => void; }) {
  return (
    <div>
      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
        {uploadedImage ? (
          <div className="space-y-4">
            <div className="mx-auto rounded-lg shadow-soft overflow-hidden max-h-64">
              <Image
                src={uploadedImage as string}
                alt="Uploaded skin condition"
                width={600}
                height={400}
                className="w-auto h-auto max-h-64 object-contain"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-sage-green">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Image uploaded successfully</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <p className="text-lg font-medium text-foreground mb-2">Drag and drop your image here</p>
              <p className="text-muted-foreground">Supports JPG, PNG up to 10MB</p>
            </div>
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Button variant="medical" asChild>
                <span>Browse Files</span>
              </Button>
            </Label>
            <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={onUpload} />
          </div>
        )}
      </div>

      {uploadedImage && (
        <div className="flex justify-center mt-6">
          <Button onClick={onContinue} variant="hero" size="lg">Continue to Patient History</Button>
        </div>
      )}
    </div>
  );
}
