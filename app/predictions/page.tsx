// This file is part of the Stock Prediction Platform.
//used for generating and analyzing stock price predictions with various models and factors.
"use client"

import { useState } from "react"
import { ArrowRight, Calendar, Download, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictionChart } from "@/components/prediction-chart"

export default function PredictionsPage() {
  const [symbol, setSymbol] = useState("AAPL")
  const [timeframe, setTimeframe] = useState("1w")

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Predictions</h1>
              <p className="text-muted-foreground">Generate and analyze stock price predictions</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                History
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>New Prediction</CardTitle>
                <CardDescription>Generate a price forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="symbol">Stock Symbol</Label>
                    <Input
                      id="symbol"
                      placeholder="e.g. AAPL"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Prediction Timeframe</Label>
                    <div className="grid grid-cols-4 gap-2">
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
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={timeframe === "3m" ? "bg-muted" : ""}
                        onClick={() => setTimeframe("3m")}
                      >
                        3M
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Prediction Model</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button type="button" variant="outline" size="sm" className="bg-muted">
                        Standard
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Advanced
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="factors">Include Factors</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button type="button" variant="outline" size="sm" className="bg-muted">
                        Market Trends
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="bg-muted">
                        News Sentiment
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Sector Performance
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Economic Indicators
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Generate Prediction
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Prediction Results: {symbol}</CardTitle>
                <CardDescription>Forecast for {timeframe} timeframe</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="chart">
                  <div className="px-6">
                    <TabsList className="mb-4">
                      <TabsTrigger value="chart">Chart View</TabsTrigger>
                      <TabsTrigger value="data">Data View</TabsTrigger>
                      <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="chart" className="h-[350px]">
                    <PredictionChart symbol={symbol} timeframe={timeframe} />
                  </TabsContent>
                  <TabsContent value="data" className="px-6">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-3 border-b font-medium">
                        <div>Date</div>
                        <div className="text-right">Actual Price</div>
                        <div className="text-right">Predicted Price</div>
                        <div className="text-right">Difference</div>
                      </div>
                      <div className="divide-y">
                        {Array.from({ length: 7 }).map((_, i) => {
                          const date = new Date()
                          date.setDate(date.getDate() + i)
                          const actual = i < 2 ? (180 + Math.random() * 5).toFixed(2) : "-"
                          const predicted = (180 + Math.random() * 7).toFixed(2)
                          const diff = i < 2 ? (Number(predicted) - Number(actual)).toFixed(2) : "-"
                          const diffPercent = i < 2 ? ((Number(diff) / Number(actual)) * 100).toFixed(2) : "-"

                          return (
                            <div key={i} className="grid grid-cols-4 p-3">
                              <div>{date.toLocaleDateString()}</div>
                              <div className="text-right">{actual}</div>
                              <div className="text-right">{predicted}</div>
                              <div
                                className={`text-right ${i < 2 && Number(diff) > 0 ? "text-green-500" : i < 2 && Number(diff) < 0 ? "text-red-500" : ""}`}
                              >
                                {diff !== "-" ? `${diff} (${diffPercent}%)` : "-"}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="accuracy" className="px-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Overall Accuracy</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">87.3%</div>
                            <p className="text-sm text-muted-foreground">Based on historical predictions</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Direction Accuracy</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">92.1%</div>
                            <p className="text-sm text-muted-foreground">Correctly predicted trend direction</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Mean Error</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">±2.4%</div>
                            <p className="text-sm text-muted-foreground">Average prediction deviation</p>
                          </CardContent>
                        </Card>
                      </div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Accuracy Over Time</CardTitle>
                          <CardDescription>Historical prediction performance</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[200px] flex items-center justify-center">
                          <LineChart className="h-16 w-16 text-muted-foreground" />
                          <span className="ml-4 text-muted-foreground">Accuracy chart visualization</span>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Prediction generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Insights</CardTitle>
              <CardDescription>Key factors influencing this prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Market Trends</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>S&P 500 Correlation</span>
                      <span className="font-medium">High (0.87)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sector Performance</span>
                      <span className="font-medium text-green-500">Strong</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Market Volatility</span>
                      <span className="font-medium">Medium</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Trading Volume</span>
                      <span className="font-medium text-green-500">Above Avg</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Fundamental Analysis</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>P/E Ratio</span>
                      <span className="font-medium">28.5</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Revenue Growth</span>
                      <span className="font-medium text-green-500">+12.3%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Profit Margin</span>
                      <span className="font-medium">21.7%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Debt-to-Equity</span>
                      <span className="font-medium">0.42</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">News Sentiment</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Overall Sentiment</span>
                      <span className="font-medium text-green-500">Positive</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Recent News Impact</span>
                      <span className="font-medium">Medium</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Social Media Buzz</span>
                      <span className="font-medium text-green-500">High</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Analyst Ratings</span>
                      <span className="font-medium">Buy (15), Hold (7), Sell (2)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

