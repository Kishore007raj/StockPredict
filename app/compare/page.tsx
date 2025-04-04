//this is a Next.js page component for comparing stock performance
// It allows users to select multiple stocks, view their performance over different timeframes, and compare key metrics 

"use client"

import { useState } from "react"
import { Download, Plus, RefreshCw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComparisonChart } from "@/components/comparison-chart"
import { StockSelector } from "@/components/stock-selector"

export default function ComparePage() {
  const [timeframe, setTimeframe] = useState("1w")
  const [selectedStocks, setSelectedStocks] = useState([
    { symbol: "AAPL", name: "Apple Inc.", color: "hsl(var(--chart-1))" },
    { symbol: "MSFT", name: "Microsoft Corp.", color: "hsl(var(--chart-2))" },
  ])

  const handleAddStock = (stock: { symbol: string; name: string }) => {
    if (selectedStocks.length < 5 && !selectedStocks.some((s) => s.symbol === stock.symbol)) {
      const colors = [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
      ]
      setSelectedStocks([
        ...selectedStocks,
        {
          ...stock,
          color: colors[selectedStocks.length],
        },
      ])
    }
  }

  const handleRemoveStock = (symbol: string) => {
    setSelectedStocks(selectedStocks.filter((stock) => stock.symbol !== symbol))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Compare Stocks</h1>
              <p className="text-muted-foreground">Compare performance across multiple stocks</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Select Stocks</CardTitle>
                <CardDescription>Add up to 5 stocks to compare</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Stocks</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="search" type="search" placeholder="Symbol or company name" className="pl-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Popular Stocks</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <StockSelector onSelect={handleAddStock} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Selected Stocks</Label>
                    <div className="space-y-2">
                      {selectedStocks.map((stock) => (
                        <div key={stock.symbol} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: stock.color }}></div>
                            <span className="font-medium">{stock.symbol}</span>
                            <span className="text-muted-foreground text-xs ml-2">{stock.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleRemoveStock(stock.symbol)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                      {selectedStocks.length < 5 && (
                        <Button variant="outline" className="w-full" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Stock
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={timeframe === "1h" ? "bg-muted" : ""}
                        onClick={() => setTimeframe("1h")}
                      >
                        1H
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={timeframe === "1d" ? "bg-muted" : ""}
                        onClick={() => setTimeframe("1d")}
                      >
                        1D
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={timeframe === "1w" ? "bg-muted" : ""}
                        onClick={() => setTimeframe("1w")}
                      >
                        1W
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={timeframe === "1m" ? "bg-muted" : ""}
                        onClick={() => setTimeframe("1m")}
                      >
                        1M
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>
                  {selectedStocks.map((s) => s.symbol).join(" vs. ")} - {timeframe} timeframe
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="price">
                  <div className="px-6">
                    <TabsList className="mb-4">
                      <TabsTrigger value="price">Price</TabsTrigger>
                      <TabsTrigger value="percent">Percent Change</TabsTrigger>
                      <TabsTrigger value="volume">Volume</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="price" className="h-[400px]">
                    <ComparisonChart stocks={selectedStocks} timeframe={timeframe} mode="price" />
                  </TabsContent>
                  <TabsContent value="percent" className="h-[400px]">
                    <ComparisonChart stocks={selectedStocks} timeframe={timeframe} mode="percent" />
                  </TabsContent>
                  <TabsContent value="volume" className="h-[400px]">
                    <ComparisonChart stocks={selectedStocks} timeframe={timeframe} mode="volume" />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Data as of {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Chart
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key metrics comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 p-3 border-b font-medium">
                  <div>Stock</div>
                  <div className="text-right">Current Price</div>
                  <div className="text-right">Change (1D)</div>
                  <div className="text-right">Change (1W)</div>
                  <div className="text-right">Change (1M)</div>
                  <div className="text-right">Volume</div>
                  <div className="text-right">Market Cap</div>
                </div>
                <div className="divide-y">
                  {selectedStocks.map((stock) => {
                    const price =
                      stock.symbol === "AAPL"
                        ? 182.63
                        : stock.symbol === "MSFT"
                          ? 415.32
                          : stock.symbol === "GOOGL"
                            ? 174.93
                            : stock.symbol === "AMZN"
                              ? 182.94
                              : 100.0

                    const change1d = Math.random() * 4 - 2
                    const change1w = Math.random() * 8 - 3
                    const change1m = Math.random() * 15 - 5

                    const volume =
                      stock.symbol === "AAPL"
                        ? "32.5M"
                        : stock.symbol === "MSFT"
                          ? "18.2M"
                          : stock.symbol === "GOOGL"
                            ? "12.7M"
                            : stock.symbol === "AMZN"
                              ? "15.3M"
                              : "5.1M"

                    const marketCap =
                      stock.symbol === "AAPL"
                        ? "2.87T"
                        : stock.symbol === "MSFT"
                          ? "3.09T"
                          : stock.symbol === "GOOGL"
                            ? "2.21T"
                            : stock.symbol === "AMZN"
                              ? "1.89T"
                              : "500B"

                    return (
                      <div key={stock.symbol} className="grid grid-cols-7 p-3">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: stock.color }}></div>
                          <span>{stock.symbol}</span>
                        </div>
                        <div className="text-right">${price.toFixed(2)}</div>
                        <div className={`text-right ${change1d >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {change1d >= 0 ? "+" : ""}
                          {change1d.toFixed(2)}%
                        </div>
                        <div className={`text-right ${change1w >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {change1w >= 0 ? "+" : ""}
                          {change1w.toFixed(2)}%
                        </div>
                        <div className={`text-right ${change1m >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {change1m >= 0 ? "+" : ""}
                          {change1m.toFixed(2)}%
                        </div>
                        <div className="text-right">{volume}</div>
                        <div className="text-right">{marketCap}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

