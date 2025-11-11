// src/context/AnnouncementsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Announcement {
  id: number;
  title: string;
  content: string;
  publicationDate: string; // ISO string
  lastUpdate: string; // display string like "Aug 11, 2023"
  categories: string[];
}

interface AnnouncementsContextValue {
  announcements: Announcement[];
  getById: (id: number) => Announcement | undefined;
  createFromEdited: (data: Omit<Announcement, "id" | "lastUpdate">) => Announcement;
  // (optional) other helpers like reset, remove, update...
}

const AnnouncementsContext = createContext<AnnouncementsContextValue | undefined>(undefined);

const initialAnnouncements: Announcement[] = [
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

function formatShortDate(dateIso: string) {
  try {
    const d = new Date(dateIso);
    // e.g. "Aug 11, 2023"
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return dateIso;
  }
}

export function AnnouncementsProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

  const getById = (id: number) => announcements.find((a) => a.id === id);

  const createFromEdited = (data: Omit<Announcement, "id" | "lastUpdate">) => {
    // new id = max existing id + 1
    const maxId = announcements.reduce((max, a) => Math.max(max, a.id), 0);
    const newId = maxId + 1;
    const lastUpdate = formatShortDate(new Date().toISOString());
    const newAnnouncement: Announcement = {
      id: newId,
      title: data.title,
      content: data.content,
      publicationDate: data.publicationDate,
      lastUpdate,
      categories: data.categories,
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    return newAnnouncement;
  };

  return (
    <AnnouncementsContext.Provider value={{ announcements, getById, createFromEdited }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}

export function useAnnouncements() {
  const ctx = useContext(AnnouncementsContext);
  if (!ctx) throw new Error("useAnnouncements must be used within AnnouncementsProvider");
  return ctx;
}
