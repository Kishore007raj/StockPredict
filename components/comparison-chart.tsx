"use client"

import { useEffect, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data generator for the comparison chart
const generateComparisonData = (stocks: any[], timeframe: string, mode: string) => {
  const data: any[] = []
  const now = new Date()
  let startDate: Date
  let interval: number

  switch (timeframe) {
    case "1h":
      startDate = new Date(now.getTime() - 60 * 60 * 1000)
      interval = 5 * 60 * 1000 // 5 minutes
      break
    case "1d":
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      interval = 60 * 60 * 1000 // 1 hour
      break
    case "1w":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      interval = 24 * 60 * 60 * 1000 // 1 day
      break
    case "1m":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      interval = 24 * 60 * 60 * 1000 * 3 // 3 days
      break
    default:
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      interval = 60 * 60 * 1000
  }

  // Generate base prices based on symbols
  const basePrices: { [key: string]: number } = {}
  const startPrices: { [key: string]: number } = {}

  stocks.forEach((stock) => {
    switch (stock.symbol) {
      case "AAPL":
        basePrices[stock.symbol] = 180
        break
      case "MSFT":
        basePrices[stock.symbol] = 415
        break
      case "GOOGL":
        basePrices[stock.symbol] = 175
        break
      case "AMZN":
        basePrices[stock.symbol] = 183
        break
      case "TSLA":
        basePrices[stock.symbol] = 193
        break
      case "META":
        basePrices[stock.symbol] = 485
        break
      case "NVDA":
        basePrices[stock.symbol] = 880
        break
      default:
        basePrices[stock.symbol] = 100
    }
    startPrices[stock.symbol] = basePrices[stock.symbol]
  })

  // Generate data points
  let currentDate = new Date(startDate)

  while (currentDate <= now) {
    const point: any = {
      date: new Date(currentDate).toISOString(),
    }

    stocks.forEach((stock) => {
      // Random price movement
      const change = (Math.random() - 0.48) * (basePrices[stock.symbol] * 0.02) // Slightly biased upward
      basePrices[stock.symbol] += change

      // Ensure price doesn't go too low
      basePrices[stock.symbol] = Math.max(basePrices[stock.symbol], startPrices[stock.symbol] * 0.7)

      if (mode === "price") {
        point[stock.symbol] = basePrices[stock.symbol].toFixed(2)
      } else if (mode === "percent") {
        // Calculate percent change from start
        const percentChange = ((basePrices[stock.symbol] - startPrices[stock.symbol]) / startPrices[stock.symbol]) * 100
        point[stock.symbol] = percentChange.toFixed(2)
      } else if (mode === "volume") {
        // Random volume
        point[stock.symbol] = Math.floor(Math.random() * 1000000)
      }
    })

    data.push(point)
    currentDate = new Date(currentDate.getTime() + interval)
  }

  return data
}

interface ComparisonChartProps {
  stocks: Array<{
    symbol: string
    name: string
    color: string
  }>
  timeframe: string
  mode: "price" | "percent" | "volume"
}

export function ComparisonChart({ stocks, timeframe, mode }: ComparisonChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generateComparisonData(stocks, timeframe, mode))
  }, [stocks, timeframe, mode])

  if (data.length === 0 || stocks.length === 0) {
    return <div className="flex items-center justify-center h-full">Loading comparison data...</div>
  }

  // Create chart config for ChartContainer
  const chartConfig: { [key: string]: any } = {}
  stocks.forEach((stock) => {
    chartConfig[stock.symbol] = {
      label: stock.symbol,
      color: stock.color,
    }
  })

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
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
            domain={mode === "percent" ? ["dataMin", "dataMax"] : ["auto", "auto"]}
            axisLine={false}
            tickLine={false}
            dx={-10}
            tickFormatter={(value) => (mode === "price" ? `$${value}` : mode === "percent" ? `${value}%` : value)}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />

          {stocks.map((stock) => (
            <Line
              key={stock.symbol}
              type="monotone"
              dataKey={stock.symbol}
              stroke={stock.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              name={stock.symbol}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

