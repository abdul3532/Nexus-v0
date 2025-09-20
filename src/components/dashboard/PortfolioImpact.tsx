import { TrendingUp, TrendingDown, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import company logos
import appleLogo from "@/assets/logos/apple-logo.png";
import teslaLogo from "@/assets/logos/tesla-logo.png";
import microsoftLogo from "@/assets/logos/microsoft-logo-latest.png";
import metaLogo from "@/assets/logos/meta-logo.png";

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
    newsCount: 4,
  },
  {
    id: "2",
    name: "Tesla Inc.",
    symbol: "TSLA",
    impact: "negative",
    change: -1.8,
    newsCount: 7,
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
    newsCount: 5,
  },
];

// Logo mapping
const companyLogos: Record<string, string> = {
  AAPL: appleLogo,
  TSLA: teslaLogo,
  MSFT: microsoftLogo,
  META: metaLogo,
};

export function PortfolioImpact() {
  return (
    <Card className="bg-dashboard-surface border-dashboard-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5" />
          Portfolio Companies - Today's Impact
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
                <span
                  className={`text-xs ${
                    company.impact === "positive"
                      ? "text-financial-positive-foreground"
                      : company.impact === "negative"
                      ? "text-financial-negative-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {company.impact === "positive" ? "Positive" : company.impact === "negative" ? "Negative" : "Neutral"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}