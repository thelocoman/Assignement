// src/components/AnnouncementsTable.tsx
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAnnouncements } from "./AnnouncementsContext";

function formatDateForTable(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AnnouncementsTable() {
  const { announcements } = useAnnouncements();

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="text-foreground font-semibold">Title</TableHead>
            <TableHead className="text-foreground font-semibold">Publication date</TableHead>
            <TableHead className="text-foreground font-semibold">Last update</TableHead>
            <TableHead className="text-foreground font-semibold">Categories</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {announcements.map((announcement) => (
            <TableRow key={announcement.id} className="hover:bg-muted/20">
              <TableCell className="font-medium text-foreground">
                {announcement.title}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDateForTable(announcement.publicationDate)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {announcement.lastUpdate}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {announcement.categories.join(",")}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link to={`/edit/${announcement.id}`}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {announcement.title}</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
