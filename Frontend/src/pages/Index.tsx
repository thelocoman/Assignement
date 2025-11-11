import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AnnouncementsTable } from "@/components/AnnouncementsTable";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-6">Announcements</h1>
            <AnnouncementsTable />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
