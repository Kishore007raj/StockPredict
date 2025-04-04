"use client"

import { Clock, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data for recent predictions
const recentPredictions = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    prediction: "up",
    confidence: 87,
    timestamp: "2 hours ago",
    actualResult: "correct",
  },
  {
    id: 2,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    prediction: "down",
    confidence: 62,
    timestamp: "5 hours ago",
    actualResult: "incorrect",
  },
  {
    id: 3,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    prediction: "up",
    confidence: 91,
    timestamp: "1 day ago",
    actualResult: "correct",
  },
  {
    id: 4,
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    prediction: "up",
    confidence: 73,
    timestamp: "2 days ago",
    actualResult: "pending",
  },
]

export function RecentPredictions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {recentPredictions.map((prediction) => (
        <Card key={prediction.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{prediction.symbol}</CardTitle>
            <CardDescription>{prediction.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Prediction:</span>
                <div
                  className={`flex items-center ${prediction.prediction === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {prediction.prediction === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="capitalize">{prediction.prediction}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Confidence</span>
                  <span>{prediction.confidence}%</span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Result:</span>
                <span
                  className={
                    prediction.actualResult === "correct"
                      ? "text-green-500"
                      : prediction.actualResult === "incorrect"
                        ? "text-red-500"
                        : "text-muted-foreground"
                  }
                >
                  {prediction.actualResult === "pending"
                    ? "Pending"
                    : prediction.actualResult === "correct"
                      ? "Correct"
                      : "Incorrect"}
                </span>
              </div>

              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {prediction.timestamp}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

