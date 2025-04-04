// This is a Next.js page component for the landing page of a stock prediction platform.
// It includes sections for the hero, how it works, features, and a call to action.
// It uses Tailwind CSS for styling and includes icons from the Lucide React library.
// It also includes a button that links to the dashboard page and a footer with navigation links.

import Link from "next/link"
import { ArrowRight, BarChart3, Brain, Database } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-background py-20 px-4 md:px-6 lg:py-32">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Predict the Future of Stocks with Real-Time Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Leverage advanced machine learning algorithms to forecast stock movements and make data-driven investment
              decisions.
            </p>
            <Button size="lg" asChild className="mt-8">
              <Link href="/dashboard">
                View Live Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">1. Real-Time Data</h3>
              <p className="text-muted-foreground">
                We fetch live market data from trusted financial APIs to ensure you have the most up-to-date
                information.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">2. ML Predictions</h3>
              <p className="text-muted-foreground">
                Our advanced algorithms analyze patterns and trends to generate accurate price forecasts.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">3. Informed Decisions</h3>
              <p className="text-muted-foreground">
                Visualize predictions and historical data to make confident investment choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Real-Time Stock Tracking</h3>
              <p className="text-muted-foreground">
                Monitor live price movements, volume, and other key metrics for thousands of stocks.
              </p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
              <p className="text-muted-foreground">
                Get future price forecasts based on historical data and market trends.
              </p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Stock Comparison</h3>
              <p className="text-muted-foreground">
                Compare performance across multiple stocks with interactive charts and filters.
              </p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Personalized Watchlist</h3>
              <p className="text-muted-foreground">
                Create and monitor a custom list of stocks that matter most to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to predict the market?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start making data-driven investment decisions today with our powerful prediction platform.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 md:px-6 mt-auto">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">StockPredict</h3>
              <p className="text-muted-foreground">Predict the future of stocks with confidence</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/predictions" className="text-muted-foreground hover:text-foreground">
                Predictions
              </Link>
              <Link href="/compare" className="text-muted-foreground hover:text-foreground">
                Compare
              </Link>
              <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                Admin
              </Link>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} StockPredict. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

