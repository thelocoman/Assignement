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

interface Announcement {
  id: number;
  title: string;
  publicationDate: string;
  lastUpdate: string;
  categories: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Title 1",
    publicationDate: "Aug 11, 2023 04:38",
    lastUpdate: "Aug 11, 2023",
    categories: "City",
  },
  {
    id: 2,
    title: "Title 2",
    publicationDate: "Aug 11, 2023 04:36",
    lastUpdate: "Aug 11, 2023",
    categories: "City",
  },
  {
    id: 3,
    title: "Title 3",
    publicationDate: "Aug 11, 2023 04:35",
    lastUpdate: "Aug 11, 2023",
    categories: "City",
  },
  {
    id: 4,
    title: "Title 4",
    publicationDate: "Apr 19, 2023 05:14",
    lastUpdate: "Apr 19, 2023",
    categories: "City",
  },
  {
    id: 5,
    title: "Title 5",
    publicationDate: "Apr 19, 2023 05:11",
    lastUpdate: "Apr 19, 2023",
    categories: "City",
  },
  {
    id: 6,
    title: "Title 6",
    publicationDate: "Apr 19, 2023 05:11",
    lastUpdate: "Apr 19, 2023",
    categories: "City",
  },
  {
    id: 7,
    title: "Title 7",
    publicationDate: "Mar 24, 2023 07:27",
    lastUpdate: "Mar 24, 2023",
    categories: "City,Health",
  },
  {
    id: 8,
    title: "Title 8",
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
    categories: "City,Health",
  },
  {
    id: 9,
    title: "Title 9",
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
    categories: "City,Health",
  },
  {
    id: 10,
    title: "Title 10",
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
    categories: "City,Health",
  },
];

export function AnnouncementsTable() {
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
                {announcement.publicationDate}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {announcement.lastUpdate}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {announcement.categories}
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
