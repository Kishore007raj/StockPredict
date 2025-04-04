// This is a Next.js page component for the dashboard of a stock prediction platform.
// It displays real-time stock data, market summary, and quick actions.
// It also includes a watchlist and recent predictions tabs for user interaction.
// The component uses various UI components from a design system and includes mock data for demonstration purposes.


"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  Clock,
  DollarSign,
  LineChart,
  Plus,
  RefreshCw,
  Search,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockChart } from "@/components/stock-chart"
import { RecentPredictions } from "@/components/recent-predictions"
import { Watchlist } from "@/components/watchlist"

// Mock data for demonstration
const stockData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    change: 1.25,
    changePercent: 0.69,
    volume: "32.5M",
    lastUpdated: "2 min ago",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 415.32,
    change: -2.18,
    changePercent: -0.52,
    volume: "18.2M",
    lastUpdated: "1 min ago",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 174.93,
    change: 3.42,
    changePercent: 1.99,
    volume: "12.7M",
    lastUpdated: "3 min ago",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 182.94,
    change: -0.87,
    changePercent: -0.47,
    volume: "15.3M",
    lastUpdated: "5 min ago",
  },
]

export default function Dashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState("1d")
  const [selectedStock, setSelectedStock] = useState(stockData[0])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Monitor real-time stock data and predictions</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stockData.map((stock) => (
              <Card
                key={stock.symbol}
                className={`cursor-pointer hover:border-primary transition-colors ${selectedStock.symbol === stock.symbol ? "border-primary" : ""}`}
                onClick={() => setSelectedStock(stock)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                      <CardDescription>{stock.name}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-2xl font-bold">{stock.price}</span>
                    </div>
                    <div className={`flex items-center ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.change >= 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 text-xs text-muted-foreground">
                  <div className="flex justify-between w-full">
                    <span>Vol: {stock.volume}</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {stock.lastUpdated}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>
                      {selectedStock.symbol} - {selectedStock.name}
                    </CardTitle>
                    <CardDescription>Real-time price movement</CardDescription>
                  </div>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="sm"
                      className={activeTimeframe === "1h" ? "bg-muted" : ""}
                      onClick={() => setActiveTimeframe("1h")}
                    >
                      1H
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={activeTimeframe === "1d" ? "bg-muted" : ""}
                      onClick={() => setActiveTimeframe("1d")}
                    >
                      1D
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={activeTimeframe === "1w" ? "bg-muted" : ""}
                      onClick={() => setActiveTimeframe("1w")}
                    >
                      1W
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={activeTimeframe === "1m" ? "bg-muted" : ""}
                      onClick={() => setActiveTimeframe("1m")}
                    >
                      1M
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[350px] w-full">
                  <StockChart symbol={selectedStock.symbol} timeframe={activeTimeframe} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  Last updated: {selectedStock.lastUpdated}
                </div>
                <Button>
                  Predict Future Price
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Summary</CardTitle>
                  <CardDescription>Today's market overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>S&P 500</span>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>5,234.18 (+0.52%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nasdaq</span>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>16,742.39 (+0.87%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Dow Jones</span>
                      <div className="flex items-center text-red-500">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        <span>38,671.69 (-0.13%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Russell 2000</span>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>2,094.19 (+1.21%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <LineChart className="mr-2 h-4 w-4" />
                      New Prediction
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Watchlist
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Search className="mr-2 h-4 w-4" />
                      Find Stock
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href="/compare">
                        <LineChart className="mr-2 h-4 w-4" />
                        Compare
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="watchlist">
            <TabsList className="mb-4">
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="recent">Recent Predictions</TabsTrigger>
            </TabsList>
            <TabsContent value="watchlist">
              <Watchlist />
            </TabsContent>
            <TabsContent value="recent">
              <RecentPredictions />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

