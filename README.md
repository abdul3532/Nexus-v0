# Nexus - Financial Market Intelligence Platform

Nexus is a modern financial intelligence platform designed to provide real-time market signals with AI-powered analysis, portfolio management, and actionable insights for financial professionals.

![Nexus Dashboard](/public/placeholder.svg)

## Features

- **Real-time Financial News**: Curated, AI-analyzed financial news with impact assessment
- **Portfolio Management**: Track and manage assets with customizable views
- **Weekly Reports**: AI-generated market summaries and portfolio impact analysis
- **Customizable Sources**: Manage news sources and preferences
- **Smart Filtering**: Filter news by asset class, sector, impact, and more
- **Responsive Design**: Full functionality across desktop and mobile devices

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context and Hooks
- **Data Visualization**: Recharts
- **Routing**: React Router DOM
- **API Integration**: Axios with centralized configuration
- **Build Tool**: Vite
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or Yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abdul3532/Nexus-v0.git

# Navigate to project directory
cd Nexus-v0

# Install dependencies
npm install

# Create a .env file with required environment variables
echo "VITE_API_URL=http://localhost:8000/api\nVITE_FRONTEND_API_KEY=your_api_key" > .env

# Start development server
npm run dev
```

## Development

The project structure follows a feature-based organization:

```
src/
├── assets/        # Static assets and images
├── components/    # Reusable UI components
│   ├── dashboard/ # Dashboard-specific components
│   ├── layout/    # Layout components (navbar, etc.)
│   ├── settings/  # Settings-related components
│   └── ui/        # Base UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and shared code
│   └── api/       # API configuration
├── pages/         # Main application pages
└── services/      # API service modules
```

### API Services

The application connects to a FastAPI backend with the following services:

- `newsService.ts`: News retrieval and filtering
- `portfolioService.ts`: Portfolio management
- `reportService.ts`: Weekly reports
- `sourceService.ts`: News source management

Each service is built on top of a centralized API configuration in `lib/api/config.ts`.

## Building for Production

```bash
# Generate a production build
npm run build

# Preview the production build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ♥ by the Nexus team
