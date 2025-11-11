import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data - in a real app, this would come from a backend
const announcements = [
  {
    id: 1,
    title: "Title 1",
    content: "Sample content for announcement 1",
    publicationDate: "2023-08-11T04:38:00",
    lastUpdate: "Aug 11, 2023",
    categories: ["City"],
  },
  {
    id: 2,
    title: "Title 2",
    content: "Sample content for announcement 2",
    publicationDate: "2023-08-11T04:36:00",
    lastUpdate: "Aug 11, 2023",
    categories: ["City"],
  },
  {
    id: 3,
    title: "Title 3",
    content: "Sample content for announcement 3",
    publicationDate: "2023-08-11T04:35:00",
    lastUpdate: "Aug 11, 2023",
    categories: ["City"],
  },
  {
    id: 4,
    title: "Title 4",
    content: "Sample content for announcement 4",
    publicationDate: "2023-07-15T10:00:00",
    lastUpdate: "Jul 15, 2023",
    categories: ["Community events"],
  },
  {
    id: 5,
    title: "Title 5",
    content: "Sample content for announcement 5",
    publicationDate: "2023-06-20T14:30:00",
    lastUpdate: "Jun 20, 2023",
    categories: ["Culture", "Kids & Family"],
  },
  {
    id: 6,
    title: "Title 6",
    content: "Sample content for announcement 6",
    publicationDate: "2023-05-10T09:00:00",
    lastUpdate: "May 10, 2023",
    categories: ["Crime & Safety"],
  },
  {
    id: 7,
    title: "Title 7",
    content: "Sample content for announcement 7",
    publicationDate: "2023-03-24T07:27:00",
    lastUpdate: "Mar 24, 2023",
    categories: ["City", "Health"],
  },
  {
    id: 8,
    title: "Title 8",
    content: "Sample content for announcement 8",
    publicationDate: "2023-04-18T11:15:00",
    lastUpdate: "Apr 18, 2023",
    categories: ["For Seniors"],
  },
  {
    id: 9,
    title: "Title 9",
    content: "Sample content for announcement 9",
    publicationDate: "2023-02-28T16:45:00",
    lastUpdate: "Feb 28, 2023",
    categories: ["Discounts & Benefits"],
  },
  {
    id: 10,
    title: "Title 10",
    content: "Sample content for announcement 10",
    publicationDate: "2023-01-12T08:00:00",
    lastUpdate: "Jan 12, 2023",
    categories: ["Emergencies", "Crime & Safety"],
  },
];

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
  
  const announcement = announcements.find(a => a.id === Number(id));
  
  const [title, setTitle] = useState(announcement?.title || "");
  const [content, setContent] = useState(announcement?.content || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    announcement?.categories || []
  );
  const [publicationDate, setPublicationDate] = useState(
    announcement?.publicationDate || ""
  );
  const [open, setOpen] = useState(false);

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
    // 1. Define required fields check
    if (!title.trim()) {
      alert("Please enter a title for the announcement.");
      return; // Stop execution
    }

    if (!content.trim()) {
      alert("The announcement content cannot be empty.");
      return; // Stop execution
    }

    if (selectedCategories.length === 0) {
      alert("Please select at least one category for the announcement.");
      return; // Stop execution
    }

    if (!publicationDate) {
      alert("Please select a publication date.");
      return; // Stop execution
    }

    // 2. If validation passes, proceed with publishing
    // In a real app, this would save to backend
    console.log("Publishing announcement:", { title, content, categories: selectedCategories, publicationDate });
    navigate("/");
  };

  if (!announcement && id) {
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
