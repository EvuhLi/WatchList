import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VibeTab } from "@/components/VibeTab";
import { WrappedTab } from "@/components/WrappedTab";
import { SocialTab } from "@/components/SocialTab";
import { Sliders, Film, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Film className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">Watchlist</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Tabs defaultValue="vibes" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8 bg-secondary/50 p-1 rounded-xl">
            <TabsTrigger value="vibes" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Vibes</span>
            </TabsTrigger>
            <TabsTrigger value="wrapped" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Film className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Wrapped</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Social</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vibes" className="mt-0 animate-fade-in">
            <VibeTab />
          </TabsContent>

          <TabsContent value="wrapped" className="mt-0 animate-fade-in">
            <WrappedTab />
          </TabsContent>

          <TabsContent value="social" className="mt-0 animate-fade-in">
            <SocialTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
