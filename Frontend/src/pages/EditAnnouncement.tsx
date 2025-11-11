// src/pages/EditAnnouncement.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAnnouncements } from "../components/AnnouncementsContext";

const availableCategories = [
  "Community events",
  "Crime & Safety",
  "Culture",
  "Discounts & Benefits",
  "Emergencies",
  "For Seniors",
  "Health",
  "Kids & Family"
];

const EditAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, createFromEdited } = useAnnouncements();

  const announcementId = id ? Number(id) : undefined;
  const orig = announcementId ? getById(announcementId) : undefined;

  const [title, setTitle] = useState(orig?.title || "");
  const [content, setContent] = useState(orig?.content || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    orig?.categories || []
  );
  const [publicationDate, setPublicationDate] = useState(
    orig?.publicationDate || ""
  );
  const [open, setOpen] = useState(false);

  // If the original announcement loads later, sync initial state once:
  useEffect(() => {
    if (orig) {
      setTitle(orig.title);
      setContent(orig.content);
      setSelectedCategories(orig.categories);
      setPublicationDate(orig.publicationDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orig?.id]); // run when orig changes

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const handleAddCategory = (category: string) => {
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
      setOpen(false);
    }
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert("Please enter a title for the announcement.");
      return;
    }
    if (!content.trim()) {
      alert("The announcement content cannot be empty.");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("Please select at least one category for the announcement.");
      return;
    }
    if (!publicationDate) {
      alert("Please select a publication date.");
      return;
    }

    // Create a NEW announcement (do not mutate the original)
    createFromEdited({
      title,
      content,
      categories: selectedCategories,
      publicationDate,
    });

    // navigate back to list (adjust route as required)
    navigate("/");
  };

  if (!orig && id) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-foreground">Announcement not found</p>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-8">Edit the announcement</h1>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-foreground">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Category</Label>
                <p className="text-sm text-muted-foreground">
                  Select category so readers know what your announcement is about.
                </p>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex flex-wrap gap-2 min-h-[44px] items-center p-3 border border-input rounded-md bg-background cursor-pointer hover:bg-accent/5 transition-colors">
                      {selectedCategories.length > 0 ? (
                        selectedCategories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="gap-1 pr-1"
                          >
                            {category}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveCategory(category);
                              }}
                              className="hover:bg-muted-foreground/20 rounded-full p-0.5 ml-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">Select categories...</span>
                      )}
                      <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <div className="max-h-[200px] overflow-y-auto">
                      {availableCategories
                        .filter(cat => !selectedCategories.includes(cat))
                        .map((category) => (
                          <button
                            key={category}
                            onClick={() => handleAddCategory(category)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                          >
                            {category}
                          </button>
                        ))}
                      {availableCategories.filter(cat => !selectedCategories.includes(cat)).length === 0 && (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          All categories selected
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publication-date" className="text-foreground">
                  Publication date
                </Label>
                <Input
                  id="publication-date"
                  type="datetime-local"
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handlePublish}
                  className="bg-orange hover:bg-orange/90 text-orange-foreground rounded-[50px]"
                >
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EditAnnouncement;
