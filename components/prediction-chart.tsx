"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data generator for the prediction chart
const generatePredictionData = (symbol: string, timeframe: string) => {
  const data = []
  const now = new Date()
  let startDate: Date
  let endDate: Date
  let interval: number

  switch (timeframe) {
    case "1d":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 1 day ahead
      interval = (24 * 60 * 60 * 1000) / 4 // 6 hours
      break
    case "1w":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
      endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 1 week ahead
      interval = 24 * 60 * 60 * 1000 // 1 day
      break
    case "1m":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) // 90 days ago
      endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 1 month ahead
      interval = 24 * 60 * 60 * 1000 * 3 // 3 days
      break
    case "3m":
      startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000) // 180 days ago
      endDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000) // 3 months ahead
      interval = 24 * 60 * 60 * 1000 * 7 // 1 week
      break
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      interval = 24 * 60 * 60 * 1000
  }

  // Generate base price based on symbol
  let basePrice = 0
  switch (symbol) {
    case "AAPL":
      basePrice = 180
      break
    case "MSFT":
      basePrice = 415
      break
    case "GOOGL":
      basePrice = 175
      break
    case "AMZN":
      basePrice = 183
      break
    default:
      basePrice = 100
  }

  // Generate data points
  let currentDate = new Date(startDate)
  let price = basePrice

  while (currentDate <= endDate) {
    const isPrediction = currentDate > now

    // Random price movement
    const change = (Math.random() - 0.5) * 5
    price += change
    price = Math.max(price, basePrice * 0.8) // Prevent going too low

    // Add some trend to predictions
    if (isPrediction) {
      // Add a slight upward trend for predictions
      price += Math.random() * 1.5
    }

    data.push({
      date: new Date(currentDate).toISOString(),
      price: price.toFixed(2),
      isPrediction,
    })

    currentDate = new Date(currentDate.getTime() + interval)
  }

  return data
}

interface PredictionChartProps {
  symbol: string
  timeframe: string
}

export function PredictionChart({ symbol, timeframe }: PredictionChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generatePredictionData(symbol, timeframe))
  }, [symbol, timeframe])

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full">Loading prediction data...</div>
  }

  // Find the index where predictions start
  const predictionStartIndex = data.findIndex((item) => item.isPrediction)

  return (
    <ChartContainer
      config={{
        price: {
          label: "Price",
          color: "hsl(var(--chart-1))",
        },
        prediction: {
          label: "Prediction",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date)
              return d.toLocaleDateString([], { month: "short", day: "numeric" })
            }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            domain={["auto", "auto"]}
            axisLine={false}
            tickLine={false}
            dx={-10}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<ChartTooltipContent />} />

          {/* Actual data line */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#actualGradient)"
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            name="Actual"
            connectNulls
            data={data.slice(0, predictionStartIndex)}
          />

          {/* Prediction data line */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            strokeDasharray="5 5"
            fillOpacity={1}
            fill="url(#predictionGradient)"
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            name="Prediction"
            connectNulls
            data={data.slice(predictionStartIndex - 1)}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

