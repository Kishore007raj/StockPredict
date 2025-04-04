"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data generator for the chart
const generateChartData = (symbol: string, timeframe: string) => {
  const data = []
  const now = new Date()
  let startDate: Date
  let interval: number
  let format: string

  switch (timeframe) {
    case "1h":
      startDate = new Date(now.getTime() - 60 * 60 * 1000)
      interval = 5 * 60 * 1000 // 5 minutes
      format = "HH:mm"
      break
    case "1d":
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      interval = 60 * 60 * 1000 // 1 hour
      format = "HH:mm"
      break
    case "1w":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      interval = 24 * 60 * 60 * 1000 // 1 day
      format = "MMM dd"
      break
    case "1m":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      interval = 24 * 60 * 60 * 1000 * 3 // 3 days
      format = "MMM dd"
      break
    default:
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      interval = 60 * 60 * 1000
      format = "HH:mm"
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

  while (currentDate <= now) {
    // Random price movement
    const change = (Math.random() - 0.5) * 5
    price += change
    price = Math.max(price, basePrice * 0.8) // Prevent going too low

    data.push({
      date: new Date(currentDate).toISOString(),
      price: price.toFixed(2),
      volume: Math.floor(Math.random() * 1000000),
    })

    currentDate = new Date(currentDate.getTime() + interval)
  }

  return data
}

interface StockChartProps {
  symbol: string
  timeframe: string
}

export function StockChart({ symbol, timeframe }: StockChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generateChartData(symbol, timeframe))
  }, [symbol, timeframe])

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full">Loading chart data...</div>
  }

  return (
    <ChartContainer
      config={{
        price: {
          label: "Price",
          color: "hsl(var(--chart-1))",
        },
        volume: {
          label: "Volume",
          color: "hsl(var(--chart-2))",
          hideInLegend: true,
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date)
              return timeframe === "1h" || timeframe === "1d"
                ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : d.toLocaleDateString([], { month: "short", day: "numeric" })
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
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

