import { Navbar } from "@/components/layout/Navbar";
import { PortfolioImpact } from "@/components/dashboard/PortfolioImpact";
import { NewsFeed } from "@/components/dashboard/NewsFeed";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor portfolio impact and stay updated with the latest financial news
          </p>
        </div>
        
        <div className="space-y-8">
          <PortfolioImpact />
          <NewsFeed />
        </div>
      </main>
    </div>
  );
};

export default Index;
