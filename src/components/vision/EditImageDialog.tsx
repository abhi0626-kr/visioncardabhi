import { useState, useEffect, useRef } from 'react';
import { VisionImage, Category } from '@/types/vision';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryLabels } from '@/data/initialData';
import { Trash2, Upload, Link } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EditImageDialogProps {
  image: VisionImage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (image: VisionImage) => void;
  onDelete: (id: string) => void;
}

export function EditImageDialog({
  image,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: EditImageDialogProps) {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [category, setCategory] = useState<Category>('personal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image) {
      setSrc(image.src);
      setAlt(image.alt);
      setCategory(image.category);
    }
  }, [image]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSrc(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (!image) return;
    
    onSave({
      ...image,
      src,
      alt,
      category,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (!image) return;
    if (confirm('Are you sure you want to delete this image?')) {
      onDelete(image.id);
      onOpenChange(false);
    }
  };

  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-charcoal border-gold/20">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-cream">
            Edit Image
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Preview */}
          <div className="rounded-lg overflow-hidden border border-gold/20">
            <img
              src={src || image.src}
              alt={alt || image.alt}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src = image.src;
              }}
            />
          </div>

          {/* Upload Tabs */}
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-charcoal-light">
              <TabsTrigger value="upload" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="url" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                <Link className="h-4 w-4 mr-2" />
                URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-2">
              <Label htmlFor="image-upload" className="text-cream">
                Choose Image from Gallery
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                className="w-full border-gold/20 text-cream hover:bg-gold/10"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select from Gallery
              </Button>
            </TabsContent>

            <TabsContent value="url" className="space-y-2">
              <Label htmlFor="image-src" className="text-cream">
                Image URL
              </Label>
              <Input
                id="image-src"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-charcoal-light border-gold/20 text-cream"
              />
            </TabsContent>
          </Tabs>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="image-alt" className="text-cream">
              Description
            </Label>
            <Input
              id="image-alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe this image..."
              className="bg-charcoal-light border-gold/20 text-cream"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="image-category" className="text-cream">
              Category
            </Label>
            <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
              <SelectTrigger className="bg-charcoal-light border-gold/20 text-cream">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-charcoal border-gold/20">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key} className="text-cream">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-3 pt-4">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gold/30 text-cream hover:bg-charcoal-light"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gold text-charcoal hover:bg-gold/90"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
