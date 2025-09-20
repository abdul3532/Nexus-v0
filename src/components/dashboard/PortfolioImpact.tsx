import { TrendingUp, TrendingDown, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import company logos
import appleLogo from "@/assets/logos/apple-logo.png";
import swissFlag from "@/assets/logos/swiss-flag.png";
import microsoftLogo from "@/assets/logos/microsoft-logo-correct.png";
import metaLogo from "@/assets/logos/meta-logo-correct.png";

interface CompanyImpact {
  id: string;
  name: string;
  symbol: string;
  impact: "positive" | "negative" | "neutral";
  change: number;
  newsCount: number;
}

const mockCompanies: CompanyImpact[] = [
  {
    id: "1",
    name: "Apple Inc.",
    symbol: "AAPL",
    impact: "positive",
    change: 2.3,
    newsCount: 3,
  },
  {
    id: "2",
    name: "Swiss Bonds",
    symbol: "CHF",
    impact: "positive",
    change: 0.8,
    newsCount: 1,
  },
  {
    id: "3",
    name: "Microsoft Corp.",
    symbol: "MSFT",
    impact: "positive",
    change: 1.5,
    newsCount: 3,
  },
  {
    id: "4",
    name: "Meta Platforms",
    symbol: "META",
    impact: "negative",
    change: -0.9,
    newsCount: 4,
  },
];

// Logo mapping
const companyLogos: Record<string, string> = {
  AAPL: appleLogo,
  CHF: swissFlag,
  MSFT: microsoftLogo,
  META: metaLogo,
};

export function PortfolioImpact() {
  return (
    <Card className="bg-dashboard-surface border-dashboard-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          Portfolio - Today's Impact Previsions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockCompanies.map((company) => (
            <div
              key={company.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                company.impact === "positive"
                  ? "bg-financial-positive-bg border-financial-positive/20"
                  : company.impact === "negative"
                  ? "bg-financial-negative-bg border-financial-negative/20"
                  : "bg-financial-neutral border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Company Logo */}
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img 
                      src={companyLogos[company.symbol]} 
                      alt={`${company.name} logo`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{company.symbol}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {company.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {company.impact === "positive" ? (
                    <TrendingUp className="h-4 w-4 text-financial-positive" />
                  ) : company.impact === "negative" ? (
                    <TrendingDown className="h-4 w-4 text-financial-negative" />
                  ) : null}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Badge
                  variant="secondary"
                  className="text-xs"
                >
                  {company.newsCount} news
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}