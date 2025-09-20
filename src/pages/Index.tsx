import { Navbar } from "@/components/layout/Navbar";
import { PortfolioImpact } from "@/components/dashboard/PortfolioImpact";
import { NewsFeed } from "@/components/dashboard/NewsFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="space-y-8">
          <PortfolioImpact />
          <NewsFeed />
        </div>
      </main>
    </div>
  );
};

export default Index;
