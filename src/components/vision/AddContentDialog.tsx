import { useState, useRef } from 'react';
import { ContentType, Category, Theory, Wish, VisionImage } from '@/types/vision';
import { categoryLabels } from '@/data/initialData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Quote, Star, Image, Upload, Link } from 'lucide-react';

interface AddContentDialogProps {
  onAddTheory: (theory: Omit<Theory, 'id'>) => void;
  onAddWish: (wish: Omit<Wish, 'id'>) => void;
  onAddImage: (image: Omit<VisionImage, 'id'>) => void;
}

type FormType = 'theory' | 'wish' | 'image';

const categories: Category[] = ['career', 'health', 'travel', 'creativity', 'relationships', 'personal'];

export function AddContentDialog({ onAddTheory, onAddWish, onAddImage }: AddContentDialogProps) {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>('theory');
  const [category, setCategory] = useState<Category>('personal');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Theory fields
  const [theoryTitle, setTheoryTitle] = useState('');
  const [theoryContent, setTheoryContent] = useState('');
  const [theoryAuthor, setTheoryAuthor] = useState('');
  
  // Wish fields
  const [wishTitle, setWishTitle] = useState('');
  const [wishDescription, setWishDescription] = useState('');

  // Image fields
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageUrl(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formType === 'theory') {
      if (!theoryTitle.trim() || !theoryContent.trim()) return;
      onAddTheory({
        title: theoryTitle.trim(),
        content: theoryContent.trim(),
        author: theoryAuthor.trim() || undefined,
        category,
      });
      setTheoryTitle('');
      setTheoryContent('');
      setTheoryAuthor('');
    } else if (formType === 'wish') {
      if (!wishTitle.trim()) return;
      onAddWish({
        title: wishTitle.trim(),
        description: wishDescription.trim() || undefined,
        category,
        completed: false,
        progress: 0,
      });
      setWishTitle('');
      setWishDescription('');
    } else if (formType === 'image') {
      if (!imageUrl.trim() || !imageAlt.trim()) return;
      onAddImage({
        src: imageUrl.trim(),
        alt: imageAlt.trim(),
        category,
      });
      setImageUrl('');
      setImageAlt('');
      setImagePreview('');
    }
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gold hover:bg-gold/90 text-primary-foreground font-sans gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          Add to Board
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-foreground">
            Add to Vision Board
          </DialogTitle>
        </DialogHeader>
        
        {/* Content type selector */}
        <div className="flex gap-2 py-4">
          <button
            onClick={() => setFormType('theory')}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
              formType === 'theory'
                ? 'bg-gold/10 border-gold text-gold'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
            }`}
          >
            <Quote className="h-4 w-4" />
            <span className="font-sans text-sm">Theory</span>
          </button>
          <button
            onClick={() => setFormType('wish')}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
              formType === 'wish'
                ? 'bg-gold/10 border-gold text-gold'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
            }`}
          >
            <Star className="h-4 w-4" />
            <span className="font-sans text-sm">Wish</span>
          </button>
          <button
            onClick={() => setFormType('image')}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
              formType === 'image'
                ? 'bg-gold/10 border-gold text-gold'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
            }`}
          >
            <Image className="h-4 w-4" />
            <span className="font-sans text-sm">Image</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category selector */}
          <div className="space-y-2">
            <label className="text-sm font-sans text-muted-foreground">Category</label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {categoryLabels[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formType === 'theory' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-sans text-muted-foreground">Title</label>
                <Input
                  value={theoryTitle}
                  onChange={(e) => setTheoryTitle(e.target.value)}
                  placeholder="The Compound Effect"
                  className="bg-secondary border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-sans text-muted-foreground">Quote or Theory</label>
                <Textarea
                  value={theoryContent}
                  onChange={(e) => setTheoryContent(e.target.value)}
                  placeholder="Your philosophical insight or quote..."
                  className="bg-secondary border-border min-h-[100px] font-serif"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-sans text-muted-foreground">Author (optional)</label>
                <Input
                  value={theoryAuthor}
                  onChange={(e) => setTheoryAuthor(e.target.value)}
                  placeholder="Friedrich Nietzsche"
                  className="bg-secondary border-border"
                />
              </div>
            </>
          ) : formType === 'wish' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-sans text-muted-foreground">Wish Title</label>
                <Input
                  value={wishTitle}
                  onChange={(e) => setWishTitle(e.target.value)}
                  placeholder="Run a marathon"
                  className="bg-secondary border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-sans text-muted-foreground">Description (optional)</label>
                <Textarea
                  value={wishDescription}
                  onChange={(e) => setWishDescription(e.target.value)}
                  placeholder="Describe your dream in detail..."
                  className="bg-secondary border-border min-h-[80px]"
                />
              </div>
            </>
          ) : (
            <>
              {/* Image Preview */}
              {imagePreview && (
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Upload Tabs */}
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-secondary">
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
                  <label className="text-sm font-sans text-muted-foreground">
                    Choose Image from Gallery
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUploadClick}
                    className="w-full border-border"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select from Gallery
                  </Button>
                </TabsContent>

                <TabsContent value="url" className="space-y-2">
                  <label className="text-sm font-sans text-muted-foreground">
                    Image URL
                  </label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="bg-secondary border-border"
                  />
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <label className="text-sm font-sans text-muted-foreground">Description</label>
                <Input
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe your vision image..."
                  className="bg-secondary border-border"
                  required
                />
              </div>
            </>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gold hover:bg-gold/90 text-primary-foreground font-sans"
          >
            Add to Board
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
